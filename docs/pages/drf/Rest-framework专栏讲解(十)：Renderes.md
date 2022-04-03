# Rest-framework专栏讲解(十)：Renderes

选择一个合适的数据渲染器, 有助于接口的合理化以及对接时候便捷性。

### 项目配置

如：

```python
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ]
}
复制代码
```

包含了返回 JSON 数据以外, 还包括了自述 API 的返回。 当然, 如果你不想在全局中设置渲染的方式, 你也可以这样：

```python
from django.contrib.auth.models import User
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

class UserCountView(APIView):
    """
    A view that returns the count of active users in JSON.
    """
    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        user_count = User.objects.filter(active=True).count()
        content = {'user_count': user_count}
        return Response(content)
复制代码
```

再或者你使用的是装饰器的方式：

```python
@api_view(['GET'])
@renderer_classes([JSONRenderer])
def user_count_view(request, format=None):
    """
    A view that returns the count of active users in JSON.
    """
    user_count = User.objects.filter(active=True).count()
    content = {'user_count': user_count}
    return Response(content)
复制代码
```

在使用多种渲染器的时候, 默认使用的是下标为 `0` 的首选渲染器, 当然你可以在你的请求头中指定 `Accept`。

### 渲染器罗列

| 渲染器类               | 渲染类型                                       | 说明                                                         |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| `JSONRenderer`         | `application/json`                             | 将返回数据渲染成 JSON 数据样式, 并且你可以使用 `indent` 媒体类型参数制定你的缩进方式, 例如 `Accept: application/json; indent=4` |
| `TemplateHTMLRenderer` | `text/html`                                    | 使用 Django 模板数据返回时, 将返回 HTML 类型数据, 并与其他返回数据不一样的是, 使用此渲染器返回数据不需要序列化, 但是在你创建并返回 Response 实例对象时需要制定 `template_name` 关键字参数 |
| `StaticHTMLRenderer`   | `text/html`                                    | 一个将渲染的 HTML 作为字符渲染的方式传递的渲染器             |
| `BrowsableAPIRenderer` | `text/html`                                    | 将数据呈现为 Browsable API 的 HTML                           |
| `AdminRenderer`        | `text/html`                                    | 该渲染器适用于 CRUD 样式的 WebAPI, 这些 API 也应提供用户友好的界面来管理数据 |
| `HTMLFormRenderer`     | `text/html`                                    | 将序列化数据呈现为 HTML, 次渲染器的输出不包含封闭的 `<from>` 标签以及隐藏的 CSRF 输入或任何提交按钮 |
| `MultiPartRenderer`    | `multipart/form-data; boundary=BoUnDaRyStRiNg` | 该渲染器用于渲染 HTML 多部分表单数据, 它不适合用作响应渲染器, 而是用于使用 REST 框架的测试客户端和测试请求工厂创建测试请求 |

`JSONRenderer` 响应数据示例：

```json
{
    "unicode black star": "★",
    "value": 999
}
复制代码
```

`TemplateHTMLRenderer` 视图示例：

```python
class UserDetail(generics.RetrieveAPIView):
    """
    A view that returns a templated HTML representation of a given user.
    """
    queryset = User.objects.all()
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        return Response({'user': self.object}, template_name='user_detail.html')
复制代码
```

`StaticHTMLRenderer` 视图示例：

```python
@api_view(['GET'])
@renderer_classes([StaticHTMLRenderer])
def simple_html_view(request):
    data = '<html><body><h1>Hello, world</h1></body></html>'
    return Response(data)
复制代码
```

