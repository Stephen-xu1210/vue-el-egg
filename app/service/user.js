const Service = require('egg').Service;

class UserInfoService extends Service {
  // 查询用户数据
  async index() {
    const limitData= parseInt(this.ctx.query.pageSize);
    const offsetData = parseInt((this.ctx.query.pageNum-1)*this.ctx.query.pageSize);
    const queryNameData = this.ctx.query.queryValue;
    // 总数据量
    const allList = await this.app.mysql.select('users');
    // 每页数据量
    // const list = await this.app.mysql.select('users',{
    //   limit:limitData
    // });
    // 切换页数据量
    // const list = await this.app.mysql.select('users',{
    //   limit:limitData
    //   offset:offsetData
    // })
    // 搜索查询
    const sql =`select * from users 
                where name like "${queryNameData}%" 
                limit ${limitData} 
                offset ${offsetData}`;
    const list = await this.app.mysql.query(sql);
    // console.log('list',list);
    return {
      allList,
      list
    };
  }
  // 修改用户前的查询用户数据
  async editUserBefore(){
    const { id } = this.ctx.params;
    console.log('动态传入id为',id);
    const sql = `select * from users where id = ${id}`;
    const result = await this.app.mysql.query(sql);
    console.log(result);
    return result;
  }
  //修改用户
  async editUser(){
    const { name , email , phoneNum , id} = this.ctx.request.body;
    console.log("id:",id)
    console.log(typeof(id))
    const sql = `update users set name = '${name}',email = '${email}',phoneNum = '${phoneNum}'
                 where id = ${id}`;
    const result = await this.app.mysql.query(sql);
    console.log(result)
    if(result.affectedRows === 1) return true;
    
    return false;
  }
  // 添加用户
  async addUser(){
    const { username,roles,email,phonenum } = this.ctx.request.body;
    // const sql = `insert into users(id,name,email,phoneNum,status,roles) values (default,${username},${email},${phonenum},false,${roles})`;
    // const result = await this.app.mysql.query(sql);
    const result = await this.app.mysql.insert('users',{
      name:username,
      email:email,
      phoneNum:phonenum,
      status:false,
      roles:roles
    })

    console.log('userresult',result)
    // 判断影响行数 若为1 则新增成功
    if(result.affectedRows === 1) return '新增一条数据成功';

    return '新增数据失败';
  
  }

  // 删除用户数据
  async deleteUser(){
    const { id } = this.ctx.params;
    console.log('delete id',id);
    const sql = `delete from users where id = ${id}`;
    const result  = await this.app.mysql.query(sql);
    if(result.affectedRows === 1){
      return true;
    }
    return false;
  }
  // 登录验证
  async loginCheck(){
    const result = await this.app.mysql.select('user',{
      where:{username:this.ctx.request.body.userName , password:this.ctx.request.body.passWord}
        //  where:{username:'admin1',password:'123456'}

    });
    console.log('result',result)
    if(result == ''){
      return '';
    }else{
      return result;
    }
  }
}

module.exports = UserInfoService;