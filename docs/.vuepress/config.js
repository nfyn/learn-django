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
                    {title: '学前必读', path: '/pages/Introduction'}
                ]
            },
            {
                title: '基础学习',
                path: '/pages/Introduction',
                collapsable: false,
                children: [
                    {title: '扩展内置User用户模型', path:'/pages/扩展内置User用户模型.md'}
                ]
            }
        ]
    }
  }
