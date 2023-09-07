# MyWebStack-frontend

本项目这是一个网址导航网站，前台结构参考https://webstack.cc/cn/index.html。   
本前端项目基于 [Vue3](https://v3.cn.vuejs.org) + [Element Plus](https://element-plus.org/zh-CN) + [Vite](https://cn.vitejs.dev) 版本。

[后端项目](https://github.com/Akusah/MyWebStack-backend.git)基于Springboot + Springsecurity + MybatisPlus开发；  


## 主要实现的功能
1. 前台(用户界面)
    1. 登录注册,退出登录
    2. 网页详情页下，评论、评分功能
2. 后台(管理员界面)
    1. 用户管理
    2. 数据统计（网站点击量统计）
    3. 评论管理
    4. 网站管理
    5. 目录管理（实现中..）



## 安装步骤
1. 下载依赖  
```sh
npm install
```

2. 运行项目

```sh
npm run dev
```

3. 生产环境的编译和压缩

```sh
npm run build
```

## 更新日志
### 2023-09-07
#### 新增

* 完成后台项目当中的目录管理模块，包括添加和删除目录。 
* 完成后台项目当中的管理Web模块，完善了修改和添加Web时针对目录的操作。
* 完成了logo图片的上传功能。
