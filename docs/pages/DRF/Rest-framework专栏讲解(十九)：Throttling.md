# Rest-framework专栏讲解(十九)：Throttling

`Throttling` (节流) 适用于和 `Permissions` 相似的功能, 但节流的状态返回是临时性的, 适用于客户端向服务端发送请求的速率限制。

和权限一样, 你可以单独指定相关的视图进行单独的节流设置, 但你也可以指定多个节流方案, 如你希望你的用户访问时, 每分钟最多访问 60 次, 每天最多访问 2000 次。

### Throttling 如何确定

与权限和身份验证一样, 框架中的限制始终定义为列表对象, 在运行视图主体之前, 优先检查列表中的每个节流对象, 如果任何油门检查失败, 将引发 `exceptions.Throttled` 异常并且视图主体将不运行。

### 配置 Throttling 策略

可以使用 `DEFAULT_THROTTLE_CLASSES` 和 `DEFAULT_THROTTLE_RATES` 进行全局性设置默认的限制策略, 例如：

```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day'
    }
}
复制代码
```

上述配置中所用的速率的描述 `DEFAULT_THROTTLE_RATES` 可以包括 `second`、`minute`、`hour` 或 `day` 作为节流段描述字符串。

你还可以使用基于类的视图基于每个 `APIView` 视图或每个视图集设置节流策略：

```python
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView

class ExampleView(APIView):
    throttle_classes = [UserRateThrottle]

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)
复制代码
```

或者是使用装饰器的方式进行视图函数装饰：

```python
@api_view(['GET'])
@throttle_classes([UserRateThrottle])
def example_view(request, format=None):
    content = {
        'status': 'request was permitted'
    }
    return Response(content)
复制代码
```

### 识别客户端方式

HTTP 报头 `X-Forwarded-For` 和 WSGI 变量 `REMOTE_ADDR` 被用来唯一标识节流客户端的 IP 地址, 如果存在 `X-Forwarded-For` 标头则将使用它, 否则将使用 WSGI 环境中的 `REMOTE_ADDR` 变量值。

如果需要严格标识唯一的客户端 IP 地址, 则需要先通过设置 `NUM_PROXIES` 配置 API 落后的应用代理数量, 此设置应为零或更大的整数, 如果设置为 `非零`, 则 `X-Forwarded-For` 一旦首次排除任何应用程序代理 IP 地址, 客户端 IP 将被标识为标头中的最后一个 IP 地址, 如果设置为 `零`, 则该 `REMOTE_ADDR` 值将始终用作标识IP地址。

重要的是要了解如果您配置此 `NUM_PROXIES` 设置, 则唯一经过 NAT 转换的网关后面的所有客户端都将被视为单个客户端。

有关 `X-Forwarded-For` 标头如何工作以及标识远程客户端 IP 的更多上下文，请[参见此处](http://oxpedia.org/wiki/index.php?title=AppSuite:Grizzly#Multiple_Proxies_in_front_of_the_cluster)。

### 设置缓存

框架提供的节流类使用 Django 的缓存后端, 您应该确保已设置适当的[缓存设置](https://docs.djangoproject.com/en/stable/ref/settings/#caches), 对于简单的 `LocMemCache` 设置, 后端的默认值应该可以, 有关更多详细信息请参见 Django 的[缓存文档](https://docs.djangoproject.com/en/stable/topics/cache/#setting-up-the-cache)。

如果您需要使用 `'default'` 以外的其他缓存, 则可以通过创建自定义的节流类并设置 `cache` 属性来实现。例如：

```python
from django.core.cache import caches

class CustomAnonRateThrottle(AnonRateThrottle):
    cache = caches['alternate']
复制代码
```

您需要记住还要在 `'DEFAULT_THROTTLE_CLASSES'` 设置键或使用 `throttle_classesview` 属性中设置自定义节流类。

### AnonRateThrottle

该 `AnonRateThrottle` 会永远只能扼杀未经授权的用户, 传入请求的 IP 地址用于生成唯一的密钥以进行限制。

允许的请求速率由以下之一确定(按优先顺序)。

- 类的 `rate` 属性, 可以通过重写 `AnonRateThrottle` 并设置该属性来提供
- 该 `DEFAULT_THROTTLE_RATES['anon']` 设置

如果您想限制来自未知来源的请求速率, 则 `AnonRateThrottle` 适用。

### UserRateThrottle

在 `UserRateThrottle` 将节流用户跨 API 请求给定的速度, 用户 ID 用于生成唯一的密钥以进行限制, 未经身份验证的请求将退回到使用传入请求的 IP 地址来生成唯一密钥以进行限制。

允许的请求速率由以下之一确定(按优先顺序)。

- 类的 `rate` 属性, 可以通过重写 `AnonRateThrottle` 并设置该属性来提供
- 该 `DEFAULT_THROTTLE_RATES['anon']` 设置

一个 API 可能同时具有多个 `UserRateThrottles` 位置, 为此请重写 `UserRateThrottle` 并为每个类设置一个唯一的 `作用域`。

例如，可以使用以下类来实现多个用户节流率：

```python
class BurstRateThrottle(UserRateThrottle):
    scope = 'burst'

class SustainedRateThrottle(UserRateThrottle):
    scope = 'sustained'
复制代码
```

或者全局设置：

```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'example.throttles.BurstRateThrottle',
        'example.throttles.SustainedRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'burst': '60/min',
        'sustained': '1000/day'
    }
}
复制代码
```

如果您希望对每个用户进行简单的全局速率限制, 则 `UserRateThrottle` 适用。

### ScopedRateThrottle

`ScopedRateThrottle` 类可用于限制访问 API 的特定部分, 仅当所访问的视图包含 `.throttle_scope` 属性时才会应用此限制, 然后通过将请求的 `范围` 与唯一的用户 ID 或 IP 地址串联起来即可形成唯一的限制键。

允许的请求速率由 `DEFAULT_THROTTLE_RATES` 设置使用请求 `范围` 中的键确定。

例如，给定以下视图：

```python
class ContactListView(APIView):
    throttle_scope = 'contacts'
    ...

class ContactDetailView(APIView):
    throttle_scope = 'contacts'
    ...

class UploadView(APIView):
    throttle_scope = 'uploads'
    ...
复制代码
```

以及以下设置：

```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'contacts': '1000/day',
        'uploads': '20/day'
    }
}
复制代码
```

用户每天对一个请求的请求 `ContactListView` 或 `ContactDetailView` 将被限制为总共 `1000` 个请求, 用户对的请求 `UploadView` 将被限制为每天 `20` 个请求。

### 自定义

要创建自定义节流阀类, 请覆盖 `BaseThrottle` 并实现 `.allow_request(self, request, view)` 方法, 如果是允许该请求则该方法应返回 `True`, 否则返回 `False`。

也可以重写 `.wait()` 方法, 如果实现, `.wait()` 应返回建议的等待秒数然后再尝试下一个请求, 或者不返回, 只有在 `.allow_request()` 之前返回 `False` 时才会调用 `.wait()` 方法。 如果实现了.wait（）方法并限制了请求，则响应中将包含 `Retry-After` 头。

如果该 `.wait()` 方法已实现且请求已被限制, 则 `Retry-After` 标头将包含在响应中。

### 示例

下面是一个速率调节的例子, 它将在每10个请求中随机调节1个。

```python
import random

class RandomRateThrottle(throttling.BaseThrottle):
    def allow_request(self, request, view):
        return random.randint(1, 10) != 1
```
