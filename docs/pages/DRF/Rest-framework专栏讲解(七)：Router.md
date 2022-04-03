# Rest-framework专栏讲解(七)：Router

在开发中我们会设计好符合 Restful 风格的 API, 那框架已经帮我们提供了这些快捷方式。

### SimpleRouter

在我们定义好了 `MedusaBlogViewSet` 的情况下, 我们注册 URL 的时候仅需要：

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'medusa/blog', MedusaBlogViewSet)
urlpatterns = router.urls
复制代码
```

`register()` 有两个强制性的参数：

- `prefix`：用于这组路由的 URL 前缀字符串, 用于路由匹配
- `viewset`：你定义的视图集

如果你的视图集实现了获取列表/获取详情/新增/删除/修改的方法, 那你定义路由将会解析成这样：

| URL 格式             | 请求方法 | 请求说明 | 视图集方法   |
| -------------------- | -------- | -------- | ------------ |
| `^medusa/blog$`      | `GET`    | 获取列表 | `list()`     |
| `^medusa/blog/{pk}$` | `GET`    | 获取详情 | `retrieve()` |
| `^medusa/blog$`      | `POST`   | 新增     | `create()`   |
| `^medusa/blog/{pk}$` | `PUT`    | 更新     | `update()`   |
| `^medusa/blog/{pk}$` | `DELETE` | 删除     | `destroy()`  |

在你的视图集没有指定 `queryset` 属性或者自定义了 `get_queryset()` 方法的时候, 你可能会看到这样一条错误信息：

```python
'basename' argument not specified, and could not automatically determine the name from the viewset, as it does not have a '.queryset' attribute.
复制代码
```

所以你需要指定一个可选参数：`basename`, 默认情况下你不需要手动指定它的值, 它是创建 URL 名称的基础属性, 一般是用你指定的 `queryset` 属性值自动设置的。

默认情况下路由都需要添加 `/` 作为路由结尾, 你也可以修改该规则, 只需要修改参数 `trailing_slash=False` 即可：

```python
router = SimpleRouter(trailing_slash=False)
复制代码
```

该路由器生成 URL 的方式： ![img](https://user-gold-cdn.xitu.io/2020/6/20/172d1d10a5ee9a7c?imageView2/0/w/1280/h/960/ignore-error/1)

### include

在上面的例子中, 我们使用了 `urlpatterns = router.urls` 的方式注册了路由对象, 我们通常会使用 `include` 进行路由注册, 在 Django 中可能有一些我们自定义的视图, 不需要使用 `SimpleRouter` 进行注册：

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from django.conf.urls import url
from django.urls import include
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'medusa/blog', MedusaBlogViewSet)

urlpatterns = [
    ...,  # 其他路由配置
    url(r'^', include(router.urls)),
]
复制代码
```

### 路由绑定其他操作

例如你的项目安排上, 安排关于用户模块是在配置的界面, 那么你的路由可能是这样的：

```url
/api/v1.0/configure/user
复制代码
```

那我对用户的配置可能有以下几个方法处理：

- `GET`：获取用户详情/列表
- `PUT`：修改用户信息
- `POST`：新增用户信息
- `DELETE`：删除用户信息

问题来了, 如果我不想创建一个新的关于用户的视图类, 但是我又想增加一个修改密码的 API 接口怎么办？ 如果你从事过其他产品 API 调度工作的时候, 你可能会浮现这样类型的接口：

```url
/api/v1.0/configure/user/1/reset
复制代码
```

很规范的接口方式, 那你在你的 ViewSet 里怎么体现呢？

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet


class UserViewSet(ModelViewSet):
    ...

    @action(methods=['post'], detail=True)
    def reset(self, request, pk=None):
        ...
复制代码
```

是的, 使用 `action` 装饰器装饰, 并指定参数即可, 默认情况下你生成的 URL 是根据你的函数名称生成了, 你也可以通过 `url_name` 和 `url_path` 制定路由的后缀名称, 也可以通过 `permission_classes` 来制定用户访问权限。

### DefaultRouter

这个路由器和 `SimpleRouter` 很类似, 但会包含一个默认的 API 根视图, 返回一个包含所有列表视图的超链接响应数据。 当然, 该路由的路径也会使用 `/` 结尾, 你可以用 `trailing_slash=False` 来弃用该规则：

```python
router = DefaultRouter(trailing_slash=False)
复制代码
```

该路由生成 URL 的方式： ![img](https://user-gold-cdn.xitu.io/2020/6/20/172d1d221056b008?imageView2/0/w/1280/h/960/ignore-error/1)

### 自定义路由器

其实在开发中这不是你使用路由器的最好方式, 但是在你需要自定义 URL 格式的时候使用这个方式将会变得很有效, 而实现自定义路由是将现有路由作为子类之一, 其 `.routes` 属性是 `Route` 的命名元组的列表数据, 功能是用于模板化将映射到每个视图集的 URL 模式。 `Route` 命名元祖的参数有：

- ```
  url
  ```

  ：代表需要路由的 URL 字符串, 你可能需要这样字符串

  - `"{prefix}"`：用于这组路由器的前缀字符串
  - `"{lookup}"`：用于单个实例匹配的字符串, 如ID
  - `"{trailing_slash}"`：根据 `trailing_slash` 参数制定结尾字符

- `mapping`：HTTP 方法名称到视图方法的映射

- ```
  name
  ```

  ：

  ```
  reverse
  ```

   呼叫用使用的 URL 名称,你可能需要这样的字符串

  - `"{basename}"`：用于创建 URL 名称的基础字符

- `initkwargs`：实例化视图需要的参数字典

其实以上文字内容是官方文档的描述内容加上我自己的理解装饰了一下, 但是看到这几行字的描述信息, 确实是不知道它的功能到底怎么样定义, 刚好看到某位大佬的博客, 参考并实践了一下：

> 附参考的博客地址：[www.cnblogs.com/liubiao/p/6…](https://www.cnblogs.com/liubiao/p/6567565.html)

### 自定义解析路线

在使用 `@action` 的时候你也可以自定义路由方式, `.routes` 的列表是包含 `DynamicRoute` 命名的元组, 将 `detail` 参数设置为适用于基于列表的路由和基于详细信息的路由, `DynamicRoute` 除了 `detail` 参数：

- `url`：一个代表路由 URL 的字符串, 可能会包含和 `Route` 相同格式的字符串, 并接受一个 `"{url_path}"` 格式的字符串

- ```
  name
  ```

  ：

  ```
  reverse
  ```

   呼叫中使用的 URL 名称, 你可能需要以下格式的字符串：

  - `"{basename}"`：用于创建 URL 的名称基础
  - `"{url_name}"`：提供给 `@action` 的 `url_name`

- `initkwargs`：实例化试图需要的参数字典

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework.routers import Route, DynamicRoute, SimpleRouter


class CustomReadOnlyRouter(SimpleRouter):
    """
    A router for read-only APIs, which doesn't use trailing slashes.
    """
    routes = [
        Route(
            url=r'^{prefix}$',
            mapping={'get': 'list'},
            name='{basename}-list',
            detail=False,
            initkwargs={'suffix': 'List'}
        ),
        Route(
            url=r'^{prefix}/{lookup}$',
            mapping={'get': 'retrieve'},
            name='{basename}-detail',
            detail=True,
            initkwargs={'suffix': 'Detail'}
        ),
        DynamicRoute(
            url=r'^{prefix}/{lookup}/{url_path}$',
            name='{basename}-{url_name}',
            detail=True,
            initkwargs={}
        )
    ]
```
