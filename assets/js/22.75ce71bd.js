(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{584:function(e,t,a){"use strict";a.r(t);var r=a(17),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"rest-framework专栏讲解-六-response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rest-framework专栏讲解-六-response"}},[e._v("#")]),e._v(" Rest-framework专栏讲解(六)：Response")]),e._v(" "),a("p",[e._v("当你需要自定义返回响应对象的时候, 你可能需要用到 "),a("code",[e._v("Response")]),e._v(" 类, 你只需要从框架中导入到需要的服务模块中：")]),e._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("from")]),e._v(" rest_framework"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("response "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("import")]),e._v(" Response\n复制代码\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("p",[e._v("实例化对象你可能需要以下参数：")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("data")]),e._v("：响应的序列化数据")]),e._v(" "),a("li",[a("code",[e._v("status")]),e._v("：响应的状态码")]),e._v(" "),a("li",[a("code",[e._v("template_name")]),e._v("：要使用的模板名称")]),e._v(" "),a("li",[a("code",[e._v("headers")]),e._v("：在响应中需要添加的 HTTP 标签头")]),e._v(" "),a("li",[a("code",[e._v("content_type")]),e._v("：响应内容的类型, 通常会自动设置, 除非你需要显式手动指定")])]),e._v(" "),a("h3",{attrs:{id:"data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data"}},[e._v("#")]),e._v(" .data")]),e._v(" "),a("p",[e._v("获取响应实例对象的序列化数据。")]),e._v(" "),a("h3",{attrs:{id:"status-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status-code"}},[e._v("#")]),e._v(" .status_code")]),e._v(" "),a("p",[e._v("获取响应实例的状态码。")]),e._v(" "),a("h3",{attrs:{id:"content"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#content"}},[e._v("#")]),e._v(" .content")]),e._v(" "),a("p",[e._v("当你优先调用了 "),a("code",[e._v(".render()")]),e._v(" 方法后, 你可以使用该属性获取响应呈现的内容数据。")]),e._v(" "),a("h3",{attrs:{id:"template-name"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#template-name"}},[e._v("#")]),e._v(" .template_name")]),e._v(" "),a("p",[e._v("当你使用了模板渲染器的时候, 可以使用该属性访问模板名称。")]),e._v(" "),a("h3",{attrs:{id:"accepted-renderer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#accepted-renderer"}},[e._v("#")]),e._v(" .accepted_renderer")]),e._v(" "),a("p",[e._v("用于呈现响应的实例对象。")]),e._v(" "),a("h3",{attrs:{id:"accepted-media-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#accepted-media-type"}},[e._v("#")]),e._v(" .accepted_media_type")]),e._v(" "),a("p",[e._v("用于获取数据内容的类型。")]),e._v(" "),a("h3",{attrs:{id:"renderer-context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#renderer-context"}},[e._v("#")]),e._v(" .renderer_context")]),e._v(" "),a("p",[e._v("附加上下文信息的字典数据, 该字典将传递给渲染器的 "),a("code",[e._v(".render()")]),e._v(" 方法。")]),e._v(" "),a("h3",{attrs:{id:"rander"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rander"}},[e._v("#")]),e._v(" rander()")]),e._v(" "),a("p",[e._v("与任何的 "),a("code",[e._v("TemplateResponse")]),e._v(" 方法一样, 调用此方法可将响应的序列化数据呈现为最终响应内容, 当 "),a("code",[e._v(".render()")]),e._v(" 被调用时, 响应内容将被设置为 "),a("code",[e._v(".render(data, accepted_media_type, renderer_context)")]),e._v(" 对 "),a("code",[e._v("accepted_renderer")]),e._v(" 实例调用的结果。")])])}),[],!1,null,null,null);t.default=s.exports}}]);