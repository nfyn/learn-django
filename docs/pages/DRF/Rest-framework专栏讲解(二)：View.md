# Rest-framework专栏讲解(二)：View

在我们了解的 `MVC` 模式和 `MVT` 模式中, 都有提到 `View` 视图, 它是提供接口服务和逻辑的代码, 例如在 Django 项目中经常会定义各种 `class UserLoginViewSet(...)` 或者是 `def user_login(request, *args, **kwargs)`, 这类的都是后端服务定义的视图类或者函数, 在 URL 对象中注册他们, 就可以实现一个逻辑 API 接口。

### APIView

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from django.views import View

class MedusaView(View):
    ...
复制代码
```

第一次接触到 Django 框架的时候知道的视图类, 我们在定义一个视图类的时候仅仅需要继承它, 当你需要实现 `GET` 请求的时候, 你就在你定义的 class 里面实现 `def get(self, request, *args, **kwargs)` 方法, 当然 `POST`、`DELETE`、`PUT`等方法都一样, 只要你在试图里定义它, 并返回一个 Response 对象给他。
 但是使用 rest-framework 的时候, 我们都会使用 `APIView` 的继承父类,

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.views import APIView

class MedusaViewSet(APIView):
    ...
```

如果你去看了 `APIView` 的定义, 不难发现它也是继承了 `View` 实现的, 但是在 `View` 的基础上拓展了很多方法(功能), 我们在定义视图的时候更加方便的获取我们需要的数据, 返回我们需要数据。
 并且任何 `exceptions` 的异常信息都会以一种响应状态码的方式返回, 你也可以重写 `handle_exception(self, exc)` 方法进行自定义错误处理函数响应。
 例如你在获取请求参数的时候可以用 `request.data.get("params")` 来获取 `json` 请求参数体, 你也可以通过 `request.query_params.get("params")` 来获取 URL 参数, 等价于 `request.GET.get("params")`, 具体会在 **Request** 章节讲到。

### api_view

如果你习惯了函数视图的方式, 也给予了你装饰器修饰函数的方式：

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.decorators import api_view


@api_view(['GET'])
def medusa_view(request):
    ...
```

当然, 作者还是认为类视图更加具有规范性。

### 示例

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework import views, response, status


class Medusa(views.APIView):

    def get(self, request, *args, **kwargs):
        return response.Response({'detail': 'get'}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        return response.Response({'detail': 'post'}, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        return response.Response({'detail': 'delete'}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        return response.Response({'detail': 'put'}, status=status.HTTP_200_OK)
```
