# Rest-framework专栏讲解(六)：Response

当你需要自定义返回响应对象的时候, 你可能需要用到 `Response` 类, 你只需要从框架中导入到需要的服务模块中：

```python
from rest_framework.response import Response
复制代码
```

实例化对象你可能需要以下参数：

- `data`：响应的序列化数据
- `status`：响应的状态码
- `template_name`：要使用的模板名称
- `headers`：在响应中需要添加的 HTTP 标签头
- `content_type`：响应内容的类型, 通常会自动设置, 除非你需要显式手动指定

### .data

获取响应实例对象的序列化数据。

### .status_code

获取响应实例的状态码。

### .content

当你优先调用了 `.render()` 方法后, 你可以使用该属性获取响应呈现的内容数据。

### .template_name

当你使用了模板渲染器的时候, 可以使用该属性访问模板名称。

### .accepted_renderer

用于呈现响应的实例对象。

### .accepted_media_type

用于获取数据内容的类型。

### .renderer_context

附加上下文信息的字典数据, 该字典将传递给渲染器的 `.render()` 方法。

### rander()

与任何的 `TemplateResponse` 方法一样, 调用此方法可将响应的序列化数据呈现为最终响应内容, 当 `.render()` 被调用时, 响应内容将被设置为 `.render(data, accepted_media_type, renderer_context)` 对 `accepted_renderer` 实例调用的结果。
