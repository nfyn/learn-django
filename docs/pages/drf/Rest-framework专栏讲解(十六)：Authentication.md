# Rest-framework专栏讲解(十六)：Authentication

身份验证是将传入请求与一组标识凭据(例如, 请求来自的用户或与其进行签名的令牌)相关联的机制, 然后, 权限和限制策略可以使用这些凭据来确定是否应允许该请求。

注意：请求身份凭证将不会允许携带身份凭证, 只仅仅是标识发出请求的凭据信息。

### 如何确定身份验证

身份验证方案始终定义为类列表, RESTframework 将尝试对列表中的每个类进行身份验证, 并将设置 `request.user` 和 `request.auth` 为成功进行身份验证的第一个类的返回值。

如果没有任何类通过身份验证, `request.user` 则将设置为 `django.contrib.auth.models.AnonymousUser` 的实例, 并将 `request.auth` 设置为 `None`。

未认证请求的 `request.user` 和 `request.auth` 可以使用 `UNAUTHENTICATED_USER` 和 `UNAUTHENTICATED_TOKEN` 设置进行修改。

### 设置认证方案

可以使用 `DEFAULT_AUTHENTICATION_CLASSES` 全局设置默认身份验证方案, 例如：

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}
复制代码
```

你也可以在单独的视图中设置特殊的认证方式：

```python
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        return Response(content)
复制代码
```

或者是视图函数：

```python
@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def example_view(request, format=None):
    content = {
        'user': unicode(request.user),  # `django.contrib.auth.User` instance.
        'auth': unicode(request.auth),  # None
    }
    return Response(content)
复制代码
```

### 错误响应

当未经身份验证的请求被拒绝时, 可能会有两个不同的错误代码是合适的。

- `HTTP 401` 未经授权
- `HTTP 403` 权限被拒绝

`HTTP 401` 响应必须始终包含 `WWW-Authenticate` 标头, 该标头指示客户端如何进行身份验证, `HTTP 403` 响应不包含 `WWW-Authenticate` 标头。

### Apache mod_wsgi 特定配置

请注意, 如果使用 [mod_wsgi](https://modwsgi.readthedocs.io/en/develop/configuration-directives/WSGIPassAuthorization.html) 部署到 [Apache](https://modwsgi.readthedocs.io/en/develop/configuration-directives/WSGIPassAuthorization.html), 则默认情况下不会将授权标头传递给 WSGI 应用程序, 因为假定身份验证将由 Apache 处理, 而不是在应用程序级别进行。

如果要部署到 Apache 并使用任何基于非会话的身份验证, 则需要显式配置 mod_wsgi 以将所需的标头传递给应用程序, 这可以通过在适当的上下文中指定指令并将 `WSGIPassAuthorization` 设置为 `'On'` 来完成。

```config
# this can go in either server config, virtual host, directory or .htaccess
WSGIPassAuthorization On
复制代码
```

### 基本认证

此身份验证方案使用 HTTP Basic Authentication, 该身份针对用户的用户名和密码进行了签名, 基本身份验证通常仅适用于测试, 如果成功通过 `BasicAuthentication` 身份验证，请提供以下凭据：

- `request.user`： Django `User` 类的实例对象
- `request.auth`：`None`

### 令牌认证

此身份验证方案使用简单的基于令牌的 HTTP 身份验证方案, 令牌认证适用于客户端-服务器设置, 例如本地台式机和移动客户端, 要使用该 `TokenAuthentication` 方案, 您需要将身份验证类配置为内包含 `TokenAuthentication`, 并另外在您的 `INSTALLED_APPS` 中添加设置 `rest_framework.authtoken`：

```python
INSTALLED_APPS = [
    ...
    'rest_framework.authtoken'
]
复制代码
```

还需要为用户创建令牌：

```python
from rest_framework.authtoken.models import Token

