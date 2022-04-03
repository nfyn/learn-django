# Rest-framework专栏讲解(十二)：Serializer(2)

在很多情况下, 开发的项目是和 Django-ORM 相关的, 所以就有了应对 ORM 的 Serializers：`ModelSerializer`。

### ModelSerializer

`ModelSerializer` 是和常规 Serializer 类一样的, 不同之处在于：

- 它将根据模型自动为您生成一组字段
- 它将自动为序列化器生成验证器, 例如 `unique_together` 验证器
- 它默认实现了简单的 `.create()` 和 `.update()` 方法

默认情况下, 该类上的所有模型字段都将映射到相应的序列化器字段。

模型上的任何关系都将映射到 `PrimaryKeyRelatedField`, 默认情况下不包括反向关系, 除非按照序列化器关系文档中的明确指定包含反向关系。

### 基本代码块

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from django.db import models
from rest_framework import serializers


class UserModel(models.Model):
    username = models.CharField(max_length=32, unique=True, null=False, blank=False)
    email = models.EmailField()

    ...


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email')
复制代码
```

### 指定序列化字段

如果你需要指定模型中的个别字段进行序列化, 只需要使用 `fields` 声明字段数组即可, 如：

```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_name', 'users', 'created']
复制代码
```

或者是你想使用全部的字段值, 可以使用 `fields = '__all__'` 来声明：

```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
复制代码
```

或者是使用 `exclude` 进行排除某些字段(不推荐)：

```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        exclude = ['users']
复制代码
```

`fields` 和 `exclude` 属性中的名称通常会映射到模型类上的模型字段, 另外, `fields` 选项中的名称可以映射到属性或方法, 这些属性或方法不包含模型类上存在的参数, 从 `3.3.0` 版开始, 必须提供属性 `fields` 或 `exclude` 其中之一。

### 嵌套序列化

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_name', 'users', 'created']
        depth = 1
复制代码
```

如果模型中存在外键对象, 默认情况下使用外键 ID 包含外键对象, 但你可以使用嵌套外键系列化对象进行输出, 只需要提供 `depth` 参数, 该 `depth` 选项应设置为整数值, 该值指示在嵌套对象需要表示的深度。

如果要自定义完成序列化的方式, 则需要自己定义字段。

### 自定义声明字段

```python
class AccountSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='get_absolute_url', read_only=True)
    groups = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        model = Account
复制代码
```

你可以类似 ORM 一样使用字段声明, 如果你只想修改模型类字段的映射字段, 只需要自己声明一个字段, 并使用 `source` 来指明该字段与模型中的哪个字段对应即可, 或者你可以自定义其它字段。

### 只读字段

```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_name', 'users', 'created']
        read_only_fields = ['account_name']
复制代码
```

在声明只读字段的时候, 只需要将包含在 `fields` 中的字段添加到 `read_only_fields` 中即可, 或者在你自定义字段中加入 `read_only=True` 进行声明。

默认情况下, 已设置 `editable=False` 的模型字段和 `AutoField` 字段将设置为只读, 并且不需要将其添加到 `read_only_fields` 选项中。

### 附加参数

```python
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
复制代码
```

还有一个快捷方式, 允许使用 `extra_kwargs` 选项在指定字段上声明任意附加关键字参数, 和 `read_only_fields` 的情况一样, 这意味着你不需要在序列化程序上显式声明该字段。

此选项是一个字典, 将字段名称映射到关键字参数的字典。 注意：如果已在序列化程序类上显式声明了该字段, 则该 `extra_kwargs` 选项将被忽略。

### HyperlinkedModelSerializer

`HyperlinkedModelSerializer` 类是类似于 `ModelSerializer`, 不同之处在于它使用的超链接来表示的关系，而不是主键类。

默认情况下序列化程序将包含一个 `url` 字段而不是主键字段。

`url` 字段将使用 `HyperlinkedIdentityField` 序列化器字段表示, 而模型上的任何关系都将使用 `HyperlinkedRelatedField` 序列化器字段表示：

```python
class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['url', 'id', 'account_name', 'users', 'created']
复制代码
```

实例化 `HyperlinkedModelSerializer` 必须在序列化器声明当前请求对象 `request`,

```python
serializer = AccountSerializer(queryset, context={'request': request})
复制代码
```

这样做的方式是将链接变成绝对的地址, 携带主机地址, 如：

