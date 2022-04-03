# Rest-framework专栏讲解(十五)：Validators

在你使用 REST 框架进行验证处理时, 你可能仅仅依赖于默认依赖的字段验证, 或者在 serializer 上使用显式验证的方法, 但如果将验证逻辑代码放入可复用的组件中, 即可达到复用代码, 降低冗余的效果, 而这个功能就可以通过验证类或者验证函数来实现。

示例说明：

```python
class CustomerReportRecord(models.Model):
    time_raised = models.DateTimeField(default=timezone.now, editable=False)
    reference = models.CharField(unique=True, max_length=20)
    description = models.TextField()
复制代码
```

`CustomerReportSerializer` 是 创建或更新 `CustomerReportRecord` 实例的基础 serializer：

```python
class CustomerReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerReportRecord
复制代码
```

使用 Django-shell 可以执行获取到以下信息：

```python
>>> from project.example.serializers import CustomerReportSerializer
>>> serializer = CustomerReportSerializer()
>>> print(repr(serializer))
CustomerReportSerializer():
    id = IntegerField(label='ID', read_only=True)
    time_raised = DateTimeField(read_only=True)
    reference = CharField(max_length=20, validators=[<UniqueValidator(queryset=CustomerReportRecord.objects.all())>])
    description = CharField(style={'type': 'textarea'})
复制代码
```

### UniqueValidator

该验证类, 用于 `unique=True` 的模型字段约束。

#### 参数

- `queryset`：必须参数, 用于执行约束的查询集
- `message`：验证失败返回的错误信息
- `lookup`：用于查找具有正在验证的值的现有实例的查找。默认为 `"exact"`

#### 示例

```python
from rest_framework.validators import UniqueValidator

class ...:
	...
    slug = SlugField(
        max_length=100,
        validators=[UniqueValidator(queryset=BlogPost.objects.all())]
    )
复制代码
```

### UniqueTogetherValidator

该验证类用于多字段下的组合约束。

#### 参数

- `queryset`：必须参数, 用于执行约束的查询集
- `message`：验证失败返回的错误信息
- `fields`：必须参数, 用于联合唯一约束的字段列表或元组

#### 示例

```python
from rest_framework.validators import UniqueTogetherValidator

class ExampleSerializer(serializers.Serializer):
    ...
    class Meta:
        validators = [
            UniqueTogetherValidator(
                queryset=ToDoItem.objects.all(),
                fields=['list', 'position']
            )
        ]
复制代码
```

### UniqueForDateValidator、UniqueForMonthValidator、UniqueForYearValidator

该三个验证类用于时间模型字段的限制约束。

#### 参数

- `queryset`：必须参数, 用于执行约束的查询集
- `message`：验证失败返回的错误信息
- `field`：必须参数, 用于约束的时间字段名称
- `date_field`：必须参数, 用于确定唯一性约束的日期范围

#### 示例

```python
from rest_framework.validators import UniqueForYearValidator

class ExampleSerializer(serializers.Serializer):
    ...
    class Meta:
        validators = [
            UniqueForYearValidator(
                queryset=BlogPostItem.objects.all(),
                field='slug',
                date_field='published'
            )
        ]
复制代码
```

serializer 上始终要求存在用于验证的日期字段, 不能简单地依赖模型类 `default=…`, 因为用于默认值的值在验证运行之后才会生成。

根据你希望 API 的行为方式, 您可能需要使用一些样式, 如果您正在使用 `ModelSerializer`, 那么您可能只需要依赖 REST framework 为您生成的默认值, 但是如果您使用的是 Serializer 或只是想要更显式的控制, 请使用下面演示的样式之一。

#### 与可写日期字段一起使用

如果您希望日期字段可写, 则唯一需要注意的是您可以通过设置 `default` 参数或 `required=True` 来确保输入数据中的日期字段始终可用。

```python
published = serializers.DateTimeField(required=True)
复制代码
```

#### 与只读日期字段一起使用

如果希望日期字段可见, 但用户不可编辑, 则设置 `read_only=True` 并另外设置一个 `default=...` 参数。

```python
published = serializers.DateTimeField(read_only=True, default=timezone.now)
复制代码
```

#### 与隐藏的日期字段一起使用

如果您希望日期字段对用户完全隐藏, 请使用 `HiddenField`, 此字段类型不接受用户输入, 而是始终将其默认值返回给序列化器中的 `validated_data`。

```python
published = serializers.HiddenField(default=timezone.now)
复制代码
```

### 默认值高级用法

#### CurrentUserDefault

可用于表示当前用户的默认类, 如果你想使用, 则需要在实例化序列化程序时, `'request'` 必须作为上下文字典的一部分提供。

```python
owner = serializers.HiddenField(
    default=serializers.CurrentUserDefault()
)
复制代码
```

#### CreateOnlyDefault

在创建时用于默认值, 更新操作时将忽略该字段。

```python
created_at = serializers.DateTimeField(
    default=serializers.CreateOnlyDefault(timezone.now)
)
复制代码
```

### 复杂的验证

在某些验证不足以满足你的验证需求时, 显式验证将会是个很好的方案, 在 serializer 类中重写 `validate` 方法, 将会是个很不错的。

```python
class BillingRecordSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        # Apply custom validation either here, or in the view.

    class Meta:
        fields = ['client', 'date', 'amount']
        extra_kwargs = {'client': {'required': False}}
        validators = []  # Remove a default "unique together" constraint.
复制代码
```

### 自定义验证

验证器是可以引发 `serializers.ValidationError` 异常的任何可调用对象, 如：

```python
def even_number(value):
    if value % 2 != 0:
        raise serializers.ValidationError('This field must be an even number.')
复制代码
```

当然, 你可以在你定义的 Serializer 中, 针对某一个字段进行特殊的验证, 如下：

```python
class BillingRecordSerializer(serializers.ModelSerializer):
    def validate_title(self, attrs):
        # Apply custom validation either here, or in the view.
复制代码
```

格式是在 Serializer 中定义添加 `.validate_<field_name>` 方法, 即可实现。

可以使用类的方式, 定义验证器, 重写 `__call__` 方法, 这种方式, 复用性更高：

```python
class MultipleOf:
    def __init__(self, base):
        self.base = base

    def __call__(self, value):
        if value % self.base != 0:
            message = 'This field must be a multiple of %d.' % self.base
            raise serializers.ValidationError(message)
复制代码
```

在某些高级情况下, 您可能希望向验证器传递与之一起使用的序列化器字段作为附加上下文, 您可以通过在验证器上设置 `requires_context = True` 属性来完成此操作, 然后将使用 `serializer_field` 或 `serializer` 作为附加参数来调用 `__call__` 方法。

```python
requires_context = True

def __call__(self, value, serializer_field):
    ...
```
