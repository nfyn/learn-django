# Rest-framework专栏讲解(九)：Parsers

### 配置响应数据格式

在使用 `restframework` 框架的时候我们需要设置返回的数据为 `JSON` 格式就需要在 `Django` 项目的 `settings.py` 中做如下配置：

```python
REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ]
}
复制代码
```

或者是你在单个试图中这样配置：

```python
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

class ExampleView(APIView):
    """
    A view that can accept POST requests with JSON content.
    """
    parser_classes = [JSONParser]

    def post(self, request, format=None):
        return Response({'received data': request.data})
复制代码
```

再或者你使用装饰器的方式, 就可以这样进行数据配置：

```python
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser

@api_view(['POST'])
@parser_classes([JSONParser])
def example_view(request, format=None):
    """
    A view that can accept POST requests with JSON content.
    """
    return Response({'received data': request.data})
复制代码
```

### 数据类型封装类参考

| 数据类             | `.media_type` 类型                  | 说明                                                         |
| ------------------ | ----------------------------------- | ------------------------------------------------------------ |
| `JSONParser`       | `application/json`                  | 解析 JSON 请求                                               |
| `FormParser`       | `application/x-www-form-urlencoded` | 解析 HTML 表单内容, 通常情况你会将他和 `MultiPartParser` 一起使用, 以便于视图能完全支持表单提交数据 |
| `MultiPartParser`  | `multipart/form-data`               | 通常和 `FormParser` 一起使用, 完全支持表单提交数据           |
| `FileUploadParser` | `*/*`                               | 上传文件的视图解析数据, 如果你在 URL 指定关键字参数 `filename` 则会使用该对象明明上传文件, 否则需要在 headers 指定 `Content-Disposition` 属性值 |

`FileUploadParser` 将会遵守 Django 标准的 `FILE_UPLOAD_HANDLERS` 设置和 `request.upload_handlers` 属性, 所以在使用的的时候你可以这样：

```python
# views.py
class FileUploadView(views.APIView):
    parser_classes = [FileUploadParser]

    def put(self, request, filename, format=None):
        file_obj = request.data['file']
        # ...
        # do some stuff with uploaded file
        # ...
        return Response(status=204)

# urls.py
urlpatterns = [
    # ...
    url(r'^upload/(?P<filename>[^/]+)$', FileUploadView.as_view())
]
复制代码
```

### 第三方组件

#### YAML 支持

```shell
python3 -m pip install djangorestframework-yaml
复制代码
```

此时数据以 YAML 语法作为支持和返回, 需要你在 `settings.py` 中做如下配置：

```python
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

#### XML 支持

```shell
python3 -m pip install djangorestframework-xml
复制代码
```

此时数据以 XML 语法作为支持和返回, 需要你在 `settings.py` 中做如下配置:

```python
REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework_xml.parsers.XMLParser',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework_xml.renderers.XMLRenderer',
    ],
}
```
