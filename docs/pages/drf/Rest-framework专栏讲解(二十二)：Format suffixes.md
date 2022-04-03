# Rest-framework专栏讲解(二十二)：Format suffixes

Web API 的一个常见模式是在 url 上使用文件扩展名来为给定的媒体类型提供端点, 例如 `http://example.com/api/users.json` 来提供 JSON 表示。

为 API 的 URLconf 中的每个单独的条目添加格式后缀模式是容易出错的, 并且不是 DRY, 因此框架提供了将这些模式添加到 URLConf 的快捷方式。

### format_suffix_patterns

签名：`format_suffix_patterns(urlpatterns, suffix_required=False, allowed=None)`

返回 URL 模式列表, 其中包括附加到所提供的每个 URL 模式的格式后缀模式。

参数：

- `urlpatterns`：必需, URL 模式列表
- `suffix_required`：可选布尔值, 指示 URL 中的后缀是可选或必需, 默认为`False` 表示默认后缀为可选
- `allowed`：可选, 有效格式后缀的列表或元组, 如果未提供将使用通配符格式的后缀模式

例：

```python
from rest_framework.urlpatterns import format_suffix_patterns
from blog import views

urlpatterns = [
    path('', views.apt_root),
    path('comments/', views.comment_list),
    path('comments/<int:pk>/', views.comment_detail)
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
复制代码
```

使用 `format_suffix_patterns` 时, 必须确保将 `'format'` 关键字参数添加到相应的视图中, 例如：

```python
@api_view(['GET', 'POST'])
def comment_list(request, format=None):
    # do stuff...
复制代码
```

或使用基于类的视图：

```python
class CommentList(APIView):
    def get(self, request, format=None):
        # do stuff...

    def post(self, request, format=None):
        # do stuff...
复制代码
```

可以使用 `FORMAT_SUFFIX_KWARG` 设置来修改所使用的 `kwarg` 的名称。

另请注意 `format_suffix_patterns` 它不支持降序到 includeURL 模式。

如果使用 Django 提供的 `i18n_patterns` 函数, 以及 `format_suffix_patterns`, 则应确保将 `i18n_patterns` 函数应用为最终函数或最外层函数, 例如：

```python
url patterns = [
    …
]

urlpatterns = i18n_patterns(
    format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
)
复制代码
```

### 查询参数格式

格式后缀的替代方法是在查询参数中包含请求的格式, 框架在默认情况下提供了这个选项, 并且在可浏览 API 中用于在不同的可用表示形式之间切换。

要使用其简短格式选择表示形式, 请使用 `format` 参数, 例如：`http://example.com/organizations/?format=csv`。

可以使用 `URL_FORMAT_OVERRIDE` 设置修改此查询参数的名称, 将该值设置为 `None` 可禁用此行为。

### 接受标头与格式后缀

在某些 Web 社区中似乎有人认为文件扩展名不是 RESTful 模式, 而应该始终使用 `HTTP Accept` 标头。

这实际上是一种误解, 例如引用 `Roy Fielding` 的话, 其中讨论了查询参数媒体类型指标与文件扩展名媒体类型指标的相对优点：

“That's why I always prefer extensions. Neither choice has anything to do with REST.” — Roy Fielding。

[REST讨论邮件列表](https://groups.yahoo.com/neo/groups/rest-discuss/conversations/topics/14844)

这段引文没有提到 `Accept headers`, 但它明确表示格式后缀应该被视为可接受的模式。
