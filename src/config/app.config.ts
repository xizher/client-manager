export const config = {
  title: '📚信息管理系统📚',
  routerConfig: {
    routesConfig: [
      { name: 'login' },
      { name: 'main' },
      { path: '/', redirect: '/main' },
    ],
    mode: 'hash',
  },
  serviceConfig: {
    timeout: 8000,
    withCookie: true,
  },
}

function install () : void {
  document.title = config.title
}

export default { install }
