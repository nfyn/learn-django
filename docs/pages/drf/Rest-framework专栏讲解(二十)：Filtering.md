# Rest-framework专栏讲解(二十)：Filtering

框架的通用列表视图的默认行为是返回模型管理器的整个查询集, 通常你会希望你的 API 限制查询集返回的项目。

筛选 `GenericAPIView` 子类的任何视图的查询集的最简单方法是覆盖该 `.get_queryset()`方法。

通过覆盖此方法, 您可以通过多种不同方式自定义视图返回的查询集。

### 针对当前用户的过滤查询

您可能希望过滤查询集, 以确保仅返回与发出请求的当前经过身份验证的用户相关的结果。

您可以根据的值进行过滤 `request.user`：

```python
from myapp.models import Purchase
from myapp.serializers import PurchaseSerializer
from rest_framework import generics

class PurchaseList(generics.ListAPIView):
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Purchase.objects.filter(purchaser=user)
复制代码
```

### 根据网址过滤

另一种过滤方式可能涉及基于 URL 的某些部分限制查询集。

例如如果您的 URL 配置包含这样的条目：

```python
re_path('^purchases/(?P<username>.+)/$', PurchaseList.as_view()),
复制代码
```

然后您可以编写一个视图, 该视图返回按 URL 的用户名部分过滤的购买查询集：

```python
class PurchaseList(generics.ListAPIView):
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        username = self.kwargs['username']
        return Purchase.objects.filter(purchaser__username=username)
复制代码
```

### 根据查询参数过滤

过滤初始查询集的最后一个示例是根据 url 中的查询参数确定初始查询集。

我们可以重写 `.get_queryset()` 以处理诸如的 URL `http://example.com/api/purchases?username=denvercoder9`, 仅 `username` 在 URL 中包含参数时才过滤查询集：

```python
class PurchaseList(generics.ListAPIView):
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Purchase.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(purchaser__username=username)
        return queryset
复制代码
```

### 通用过滤

框架不仅可以覆盖默认查询集而且还支持通用过滤后端, 使您可以轻松构建复杂的搜索和过滤器。

通用过滤器还可以将自己显示为可浏览 API 和 admin API 中的 HTML 控件。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d0aa73f851b405aa24ede11e0ff808c~tplv-k3u1fbpfcp-watermark.image)

### 设置过滤器后端

可以使用该 `DEFAULT_FILTER_BACKENDS` 参数全局设置默认过滤器后端, 例如：

```python
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}
复制代码
```

您还可以使用基于 `GenericAPIView` 类的视图的视图或每个视图集设置过滤器后端：

```python
import django_filters.rest_framework
from django.contrib.auth.models import User
from myapp.serializers import UserSerializer
from rest_framework import generics

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
复制代码
```

### 过滤和对象查找

请注意如果为视图配置了过滤器后端, 则该过滤器后端不仅用于过滤列表视图, 还将用于过滤用于返回单个对象的查询集。

例如给定上一个示例以及 `id=4675` 的产品, 以下 URL 将返回相应的对象, 或者返回 `404` 响应, 具体取决于给定产品实例是否满足过滤条件：

```url
http://example.com/api/products/4675/?category=clothing&max_price=10.00
复制代码
```

### 覆盖初始查询集

请注意您可以同时使用覆盖 `.get_queryset()` 过滤和通用过滤, 一切都会按预期进行, 例如如果 `Product` 与 `User` 为的多对多关系, 映射字段是 `purchase`, 则可能需要编写如下视图：

```python
class PurchasedProductsList(generics.ListAPIView):
    """
    Return a list of all the products that the authenticated
    user has ever purchased, with optional filtering.
    """
    model = Product
    serializer_class = ProductSerializer
    filterset_class = ProductFilter

    def get_queryset(self):
        user = self.request.user
        return user.purchase_set.all()
复制代码
```

### DjangoFilterBackend

该 `django-filter` 库包含一个 `DjangoFilterBackend` 类, 该类支持针对框架的高度可自定义的字段筛选。

要使用 `DjangoFilterBackend` 请先安装 `django-filter`：

```shell
python -m pip install django-filter
复制代码
```

然后添加 `'django_filters'` 到 Django 的 `INSTALLED_APPS`：

```python
INSTALLED_APPS = [
    ...
    'django_filters',
    ...
]
复制代码
```