```url
http://api.example.com/accounts/1/
复制代码
```

而不是一个相对的地址：

```url
/accounts/1/
复制代码
```

### 超链接映射关系确认

我们需要一种确定使用哪些视图将需要超链接到模型实例的方法。

默认情况下, 超链接应与匹配样式的视图名称 `'{model_name}-detail'` 相对应, 并通过 `pk` 关键字参数查找实例对象。

您可以使用 `extra_kwargs` 设置中的 `view_name` 和 `lookup_field` 选项之一或全部覆盖 `URL` 字段视图名称和查找字段：

```python
class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['account_url', 'account_name', 'users', 'created']
        extra_kwargs = {
            'url': {'view_name': 'accounts', 'lookup_field': 'account_name'},
            'users': {'lookup_field': 'username'}
        }
复制代码
```

再或者, 在 serializer 上指定：

```python
class AccountSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='accounts',
        lookup_field='slug'
    )
    users = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        lookup_field='username',
        many=True,
        read_only=True
    )

    class Meta:
        model = Account
        fields = ['url', 'account_name', 'users', 'created']
复制代码
```

### ListSerializer

在某些情况下可能想自定义一个 `ListSerializer` 行为的序列化类, 并具有以下功能：

- 想要提供列表的特定验证, 例如检查一个元素与列表中的另一个元素没有冲突
- 自定义多个对象的创建或更新行为

对于这些情况, 您可以通过使用序列化 `Meta` 类上的 `list_serializer_class` 选项来修改在传递 `many = True` 时使用的类：

```python
class CustomListSerializer(serializers.ListSerializer):
    ...

class CustomSerializer(serializers.Serializer):
    ...
    class Meta:
        list_serializer_class = CustomListSerializer
复制代码
```

实现创建多个对象实例：

```python
class BookListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        books = [Book(**item) for item in validated_data]
        return Book.objects.bulk_create(books)

class BookSerializer(serializers.Serializer):
    ...
    class Meta:
        list_serializer_class = BookListSerializer
复制代码
```

实现多个对象实例更新：

官方描述：

> By default the `ListSerializer` class does not support multiple updates. This is because the behavior that should be expected for insertions and deletions is ambiguous.
>
> To support multiple updates you'll need to do so explicitly. When writing your multiple update code make sure to keep the following in mind:
>
> - How do you determine which instance should be updated for each item in the list of data?
> - How should insertions be handled? Are they invalid, or do they create new objects?
> - How should removals be handled? Do they imply object deletion, or removing a relationship? Should they be silently ignored, or are they invalid?
> - How should ordering be handled? Does changing the position of two items imply any state change or is it ignored?
>
> You will need to add an explicit `id` field to the instance serializer. The default implicitly-generated id field is marked as `read_only`. This causes it to be removed on updates. Once you declare it explicitly, it will be available in the list serializer's `update` method.

在传递的多个实例对象的时候需要对应关系以及判断更新还是创建, 或者删除：

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers


class BookListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        # 映射逻辑:
        # id -> instance
        # id -> data item
        book_mapping = {book.id: book for book in instance}
        data_mapping = {item['id']: item for item in validated_data}

        # 创建实例或更新实例
        ret = []
        for book_id, data in data_mapping.items():
            book = book_mapping.get(book_id, None)
            if book is None:
                ret.append(self.child.create(data))
            else:
                ret.append(self.child.update(book, data))

        # 删除
        for book_id, book in book_mapping.items():
            if book_id not in data_mapping:
                book.delete()

        return ret


class BookSerializer(serializers.Serializer):
    # We need to identify elements in the list using their primary key,
    # so use a writable field here, rather than the default which would be read-only.
    id = serializers.IntegerField()
    ...

    class Meta:
        list_serializer_class = BookListSerializer
复制代码
```

### 动态自定配置

如果你需要动态的字段映射配置, 并不想定义多个类对象的时候, 就可以这样：

```python
#!/usr/bin/env python
# _*_ Coding: UTF-8 _*_
from rest_framework import serializers


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)
复制代码
```

然后你就可以这样： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d31da4dc292434b9f74b107228238ee~tplv-k3u1fbpfcp-zoom-1.image)

但是你需要注意这行代码：

```python
self.fields.pop(field_name)
复制代码
```

在你动态字段声明中, 需要该字段已经存在于定义的序列类的 `fields` 中。
