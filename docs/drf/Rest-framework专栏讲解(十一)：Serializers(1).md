# Rest-framework专栏讲解(十一)：Serializers(1)

序列化对象是对检索数据或者请求数据判断的最好方式, 省略了繁琐的请求数据的判断以及返回响应数据的遍历。

### Serializer

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from datetime import datetime

from rest_framework import serializers, settings


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    blog = serializers.URLField(max_length=200)
    created = serializers.DateTimeField()


class User:
    def __init__(self, username, blog, created=None):
        self.username = username
        self.blog = blog
        self.created = created or datetime.now()


if __name__ == '__main__':
    settings.settings.configure()

    user = User(username='MedusaSorcerer', blog='https://juejin.im/user/2805609406139950')
    serializer = UserSerializer(user)
    print(serializer.data)
复制代码
```

在上面的代码块中定义了一个用户序列化类, 此时又定义了一个仿造 `ORM` 的用户类, 并将 `User` 的实例对象 `user` 传递给序列化的 `data` 参数, 将可以生成一个序列化对象, 打印序列化对象的 `.data` 属性可以获得以下数据：

```python
{'username': 'MedusaSorcerer', 'blog': 'https://juejin.im/user/2805609406139950', 'created': '2020-08-10T09:58:35.754067'}
复制代码
```

你可以继续将数据渲染成 `JSON` 对象：

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from datetime import datetime

from rest_framework import serializers, settings


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    blog = serializers.URLField(max_length=200)
    created = serializers.DateTimeField()


class User:
    def __init__(self, username, blog, created=None):
        self.username = username
        self.blog = blog
        self.created = created or datetime.now()


if __name__ == '__main__':
    settings.settings.configure()
    from rest_framework.renderers import JSONRenderer

    user = User(username='MedusaSorcerer', blog='https://juejin.im/user/2805609406139950')
    serializer = UserSerializer(user)
    print(JSONRenderer().render(serializer.data))
复制代码
```

> 注意在使用脚本执行的时候调用 `settings.settings.configure()` 获取配置信息的位置

运行完成你可以获得字符：

```python
b'{"username":"MedusaSorcerer","blog":"https://juejin.im/user/2805609406139950","created":"2020-08-10T10:03:36.741946"}'
复制代码
```

### 反序列化

```
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from datetime import datetime
import io

from rest_framework import serializers, settings


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    blog = serializers.URLField(max_length=200)
    created = serializers.DateTimeField()


class User:
    def __init__(self, username, blog, created=None):
        self.username = username
        self.blog = blog
        self.created = created or datetime.now()


if __name__ == '__main__':
    settings.settings.configure()
    from rest_framework.parsers import JSONParser

    json = b'{"username":"MedusaSorcerer","blog":"https://juejin.im/user/2805609406139950","created":"2020-08-10T10:03:36.741946"}'
    stream = io.BytesIO(json)
    data = JSONParser().parse(stream)
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        print(serializer.validated_data)
    else:
        print(serializer.errors)
复制代码
```

将保存的序列化数据反序列化一样可以实现, 注意的是在你反序列的时候需要执行 `.is_valid()` 来判断数据是否符合序列化类声明的对象约束, 如果返回的是 `False` 的话说明序列化对象不是符合声明对象的那样, 在返回 `True` 的时候就可以用 `serializer.validated_data` 获取序列化的数据：

```python
rderedDict([('username', 'MedusaSorcerer'), ('blog', 'https://juejin.im/user/2805609406139950'), ('created', datetime.datetime(2020, 8, 10, 10, 3, 36, 741946))])
复制代码
```

那不符合约束的情况就可以用 `serializer.errors` 获取错误信息：

```error
django.core.exceptions.AppRegistryNotReady: The translation infrastructure cannot be initialized before the apps registry is ready. Check that you don't make non-lazy gettext calls at import time.
复制代码
```

事实上在开发中返回的错误信息是一个字典对象, key 是出现错误的字段字符串, value 是出现不符合约束的描述列表, 由于没有在 Django 项目中运行, 所以出现了一个报错信息(忽略)。

### 保存实例

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from datetime import datetime

