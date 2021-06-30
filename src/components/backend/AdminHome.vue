<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../../assets/logo.png" />
        <span>叮当药店后台系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapase ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse = "isCollapase"
          :collapse-transition = "false"
          :router="true"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-goods"></i>
              <!-- 文本 -->
              <span>药品</span>
            </template>
            <el-menu-item index="products">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>药品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="add_product">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>添加药品</span>
              </template>
            </el-menu-item>
            <el-menu-item index="product_categories">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>药品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单</span>
            </template>
            <el-menu-item index="orders">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-lock"></i>
              <span>权限</span>
            </template>
            <el-menu-item index="/users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="doctors">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>坐诊医生列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>营销</span>
            </template>
            <el-menu-item index="product_recommend">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>药品推荐</span>
              </template>
            </el-menu-item>
            <el-menu-item index="health_knowledge">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>健康知识</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据</span>
            </template>
            <el-menu-item index="data">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>数据统计</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 是否折叠
      isCollapase: false,
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapase = !this.isCollapase;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding-left: 5px;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #eee;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>