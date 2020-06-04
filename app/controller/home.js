'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, 7001';
  }

  // 请求用户数据接口
  async userInfo(){
    const { ctx } = this;
    const { allList , list } = await this.service.user.index();
    ctx.body = {
      res:{
        allList,
        list
      }
    };
  }

  // 修改前请求用户数据接口
  async editUserInfo(){
    const { ctx } = this;
    const result = await this.service.user.editUserBefore();
    ctx.body = {
      result
    }
  }

  // 修改用户接口
  async editUser(){
    const { ctx } = this;
    const result  = await this.service.user.editUser();
    if(!result){
      ctx.body = {
        status:500,
        message:'更新数据失败'
      }
    }else{
      ctx.body = {
        status:200,
        message:'更新数据成功'
      }
    }
    
  } 
  // 添加用户接口
  async addUserInfo(){
    const { ctx } = this;
    const result = await this.service.user.addUser();
    console.log('homeresult',result)
    ctx.body = result;
   
  }

  // 删除用户接口
  async deleteUserInfo(){
    const { ctx }  = this;
    const result = await this.service.user.deleteUser();
    console.log(result);
    if(result){
      ctx.body = {
        meta:{
          status:200,
          message:'删除数据成功'
        }
      }
    }else{
      ctx.body = {
        meta:{
          status:500,
          message:'删除数据失败'
        }
      }
    }
    
  }

  // 权限列表数据
  async authInfo(){
    const { ctx } = this;
    const res = await this.service.auth.index();
    console.log('res',res);
    ctx.body = res;
  }
  // 角色列表数据
  async rolesInfo(){
    const { ctx } = this;
    const res = await this.service.auth.rolesInfo();
    console.log('res',res);
    ctx.body = res;
  }
  // 登录验证
  async loginCheck(){
    const { ctx } = this;
    const res = await this.service.user.loginCheck();
    console.log('res',res[0].user);
    if(res == ''){
      ctx.body = {
        status:404,
        message:'查无此用户，登录失败'
      };
    }else{
      ctx.body = {
        status:200,
        message:'登录成功',
        token:'token123123suibian',
        username:res[0].user
      };
    }
  }
}

module.exports = HomeController;