from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    blog = serializers.URLField(max_length=200)
    created = serializers.DateTimeField()

    def create(self, validated_data):
        return User(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.blog = validated_data.get('blog', instance.blog)
        instance.created = validated_data.get('created', instance.created)
        return instance


class User:
    def __init__(self, username, blog, created=None):
        self.username = username
        self.blog = blog
        self.created = created or datetime.now()
复制代码
```

如果你想使用验证后的数据返回一个新的实例对象, 你需要实现 `create` 或者 `update` 或者两个方法都实现。

在 Django-ORM 中你可能需要做一个保存数据的操作(ps: 实际开发中, 并不会这样操作, 很多操作都可以省略)：

```
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from datetime import datetime

from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    blog = serializers.URLField(max_length=200)
    created = serializers.DateTimeField()

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.blog = validated_data.get('blog', instance.blog)
        instance.created = validated_data.get('created', instance.created)
        instance.save()
        return instance
复制代码
```

保存实例或者更新实例的 `save()` 方法, 主要是看你是否在创建实例序列化对象是否传递了对象：

```python
# 没有传递实例对象, 所以这是新增
serializer = UserSerializer(data=data)

# 传递了一个 user 对象, 所以这是更新了 user 对象的数据
serializer = UserSerializer(user, data=data)
复制代码
```

### 验证数据

反序列化的时候你可以直接调用序列化实例对象的 `.is_valid()` 方法进行判断约束数据, 在开发中你也可以使用 `.is_valid(raise_exception=True)` 将错误信息返回给 API 调用者。

如果对一个字段需要特殊的判断, 你可以使用 `validate_<field_name>` 来进行逻辑判断, `<field_name>` 是你在序列化类中声明的字段名称。

ps：你可以将序列化类和 ORM 类联想, 但是概念完全不一样, 逻辑上很相似。

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers

class BlogPostSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    content = serializers.CharField()

    def validate_title(self, value):
        """
        对 title 字段进行判断
        """
        if 'medusa' not in value.lower():
            raise serializers.ValidationError("Blog post is not about Medusa")
        return value
复制代码
```

同时对多个字段进行逻辑判断：

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers


class BlogPostSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    content = serializers.CharField()
    start = serializers.IntegerField()
    finish = serializers.IntegerField()

    def validate(self, data):
        """
        判断传递的 start 和 finish 参数是否符合大小逻辑
        """
        if data['start'] > data['finish']:
            raise serializers.ValidationError("finish must occur after start")
        return data
复制代码
```

你也可以使用字段约束上直接声明你的判断：

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers


def multiple_of_ten(value):
    if value % 10 != 0:
        raise serializers.ValidationError('Not a multiple of ten')


class GameRecord(serializers.Serializer):
    score = serializers.IntegerField(validators=[multiple_of_ten])
    ...
复制代码
```

同时你可以声明完整字段验证器：

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator


class EventSerializer(serializers.Serializer):
    name = serializers.CharField()
    room_number = serializers.IntegerField(choices=[101, 102, 103, 201])
    date = serializers.DateField()

    class Meta:
        validators = [
            # 唯一性验证器
            UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['username', 'other']
            )
        ]
复制代码
```

### 访问实例和初始数据

当你将初始对象或查询集传递给序列化实例时, 该对象将变为可使用 `.instance` 属性获取对象, 如果没有传递初始对象, 则 `.instance` 属性值为 `None`。

将数据传递给序列化程序实例时, 未修改的数据将以 `.initial_data` 形式提供, 如果未传递 `data` 关键字参数, 则该 `.initial_data` 属性将不存在。

### 部分更新

默认情况下, 必须为所有声明的序列化字段传递对应的值, 否则序列化器会引发验证错误, 此时你可以使用 `partial` 参数来允许部分更新。

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers


class UpdateSerializer(serializers.Serializer):
    name = serializers.CharField()
    room_number = serializers.IntegerField(choices=[101, 102, 103, 201])
    date = serializers.DateField()


UpdateSerializer(user, data={'room_number': 101}, partial=True)
复制代码
```

### 序列化嵌套

如果一个序列化对象的属性是另一个序列化对象, 又要怎么处理？

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)


class CommentSerializer(serializers.Serializer):
    user = UserSerializer()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
复制代码
```

如果嵌套可以选择接受该 `None` 值，则应将 `required=False` 传递给嵌套序列化器：

```python
class CommentSerializer(serializers.Serializer):
    user = UserSerializer(required=False)
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
复制代码
```

如果嵌套序列对象是多条数据构成, 则应将 `many=True` 传递给嵌套序列化：

```python
class CommentSerializer(serializers.Serializer):
    user = UserSerializer(required=False)
    edits = EditItemSerializer(many=True)
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
复制代码
```

如果反序列化的数据无法通过约束, 那么会错误信息返回至构造字段中：

```python
serializer = CommentSerializer(data={'user': {'email': 'foobar', 'username': 'doe'}, 'content': 'baz'})
serializer.is_valid()  # False, email 和 content 无法通过验证

# 输出错误数据
serializer.errors
# {'user': {'email': ['Enter a valid e-mail address.']}, 'created': ['This field is required.']}
复制代码
```

### 嵌套对象处理示例

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'profile']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user
复制代码
```

### 序列化多个对象

```python
queryset = Book.objects.all()
serializer = BookSerializer(queryset, many=True)
serializer.data
复制代码
```

序列化 `serializer.data` 的值：

```python
[
    {'id': 0, 'title': 'The electric kool-aid acid test', 'author': 'Tom Wolfe'},
    {'id': 1, 'title': 'If this is a man', 'author': 'Primo Levi'},
    {'id': 2, 'title': 'The wind-up bird chronicle', 'author': 'Haruki Murakami'}
]
复制代码
```

### 额外上下文链接

在某些情况下, 除了要序列化的对象外, 还需要为序列化器提供额外的上下文。

一种常见的情况是如果您使用的是包含超链接关系的序列化程序, 则要求序列化程序有权访问当前请求, 以便它可以正确生成完全合格的 URL。

您可以在实例化序列化程序时通过传递 `context` 参数来提供任意其他上下文：

```python
serializer = AccountSerializer(account, context={'request': request})
serializer.data

{
	'id': 6, 
    'owner': 'denvercoder9', 
    'created': datetime.datetime(2013, 2, 12, 09, 44, 56, 678870), 
    'details': 'http://example.com/accounts/6/details'
}
```
