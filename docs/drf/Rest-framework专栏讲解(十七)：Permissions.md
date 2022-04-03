# Rest-framework专栏讲解(十七)：Permissions

身份认证和权限是组合使用的, 用来确定请求是否返回数据还是拒绝请求数据。

### 确定权限

在运行视图前应该检查每个请求的权限, 如果检查失败, 则会引发 `exceptions.PermissionDenied` 异常, 并且不会运行视图主题代码。

当检查失败时, 根据以下规则, 返回 `401` 或 `403` 状态码：

- 请求已成功通过身份验证, 但权限被拒绝, 将返回 `HTTP403` 禁止的响应
- 请求未成功进行身份验证, 最高优先级的身份验证类不使用 `WWW-Authenticate` 标头, 将返回 `HTTP403` 禁止的响应
- 请求未成功进行身份验证, 最高优先级的身份验证类确实使用 `WWW-Authenticate` 标头, 将返回一个 `http401` 未经授权的响应, 并带有适当的 `WWW-Authenticate` 报头

例如：

```python
def get_object(self):
    obj = get_object_or_404(self.get_queryset(), pk=self.kwargs["pk"])
    self.check_object_permissions(self.request, obj)
    return obj
复制代码
```

需要注意的是, 除了 `DjangoObjectPermissions` 之外, `rest_framework.permission` 中提供的权限类不要实现检查对象权限所需的方法。

如果要使用提供的权限类来检查对象权限, 则必须将其子类化并实现自定义权限部分中描述的 `has_object_permission()` 方法。

出于性能原因, 当返回对象列表时, 通用视图不会自动将对象级别权限应用于查询集中的每个实例。

通常, 当您使用对象级别权限时, 您还需要适当地[过滤查询集](https://www.django-rest-framework.org/api-guide/filtering/), 以确保用户仅能查看允许其查看的实例。

### 设置权限策略

在 Django 项目中的 `settings.py` 中, 你可以使用全局设置权限访问策略：

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}
复制代码
```

当然, 如果你未指定, 则默认为无限制访问：

```python
'DEFAULT_PERMISSION_CLASSES': [
   'rest_framework.permissions.AllowAny',
]
复制代码
```

你也可以对单个 APIView 进行策略设置：

```python
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class ExampleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)
复制代码
```

或者使用装饰器的方式进行访问策略装饰：

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def example_view(request, format=None):
    content = {
        'status': 'request was permitted'
    }
    return Response(content)
复制代码
```

注意：当您通过 `class` 属性或装饰器设置新的权限类时, 您是在告诉视图忽略 `settings.py` 文件上设置的默认列表。

如果它们继承自 `rest_framework.permissions.BasePermission`, 则可以使用标准的 Python 按位运算符来组合权限, 例如 `IsAuthenticatedOrReadOnly` 可以这样写：

```python
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.views import APIView

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class ExampleView(APIView):
    permission_classes = [IsAuthenticated|ReadOnly]

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)
复制代码
```

注意：它支持 `＆` (和)、 `|` (或)和 `〜` (不是)。

### IsAuthenticated

用户已认证并通过认证的情况下的许可将被允许。

### IsAdminUser

该许可类是认证后用户实例 `user.is_staff` 是 `True` 的情况下的许可将被允许。

### IsAuthenticatedOrReadOnly

允许被授权的用户进行任何请求, 或者请求方法是安全方法之一时, 才允许对未授权用户的请求: `GET`、`HEAD`、`OPTIONS`。

### DjangoModelPermissions

该权限类与 Django 的标准 `django.contrib.auth` 模型权限相关联, 此权限只能应用于 `.queryset` 属性的视图, 仅当用户通过身份验证并分配了相关的模型权限时, 才会授予授权。

- `POST` 请求需要用户对 `add` 模型具有权限
- `PUT`、`PATCH` 请求要求用户对 `change` 模型具有权限
- `DELETE` 请求需要用户对 `delete` 模型具有权限

也可以覆盖默认行为以支持自定义模型权限, 例如您可能想要包括 `GET` 请求的view模型权限。

要使用自定义模型权限, 请覆盖 `DjangoModelPermissions` 并设置 `.perms_map` 属性, 有关详细信息，请参考源代码。

如果您将此权限与重写 `get_queryset()` 方法的视图一起使用, 则该视图上可能没有 queryset 属性, 在这种情况下我们建议您还使用 sentinel queryset 标记视图, 以便此类可以确定所需的权限, 例如：

