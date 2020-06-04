const Service = require('egg').Service;

class AuthService extends Service {
    // 查询权限列表数据
  async index() {
    const list = await this.app.mysql.select('auths');
    console.log(list);
    return list;

  }

//  角色列表数据
async rolesInfo(){
    const list = await this.app.mysql.select('roles');
    console.log(list);
    return list;
}
}

module.exports = AuthService;