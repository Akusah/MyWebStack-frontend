<template>
    <div class="boxed-container">
      <nav class="navbar horizontal-menu navbar-fixed-top">
        <div class="navbar-inner">
          <div class="navbar-brand">
            <router-link to="/" class="logo">
              <img src="../assets/images/logo_dark@2x.png" width="100%" alt="" class="hidden-xs">
            </router-link>
          </div>
          <div class="navbar-mobile-clear"></div>
        </div>
      </nav>
  
      <div class="page-container">
        <div class="main-content" style="">
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-default">
                <!-- 关于网站 -->
                <h4 class="text-gray">关于网站</h4>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-sm-12">
                      <blockquote>
                        <p>有一段时间我发现我的收藏夹越来越多，很难找到某个不常用的网站。
                          所以就有了这个网站，这里收集的基本都是我自己浏览器收藏夹里的网站，我平时用的相对比较多的一些都在这里。</p>
                        <br />
                        <p>如果你也是设计师，如果你也正好喜欢设计，那希望这个网站能给你带来一些作用。</p>
                        <p>闲聊或者有任何建议都可以加QQ群交流：xxxxxxx</p>
                      </blockquote>
                    </div>
                  </div>
                  <!-- 关于站长 -->
                  <h4 class="text-gray">关于站长</h4>
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="xe-widget xe-conversations box2 label-info"
                           onclick="window.open('http://www.viggoz.com/', '_blank')"
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title=""
                           data-original-title="http://www.viggoz.com/">
                        <div class="xe-comment-entry">
                          <a class="xe-user-img">
                            <img :src="authorImg" class="img-circle" width="40">
                          </a>
                          <div class="xe-comment">
                            <a href="#" class="xe-user-name overflowClip_1">
                              <strong>Designer. Viggo.</strong>
                            </a>
                            <p class="overflowClip_2"> Full-time UI designer with an enduring interest in Coding.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div class="row">
                        <div class="col-sm-12">
                          <br />
                          <blockquote>
                            <p>
                              这是一个公益项目，而且是<a href="https://github.com/WebStackPage/WebStackPage.github.io"> 开源 </a>
                              <iframe src="https://ghbtns.com/github-btn.html?user=WebStackPage&repo=WebStackPage.github.io&type=star&count=true"
                                      frameborder="0" scrolling="0" width="100px" height="20px"></iframe> 的。你也可以拿来制作自己的网址导航。
                            </p>
                          </blockquote>
                        </div>
                      </div>
                      <br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  const authorImg = './assets/images/logos/viggoz.png'
  
  </script>
  
  <style>
  .boxed-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  }
  
  .navbar {
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid #ddd;
  }
  
  .navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  }
  
  .navbar-brand {
  display: flex;
  align-items: center;
  }
  
  .logo img {
  width: 100%;
  }
  
  .navbar-mobile-clear {
  flex: 1;
  }
  
  .page-container {
  padding-top: 30px;
  }
  
  .main-content {
  margin-bottom: 40px;
  }
  
  .panel {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .panel-body {
  padding: 20px;
  }
  
  .text-gray {
  color: #333;
  margin-left: 15px;
  margin-right: 15px;
  }
  
  .row {
  margin-left: 15px;
  margin-right: 15px;
  
  }
  
  .col-md-12 {
  width: 100%;
  }
  
  .panel-default {
  background-color: #fff;
  }
  
  blockquote {
  margin: 0;
  padding: 0;
  border-left: 5px solid #ddd;
  padding-left: 15px;
  font-size: 14px;
  line-height: 1.5;
  }
  
  blockquote p {
  margin-bottom: 10px;
  }
  
  blockquote p:last-child {
  margin-bottom: 0;
  }
  
  .col-sm-12 {
  width: 100%;
  }
  
  .xe-widget {
  cursor: pointer;
  margin-bottom: 10px;
  }
  
  .xe-comment-entry {
  display: flex;
  align-items: center;
  }
  
  .xe-user-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  }
  
  .xe-user-img img {
  width: 100%;
  }
  
  .xe-comment {
  flex: 1;
  }
  
  .xe-user-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  }
  
  .overflowClip_1,
  .overflowClip_2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  }
  
  .overflowClip_2 {
  -webkit-line-clamp: 2;
  }
  
  .col-md-8 {
  width: 66.6667%;
  }
  
  .col-sm-12 {
  width: 100%;
  }
  
  .label-info {
  background-color: #5bc0de;
  color: #fff;
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 4px;
  }
  
  .label-info:hover {
  background-color: #31b0d5;
  }
  
  .label-info[data-toggle="tooltip"] {
  cursor: pointer;
  }
  
  .label-info[data-toggle="tooltip"]:hover {
  color: #fff;
  }
  
  .label-info[data-toggle="tooltip"]::after {
  content: attr(data-original-title);
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 4px;
  z-index: 999;
  }
  
  .label-info[data-toggle="tooltip"]::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
  }
  
  .label-info[data-toggle="tooltip"][data-placement="left"]::after {
  transform: translateX(-50%) translateY(-100%);
  top: -10px;
  left: 50%;
  }
  
  .label-info[data-toggle="tooltip"][data-placement="left"]::before {
  transform: translateX(-50%) translateY(-100%) rotate(135deg);
  top: -5px;
  left: 50%;
  }
  
  .footer {
  background-color: #f5f5f5;
  padding: 10px 0;
  text-align: center;
  color: #888;
  }
  
  .footer a {
  color: #888;
  text-decoration: none;
  }
  
  .footer a:hover {
  color: #555;
  }
  
  .footer p {
  margin-bottom: 0;
  }
  </style>