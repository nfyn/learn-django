(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{597:function(s,t,a){"use strict";a.r(t);var n=a(17),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"django中的信号及其用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#django中的信号及其用法"}},[s._v("#")]),s._v(" Django中的信号及其用法")]),s._v(" "),a("p",[s._v('Django中提供了"信号调度",用于在框架执行操作时解耦.一些动作发生的时候,系统会根据信号定义的函数执行相应的操作')]),s._v(" "),a("h2",{attrs:{id:"django中内置的signal"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#django中内置的signal"}},[s._v("#")]),s._v(" "),a("strong",[s._v("Django中内置的signal")])]),s._v(" "),a("ul",[a("li",[a("p",[a("em",[a("strong",[s._v("Model_signals")])])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("pre_init                        # Django中的model对象执行其构造方法前,自动触发\npost_init                       # Django中的model对象执行其构造方法后,自动触发\npre_save                        # Django中的model对象保存前,自动触发\npost_save                       # Django中的model对象保存后,自动触发\npre_delete                      # Django中的model对象删除前,自动触发\npost_delete                     # Django中的model对象删除后,自动触发\nm2m_changed                     # Django中的model对象使用m2m字段操作数据库的第三张表(add,remove,clear,update),自动触发\nclass_prepared                  # 程序启动时,检测到已注册的model类,对于每一个类,自动触发\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])])]),s._v(" "),a("li",[a("p",[a("em",[a("strong",[s._v("Managemeng_signals")])])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("pre_migrate                     # 执行migrate命令前,自动触发\npost_migrate                    # 执行migrate命令后,自动触发 \n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])]),s._v(" "),a("li",[a("p",[a("em",[a("strong",[s._v("Request/response_signals")])])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("request_started                 # 请求到来前,自动触发\nrequest_finished                # 请求结束后,自动触发\ngot_request_exception           # 请求异常时,自动触发\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])])]),s._v(" "),a("li",[a("p",[a("em",[a("strong",[s._v("Test_signals")])])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("setting_changed                 # 配置文件改变时,自动触发\ntemplate_rendered               # 模板执行渲染操作时,自动触发\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])]),s._v(" "),a("li",[a("p",[a("em",[a("strong",[s._v("Datebase_Wrapperd")])]),s._v("\nconnection_created              # 创建数据库连接时,自动触发")])])]),s._v(" "),a("h2",{attrs:{id:"django-信号的使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#django-信号的使用"}},[s._v("#")]),s._v(" Django 信号的使用")]),s._v(" "),a("p",[s._v("对于Django内置的信号,仅需注册指定信号,当程序执行相应操作时,系统会自动触发注册函数")]),s._v(" "),a("ul",[a("li",[a("p",[a("code",[s._v("models.py")]),s._v("中的代码:")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("db "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" models\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("UserInfo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Model"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("CharField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("max_length"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    pwd"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("CharField"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("max_length"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])])]),s._v(" "),a("li",[a("p",[a("code",[s._v("views.py")]),s._v("中的代码:")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("shortcuts "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" render"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("HttpResponse\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" app01 "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v("  models\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("UserInfo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("objects"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("create"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"mysql"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("pwd"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"mysql123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" HttpResponse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ok"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("项目的"),a("code",[s._v("__init__.py")]),s._v("文件中代码:")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("models"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("signals "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" pre_save"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("post_save\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("pre_save_func")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sender"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("**")]),s._v("kwargs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"pre_save_func"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"pre_save_msg:"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("sender"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("kwargs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("post_save_func")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sender"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("**")]),s._v("kwargs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"post_save_func"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"post_save_msg:"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("sender"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("kwargs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\npre_save"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("connect"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("pre_save_func"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("             "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# models对象保存前触发callback函数")]),s._v("\npost_save"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("connect"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("post_save_func"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("           "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# models对象保存后触发函数")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("也可以使用装饰器来触发信号,把上面"),a("code",[s._v("__init__.py")]),s._v("中的代码修改:")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("core"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("signals "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" request_finished\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("dispatch "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" receiver\n\n"),a("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[s._v("@receiver")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("request_finished"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("callback")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sender"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("**")]),s._v("kwargs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Request finished!"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])])])]),s._v(" "),a("h2",{attrs:{id:"自定义信号"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自定义信号"}},[s._v("#")]),s._v(" 自定义信号")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("定义信号\n新建一个项目,配置好路由,在项目根目录下创建一个"),a("code",[s._v("singal_test.py")]),s._v("的文件,内容为")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("dispatch\n\naction"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("django"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("dispatch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Signal"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("providing_args"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"aaaa"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"bbbb"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("注册信号\n项目应用下面的"),a("code",[s._v("__init__.py")]),s._v("文件内容:")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" singal_test "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" action\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("pre_save_func")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sender"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("**")]),s._v("kwargs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"pre_save_func"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"pre_save_msg:"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("sender"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("kwargs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    \naction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("connect"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("pre_save_func"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("触发信号\nviews视图函数内容:")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" singal_test "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" action\n\naction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("send"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sender"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"python"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("aaa"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"111"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("bbb"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"222"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])])])])])}),[],!1,null,null,null);t.default=e.exports}}]);