token = Token.objects.create(user=...)
print(token.key)
复制代码
```

为了使客户端进行身份验证, 令牌密钥应包含在 HTTP 标头 `Authorization` 中, 密钥应以字符串文字 `Token` 作为前缀, 并用空格分隔两个字符串, 例如：

```yaml
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
复制代码
```

注意：如果您想在头中使用不同的关键字, 例如 `Bearer`, 只需将 `TokenAuthentication` 子类对象并设置 `keyword` 变量, 如果成功验证, `TokenAuthentication` 将提供以下凭据：

- `request.user`： Django `User` 类的实例对象
- `request.auth`：`rest_framework.authtoken.models.Token` 的实例对象

未经授权的身份认证都将会被拒绝, 返回 `HTTP 401 Unauthorized` 的状态码, 并带有 `WWWW-Authenticate` 的标头, 如下所示：

```yaml
WWW-Authenticate: Token
复制代码
```

你也可以使用 `curl` 进行令牌身份认证测试：

```shell
curl -X GET http://127.0.0.1:8000/api/example/ -H 'Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'
复制代码
```

### 生成令牌

当你希望每个用户都自动生成一个令牌, 只需要捕获用户的 `post_save` 信号即可：

```python
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
复制代码
```

需要注意的是, 你需要将该代码片段放置在已安装的 `models.py` 中, 或者 Django 启动后会自动加载导入的其他位置, 如果你已经创建了一些用户, 测你可以使用下面的代码片段为现有的用户生成令牌：

```python
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

for user in User.objects.all():
    Token.objects.get_or_create(user=user)
复制代码
```

上面的方式是通过信号捕获的方式进行令牌生成的, 你可以利用 API 的方式进行令牌生成返回。

使用 `TokenAuthentication`, 可能希望为客户端提供一种以给定用户名和密码来获得令牌的机制, 本身框架的内置视图 `obtain_auth_token` 视图行为就提供了这样的方法, 你只需要在 URL 配置中注册就可以使用：

```python
from rest_framework.authtoken import views
urlpatterns += [
    path('api-token-auth/', views.obtain_auth_token)
]
复制代码
```

当你使用表单的方式进行认证请求令牌的时候, 如果认证成功了, 则会返回下面的 JSON 数据响应：

```json
{"token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"}
复制代码
```

请注意, 默认 `obtain_auth_token` 视图明确使用 JSON 请求和响应, 而不是在设置中使用默认渲染器和解析器类, 默认情况下没有权限或限制应用于 `obtain_auth_token` 视图, 如果希望使用应用限制, 则需要重写视图类并使用 `throttle_classes` 属性将其包括在内。

如果需要 `obtain_auth_token` 视图的自定义版本, 则可以通过将 `ObtainAuthToken` 视图类子类化, 然后在 URL 配置中使用它来实现。

例如你可以返回 token 值之外的其他用户信息：

```python
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
复制代码
```

你也可以通过管理界面手动创建令牌, 如果你的服务系统是拥有庞大的用户群体, 建议你使用 `TokenAdmin` 类进行 monkey 补丁的方式, 以根据你的实际的需要定制它, 更具体地说通过将 `user` 字段声明为 `raw_fied`：

```
# app/admin.py