现在您应该将过滤器后端添加到您的设置中：

```python
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}
复制代码
```

或将过滤器后端添加到单个 View 或 ViewSet：

```python
from django_filters.rest_framework import DjangoFilterBackend

class UserListView(generics.ListAPIView):
    ...
    filter_backends = [DjangoFilterBackend]
复制代码
```

如果只需要简单的基于等式的过滤, 则可以在视图或视图集上设置一个 `filterset_fields` 属性并列出要过滤的字段集：

```python
class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'in_stock']
复制代码
```

这将自动为给定的字段创建一个 `FilterSet` 类并允许您发出如下请求：

```url
http://example.com/api/products?category=clothing&in_stock=True
复制代码
```

对于更高级的过滤要求您可以指定视图应使用的 `FilterSet` 类, 您可以在 [`django-filter`](https://django-filter.readthedocs.io/en/latest/index.html) 文档中阅读有关 `FilterSet` 的更多信息, 还建议您阅读有关[ DRF 集成](https://django-filter.readthedocs.io/en/latest/guide/rest_framework.html)的部分。

### SearchFilter

该 `SearchFilter` 级支持简单单的查询参数基于搜索和基于该 admin 界面的搜索功能。

使用时可浏览的 API 将包含一个 `SearchFilter` 控件：

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ae6e308b7344f2da29966a952d26081~tplv-k3u1fbpfcp-watermark.image)

`SearchFilter` 类仅在视图具有 `search_fields` 属性集的情况下应用, 该 `search_fields` 属性应该是模型上文本类型字段名称的列表, 例如 `CharField` 或 `TextField`：

```python
from rest_framework import filters

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']
复制代码
```

这将允许客户端通过执行以下查询来过滤列表中的项目：

```url
http://example.com/api/users?search=russell
复制代码
```

您还可以使用查找 API 双下划线表示法在 `ForeignKey` 或 `ManyToManyField` 上执行相关查找：

```python
search_fields = ['username', 'email', 'profile__profession']
复制代码
```

对于 `JSONField` 和 `HStoreField` 字段, 您可以使用相同的双下划线符号根据数据结构内的嵌套值进行过滤(就是高级)：

```python
search_fields = ['data__breed', 'data__owner__other_pets__0__name']
复制代码
```

默认情况下搜索将使用不区分大小写的部分匹配, 搜索参数可以包含多个搜索词, 应将其用 `空格` 和 `/` 或 `逗号` 分隔, 如果使用多个搜索词则仅当所有提供的词都匹配时对象才会在列表中返回。

可以通过在 `search_fields` 字符前面添加各种字符来限制搜索行为：

- `'^'` 开始搜索
- `'='` 完全匹配
- `'@'` 全文搜索(当前仅支持 Django 的 PostgreSQL 后端)
- `'$'` 正则表达式搜索

例如：

```python
search_fields = ['=username', '=email']
复制代码
```

默认情况下搜索参数名为 `'search'`, 但是此参数可能会被 `SEARCH_PARAM` 设置覆盖。

要根据请求内容动态更改搜索字段, 可以对进行 `SearchFilter` 子类化并覆盖该 `get_search_fields()` 函数, 例如以下子类仅在查询参数 `title_only` 在请求中时才搜索 `title`：

```python
from rest_framework import filters

class CustomSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        if request.query_params.get('title_only'):
            return ['title']
        return super(CustomSearchFilter, self).get_search_fields(view, request)
复制代码
```

有关更多详细信息请参见[Django文档](https://docs.djangoproject.com/en/stable/ref/contrib/admin/#django.contrib.admin.ModelAdmin.search_fields)。

### OrderingFilter

`OrderingFilter` 类支持查询结果简单的查询参数进行顺序控制。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79aadc20a9e64934b3a29995ce4dcf95~tplv-k3u1fbpfcp-watermark.image)

默认情况下查询参数名为 `'ordering'`, 但这可以被 `ORDERING_PARAM` 设置覆盖。

例如按用户名排序用户：

```url
http://example.com/api/users?ordering=username
复制代码
```

客户端还可以通过在字段名称前添加 `-` 来指定相反的顺序, 如下所示：

```url
http://example.com/api/users?ordering=-username
复制代码
```

也可以指定多个顺序：

