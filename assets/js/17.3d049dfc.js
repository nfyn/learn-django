(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{579:function(t,s,n){"use strict";n.r(s);var a=n(17),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"rest-framework专栏讲解-二十一-content-negotiation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rest-framework专栏讲解-二十一-content-negotiation"}},[t._v("#")]),t._v(" Rest-framework专栏讲解(二十一)：Content negotiation")]),t._v(" "),n("p",[t._v("内容协商是根据客户端或服务器的首选项, 从多个可能的表示中选择一个返回给客户端的过程。")]),t._v(" "),n("h3",{attrs:{id:"确定可接受的渲染器"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#确定可接受的渲染器"}},[t._v("#")]),t._v(" 确定可接受的渲染器")]),t._v(" "),n("p",[t._v("框架使用一种简单的内容协商样式, 据可用的渲染器, 每个渲染器的优先级以及客户端的 "),n("code",[t._v("Accept:")]),t._v(" 标头, 确定应将哪种媒体类型返回给客户端, 使用的样式部分是客户端驱动的, 部分是服务器驱动的。")]),t._v(" "),n("ol",[n("li",[t._v("较具体的媒体类型优先于较不具体的媒体类型")]),t._v(" "),n("li",[t._v("如果多种媒体类型具有相同的特异性, 则根据为给定视图配置的渲染器的顺序来优先考虑")])]),t._v(" "),n("p",[t._v("例如给定以下 "),n("code",[t._v("Accept")]),t._v(" 标头：")]),t._v(" "),n("div",{staticClass:"language-headers line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("application/json; indent=4, application/json, application/yaml, text/html, */*\n复制代码\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br")])]),n("p",[t._v("每种给定媒体类型的优先级为：")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("application/json; indent=4")])]),t._v(" "),n("li",[n("code",[t._v("application/json")]),t._v("、"),n("code",[t._v("application/yaml")]),t._v("、"),n("code",[t._v("text/html")])]),t._v(" "),n("li",[n("code",[t._v("*/*")])])]),t._v(" "),n("p",[t._v("如果请求的视图只配置了 "),n("code",[t._v("YAML")]),t._v(" 和 "),n("code",[t._v("HTML")]),t._v(" 的渲染器, 那么框架将选择 "),n("code",[t._v("renderer_classes")]),t._v(" 列表中最先列出的渲染器或默认的 "),n("code",[t._v("renderer_classes")]),t._v(" 设置。")]),t._v(" "),n("p",[t._v("有关 "),n("code",[t._v("HTTP Accept")]),t._v(" 标题的更多信息，请参见 "),n("a",{attrs:{href:"https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC 2616"),n("OutboundLink")],1),t._v("。")]),t._v(" "),n("h3",{attrs:{id:"自定义"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#自定义"}},[t._v("#")]),t._v(" 自定义")]),t._v(" "),n("p",[t._v("您不太可能希望为框架提供一个自定义的内容协商方案, 但如果需要您可以这样做, 若要实现自定义内容协商方案请重写 "),n("code",[t._v("BaseContentNegotiation")]),t._v("。")]),t._v(" "),n("p",[t._v("框架的内容协商类处理对请求的适当解析器和响应的适当渲染器的选择, 因此您应该同时实现 "),n("code",[t._v(".select_parser(request, parsers)")]),t._v(" 和 "),n("code",[t._v(".select_renderer(request, renderers, format_suffix)")]),t._v(" 方法。")]),t._v(" "),n("p",[n("code",[t._v("select_parser()")]),t._v(" 方法应该从可用解析器列表中返回一个解析器实例, 如果没有一个解析器能够处理传入的请求, 则不返回或返回 "),n("code",[t._v("None")]),t._v("。")]),t._v(" "),n("p",[n("code",[t._v("select_renderer()")]),t._v(" 方法应返回一个双元组 "),n("code",[t._v("(渲染器实例, 媒体类型)")]),t._v(", 或引发 "),n("code",[t._v("NotAcceptable")]),t._v(" 异常。")]),t._v(" "),n("p",[t._v("以下是一个自定义内容协商类, 在选择适当的解析器或渲染器时它将忽略客户端请求：")]),t._v(" "),n("div",{staticClass:"language-python line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-python"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" rest_framework"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("negotiation "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" BaseContentNegotiation\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IgnoreClientContentNegotiation")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("BaseContentNegotiation"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("select_parser")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" request"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parsers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v('"""\n        Select the first parser in the `.parser_classes` list.\n        """')]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" parsers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("select_renderer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" request"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" renderers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" format_suffix"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v('"""\n        Select the first renderer in the `.renderer_classes` list.\n        """')]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("renderers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" renderers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("media_type"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n复制代码\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br"),n("span",{staticClass:"line-number"},[t._v("11")]),n("br"),n("span",{staticClass:"line-number"},[t._v("12")]),n("br"),n("span",{staticClass:"line-number"},[t._v("13")]),n("br"),n("span",{staticClass:"line-number"},[t._v("14")]),n("br"),n("span",{staticClass:"line-number"},[t._v("15")]),n("br")])]),n("h3",{attrs:{id:"设置内容协商"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#设置内容协商"}},[t._v("#")]),t._v(" 设置内容协商")]),t._v(" "),n("p",[t._v("可以使用 "),n("code",[t._v("DEFAULT_CONTENT_NEGOTIATION_CLASS")]),t._v(" 全局设置默认内容协商类, 例如以下设置将使用我们的示例 "),n("code",[t._v("IgnoreClientContentNegotiation")]),t._v(" 类：")]),t._v(" "),n("div",{staticClass:"language-python line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-python"}},[n("code",[t._v("REST_FRAMEWORK "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DEFAULT_CONTENT_NEGOTIATION_CLASS'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'myapp.negotiation.IgnoreClientContentNegotiation'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n复制代码\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br")])]),n("p",[t._v("您还可以使用基于 "),n("code",[t._v("APIView")]),t._v(" 类的视图来设置用于单个视图或视图集的内容协商：")]),t._v(" "),n("div",{staticClass:"language-python line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-python"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" myapp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("negotiation "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" IgnoreClientContentNegotiation\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" rest_framework"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("response "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Response\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" rest_framework"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("views "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" APIView\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("NoNegotiationView")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("APIView"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v('"""\n    An example view that does not perform content negotiation.\n    """')]),t._v("\n    content_negotiation_class "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" IgnoreClientContentNegotiation\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" request"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("format")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("None")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Response"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accepted media type'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" request"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("accepted_renderer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("media_type\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br"),n("span",{staticClass:"line-number"},[t._v("11")]),n("br"),n("span",{staticClass:"line-number"},[t._v("12")]),n("br"),n("span",{staticClass:"line-number"},[t._v("13")]),n("br"),n("span",{staticClass:"line-number"},[t._v("14")]),n("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);