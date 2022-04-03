(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{583:function(s,t,e){"use strict";e.r(t);var a=e(17),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"rest-framework专栏讲解-八-viewset"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rest-framework专栏讲解-八-viewset"}},[s._v("#")]),s._v(" Rest-framework专栏讲解(八)：ViewSet")]),s._v(" "),e("p",[s._v("Django 项目的 "),e("strong",[s._v("ORM(Object Relational Mapping, 对象关系映射)")]),s._v(" 可以给我们省略构造 SQL 查询语句的麻烦, 但是对于试图, 我们已经构建了 Model 的情况下依旧需要创造一些逻辑代码, 那已知这些封装, 我们可以再对代码简化。")]),s._v(" "),e("h3",{attrs:{id:"viewset-操作"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#viewset-操作"}},[s._v("#")]),s._v(" ViewSet 操作")]),s._v(" "),e("p",[s._v("在标准的接口中, 提供了标准的创建/检索/更新/删除实例对象的路由, 如：")]),s._v(" "),e("div",{staticClass:"language-python line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("UserViewSet")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("viewsets"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ViewSet"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[s._v('"""\n    Example empty viewset demonstrating the standard\n    actions that will be handled by a router class.\n\n    If you\'re using format suffixes, make sure to also include\n    the `format=None` keyword argument for each action.\n    """')]),s._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("list")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("self"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" request"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pass")]),s._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("create")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("self"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" request"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pass")]),s._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("retrieve")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("self"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" request"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" pk"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("None")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pass")]),s._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("update")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("self"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" request"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" pk"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("None")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pass")]),s._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("partial_update")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("self"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" request"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" pk"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("None")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 不常用")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pass")]),s._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("destroy")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("self"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" request"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" pk"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("None")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pass")]),s._v("\n复制代码\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br")])]),e("p",[s._v("在分发期间你可以使用以下属性：")]),s._v(" "),e("ul",[e("li",[e("code",[s._v("basename")]),s._v("：用于创建 URL 的基础名称")]),s._v(" "),e("li",[e("code",[s._v("action")]),s._v("：当前操作的动作名称字符串(如 "),e("code",[s._v("list")]),s._v(")")]),s._v(" "),e("li",[e("code",[s._v("detail")]),s._v("：是否返回列表/详情信息的布尔值")]),s._v(" "),e("li",[e("code",[s._v("suffix")]),s._v("：视图集类型的显示后缀")]),s._v(" "),e("li",[e("code",[s._v("name")]),s._v("：视图集的显示名称, 会与 "),e("code",[s._v("suffix")]),s._v(" 参数互斥")]),s._v(" "),e("li",[e("code",[s._v("description")]),s._v("：单个试图的显示描述")])]),s._v(" "),e("h3",{attrs:{id:"api参考"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#api参考"}},[s._v("#")]),s._v(" API参考")]),s._v(" "),e("p",[e("code",[s._v("ViewSet")]),s._v(" 集成自 "),e("code",[s._v("APIView")]),s._v(", 你可以使用任何标准属性获取数值帮助 API 构建, 如 "),e("code",[s._v("permission_classes")]),s._v(", "),e("code",[s._v("authentication_classes")]),s._v(" 来帮助试图控制访问策略。")]),s._v(" "),e("p",[e("code",[s._v("GenericViewSet")]),s._v(" 是继承自 "),e("code",[s._v("GenericAPIView")]),s._v(", 并提供了 "),e("code",[s._v("get_object")]),s._v(" 和 "),e("code",[s._v("get_queryset")]),s._v(" 的方法以及其他视图行为的方法。")]),s._v(" "),e("p",[e("code",[s._v("ModelViewSet")]),s._v(" 是继承自 "),e("code",[s._v("GenericAPIView")]),s._v(", 并支持 "),e("code",[s._v(".list()")]),s._v(", "),e("code",[s._v(".retrieve()")]),s._v(", "),e("code",[s._v(".create()")]),s._v(", "),e("code",[s._v(".update()")]),s._v(", "),e("code",[s._v(".partial_update()")]),s._v(" 和 "),e("code",[s._v(".destroy()")]),s._v(" 方法的视图类, 通常你需要指定 "),e("code",[s._v("queryset")]),s._v(" 和 "),e("code",[s._v("serializer_class")]),s._v(" 两个属性。")]),s._v(" "),e("p",[e("code",[s._v("ReadOnlyModelViewSet")]),s._v(" 时继承自"),e("code",[s._v("GenericAPIView")]),s._v(", 并支持 "),e("code",[s._v(".list()")]),s._v(", "),e("code",[s._v(".retrieve()")]),s._v(" 的只读视图类, 通常你需要指定 "),e("code",[s._v("queryset")]),s._v(" 和 "),e("code",[s._v("serializer_class")]),s._v(" 两个属性。")])])}),[],!1,null,null,null);t.default=n.exports}}]);