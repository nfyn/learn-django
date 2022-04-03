# Rest-framework专栏讲解(二十一)：Content negotiation

内容协商是根据客户端或服务器的首选项, 从多个可能的表示中选择一个返回给客户端的过程。

### 确定可接受的渲染器

框架使用一种简单的内容协商样式, 据可用的渲染器, 每个渲染器的优先级以及客户端的 `Accept:` 标头, 确定应将哪种媒体类型返回给客户端, 使用的样式部分是客户端驱动的, 部分是服务器驱动的。

1. 较具体的媒体类型优先于较不具体的媒体类型
2. 如果多种媒体类型具有相同的特异性, 则根据为给定视图配置的渲染器的顺序来优先考虑

例如给定以下 `Accept` 标头：

```headers
application/json; indent=4, application/json, application/yaml, text/html, */*
复制代码
```

每种给定媒体类型的优先级为：

- `application/json; indent=4`
- `application/json`、`application/yaml`、`text/html`
- `*/*`

如果请求的视图只配置了 `YAML` 和 `HTML` 的渲染器, 那么框架将选择 `renderer_classes` 列表中最先列出的渲染器或默认的 `renderer_classes` 设置。

有关 `HTTP Accept` 标题的更多信息，请参见 [RFC 2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html)。

### 自定义

您不太可能希望为框架提供一个自定义的内容协商方案, 但如果需要您可以这样做, 若要实现自定义内容协商方案请重写 `BaseContentNegotiation`。

框架的内容协商类处理对请求的适当解析器和响应的适当渲染器的选择, 因此您应该同时实现 `.select_parser(request, parsers)` 和 `.select_renderer(request, renderers, format_suffix)` 方法。

`select_parser()` 方法应该从可用解析器列表中返回一个解析器实例, 如果没有一个解析器能够处理传入的请求, 则不返回或返回 `None`。

`select_renderer()` 方法应返回一个双元组 `(渲染器实例, 媒体类型)`, 或引发 `NotAcceptable` 异常。

以下是一个自定义内容协商类, 在选择适当的解析器或渲染器时它将忽略客户端请求：

```python
from rest_framework.negotiation import BaseContentNegotiation

class IgnoreClientContentNegotiation(BaseContentNegotiation):
    def select_parser(self, request, parsers):
        """
        Select the first parser in the `.parser_classes` list.
        """
        return parsers[0]

    def select_renderer(self, request, renderers, format_suffix):
        """
        Select the first renderer in the `.renderer_classes` list.
        """
        return (renderers[0], renderers[0].media_type)
复制代码
```

### 设置内容协商

可以使用 `DEFAULT_CONTENT_NEGOTIATION_CLASS` 全局设置默认内容协商类, 例如以下设置将使用我们的示例 `IgnoreClientContentNegotiation` 类：

```python
REST_FRAMEWORK = {
    'DEFAULT_CONTENT_NEGOTIATION_CLASS': 'myapp.negotiation.IgnoreClientContentNegotiation',
}
复制代码
```

您还可以使用基于 `APIView` 类的视图来设置用于单个视图或视图集的内容协商：

```python
from myapp.negotiation import IgnoreClientContentNegotiation
from rest_framework.response import Response
from rest_framework.views import APIView

class NoNegotiationView(APIView):
    """
    An example view that does not perform content negotiation.
    """
    content_negotiation_class = IgnoreClientContentNegotiation

    def get(self, request, format=None):
        return Response({
            'accepted media type': request.accepted_renderer.media_type
        })
```
