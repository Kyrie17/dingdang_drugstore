import Vue from 'vue'
import Router from 'vue-router'

// 后台页面
import AdminLogin from '../components/backend/AdminLogin.vue'
import AdminHome from '../components/backend/AdminHome.vue'
import Welcome from '../components/backend/Welcome.vue'
import Users from '../components/backend/user/Users.vue'
import AddProduct from '../components/backend/product/AddProduct.vue'
import Products from '../components/backend/product/Products.vue'
import ProductCategories from '../components/backend/product/ProductCategories.vue'
import Orders from '../components/backend/order/Orders.vue'
import Doctors from '../components/backend/user/Doctors.vue'
import Data from '../components/backend/data/Data.vue'
import ProductRecommend from '../components/backend/marketing/ProductRecommend.vue'
import HealthKnowledge from '../components/backend/marketing/HealthKnowledge.vue'

// 用户页面
import Login from '../components/frontend/Login.vue'
import Home from '../components/frontend/Home.vue'
import Cart from '../components/frontend/Cart.vue'
import User from '../components/frontend/User/User.vue'
import OrderList from '../components/frontend/User/children/OrderList.vue'
import GoodsDetails from '../components/frontend/Goods/GoodsDetails.vue'
import Checkout from '../components/frontend/Checkout/Checkout.vue'
import Payment from '../components/frontend/Payment/Payment.vue'
import Search from '../components/frontend/Search/Search.vue'   
import AddressList from '../components/frontend/User/children/AddressList.vue'
import Information from '../components/frontend/User/children/Information.vue'


// 医生页面
import DoctorHome from '../components/doctor//DoctorHome.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    // 用户界面
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/cart', component: Cart },
    { path: '/goodsDetails', component: GoodsDetails },
    { path: '/checkout', component: Checkout },
    { path: '/payment', component: Payment },
    { path: '/search', component: Search },
    // 个人中心
    {
      path: '/user',
      name: 'user',
      component: User,
      redirect: '/user/orderList',
      children: [
        {path: 'orderList', name: '订单列表', component: OrderList},
        {path: 'information', name: '账户资料', component: Information},
        {path: 'addressList', name: '收货地址', component: AddressList},
        // {path: 'help', name: '帮助', component: Help}
      ]
    },

    // 管理员页面
    { path: '/adminlogin', component: AdminLogin },
    {
      path: '/adminhome', component: AdminHome,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/doctors', component: Doctors },
        { path: '/add_product', component: AddProduct },
        { path: '/products', component: Products },
        { path: '/product_categories', component: ProductCategories },
        { path: '/orders', component: Orders },
        { path: '/data', component: Data },
        { path: '/product_recommend', component: ProductRecommend },
        { path: '/health_knowledge', component: HealthKnowledge }
      ]
    },

    // 坐诊医生界面
    {path: '/doctorHome', component: DoctorHome},
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是个函数，表示放行
  // next() 放行，next('/adminlogin') 强制跳转
  // if (to.path == '/adminlogin') return next()
  // // 获取token
  // const tokenStr = window.sessionStorage.getItem('token')
  // if (!tokenStr) return next('/adminlogin')
  document.title = '叮当药店'
  next()
})

export default router