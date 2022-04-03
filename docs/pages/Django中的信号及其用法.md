# Django中的信号及其用法

Django中提供了"信号调度",用于在框架执行操作时解耦.一些动作发生的时候,系统会根据信号定义的函数执行相应的操作

## **Django中内置的signal**

- ***Model_signals***

  ```
  pre_init                        # Django中的model对象执行其构造方法前,自动触发
  post_init                       # Django中的model对象执行其构造方法后,自动触发
  pre_save                        # Django中的model对象保存前,自动触发
  post_save                       # Django中的model对象保存后,自动触发
  pre_delete                      # Django中的model对象删除前,自动触发
  post_delete                     # Django中的model对象删除后,自动触发
  m2m_changed                     # Django中的model对象使用m2m字段操作数据库的第三张表(add,remove,clear,update),自动触发
  class_prepared                  # 程序启动时,检测到已注册的model类,对于每一个类,自动触发
  ```

- ***Managemeng_signals***

  ```
  pre_migrate                     # 执行migrate命令前,自动触发
  post_migrate                    # 执行migrate命令后,自动触发 
  ```

- ***Request/response_signals***

  ```
  request_started                 # 请求到来前,自动触发
  request_finished                # 请求结束后,自动触发
  got_request_exception           # 请求异常时,自动触发
  ```

- ***Test_signals***

  ```
  setting_changed                 # 配置文件改变时,自动触发
  template_rendered               # 模板执行渲染操作时,自动触发
  ```

- ***Datebase_Wrapperd***
  connection_created              # 创建数据库连接时,自动触发

## Django 信号的使用

对于Django内置的信号,仅需注册指定信号,当程序执行相应操作时,系统会自动触发注册函数

- `models.py`中的代码:

  ```python
  from django.db import models
  
  class UserInfo(models.Model):
      name=models.CharField(max_length=32)
      pwd=models.CharField(max_length=64)
  ```

- `views.py`中的代码:

  ```python
  from django.shortcuts import render,HttpResponse
  from app01 import  models
  
  def index(request):
      models.UserInfo.objects.create(name="mysql",pwd="mysql123")
      return HttpResponse("ok")
  ```

- 项目的`__init__.py`文件中代码:

  ```python
  from django.db.models.signals import pre_save,post_save
  
  def pre_save_func(sender,**kwargs):
  
      print("pre_save_func")
      print("pre_save_msg:",sender,kwargs)
  
  def post_save_func(sender,**kwargs):
      print("post_save_func")
      print("post_save_msg:",sender,kwargs)
  
  pre_save.connect(pre_save_func)             # models对象保存前触发callback函数
  post_save.connect(post_save_func)           # models对象保存后触发函数
  ```

- 也可以使用装饰器来触发信号,把上面`__init__.py`中的代码修改:

  ```python
  from django.core.signals import request_finished
  from django.dispatch import receiver
  
  @receiver(request_finished)
  def callback(sender, **kwargs):
      print("Request finished!")
  ```

## 自定义信号

1. 定义信号
   新建一个项目,配置好路由,在项目根目录下创建一个`singal_test.py`的文件,内容为

   ```python
   import django.dispatch
   
   action=django.dispatch.Signal(providing_args=["aaaa","bbbb"])
   ```

2. 注册信号
   项目应用下面的`__init__.py`文件内容:

   ```python
   from singal_test import action
   
   def pre_save_func(sender,**kwargs):
   
       print("pre_save_func")
       print("pre_save_msg:",sender,kwargs)
       
   action.connect(pre_save_func)
   ```

3. 触发信号
   views视图函数内容:

   ```python
   from singal_test import action
   
   action.send(sender="python",aaa="111",bbb="222")
   ```