`BrowsableAPIRenderer` 返回示例： ![img](https://user-gold-cdn.xitu.io/2020/7/25/173862ca8065d1ed?imageView2/0/w/1280/h/960/ignore-error/1)

`AdminRenderer` 注意：
 带有嵌套或列表化序列器作为其输入的视图将不适用于 `AdminRenderer`, 因为 HTML 表单无法正确支持它们, 并且当你的数据中配置了正确的 `URL_FIELD_NAME` 属性时, 才能够正确的指向详情信息页的链接, 例如在序列化模型中使用 `get_absolute_url` 方法：

```python
class AccountSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='get_absolute_url', read_only=True)

    class Meta:
        model = Account
复制代码
```

`HTMLFormRenderer` 说明：
 你不能直接使用此渲染器, 而是可以通过将序列化实例对象传递给 `render_form` 模板标签在模板中使用, 参考 [HTML＆Forms 文档](https://www.django-rest-framework.org/topics/html-and-forms/)：

```html
{% load rest_framework %}

<form action="/submit-report/" method="post">
    {% csrf_token %}
    {% render_form serializer %}
    <input type="submit" value="Save" />
</form>
复制代码
```

### 第三方组件

#### YAML

```shell
python3 -m pip install djangorestframework-yaml
复制代码
REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework_yaml.parsers.YAMLParser',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework_yaml.renderers.YAMLRenderer',
    ],
}
复制代码
```

#### XML

```shell
python3 -m pip install djangorestframework-xml
复制代码
REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework_xml.parsers.XMLParser',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework_xml.renderers.XMLRenderer',
    ],
}
复制代码
```

#### JSONP

警告：
 如果你需要跨域 AJAX 请求, 通常应该使用 CORS 的更现代方法作为的替代方法 JSONP, 而该方法本质上是一种浏览器黑客, 并且仅适用于全局可读的 API 端点, 在该端点中, GET 请求未经身份验证并且不需要任何用户权限。

```shell
python3 -m pip install djangorestframework-jsonp
复制代码
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework_jsonp.renderers.JSONPRenderer',
    ],
}
复制代码
```

#### MessagePack

`MessagePack` 是一种快速高效的二进制序列化格式, [Juan Riaza](https://github.com/juanriaza) 维护 [djangorestframework-msgpack](https://github.com/wharton/drf-renderer-xlsx) 软件包, 该软件包为 REST 框架提供 MessagePack 渲染器和解析器支持。

#### XLSX

XLSX 是世界上最受欢迎的二进制电子表格格式, [The Wharton School](https://github.com/wharton) 的 [Tim Allen](https://github.com/flipperpa) 维护着 [drf-renderer-xlsx](https://github.com/wharton/drf-renderer-xlsx), 这使得端点使用 OpenPyXL 作为一个 XLSX 的电子表格, 并允许客户端下载。可以基于每个视图设置电子表格的样式。

```shell
python3 -m pip install drf-renderer-xlsx
复制代码
REST_FRAMEWORK = {
    ...

    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
        'drf_renderer_xlsx.renderers.XLSXRenderer',
    ],
}
复制代码
```

为了避免流传输的文件没有文件名(浏览器通常将其默认为没有扩展名的 `download`), 我们需要使用 `mixin` 覆盖 `Content-Disposition标头`, 如果未提供文件名则默认为 `medusa.xlsx`, 例如：

```python
from rest_framework.viewsets import ReadOnlyModelViewSet
from drf_renderer_xlsx.mixins import XLSXFileMixin
from drf_renderer_xlsx.renderers import XLSXRenderer

from .models import MyExampleModel
from .serializers import MyExampleSerializer

class MyExampleViewSet(XLSXFileMixin, ReadOnlyModelViewSet):
    queryset = MyExampleModel.objects.all()
    serializer_class = MyExampleSerializer
    renderer_classes = [XLSXRenderer]
    filename = 'medusa.xlsx'
复制代码
```

#### CSV

逗号分隔的值是纯文本格式的表格数据格式, 可以轻松地导入电子表格应用程序中, [Mjumbe Poe](https://github.com/mjumbewu) 维护 [djangorestframework-csv](https://github.com/mjumbewu/django-rest-framework-csv) 软件包, 该软件包为 REST 框架提供 CSV 渲染器支持。

#### UltraJSON

`UltraJSON` 是经过优化的 `C JSON` 编码器, 可以显着加快 JSON 渲染速度, [Jacob Haslehurst](https://github.com/hzy) 维护了 [drf-ujson-renderer](https://github.com/gizmag/drf-ujson-renderer) 软件包, 该软件包使用 UJSON 软件包实现 JSON 呈现。

#### Pandas (CSV, Excel, PNG)

[Django REST Pandas](https://github.com/wq/django-rest-pandas) 提供了序列化器和渲染器, 它们支持通过 [Pandas DataFrame API](https://pandas.pydata.org/) 进行其他数据处理和输出, `Django REST Pandas` 包括用于 `Pandas` 样式 `CSV` 文件、`Excel`工作簿(包括 `.xls` 和 `.xlsx`)以及许多其他格式的渲染器, 它由 [S. Andrew Sheppard](https://github.com/sheppard) 作为 [wq Project](https://github.com/wq) 的一部分进行维护。

#### LaTeX

[Rest Framework Latex](https://github.com/mypebble/rest-framework-latex) 提供了一个渲染器, 该渲染器使用 `Laulatex` 输出 `PDF`, 它由 [Pebble (S/F Software)](https://github.com/mypebble) 维护。
