# Rest-framework专栏讲解(二十三)：Returning URLs

通常最好是从 Web API 返回绝对 URL (比如 `http://example.com/foobar`), 而不是相对 URL (比如 `/foobar`), 这将会是更好的做法。

这样做的好处是：

- 更加明确
- 它为您的 API 客户端减少了工作
- 当在 JSON 等, 没有本机 URL 类型的表示中找到字符串时, 其含义没有任何歧义
- 它使得使用超链接标记 HTML 表示之类的事情变得很容易

框架提供了两个实用函数, 使得从 Web API 返回绝对 URL 变得更加简单。

不需要您使用它们, 但是如果您使用了, 那么自描述 API 将能够自动为您超链接其输出, 这使得浏览 API 更加容易。

### reverse

签名: `reverse(viewname, *args, **kwargs)`

具有与 `django.url.reverse` 相同的行为, 但它返回一个完全限定的 URL (使用请求确定主机和端口)。

您应该**将请求作为函数的关键字参数**包括在内, 例如：

```python
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from django.utils.timezone import now

class APIRootView(APIView):
    def get(self, request):
        year = now().year
        data = {
            ...
            'year-summary-url': reverse('year-summary', args=[year], request=request)
        }
        return Response(data)
复制代码
```

### reverse_lazy

签名：`reverse_lazy(viewname, *args, **kwargs)`

具有和 `django.url.reverse_lazy` 相同的行为, 但它返回一个完全限定的 URL (使用请求来确定主机和端口)。

与 `reverse` 函数一样, 应该**将请求作为关键字参数**包含到函数中, 例如：

```python
api_root = reverse_lazy('api-root', request=request)
```
