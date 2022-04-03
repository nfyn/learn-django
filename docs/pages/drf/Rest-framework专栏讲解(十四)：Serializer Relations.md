# Rest-framework专栏讲解(十四)：Serializer Relations

关系字段用于表示模型关系的数据字段, 它们可以应用到 `ForeignKey`、`ManyToManyField` 和 `OneToOneField`关系, 以及对反向关系、自定义关系等, 例如：`GenericForeignKey`。

模型示例声明：

```python
class Album(models.Model):
    album_name = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)

class Track(models.Model):
    album = models.ForeignKey(Album, related_name='tracks', on_delete=models.CASCADE)
    order = models.IntegerField()
    title = models.CharField(max_length=100)
    duration = models.IntegerField()

    class Meta:
        unique_together = ['album', 'order']
        ordering = ['order']

    def __str__(self):
        return '%d: %s' % (self.order, self.title)
复制代码
```

### StringRelatedField

该字段可以使得目标模型类的 `__str__` 方法进行关系映射, 如示例的 serializer：

```python
class AlbumSerializer(serializers.ModelSerializer):
    tracks = serializers.StringRelatedField(many=True)

    class Meta:
        model = Album
        fields = ['album_name', 'artist', 'tracks']
复制代码
```

序列化的数据表示形式为：

```python
{
    'album_name': 'Things We Lost In The Fire',
    'artist': 'Low',
    'tracks': [
        '1: Sunflower',
        '2: Whitetail',
        '3: Dinosaur Act',
        ...
    ]
}
复制代码
```

#### 参数

- `many`：如果应用于多对多关系, 则应将此参数设置为 `True`

### PrimaryKeyRelatedField

该字段通过逐渐表示关系目标, 如示例的 serializer：

```python
class AlbumSerializer(serializers.ModelSerializer):
    tracks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ['album_name', 'artist', 'tracks']
复制代码
```

序列化的数据表示形式为：

```python
{
    'album_name': 'Undun',
    'artist': 'The Roots',
    'tracks': [
        89,
        90,
        91,
        ...
    ]
}
复制代码
```

#### 参数

- `queryset`：验证字段输入时用于模型实例查找的查询集, 关系必须显式设置 `queryset` 或 `read_only=True`
- `many`：如果应用于多对多关系, 则应将此参数设置为 `True`
- `allow_null`：如果设置为 `True`, 则该字段将接受 `None` 可空关系的值或空字符串, 默认为 `False`
- `pk_field`：设置为一个字段以控制主键值的序列化/反序列化, 例如 `pk_field=UUIDField(format='hex')` 将 UUID 主键序列化为其紧凑的十六进制表示形式

### HyperlinkedRelatedField

该字段用于使用超链接的方式表示关系目标, 如示例的 serializer：

```python
class AlbumSerializer(serializers.ModelSerializer):
    tracks = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='track-detail'
    )

    class Meta:
        model = Album
        fields = ['album_name', 'artist', 'tracks']
复制代码
```

序列化的数据表示形式为：

```python
{
    'album_name': 'Graceland',
    'artist': 'Paul Simon',
    'tracks': [
        'http://www.example.com/api/tracks/45/',
        'http://www.example.com/api/tracks/46/',
        'http://www.example.com/api/tracks/47/',
        ...
    ]
}
复制代码
```

#### 参数

- `view_name`：应该用作关系目标的视图名称, 如果您使用的是标准路由器类, 则该字符串将为`<modelname>-detail`
- `queryset`：验证字段输入时用于模型实例查找的查询集, 关系必须显式设置 `queryset` 或 `read_only=True`
- `many`：如果应用于多对多关系, 则应将此参数设置为 `True`
- `allow_null`：如果设置为 `True`, 则该字段将接受 `None` 可空关系的值或空字符串
- `lookup_field`：目标上应用于查找的字段, 应对应于引用视图上的 URL 关键字参数, 默认值为 `'pk'`。
- `lookup_url_kwarg`：URL conf 中定义的关键字参数的名称, 该参数与查找字段相对应, 默认使用与相同的值 `lookup_field`
- `format`：如果使用格式后缀, 则超链接字段将为目标使用相同的格式后缀, 除非使用 `format` 参数将其覆盖

### SlugRelatedField

