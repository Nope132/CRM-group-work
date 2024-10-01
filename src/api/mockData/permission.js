import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'home/Home'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'User/User'
            },
            {
              //path: '/sales',
              //name: 'sales',
              label: '营销管理',
              icon: 'Memo',
              children: [
                {
                  path: '/sales0',
                  name: 'sales0',
                  label: '销售机会管理',
                  icon: 'Tickets',
                  url: 'SalesManage/SalesManage'
                },
                {
                  path: '/sales1',
                  name: 'sales1',
                  label: '客户开发计划',
                  icon: 'Tickets',
                  url: 'SalesManage/usersplan'
                }
              ]
            },
            {
              label: '客户管理',
              icon: 'Avatar',
              children: [
                {
                  path: '/client information',
                  name: 'client information',
                  label: '客户信息管理',
                  icon: 'Avatar',
                  url: 'ClientManage/ClientInformationManage'
                },
                {
                  path: '/client lose',
                  name: 'client lose',
                  label: '客户流失管理',
                  icon: 'Avatar',
                  url: 'ClientManage/ClientLoseManage'
                }
              ],
            },
            {
              path: '/service',
              name: 'service',
              label: '服务管理',
              icon: 'service',
              url: 'ServiceManage/ServiceManage'
            },
            {
              label: '分析报表',
              icon: 'DataAnalysis',
              children: [
                {
                  path: '/contri',
                  name: 'contri',
                  label: '客户贡献分析',
                  icon: 'DataAnalysis',
                  url: 'AnalysisReport/ContriAnalysis'
                },
                {
                  path: '/consti',
                  name: 'consti',
                  label: '客户构成分析',
                  icon: 'DataAnalysis',
                  url: 'AnalysisReport/ConstiAnalysis'
                },
                {
                  path: '/serve',
                  name: 'serve',
                  label: '客户服务分析',
                  icon: 'DataAnalysis',
                  url: 'AnalysisReport/ServiceAnalysis'
                },
                {
                  path: '/drain',
                  name: 'drain',
                  label: '客户流失分析',
                  icon: 'DataAnalysis',
                  url: 'AnalysisReport/DrainAnalysis'
                }
              ]
            },
            {
              label: '基础数据',
              icon: 'Management',
              children: [
                {
                  path: '/dict',
                  name: 'dict',
                  label: '数据字典管理',
                  icon: 'Management',
                  url: 'BasicData/DictManage'
                },
                {
                  path: '/product',
                  name: 'product',
                  label: '查询产品数据',
                  icon: 'Management',
                  url: 'BasicData/ProductQuery'
                },
                {
                  path: '/stock',
                  name: 'stock',
                  label: '查询库存',
                  icon: 'Management',
                  url: 'BasicData/StockQuery'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/index'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}