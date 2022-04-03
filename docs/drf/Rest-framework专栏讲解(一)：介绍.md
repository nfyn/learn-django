# Rest-framework专栏讲解(一)：介绍

当你作为一个 WEB 项目的开发人员的时候, 开发标准的 REST 接口, 这时候就需要它的帮助了, 官方对它是这样描述的： ![img](https://user-gold-cdn.xitu.io/2020/6/13/172ae0c7710d1b94?imageView2/0/w/1280/h/960/ignore-error/1)

### 安装

在 Python 环境中我们使用 PIP 安装：

```shell
pip install djangorestframework
pip install markdown
pip install django-filter
复制代码
```

### Django 配置

你需要在你的 Django 项目的 `settings.py` 中注册：

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
复制代码
```

### 官方示例

```python
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```
