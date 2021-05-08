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
      { path: '/main/blog', alias: '文档' },
    ],
    defaultPath: 0
  },
}

function install () : void {
  document.title = config.title
}

export default { install }