TokenAdmin.raw_id_fields = ['user']
复制代码
```

### Django Manage 生成令牌

在 `v3.6.4` 版本开始, 可以使用 Django 命令的方式生成令牌：

```shell
./manage.py drf_create_token <username>
复制代码
```

使用命令后将会返回给指定用户的 API 令牌数据, 如果不存在, 则会创建：

```
Generated token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b for user user1
复制代码
```

如果你想重新生成一个令牌, 如令牌已过期, 被破坏, 则只需要增加一个可选参数 `-r`：

```shell
./manage.py drf_create_token -r <username>
复制代码
```

### Session 认证

这种身份认证方案使用的 Django 的默认后端 Session 身份认证, 适用于网站相同上下文中运行的 AJAX 客户端请求, 如果通过身份认证, `SessionAuthentication` 将会提供以下凭证属性：

- `request.user` 认证用户的 User 实例
- `request.auth` 等于 `None`

未经授权的未认证身份将会返回 `HTTP 403 Forbidden` 状态。

如果您使用的是带有 `SessionAuthentication` 的 AJAX 风格的 API, 你需要确保你的令牌包含任何 "unsafe" 的 HTTP 方法调用一个有效的 CSRF, 如 PUT、PATCH、POST 或 DELETE 请求。有关更多详细信息，请参见 [Django CSRF](https://docs.djangoproject.com/en/stable/ref/csrf/#ajax) 文档。

警告：创建登录页面时, 请始终使用 Django 的标准登录视图, 这将确保您的登录视图受到适当的保护。

框架中的 CSRF 验证与标准 Django 的工作原理略有不同, 这是因为需要对同一视图同时支持基于会话和基于非会话的身份验证, 这意味着只有经过身份验证的请求才需要 CSRF 令牌, 并且匿名请求可能没有 CSRF 令牌就可以发送, 此行为不适用于应始终应用 CSRF 验证的登录视图。

### 远程用户认证

通过此身份验证方案, 您可以将身份验证委派给 Web 服务器, 该服务器设置 `REMOTE_USER` 环境变量。

要使用它, 必须在 `AUTHENTICATION_BACKENDS` 中设置 `django.contrib.auth.backends.RemoteUserBackend` (或子类), 默认情况下 `RemoteUserBackend` 为尚不存在的用户名创建 `User` 对象, 要更改此行为和其他行为，请参阅 [Django](https://docs.djangoproject.com/en/stable/howto/auth-remote-user/) 文档。

如果成功通过身份验证，`RemoteUserAuthentication` 会提供以下凭据：

- `request.user` 将是 Django `User` 实例
- `request.auth` 将会 `None`

有关配置身份验证方法的信息请查阅 Web 服务器的文档, 例如：

- [Apache Authentication How-To](https://httpd.apache.org/docs/2.4/howto/auth.html)
- [NGINX (Restricting Access)](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)

### 自定义认证方式

要实现自定义身份验证方案, 请继承 `BaseAuthentication` 并重写该 `.authenticate(self, request)` 方法, 如果身份验证成功则会返回一个元组数据 `(user, auth)`, 否则则会返回 `None`。

在某些情况下 `None`, 可能是 `AuthenticationFailed` 中 `.authenticate()` 方法中引发的异常, 而不是返回。

通常，您应该采用的方法是：

如果未尝试认证请返回 `None`, 还在使用的任何其他身份验证方案仍将被检查。 如果尝试进行身份验证但失败，请引发 `AuthenticationFailed` 异常, 不管是否进行任何权限检查, 并且不检查任何其他身份验证方案, 都将立即返回错误响应。 您也可以覆盖该 `.authenticate_header(self, request)` 方法, 如果实现, 则应返回一个字符串, 该字符串将用作 `HTTP 401 Unauthorized` 响应中 `WWW-Authenticate` 标头的值。

如果 `.authenticate_header()` 未重写该方法, 则当未认证的请求被拒绝访问时认证方案将返回 `HTTP 403 Forbidden` 响应。

注意：当请求对象的 `.user` 或 `.auth` 属性调用自定义身份验证器时, 您可能会看到 `AttributeError` 重新引发为 `WrappedAttributeError`, 这对于防止原始异常被外部属性访问抑制是必要的。Python 不会识别该 `AttributeError` 来源源自您的自定义身份验证器, 而是假设该请求对象没有 `.user` 或 `.auth` 属性。这些错误应由验证者修复或以其他方式处理。

例如以下示例将对名为 `X-USERNAME` 的自定义请求标头中的用户名所指定的用户身份进行身份验证：

```python
from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions

class ExampleAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        username = request.META.get('HTTP_X_USERNAME')
        if not username:
            return None

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)
```
