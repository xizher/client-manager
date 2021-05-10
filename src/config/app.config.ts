export const config = {
  title: '📚信息管理系统📚',
  routerConfig: {
    routesConfig: [
      { name: 'login' },
      {
        name: 'main',
          children: [
            { name: 'main/home' },
            { name: 'main/blog' },
            { name: 'main/pwd' },
            { path: '/main', redirect: '/main/home' },
        ]
      },
      { path: '/', redirect: '/main' },
    ],
    mode: 'hash',
  },
  serviceConfig: {
    timeout: 8000,
    withCookie: true,
  },
  navConfig: {
    items: [
      { path: '/main/home', alias: '主页' },
      { path: '/main/blog', alias: '文档库' },
      { path: '/main/pwd', alias: '口令备份库' },
      { path: '/login', alias: '退出登录' },
    ],
    defaultPath: '/main/blog'
  },
}

function install () : void {
  document.title = config.title
}

export default { install }
