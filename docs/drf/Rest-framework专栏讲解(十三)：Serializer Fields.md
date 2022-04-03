# Rest-framework专栏讲解(十三)：Serializer Fields

对于框架而言, 序列化器不仅仅是对需要参数的声明, 更是参数校验和标准化输出的策略, 所以对此, 你需要严格按照你的开发实际情况声明好你的字段约束。

### 字段参数说明

每个字段的声明都会可能性包含以下约束性参数：

| 关键字参数       | 参数作用说明                                                 |
| ---------------- | ------------------------------------------------------------ |
| `read_only`      | 在更新或者创建资源的时候不应该包含的字段参数, 仅仅是只读数据的时候才需要反序列化, 默认 `False` |
| `write_only`     | 在更新或创建资源的时候需要包含该字段参数, 而读取数据内容的时候将不会反序列化, 默认 `False` |
| `required`       | 如果反序列化过程中未提供字段, 通常会引发错误, 设置该字段是否为必填对象, 默认 `True` |
| `default`        | 当提交对象中不包含该字段时, 使用自动填充的默认值, 在局部更新的时候将不适用 |
| `allow_null`     | 声明字段是否可以为空, 默认 `False`                           |
| `source`         | 在对 ORM 字段重新声明新字段时, 需要将新字段指明对应的 ORM 字段 |
| `validators`     | 验证器功能列表, 应将其应用于传入字段输入, 并且会引发 `serializers.ValidationError` 验证错误或返回验证数据 |
| `error_messages` | 验证错误时需要返回的错误信息字典                             |
| `label`          | 短文本字符串, 可用作 HTML 表单字段或其他描述性元素中的字段名称 |
| `help_text`      | 可用作在 HTML 表单字段或其他描述性元素中对该字段进行描述的文本字符串 |
| `initial`        | 该值应用于预先填充 HTML 表单字段的值                         |
| `style`          | 键值对字典, 可用于控制渲染器应如何渲染字段, [HTML＆Forms 文档](https://www.django-rest-framework.org/topics/html-and-forms/) |

### BooleanField

布尔有效类型。

### NullBooleanField

布尔有效类型, 但同时也接受 `None` 类型。

### CharField

文本字符串有效类型, 可以检测验证字符串的长度是否符合 `max_length` 和 `mix_length` 配置。

- `max_length`：字符最大长度
- `mix_length`：字符最小长度
- `allow_blank`：是否接受空字符, 默认 `False`
- `trim_whitespace`：是否剪贴字符前后的空白字符, 默认 `True`

### EmailField

文本字符串有效类型, 并验证文本是否符合邮件格式。

### RegexField

文本字符串有效类型, 并验证字符串是否匹配强制参数 `regex` 所指定的正则表达式。

### SlugField

文本字符串有效类型, 并验证字符串是否匹配正则表达式：`[a-zA-Z0-9_-]+`。

### URLField

文本字符串有效类型, 并验证字符串是否符合 URL 规则：`http://<host>/<path>`。

### UUIDField

UUID 字符串有效类型。

- ```
  format
  ```

  ：指定 UUID 的表示类型

  - `hex_verbose`：规范的十六进制形式, 包括连字符：`"5ce0e9a5-5ffa-654b-cee0-1238041fb31a"`
  - `hex`：紧凑的十六进制形式, 不包括连字符： `"5ce0e9a55ffa654bcee01238041fb31a"`
  - `int`：128位整数表示：`"123456789012312313134124512351145145114"`
  - `urn`：RFC 4122 URN表示形式：`"urn:uuid:5ce0e9a5-5ffa-654b-cee0-1238041fb31a"`

### FilePathField

文本字符串有效类型, 选择仅限于文件系统上某个目录中的文件名。

- `path`：目录的绝对文件系统路径, 应从中选择此 `FilePathField`
- `match`：`FilePathField` 将用于过滤文件名的正则表达式(作为字符串)
- `recursive`：指定是否应包含路径的所有子目录, 默认值为 `False`
- `allow_files`：指定是否应包含指定位置的文件, 默认值为 `True`
- `allow_folders`：指定是否应包含指定位置的文件夹, 默认值为 `False`

### IPAddressField

文本字符串有效类型, 并确保输入为有效IPv4或IPv6字符串的字段。

### IntegerField

整数数字有效类型。 `max_value`：最大值 `mix_value`：最小值

### FloatField

浮点数数字有效类型。 `max_value`：最大值 `mix_value`：最小值

### DecimalField

十进制表示形式。

- `max_digits`：数字中允许的最大位数, 它必须是 `None` 或大于或等于 `decimal_places` 的整数
- `decimal_places`：用数字存储的小数位数
- `coerce_to_string`：设置为 `True`, 是否应该为表示形式返回字符串值，或者 `False` 是否应该返回 `Decimal` 对象, 默认值为与 `COERCE_DECIMAL_TO_STRING` 设置键相同的值, 除非覆盖 `True`, 否则为默认值, 如果 `Decimal` 对象由序列化程序返回, 则最终输出格式将由渲染器确定, 请注意, 设置 `localize` 会将值强制设为 `True`
- `max_value`：最大值
- `min_value`：最小值
- `localize`：设置为 `True` 启用基于当前语言环境的输入和输出本地化, 这也将迫使 `coerce_to_string=True`, 默认为 `False`, 请注意, 如果您在设置文件中进行了设置  `USE_L10N=True`, 则会启用数据格式设置
- `rounding`：将量化时使用的舍入模式设置为配置的精度, 有效值为 `decimal` 模块舍入模式, 默认为 `None`

### DateTimeField

日期和时间表示。

- `format`：代表输出格式的字符串, 如果未指定则默认为与 `DATETIME_FORMAT` 设置键相同的值
- `input_formats`：表示可用于解析日期的输入格式的字符串列表, 如果未指定将使用 `DATETIME_INPUT_FORMATS`
- `default_timezone`：时区, 如果未指定并且 `USE_TZ` 设置已启用, 则默认为当前时区

### DateField

日期表示。

- `format`：代表输出格式的字符串, 如果未指定则默认为与 `DATETIME_FORMAT` 设置键相同的值
- `input_formats`：表示可用于解析日期的输入格式的字符串列表, 如果未指定将使用 `DATETIME_INPUT_FORMATS`

### TimeField

时间表示。

- `format`：代表输出格式的字符串, 如果未指定则默认为与 `DATETIME_FORMAT` 设置键相同的值
- `input_formats`：表示可用于解析日期的输入格式的字符串列表, 如果未指定将使用 `DATETIME_INPUT_FORMATS`
- `default_timezone`：时区, 如果未指定并且 `USE_TZ` 设置已启用, 则默认为当前时区

### DurationField

持续时间表示。

`max_value`：最大值 `mix_value`：最小值

### ChoiceField

可以接受一组有限选择中的值的字段。

- `choices`：有效值列表或 `(key, display_name)` 元组列表
- `allow_blank`可否设置空字符, 默认为 `False`
- `html_cutoff`：如果设置, 则将是 `HTML select` 下拉列表将显示的最大选择数
- `html_cutoff_text`：如果设置了该选项, 则在 `HTML` 选择下拉列表中已截断最大数量的项目, 则它将显示文本指示器, 默认为 `"More than {count} items…"`

### MultipleChoiceField

一个可以接受一组空、一个、多个值的字段, 这些值是从一组有限的选择中选择的, 接受一个强制性参数 `to_internal_value`, 返回set包含所选值的。

- `choices`：有效值列表或 `(key, display_name)` 元组列表
- `allow_blank`可否设置空字符, 默认为 `False`
- `html_cutoff`：如果设置, 则将是 `HTML select` 下拉列表将显示的最大选择数
- `html_cutoff_text`：如果设置了该选项, 则在 `HTML` 选择下拉列表中已截断最大数量的项目, 则它将显示文本指示器, 默认为 `"More than {count} items…"`

### FileField

文件表示。执行 Django 的标准 `FileField` 验证。

- `max_length`：指定文件名的最大长度
- `allow_empty_file`：指定是否允许空文件
- `use_url`：如果设置为 `True` 则 URL 字符串值将用于输出表示, 如果设置为 `False` 则文件名字符串值将用于输出表示

### ImageField

图像表示。验证上传的文件内容是否与已知图像格式匹配。

- `max_length`：指定文件名的最大长度
- `allow_empty_file`：指定是否允许空文件
- `use_url`：如果设置为 `True` 则 URL 字符串值将用于输出表示, 如果设置为 `False` 则文件名字符串值将用于输出表示

### ListField

验证对象列表的字段类。

- `child`：应该用于验证列表中对象的字段实例, 如果未提供此参数则将不验证列表中的对象
- `allow_empty`：指定是否允许空列表
- `min_length`：验证列表中包含的元素不少于此数量
- `max_length`：验证列表中所包含的元素数量不超过此数量

### DictField

验证对象字典的字段类。

- `child`：应该用于验证字典中对象的字段实例, 如果未提供此参数则将不验证字典中的对象
- `allow_empty`：指定是否允许空字典

### HStoreField

`DictField` 与 Django 的 `postgres` 兼容的预配置字典类型。

- `child`：用于验证字典中值的字段实例, 默认的子字段接受空字符串和空值
- `allow_empty`：指定是否允许空字典

### JSONField

用于验证传入的数据结构是否包含有效的 JSON 原语。

- `binary`：如果设置为 `True` 则该字段将输出并验证 JSON 编码的字符串, 而不是原始数据结构
- `encoder`：使用此 JSON 编码器序列化输入对象

### ReadOnlyField

仅返回该字段的值而无需修改。

### HiddenField

它不基于用户输入获取值，而是从默认值或可调用对象获取其值。

### ModelField

可以绑定到任意模型字段的通用字段。该 `ModelField` 级代表序列化/反序列化到其相关的模型领域的任务, 此字段可用于为自定义模型字段创建序列化程序字段, 而不必创建新的自定义序列化程序字段。

### SerializerMethodField

这是一个只读字段, 它通过在附加的序列化器类上调用一个方法来获取其值, 它可以用于将任何类型的数据添加到对象的序列化表示中。

- `method_name`：要调用的序列化程序上的方法的名称。如果未包含, 则默认为 `get_<field_name>`