```python
http://example.com/api/users?ordering=account,username
复制代码
```

建议您明确指定 API 应在排序过滤器中允许的字段, 您可以通过在视图上设置 `ordering_fields` 属性来做到这一点, 如下所示：

```python
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['username', 'email']
复制代码
```

这有助于防止意外的数据泄漏, 例如允许用户针对密码哈希字段或其他敏感数据进行排序。

如果未在视图上指定 `ordering_fields` 属性, 则过滤器类将默认为允许用户对 `serializer_class` 属性指定的序列化器上的任何可读字段进行过滤。

如果您确信该视图使用的查询集不包含任何敏感数据, 则还可以通过使用 `__all__` 值明确指定一个视图应允许对任何模型字段或查询集聚合进行排序。

```python
class BookingsListView(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = '__all__'
复制代码
```

如果在视图上设置了 `ordering` 属性它将用作默认顺序。

通常您可以通过 `order_by` 在初始查询集上进行设置来控制此操作, 但是使用 `ordering` 视图上的参数可以指定顺序, 然后将其作为上下文自动传递到呈现的模板, 如果使用列标题对结果进行排序, 则可以自动呈现不同的列标题：

```python
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['username', 'email']
    ordering = ['username']
复制代码
```

该 `ordering` 属性可以是字符串，也可以是字符串列表、字符串元组。

### 自定义

您还可以提供自己的通用过滤后端或编写供其他开发人员使用的可安装应用。

为此请重写 `BaseFilterBackend` 并重写 `.filter_queryset(self, request, queryset, view)` 方法, 该方法应返回一个经过过滤的新查询集。

除了允许客户端执行搜索和过滤外, 通用过滤器后端对于限制对任何给定请求或用户应可见的对象也很有用。

例如您可能需要限制用户只能看到他们创建的对象：

```python
class IsOwnerFilterBackend(filters.BaseFilterBackend):
    """
    Filter that only allows users to see their own objects.
    """
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(owner=request.user)
复制代码
```

我们可以通过覆盖 `get_queryset()` 视图来实现相同的行为, 但是使用过滤器后端可以使您更轻松地将此限制添加到多个视图, 或者将其应用于整个 API。

#### 定制过滤界面

通用过滤器还可以在可浏览的 API 中提供接口, 为此您应该实现一个 `to_html()` 方法, 该方法返回过滤器的呈现的 HTML 表示形式, 此方法应具有以下签名：

```
to_html(self, request, queryset, view)
```

该方法应返回呈现的 HTML 字符串。

#### 分页和模式

您还可以通过实现一种 `get_schema_fields()` 方法, 使过滤器控件可用于框架提供的模式自动生成, 此方法应具有以下签名：

```
get_schema_fields(self, view)
```

该方法应返回 `coreapi.Field` 实例列表。

### 第三方库

##### Django REST框架过滤器软件包

在 [Django 框架过滤器](https://github.com/philipn/django-rest-framework-filters)封装与 `DjangoFilterBackend` 类一起工作, 并允许您轻松地在跨关系的创建过滤器, 或在指定字段创建多个过滤器查找类型。

##### Django REST框架全字搜索过滤器

[djangorestframework-word-filter](https://github.com/trollknurr/django-rest-framework-word-search-filter)作为 `filter.SearchFilter` 替代品, 它将在文本中搜索完整的单词或完全匹配。

##### Django URL过滤器

[`django-url-filter`](https://github.com/miki725/django-url-filter) 提供了一种通过友好的 url 过滤数据的安全方法, 它的工作原理与 DRF 序列化程序和字段非常相似, 在某种意义上它们可以嵌套, 但它们被称为 `filtersets`和 `filters`, 这提供了过滤相关数据的简单方法, 而且这个库也是通用的, 所以它可以用来过滤其他数据源, 而不仅仅是 Django `QuerySet`。

##### drf-url-filters

[`DRF-URL-Filters`](https://github.com/manjitkumar/drf-url-filters) 是一个简单的 Django 应用程序, 它以干净、简单和可配置的方式在 `drfmodelviewset` 的 `Queryset` 上应用过滤器, 它还支持对传入查询参数的验证, 一个漂亮的 python 包 `Voluptuous` 用于对传入的查询参数进行验证, 关于 `Voluptuous` 的最好的部分是您可以根据查询参数要求定义自己的验证。
