# Rest-framework专栏讲解(五)：Request

框架的 `request` 给予了很标准的属性, 并拓展了标准 `HTTPRequest` 对象, 你会在开发中很方便的使用它。

### .data

在 `request.data` 中你可以很方便的获取客户端传递给你的 json 数据或者表单提交, 不需要像 `request.POST.get()` 一样很麻烦的操作, 并且能解析文件传输。

```python
def update(self, request, *args, **kwargs):
    if request.data.get('params') == True:
        ...
复制代码
```

### .query_params

在 `GET` 请求中, `query_params` 的命名方式才更加凸显传参的方式, 当然, `request.query_params.get('params')` 和 `request.GET.get('params')` 是等价的。

### .user

在你已认证的情况下, 访问该属性得到的是你用户模型的一个实例对象, 你可以通过 `request.user.id` 的方式获取用户 ID 属性, 但在未验证, 或者未通过验证的情况下该属性返回的是 `django.contrib.auth.models.AnonymousUser` 的一个实例对象。

### .auth

这个属性在验证通过的情况下返回的是验证用户的令牌实例, 否则则是 `None`, 他的值取决于身份验证的策略。

### .method

该属性能返回请求方式的大写字符串, 如 `GET`。

在请求中, 如果不需要重写框架的方法, 或者实现自定义返回数据、校验等, 这些属性一般是不会被使用到的。