```python
queryset = User.objects.none()  # Required for DjangoModelPermissions
复制代码
```

### DjangoModelPermissionsOrAnonReadOnly

与 `DjangoModelPermissions` 相似, 但也允许未经身份验证的用户对 API 进行只读访问。

### DjangoObjectPermissions

该权限类与 Django 的标准对象权限框架相关联, 该框架允许对模型进行按对象划分的权限, 为了使用此权限类，您还需要添加一个支持对象级权限的权限后端, 例如 `django-guardian`。

与 `DjangoModelPermissions` 一样, 此权限必须仅应用于具有 `.queryset` 属性或 `.get_queryset()` 方法的视图, 仅当用户通过身份验证并分配了相关的每个对象权限和相关的模型权限后才会授予授权。

- `POST` 请求要求用户对 `add` 模型实例具有权限
- `PUT`、`PATCH` 请求要求用户对 `change` 模型实例具有权限
- `DELETE` 请求要求用户对 `delete` 模型实例具有权限

请注意 `DjangoObjectPermissions` 它不需要 `django-guardian` 软件包, 并且应该同样支持其他对象级后端。

与 `DjangoModelPermissions` 一样, 您可以通过覆盖 `DjangoObjectPermissions` 和设置 `.perms_map` 属性来使用自定义模型权限, 有关详细信息请参考源代码。

注意：如果您需要 `GET`、`HEAD` 和 `OPTIONS` 请求的对象级视图权限, 并且正在将 `django-guardian` 用作对象级权限后端, 则需要考虑使用 `djangorestframework-guardian` 包提供的 `DjangoObjectPermissionsFilter` 类, 它确保列表端点只返回结果, 包括用户具有适当查看权限的对象。

### 自定义权限

要实现自定义权限, 请重写 `BasePermission` 并实现以下方法之一或两者兼而有之：

- `.has_permission(self, request, view)`
- `.has_object_permission(self, request, view, obj)`

如果方法应返回 `True` 应授予请求访问权限, 否则则返回 `False`。

如果你需要测试, 如果一个请求是读操作或写操作, 你应该检查对常量的请求方法 `SAFE_METHODS`, 这是一个包含 `'GET'`、`'OPTIONS'` 和 `'HEAD'` 的一个元组, 例如：

```python
if request.method in permissions.SAFE_METHODS:
    # Check permissions for read-only request
else:
    # Check permissions for write request
复制代码
```

注意：只有在视图级别 `has_permission` 检查已通过时, 才会调用实例级别 `has_object_permission` 方法, 还要注意, 为了运行实例级检查, 视图代码应该显式调用 `.check_object_permissions(request，obj)`, 如果您使用的是通用视图, 则默认情况下会为您处理此问题(基于函数的视图将需要显式检查对象权限, 在失败时引发 `PermissionDenied`)。

------

如果测试失败, 则自定义权限将引发 `PermissionDenied` 异常, 要更改与异常关联的错误消息, 请直接在自定义权限上实现 `message` 属性, 否则将使用 `PermissionDenied` 的 `default_detail` 属性, 同样要更改与异常关联的代码标识符, 请直接在您的自定义权限上实现 `code` 属性, 否则将使用 `PermissionDenied` 的  `default_codefrom` 属性。

### 例子

以下是权限类的示例, 该权限类对照阻止列表检查传入请求的 IP 地址, 并在IP被阻止时拒绝该请求：

```python
from rest_framework import permissions

class BlocklistPermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        ip_addr = request.META['REMOTE_ADDR']
        blocked = Blocklist.objects.filter(ip_addr=ip_addr).exists()
        return not blocked
复制代码
```

除了针对所有传入请求运行的全局权限外, 您还可以创建仅针对影响特定对象实例的操作运行的对象级别权限, 例如：

```python
class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.owner == request.user
复制代码
```

请注意通用视图将检查适当的对象级别权限, 但是如果您要编写自己的自定义视图, 则需要确保自己检查对象级别权限, 您可以通过在拥有对象实例后从视图中进行调用 `self.check_object_permissions(request, obj)` 来实现, 如果任何对象级权限检查失败, 则调用将引发 `APIException`, 否则将简单地返回。

还要注意通用视图将仅检查对象级权限以获取检索单个模型实例的视图, 如果需要列表视图的对象级过滤, 则需要单独过滤查询集, 有关更多详细信息请参见[过滤文档](https://www.django-rest-framework.org/api-guide/filtering/)。