该字段使用目标上的字段表示关系目标, 如示例 serializer：

```python
class AlbumSerializer(serializers.ModelSerializer):
    tracks = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='title'
     )

    class Meta:
        model = Album
        fields = ['album_name', 'artist', 'tracks']
复制代码
```

序列化的数据表示形式为：

```python
{
    'album_name': 'Dear John',
    'artist': 'Loney Dear',
    'tracks': [
        'Airport Surroundings',
        'Everything Turns to You',
        'I Was Only Going Out',
        ...
    ]
}
复制代码
```

#### 参数

- `queryset`：验证字段输入时用于模型实例查找的查询集, 关系必须显式设置 `queryset` 或 `read_only=True`
- `many`：如果应用于多对多关系, 则应将此参数设置为 `True`
- `allow_null`：如果设置为 `True`, 则该字段将接受 `None` 可空关系的值或空字符串

### HyperlinkedIdentityField

此字段可以作为标识关系应用, 例如 `HyperlinkedIdentityField` 上的 `"url"` 字段, 它也可以用于对象的属性, 如示例的 serializer：

```python
class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    track_listing = serializers.HyperlinkedIdentityField(view_name='track-list')

    class Meta:
        model = Album
        fields = ['album_name', 'artist', 'track_listing']
复制代码
```

序列化的数据表示形式为：

```python
{
    'album_name': 'The Eraser',
    'artist': 'Thom Yorke',
    'track_listing': 'http://www.example.com/api/track_list/12/',
}
复制代码
```

#### 参数

- `view_name`：应该用作关系目标的视图名称, 如果您使用的是标准路由器类, 则该字符串将为`<modelname>-detail`
- `lookup_field`：目标上应用于查找的字段, 应对应于引用视图上的 URL 关键字参数, 默认值为 `'pk'`。
- `lookup_url_kwarg`：URL conf 中定义的关键字参数的名称, 该参数与查找字段相对应, 默认使用与相同的值 `lookup_field`
- `format`：如果使用格式后缀, 则超链接字段将为目标使用相同的格式后缀, 除非使用 `format` 参数将其覆盖

### 嵌套关系(Nested relationships)

示例 serializer：

```python
class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['order', 'title', 'duration']

class AlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ['album_name', 'artist', 'tracks']
复制代码
```

序列化的数据表示形式为：

```python
>>> album = Album.objects.create(album_name="The Grey Album", artist='Danger Mouse')
>>> Track.objects.create(album=album, order=1, title='Public Service Announcement', duration=245)
<Track: Track object>
>>> Track.objects.create(album=album, order=2, title='What More Can I Say', duration=264)
<Track: Track object>
>>> Track.objects.create(album=album, order=3, title='Encore', duration=159)
<Track: Track object>
>>> serializer = AlbumSerializer(instance=album)
>>> serializer.data
{
    'album_name': 'The Grey Album',
    'artist': 'Danger Mouse',
    'tracks': [
        {'order': 1, 'title': 'Public Service Announcement', 'duration': 245},
        {'order': 2, 'title': 'What More Can I Say', 'duration': 264},
        {'order': 3, 'title': 'Encore', 'duration': 159},
        ...
    ],
}
复制代码
```

### 可写的嵌套 serializer(Writable nested serializers)

默认情况下, 嵌套 serializer 是只读的, 如果要支持对嵌套序列化器字段的写操作, 则需要创建 `create()` 或 `update()` 方法, 以明确指定应如何保存子关系。 如：

```python
class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['order', 'title', 'duration']

class AlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Album
        fields = ['album_name', 'artist', 'tracks']

    def create(self, validated_data):
        tracks_data = validated_data.pop('tracks')
        album = Album.objects.create(**validated_data)
        for track_data in tracks_data:
            Track.objects.create(album=album, **track_data)
        return album

>>> data = {
    'album_name': 'The Grey Album',
    'artist': 'Danger Mouse',
    'tracks': [
        {'order': 1, 'title': 'Public Service Announcement', 'duration': 245},
        {'order': 2, 'title': 'What More Can I Say', 'duration': 264},
        {'order': 3, 'title': 'Encore', 'duration': 159},
    ],
}
>>> serializer = AlbumSerializer(data=data)
>>> serializer.is_valid()
True
>>> serializer.save()
<Album: Album object>
```
