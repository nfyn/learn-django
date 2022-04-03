# Rest-framework专栏讲解(三)：Generic view

### GenericAPIView

了解到 `APIView` 之后, 你可以尝试看下 `GenericAPIView` 的源码, 导入路径是：

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.generics import GenericAPIView
```

在源码中可以看到它是在 `APIView` 的一种拓展, 当你继承这个视图类撰写自定义视图的时候, 你可以获取以下几个属性：

- `queryset`：用于从该视图返回查询集对象, 必须设置此属性或重写 `get_queryset()` 方法, 如果要覆盖视图方法, 则必须进行调用 `get_queryset()` 而不是直接访问此属性
- `serializer_class`：用于验证输入和反序列化输出的序列化类, 必须设置此属性或重写 `get_serializer_class()` 方法。
- `lookup_field`：用于执行单个模型实例的对象查找的模型字段, 默认为 `pk`
- `lookup_url_kwarg`：用于对象查找的URL关键字参数

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework import serializers
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAdminUser
from models import User


class MedusaSerializer(serializers.Serializer):
    ...


class MedusaView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = MedusaSerializer
    permission_classes = [IsAdminUser]
```

当然, 可能在 `APIView` 上拓展了一些方法放我们的 API 撰写变得简单, 并且富有规范性, 但是相比较而言, 他的存在更加推荐和 `mixins` 一起使用,

- `perform_create(self, serializer)` - CreateModelMixin 保存新对象实例时调用
- `perform_update(self, serializer)` - UpdateModelMixin 保存现有对象实例时调用
- `perform_destroy(self, instance)` - DestroyModelMixin 删除对象实例时调用

例如你在新建实例对象进行保存处理的时候还需要做其他的处理, 你就可以在 `perform_create(self, serializer)` 中对它进行重写：

```python
def perform_create(self, serializer):
    instance = serializer.save()
    
    # 你需要做的其他处理的函数, 或者代码块
    ...
```

你也可以对更新的数据进行再次验证, 引发 `ValidationError()` 异常：

```python
def perform_update(self, serializer):
    if 1 == 1:
        raise ValidationError('我不管，我就是不让你更新。')
    serializer.save(user=self.request.user)
```

当然啦, 还有 `ListModelMixin` 来获取数据集合的, `RetrieveModelMixin` 来获取某一数据详情的, 大多数的请求方式和请求内容都已经概括了。

### ListModelMixin

提供了 `.list(request, *args, **kwargs)` 方法, 用于查询对象集合, 你也可以重写他的 `list` 方法实现你自己的返回体, 你也可以对他进行数据分页(**分页** 将会在以后讲解到), 当你查询成功了, 将会返回 `200 OK` 的状态码给你：

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAdminUser


class MedusaView(GenericAPIView, ListModelMixin):
    queryset = User.objects.all()
    serializer_class = MedusaSerializer
    permission_classes = [IsAdminUser]
```

### CreateModelMixin

提供 `.create(request, *args, **kwargs)` 方法, 该方法实现创建并保存模型的新实例对象, 如果成功创建对象则返回一个 `201 Created` 响应, 如果提供的用于创建对象的请求数据无效, 则会返回一个 `400 Bad Request` 响应, 并将错误详细信息作为响应的正文。

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAdminUser


class MedusaView(GenericAPIView, CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = MedusaSerializer
    permission_classes = [IsAdminUser]
```

### RetrieveModelMixin

提供 `.retrieve(request, *args, **kwargs)` 方法, 该方法实现在响应中返回现有模型实例的详情数据, 如果可以检索到对象, 则返回一个 `200 OK` 响应, 否则将返回 `404 Not Found`。

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import IsAdminUser


class MedusaView(GenericAPIView, RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = MedusaSerializer
    permission_classes = [IsAdminUser]
```

### UpdateModelMixin

提供 `.update(request, *args, **kwargs)` 方法, 该方法实现更新并保存现有模型的实例， 还提供了一种 `.partial_update(request, *args, **kwargs)` 方法, 该方法与该 `update` 方法类似, 但是用于更新的所有字段都是可选的, 这样可以支持 `HTTP PATCH` 请求(作者在实际开发中, 会对 `UpdateModelsMixin` 重新定义, 删除对 `HTTP PATCH` 请求方式的支持), 如果对象被更新, 它将返回一个 `200 OK` 响应, 如果提供的用于更新对象的请求数据无效, 则会返回 `400 Bad Request` 响应, 并将错误详细信息作为响应的主体。

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAdminUser


class MedusaView(GenericAPIView, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = MedusaSerializer
    permission_classes = [IsAdminUser]
复制代码
```

### DestroyModelMixin

提供 `.destroy(request, *args, **kwargs)` 方法, 该方法实现删除现有模型实例, 如果删除对象成功则返回 `204 No Content` 响应, 否则将返回 `404 Not Found`。

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import DestroyModelMixin
from rest_framework.permissions import IsAdminUser


class MedusaView(GenericAPIView, DestroyModelMixin):
    queryset = User.objects.all()
    serializer_class = MedusaSerializer
    permission_classes = [IsAdminUser]
```

### 组合的视图类

- `CreateAPIView`
   用于仅创建新模型实例对象的视图
   提供 `POST` 请求方式
   依赖：`GenericAPIView`, `CreateModelMixin`
- `ListAPIView`
   用于仅只读模型实例对象集合数据的视图
   提供 `GET` 请求方式
   依赖：`GenericAPIView`, `ListModelMixin`
- `RetrieveAPIView`
   用于仅只读单个模型实例对象的视图
   提供 `GET` 请求方式
   依赖：`GenericAPIView`, `RetrieveModelMixin`
- `DestroyAPIView`
   用于仅删除单个模型实例对象的视图
   提供 `DELETE` 请求方式
   依赖：`GenericAPIView`, `DestroyModelMixin`
- `UpdateAPIView`
   用于仅对已有模型实例进行修改的视图
   提供 `PUT` 和 `PATCH` 请求方式
   依赖：`GenericAPIView`, `UpdateModelMixin`
- `ListCreateAPIView`
   用于对模型实例对象集读取和写入的视图
   提供 `GET` 和 `POST` 请求方式
   依赖：`GenericAPIView`, `ListModelMixin`, `CreateModelMixin`
- `RetrieveUpdateAPIView`
   用于对单个模型实例的读取和更新的视图
   提供 `GET`、 `PUT` 和 `PATCH` 请求方式
   依赖：`GenericAPIView`, `RetrieveModelMixin`, `UpdateModelMixin`
- `RetrieveDestroyAPIView`
   用于对单个模型实例的读取和删除的视图
   提供 `GET` 和 `DELETE` 请求方式
   依赖：`GenericAPIView`, `RetrieveModelMixin`, `DestroyModelMixin`
- `RetrieveUpdateDestroyAPIView`
   用于对单个模型实例的读取、更新和删除的视图
   提供 `GET`、`PUT`、`PATCH` 和 `DELETE` 请求方式
   依赖：`GenericAPIView`, `RetrieveModelMixin`, `UpdateModelMixin`, `DestroyModelMixin`
