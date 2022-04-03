# Rest-framework专栏讲解(八)：ViewSet

Django 项目的 **ORM(Object Relational Mapping, 对象关系映射)** 可以给我们省略构造 SQL 查询语句的麻烦, 但是对于试图, 我们已经构建了 Model 的情况下依旧需要创造一些逻辑代码, 那已知这些封装, 我们可以再对代码简化。

### ViewSet 操作

在标准的接口中, 提供了标准的创建/检索/更新/删除实例对象的路由, 如：

```python
class UserViewSet(viewsets.ViewSet):
    """
    Example empty viewset demonstrating the standard
    actions that will be handled by a router class.

    If you're using format suffixes, make sure to also include
    the `format=None` keyword argument for each action.
    """

    def list(self, request):
        pass

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        # 不常用
        pass

    def destroy(self, request, pk=None):
        pass
复制代码
```

在分发期间你可以使用以下属性：

- `basename`：用于创建 URL 的基础名称
- `action`：当前操作的动作名称字符串(如 `list`)
- `detail`：是否返回列表/详情信息的布尔值
- `suffix`：视图集类型的显示后缀
- `name`：视图集的显示名称, 会与 `suffix` 参数互斥
- `description`：单个试图的显示描述

### API参考

`ViewSet` 集成自 `APIView`, 你可以使用任何标准属性获取数值帮助 API 构建, 如 `permission_classes`, `authentication_classes` 来帮助试图控制访问策略。

`GenericViewSet` 是继承自 `GenericAPIView`, 并提供了 `get_object` 和 `get_queryset` 的方法以及其他视图行为的方法。

`ModelViewSet` 是继承自 `GenericAPIView`, 并支持 `.list()`, `.retrieve()`, `.create()`, `.update()`, `.partial_update()` 和 `.destroy()` 方法的视图类, 通常你需要指定 `queryset` 和 `serializer_class` 两个属性。

`ReadOnlyModelViewSet` 时继承自`GenericAPIView`, 并支持 `.list()`, `.retrieve()` 的只读视图类, 通常你需要指定 `queryset` 和 `serializer_class` 两个属性。
