import Mock from 'mockjs'

let UserList = []
const length = 10

for (let i = 0; i < length; i++) {
  UserList.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      state: Mock.Random.integer(1, 2)
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name,
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    return {
      code: 200,
      data: {
        count: UserList.length,
        userList: UserList
      }
    }
  }
}