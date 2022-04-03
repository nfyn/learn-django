# Rest-framework专栏讲解(四)：Status

在请求中我们会用到和种各样的请求状态码, 如果你查阅过文档, 会在首行看到这样一条信息：

> Using bare status codes in your responses isn't recommended. REST framework includes a set of named constants that you can use to make your code more obvious and readable.

是的, 使用框架自带的状态码能更清晰的表达这个请求的相应内容以及错误信息, 你只需要这样导入进来就可以使用了：

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework import status
复制代码
```

### Informational - 1xx

此类状态码表示临时的信息状态, 在框架中是没有使用这类状态码的。

- `HTTP_100_CONTINUE`
- `HTTP_101_SWITCHING_PROTOCOLS`

### Successful - 2xx

这类状态码是表示服务器已经成功接收到了请求。

- `HTTP_200_OK`
- `HTTP_201_CREATED`
- `HTTP_202_ACCEPTED`
- `HTTP_203_NON_AUTHORITATIVE_INFORMATION`
- `HTTP_204_NO_CONTENT`
- `HTTP_205_RESET_CONTENT`
- `HTTP_206_PARTIAL_CONTENT`
- `HTTP_207_MULTI_STATUS`
- `HTTP_208_ALREADY_REPORTED`
- `HTTP_226_IM_USED`

### Redirection - 3xx

这类状态码表示重定向到了其他接口, 可能需要进一步访问其他的接口才可以满足用户需求。

- `HTTP_300_MULTIPLE_CHOICES`
- `HTTP_301_MOVED_PERMANENTLY`
- `HTTP_302_FOUND`
- `HTTP_303_SEE_OTHER`
- `HTTP_304_NOT_MODIFIED`
- `HTTP_305_USE_PROXY`
- `HTTP_306_RESERVED`
- `HTTP_307_TEMPORARY_REDIRECT`
- `HTTP_308_PERMANENT_REDIRECT`

### Client Error - 4xx

这类状态码表示客户端出现错误。

- `HTTP_400_BAD_REQUEST`
- `HTTP_401_UNAUTHORIZED`
- `HTTP_402_PAYMENT_REQUIRED`
- `HTTP_403_FORBIDDEN`
- `HTTP_404_NOT_FOUND`
- `HTTP_405_METHOD_NOT_ALLOWED`
- `HTTP_406_NOT_ACCEPTABLE`
- `HTTP_407_PROXY_AUTHENTICATION_REQUIRED`
- `HTTP_408_REQUEST_TIMEOUT`
- `HTTP_409_CONFLICT`
- `HTTP_410_GONE`
- `HTTP_411_LENGTH_REQUIRED`
- `HTTP_412_PRECONDITION_FAILED`
- `HTTP_413_REQUEST_ENTITY_TOO_LARGE`
- `HTTP_414_REQUEST_URI_TOO_LONG`
- `HTTP_415_UNSUPPORTED_MEDIA_TYPE`
- `HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE`
- `HTTP_417_EXPECTATION_FAILED`
- `HTTP_422_UNPROCESSABLE_ENTITY`
- `HTTP_423_LOCKED`
- `HTTP_424_FAILED_DEPENDENCY`
- `HTTP_426_UPGRADE_REQUIRED`
- `HTTP_428_PRECONDITION_REQUIRED`
- `HTTP_429_TOO_MANY_REQUESTS`
- `HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE`
- `HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS`

### Server Error - 5xx

这类状态码表示服务端出现错误。

- `HTTP_500_INTERNAL_SERVER_ERROR`
- `HTTP_501_NOT_IMPLEMENTED`
- `HTTP_502_BAD_GATEWAY`
- `HTTP_503_SERVICE_UNAVAILABLE`
- `HTTP_504_GATEWAY_TIMEOUT`
- `HTTP_505_HTTP_VERSION_NOT_SUPPORTED`
- `HTTP_506_VARIANT_ALSO_NEGOTIATES`
- `HTTP_507_INSUFFICIENT_STORAGE`
- `HTTP_508_LOOP_DETECTED`
- `HTTP_509_BANDWIDTH_LIMIT_EXCEEDED`
- `HTTP_510_NOT_EXTENDED`
- `HTTP_511_NETWORK_AUTHENTICATION_REQUIRED`

### 辅助函数

```python
is_informational()      # 1xx 返回是否 1 开头状态码的布尔值
is_success()            # 2xx 返回是否 2 开头状态码的布尔值
is_redirect()           # 3xx 返回是否 3 开头状态码的布尔值
is_client_error()       # 4xx 返回是否 4 开头状态码的布尔值
is_server_error()       # 5xx 返回是否 5 开头状态码的布尔值
复制代码
```

例如：

```python
#!/usr/bin/env python
# _*_ coding: UTF-8 _*_
from rest_framework import status

status.is_success(200)  # 返回 True
```
