# Rest-framework专栏讲解(十八)：Caching

### 将 cache 与 APIview 和 viewset 一起使用

Django提供了一个 [`method_decorator`](https://docs.djangoproject.com/en/dev/topics/class-based-views/intro/#decorating-the-class) 来使用基于类的视图的装饰器, 这可以与其他缓存装饰器一起使用，例如 [`cache_page`](https://docs.djangoproject.com/en/dev/topics/cache/#the-per-view-cache) 和 [`vary_on_cookie`](https://docs.djangoproject.com/en/dev/topics/http/decorators/#django.views.decorators.vary.vary_on_cookie)。

```python
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets


class UserViewSet(viewsets.ViewSet):

    # Cache requested url for each user for 2 hours
    @method_decorator(cache_page(60*60*2))
    @method_decorator(vary_on_cookie)
    def list(self, request, format=None):
        content = {
            'user_feed': request.user.get_user_feed()
        }
        return Response(content)


class PostView(APIView):

    # Cache page for the requested url
    @method_decorator(cache_page(60*60*2))
    def get(self, request, format=None):
        content = {
            'title': 'Post title',
            'body': 'Post content'
        }
        return Response(content)
复制代码
```

注意：`cache_page decorator` 只缓存状态为 `200` 的 `GET` 和 `HEAD` 响应。
