## 扩展用户模型

### 1. 设置Proxy模型：

如果你对`Django`提供的字段，以及验证的方法都比较满意，没有什么需要改的。但是只是需要在他原有的基础之上增加一些操作的方法。那么建议使用这种方式。示例代码如下：

```python
class Person(User):
    class Meta:
        proxy = True

    def get_blacklist(self):
        return self.objects.filter(is_active=False)
```

### 2. 一对一外键：

如果你对用户验证方法`authenticate`没有其他要求，就是使用`username`和`password`即可完成。但是想要在原来模型的基础之上添加新的字段，那么可以使用一对一外键的方式。示例代码如下：

```python
from django.contrib.auth.models import User
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save

class UserExtension(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='extension')
    birthday = models.DateField(null=True,blank=True)
    school = models.CharField(max_length=100)


@receiver(post_save,sender=User)
def create_user_extension(sender,instance,created,**kwargs):
    if created:
        UserExtension.objects.create(user=instance)
    else:
        instance.extension.save()
```

### 3. 继承自`AbstractUser`：

对于`authenticate`不满意，并且不想要修改原来`User`对象上的一些字段，但是想要增加一些字段，那么这时候可以直接继承自`django.contrib.auth.models.AbstractUser`，其实这个类也是`django.contrib.auth.models.User`的父类。比如我们想要在原来`User`模型的基础之上添加一个`telephone`和`school`字段。示例代码如下：

```python
from django.contrib.auth.models import AbstractUser
class User(AbstractUser):
    telephone = models.CharField(max_length=11,unique=True)
    school = models.CharField(max_length=100)

    # 指定telephone作为USERNAME_FIELD，以后使用authenticate
    # 函数验证的时候，就可以根据telephone来验证
    # 而不是原来的username
    USERNAME_FIELD = 'telephone'
    REQUIRED_FIELDS = []

    # 重新定义Manager对象，在创建user的时候使用telephone和
    # password，而不是使用username和password
    objects = UserManager()


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self,telephone,password,**extra_fields):
        if not telephone:
            raise ValueError("请填入手机号码！")
        user = self.model(telephone=telephone,*extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self,telephone,password,**extra_fields):
        extra_fields.setdefault('is_superuser',False)
        return self._create_user(telephone,password)

    def create_superuser(self,telephone,password,**extra_fields):
        extra_fields['is_superuser'] = True
        return self._create_user(telephone,password)
```

### 4. 继承自`AbstractBaseUser`模型：

如果你想修改默认的验证方式，并且对于原来`User`模型上的一些字段不想要，那么可以自定义一个模型，然后继承自`AbstractBaseUser`，再添加你想要的字段。这种方式会比较麻烦，最好是确定自己对`Django`比较了解才推荐使用。步骤如下：
1.创建模型。示例代码如下：

```python
class User(AbstractBaseUser,PermissionsMixin):
     email = models.EmailField(unique=True)
     username = models.CharField(max_length=150)
     telephone = models.CharField(max_length=11,unique=True)
     is_active = models.BooleanField(default=True)

     USERNAME_FIELD = 'telephone'
     REQUIRED_FIELDS = []

     objects = UserManager()

     def get_full_name(self):
         return self.username

     def get_short_name(self):
         return self.username
```

2.重新定义`UserManager`：我们还需要定义自己的`UserManager`，因为默认的`UserManager`在创建用户的时候使用的是`username`和`password`，那么我们要替换成`telephone`。示例代码如下：

```python
class UserManager(BaseUserManager):
     use_in_migrations = True

     def _create_user(self,telephone,password,**extra_fields):
         if not telephone:
             raise ValueError("请填入手机号码！")
         user = self.model(telephone=telephone,*extra_fields)
         user.set_password(password)
         user.save()
         return user

     def create_user(self,telephone,password,**extra_fields):
         extra_fields.setdefault('is_superuser',False)
         return self._create_user(telephone,password)

     def create_superuser(self,telephone,password,**extra_fields):
         extra_fields['is_superuser'] = True
         return self._create_user(telephone,password)
```
