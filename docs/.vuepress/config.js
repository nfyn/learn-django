module.exports = {
    title: 'Django学习文档',
    description: 'Django学习笔记',
    base: '/learn-django/',
    theme: 'reco',
    markdown: {
        lineNumbers: true,
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    plugins: [['vuepress-plugin-code-copy', true]],
    themeConfig: {
        subSidebar: 'auto',
        nav: [
            {text: '首页', link: '/'},
            {
                text: '南风以南的博客',
                items: [
                    {text: 'Github', link: 'https://github.com/nfyn'}
                ]
            }
        ],
        sidebar: [
            {
                title: '欢迎学习',
                collapsable: false,
                children: [
                    {title: '简介', path: '/pages/Introduction'}
                ]
            },
            {
                title: '基础学习',
                collapsable: false,
                children: [
                    {title: '扩展内置User用户模型', path:'/pages/扩展内置User用户模型.md'},
                    {title: 'Django中的信号及其用法', path:'/pages/Django中的信号及其用法.md'}
                ]
            },
            {
                title: 'DRF学习',
                collapsable: false,
                children: [
                    {title: 'Rest-framework专栏讲解(一)：介绍', path:'/drf/Rest-framework专栏讲解(一)：介绍.md'},
                    {title: 'Rest-framework专栏讲解(二)：View', path:'/drf/Rest-framework专栏讲解(二)：View.md'},
                    {title: 'Rest-framework专栏讲解(三)：Generic view', path:'/drf/Rest-framework专栏讲解(三)：Generic view.md'},
                    {title: 'Rest-framework专栏讲解(四)：Status', path:'/drf/Rest-framework专栏讲解(四)：Status.md'},
                    {title: 'Rest-framework专栏讲解(五)：Request', path:'/drf/Rest-framework专栏讲解(五)：Request.md'},
                    {title: 'Rest-framework专栏讲解(六)：Response', path:'/drf/Rest-framework专栏讲解(六)：Response.md'},
                    {title: 'Rest-framework专栏讲解(七)：Router', path:'/drf/Rest-framework专栏讲解(七)：Router.md'},
                    {title: 'Rest-framework专栏讲解(八)：ViewSet', path:'/drf/Rest-framework专栏讲解(八)：ViewSet.md'},
                    {title: 'Rest-framework专栏讲解(九)：Parsers', path:'/drf/Rest-framework专栏讲解(九)：Parsers.md'},
                    {title: 'Rest-framework专栏讲解(十)：Renderes', path:'/drf/Rest-framework专栏讲解(十)：Renderes'},
                    {title: 'Rest-framework专栏讲解(十一)：Serializers(1)', path:'/drf/Rest-framework专栏讲解(十一)：Serializers(1).md'},
                    {title: 'Rest-framework专栏讲解(十二)：Serializer(2)', path:'/drf/Rest-framework专栏讲解(十二)：Serializer(2).md'},
                    {title: 'Rest-framework专栏讲解(十三)：Serializer Fields', path:'/drf/Rest-framework专栏讲解(十三)：Serializer Fields.md'},
                    {title: 'Rest-framework专栏讲解(十四)：Serializer Relations', path:'/drf/Rest-framework专栏讲解(十四)：Serializer Relations.md'},
                    {title: 'Rest-framework专栏讲解(十五)：Validators', path:'/drf/Rest-framework专栏讲解(十五)：Validators.md'},
                    {title: 'Rest-framework专栏讲解(十六)：Authentication', path:'/drf/Rest-framework专栏讲解(十六)：Authentication.md'},
                    {title: 'Rest-framework专栏讲解(十七)：Permissions', path:'/drf/Rest-framework专栏讲解(十七)：Permissions.md'},
                    {title: 'Rest-framework专栏讲解(十八)：Caching', path:'/drf/Rest-framework专栏讲解(十八)：Caching.md'},
                    {title: 'Rest-framework专栏讲解(十九)：Throttling', path:'/drf/Rest-framework专栏讲解(十九)：Throttling.md'},
                    {title: 'Rest-framework专栏讲解(二十)：Filtering', path:'/drf/Rest-framework专栏讲解(二十)：Filtering.md'},
                    {title: 'Rest-framework专栏讲解(二十一)：Content negotiation', path:'/drf/Rest-framework专栏讲解(二十一)：Content negotiation.md'},
                    {title: 'Rest-framework专栏讲解(二十二)：Format suffixes', path:'/drf/Rest-framework专栏讲解(二十二)：Format suffixes.md'},
                    {title: 'Rest-framework专栏讲解(二十三)：Returning URLs', path:'/drf/Rest-framework专栏讲解(二十三)：Returning URLs.md'}
                ]
            }
        ]
    }
  }
