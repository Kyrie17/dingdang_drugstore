<template>
    <div class="main">
      <y-header>
        <div slot="nav"></div>
      </y-header>

      <div class="home main">
          <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;" v-if="!error">
              <div class="banner" >
                  <div class="bg" ref="bg"
                      @mouseover="bgOver($refs.bg)" @mousemove="bgMove($refs.bg,$event)" @mouseout="bgOut($refs.bg)">
                      <transition name="fade">
                          <div v-for="(item, i) in banner" v-if="i===mark" :key="i" style="position:absolute" @click="linkTo(item)" @mouseover="stopTimer" @mouseout="startTimer">
                              <img v-if="item.picUrl" class="img1" :src="item.picUrl"/>
                              <img v-if="item.picUrl2"  class="img2 a" :src="item.picUrl2"/>
                              <img v-if="item.picUrl3"  class="img3 b" :src="item.picUrl3"/>
                          </div>
                      </transition>
                  </div>
                  <div class="page">
                      <ul class="dots">
                      <li class="dot-active" v-for="(item, i) in banner" :class="{ 'dot':i!=mark }" :key="i" @click="change(i)"></li>
                      </ul>
                  </div>
              </div>

              <!-- 健康知识 -->
              <el-carousel class="health_knowledge" :interval="10000">
                <el-carousel-item v-for="item in 3" :key="item">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>健康知识</span>
                    </div>
                    <div class="health_content">
                      <div class="title">别重复用药</div>
                      <div class="body">以感冒药为例，多数感冒药都含有解热镇痛的化学成分乙酰氨基酚，如同时服用多种感冒药，或是中西药物混合使用，总剂量会在不知不觉中超量，造成肝脏受损。 </div>
                    </div>
                  </el-card>
                </el-carousel-item>
              </el-carousel>

              <div v-for="(item,i) in home" :key="i">

                <div class="activity-panel" v-if="item.type === 1">
                  <ul class="box">
                    <li class="content" v-for="(iitem,j) in item.panelContents" :key="j" @click="linkTo(iitem)">
                      <img class="i" :src="iitem.picUrl">
                      <a class="cover-link"></a>
                    </li>
                  </ul>
                </div>

                <section class="w mt30 clearfix" v-if="item.type === 2">
                  <y-shelf :title="item.name">
                    <div slot="content" class="hot">
                      <mall-goods :msg="iitem" v-for="(iitem,j) in item.panelContents" :key="j"></mall-goods>
                    </div>
                  </y-shelf>
                </section>

                <section class="w mt30 clearfix" v-if="item.type === 3">
                  <y-shelf :title="item.name">
                    <div slot="content" class="floors" >
                      <div class="imgbanner" v-for="(iitem,j) in item.panelContents" :key="j" v-if="iitem.type === 2 || iitem.type === 3" >
                        <img :src="iitem.picUrl">
                        <a class="cover-link"></a>
                      </div>
                      <mall-goods :msg="iitem" v-for="(iitem,j) in item.panelContents" :key="j+'key'" v-if="iitem.type != 2 && iitem.type != 3"></mall-goods>
                    </div>
                  </y-shelf>
                </section>
              </div>
            </div>
            


      <div class="no-info" v-if="error">
          <div class="no-data">
              <img src="/static/images/error.png">
              <br> 抱歉！出错了...
          </div>
      </div>
    </div>
    <y-footer></y-footer>
  </div>
</template>

<script>
import YHeader from './common/Header'
import YFooter from './common/Footer'
import YShelf from './common/Shelf'
import YButton from './common/Button'
import YMallGoods from './common/MallGoods'
export default {
    data () {
      return {
        error: false,
        banner: [
            {picUrl: "https://img.alicdn.com/tfs/TB1s38dfKT2gK0jSZFvXXXnFXXa-1190-400.jpg"},
            {picUrl2: "https://img.alicdn.com/tfs/TB1qjw.w7Y2gK0jSZFgXXc5OFXa-1190-400.jpg"},
            {picUrl3: "https://img.alicdn.com/tfs/TB1UkyhJNz1gK0jSZSgXXavwpXa-1190-400.png"}
        ],
        mark: 0,
        bgOpt: {
          px: 0,
          py: 0,
          w: 0,
          h: 0
        },
        home: [
            {type: 3,name: '清热解毒', panelContents: [
                {id:13,type:0,name: '清热解毒片(盘龙)',price:8.00,subTitle:'清热解毒。用于治疗流感，上呼吸道感染及各种发热性疾病。',pic: "https://image.jianke.com/upload/prodimage/201606wm/2016629104713919.jpg"},
                {id:2,type:0,name: '感冒灵颗粒(999)',price:13.50,subTitle:'解热镇痛。用于感冒引起的头痛，发热，鼻塞，流涕，咽痛。',pic: "https://image.jianke.com/mall/product/201903/4a63eb9a823a4098a8bbea199d7731b4.jpg"},
                {id:2,type:0,name: '清热解毒口服液(金太子)',price:9.00,subTitle:'清热解毒。用于热毒壅盛所致发热面赤、烦燥口渴、咽喉肿痛；流感，上呼吸道感染见上述证侯者。',pic: "https://image.jianke.com/mall/product/202006/5efbfd6aa57d48e2adde11b1ecd56d98.jpg"},
                {id:2,type:0,name: '清热解毒颗粒(正清)',price:29.80,subTitle:'清热解毒。用于治疗流感，上呼吸道感染。',pic: "https://image.jianke.com/mall/product/202004/35606dfa34584f519a08e432b5a08a32.jpg"},
                {id:2,type:0,name: '解热感冒片(同仁堂)',price:16.00,subTitle:'清热解表。用于外感风寒引起的头痛，鼻塞流涕，发烧怕冷，咳嗽音哑，咽喉干痛。',pic: "https://image.jianke.com/upload/prodimage/201604wm/2016421153744518.jpg"},
                {id:2,type:0,name: '清热解毒口服液(盛翔)(横峰)',price:7.00,subTitle:' 用于热毒壅盛所致发热面赤，烦躁口渴，咽喉肿痛等症；流感、上呼吸道感染。',pic: "https://image.jianke.com/upload/prodimage/201605wm/2016530151153188.jpg"},
                {id:2,type:0,name: '解热感冒片(同仁堂)',price:16.00,subTitle:'清热解表。用于外感风寒引起的头痛，鼻塞流涕，发烧怕冷，咳嗽音哑，咽喉干痛。',pic: "https://image.jianke.com/upload/prodimage/201604wm/2016421153744518.jpg"},
                {id:2,type:0,name: '清热解毒口服液(盛翔)(横峰)',price:7.00,subTitle:' 用于热毒壅盛所致发热面赤，烦躁口渴，咽喉肿痛等症；流感、上呼吸道感染。',pic: "https://image.jianke.com/upload/prodimage/201605wm/2016530151153188.jpg"} 
                ]},
            {type: 3,name: '清热解毒', panelContents: [
                {id:13,type:0,name: '清热解毒片(盘龙)',price:8.00,subTitle:'清热解毒。用于治疗流感，上呼吸道感染及各种发热性疾病。',pic: "https://image.jianke.com/upload/prodimage/201606wm/2016629104713919.jpg"},
                {id:2,type:0,name: '感冒灵颗粒(999)',price:13.50,subTitle:'解热镇痛。用于感冒引起的头痛，发热，鼻塞，流涕，咽痛。',pic: "https://image.jianke.com/mall/product/201903/4a63eb9a823a4098a8bbea199d7731b4.jpg"},
                {id:2,type:0,name: '清热解毒口服液(金太子)',price:9.00,subTitle:'清热解毒。用于热毒壅盛所致发热面赤、烦燥口渴、咽喉肿痛；流感，上呼吸道感染见上述证侯者。',pic: "https://image.jianke.com/mall/product/202006/5efbfd6aa57d48e2adde11b1ecd56d98.jpg"},
                {id:2,type:0,name: '清热解毒颗粒(正清)',price:29.80,subTitle:'清热解毒。用于治疗流感，上呼吸道感染。',pic: "https://image.jianke.com/mall/product/202004/35606dfa34584f519a08e432b5a08a32.jpg"},
                {id:2,type:0,name: '解热感冒片(同仁堂)',price:16.00,subTitle:'清热解表。用于外感风寒引起的头痛，鼻塞流涕，发烧怕冷，咳嗽音哑，咽喉干痛。',pic: "https://image.jianke.com/upload/prodimage/201604wm/2016421153744518.jpg"},
                {id:2,type:0,name: '清热解毒口服液(盛翔)(横峰)',price:7.00,subTitle:' 用于热毒壅盛所致发热面赤，烦躁口渴，咽喉肿痛等症；流感、上呼吸道感染。',pic: "https://image.jianke.com/upload/prodimage/201605wm/2016530151153188.jpg"},
                {id:2,type:0,name: '解热感冒片(同仁堂)',price:16.00,subTitle:'清热解表。用于外感风寒引起的头痛，鼻塞流涕，发烧怕冷，咳嗽音哑，咽喉干痛。',pic: "https://image.jianke.com/upload/prodimage/201604wm/2016421153744518.jpg"},
                {id:2,type:0,name: '清热解毒口服液(盛翔)(横峰)',price:7.00,subTitle:' 用于热毒壅盛所致发热面赤，烦躁口渴，咽喉肿痛等症；流感、上呼吸道感染。',pic: "https://image.jianke.com/upload/prodimage/201605wm/2016530151153188.jpg"} 
                ]},
            {type: 3,name: '清热解毒', panelContents: [
                {id:13,type:0,name: '清热解毒片(盘龙)',price:8.00,subTitle:'清热解毒。用于治疗流感，上呼吸道感染及各种发热性疾病。',pic: "https://image.jianke.com/upload/prodimage/201606wm/2016629104713919.jpg"},
                {id:2,type:0,name: '感冒灵颗粒(999)',price:13.50,subTitle:'解热镇痛。用于感冒引起的头痛，发热，鼻塞，流涕，咽痛。',pic: "https://image.jianke.com/mall/product/201903/4a63eb9a823a4098a8bbea199d7731b4.jpg"},
                {id:2,type:0,name: '清热解毒口服液(金太子)',price:9.00,subTitle:'清热解毒。用于热毒壅盛所致发热面赤、烦燥口渴、咽喉肿痛；流感，上呼吸道感染见上述证侯者。',pic: "https://image.jianke.com/mall/product/202006/5efbfd6aa57d48e2adde11b1ecd56d98.jpg"},
                {id:2,type:0,name: '清热解毒颗粒(正清)',price:29.80,subTitle:'清热解毒。用于治疗流感，上呼吸道感染。',pic: "https://image.jianke.com/mall/product/202004/35606dfa34584f519a08e432b5a08a32.jpg"},
                {id:2,type:0,name: '解热感冒片(同仁堂)',price:16.00,subTitle:'清热解表。用于外感风寒引起的头痛，鼻塞流涕，发烧怕冷，咳嗽音哑，咽喉干痛。',pic: "https://image.jianke.com/upload/prodimage/201604wm/2016421153744518.jpg"},
                {id:2,type:0,name: '清热解毒口服液(盛翔)(横峰)',price:7.00,subTitle:' 用于热毒壅盛所致发热面赤，烦躁口渴，咽喉肿痛等症；流感、上呼吸道感染。',pic: "https://image.jianke.com/upload/prodimage/201605wm/2016530151153188.jpg"},
                {id:2,type:0,name: '解热感冒片(同仁堂)',price:16.00,subTitle:'清热解表。用于外感风寒引起的头痛，鼻塞流涕，发烧怕冷，咳嗽音哑，咽喉干痛。',pic: "https://image.jianke.com/upload/prodimage/201604wm/2016421153744518.jpg"},
                {id:2,type:0,name: '清热解毒口服液(盛翔)(横峰)',price:7.00,subTitle:' 用于热毒壅盛所致发热面赤，烦躁口渴，咽喉肿痛等症；流感、上呼吸道感染。',pic: "https://image.jianke.com/upload/prodimage/201605wm/2016530151153188.jpg"} 
                ]},
        ],
        loading: false,
        notify: '1',
        dialogVisible: false,
        timer: ''
      }
    },
    methods: {
      autoPlay () {
        this.mark++
        if (this.mark > this.banner.length - 1) {
          // 当遍历到最后一张图片置零
          this.mark = 0
        }
      },
      play () {
        // 每2.5s自动切换
        this.timer = setInterval(this.autoPlay, 2500)
      },
      change (i) {
        this.mark = i
      },
      startTimer () {
        this.timer = setInterval(this.autoPlay, 2500)
      },
      stopTimer () {
        clearInterval(this.timer)
      },
      linkTo (item) {
        if (item.type === 0 || item.type === 2) {
          console.log(0)
          关联商品
          this.$router.push({
            path: '/goodsDetails',
            query: {
              productId: item.productId
            }
          })
        } else {
          // 完整链接
          window.location.href = item.fullUrl
        }
      },
      bgOver (e) {
        this.bgOpt.px = e.offsetLeft
        this.bgOpt.py = e.offsetTop
        this.bgOpt.w = e.offsetWidth
        this.bgOpt.h = e.offsetHeight
      },
      bgMove (dom, eve) {
        let bgOpt = this.bgOpt
        let X, Y
        let mouseX = eve.pageX - bgOpt.px
        let mouseY = eve.pageY - bgOpt.py
        if (mouseX > bgOpt.w / 2) {
          X = mouseX - (bgOpt.w / 2)
        } else {
          X = mouseX - (bgOpt.w / 2)
        }
        if (mouseY > bgOpt.h / 2) {
          Y = bgOpt.h / 2 - mouseY
        } else {
          Y = bgOpt.h / 2 - mouseY
        }
        dom.style['transform'] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
        dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
      },
      bgOut (dom) {
        dom.style['transform'] = 'rotateY(0deg) rotateX(0deg)'
        dom.style.transform = 'rotateY(0deg) rotateX(0deg)'
      },
      
    },
    mounted () {
    },
    created () {
      this.play()
    },
    components: {
      'y-header': YHeader,
      'y-footer': YFooter,
      'y-button': YButton,
      'y-shelf': YShelf,
      'mall-goods': YMallGoods
    }
}
</script>

<style lang="less" scoped>
.main {
  min-height: calc(100vh - 454px);
  background: #ededed;
  overflow: hidden;
  width: 100%;
}
.w {
  width:1220px;
  margin: 0 auto;
}
 .home {
    display: flex;
    flex-direction: column;
      margin-top: 20px;
  }
  .no-info {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    .no-data{
      align-self: center;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .page { 
    position: absolute; 
    width: 100%;
    top: 470px;
    z-index: 30; 
    .dots {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .dot-active { 
        display: inline-block; 
        width: 15px; 
        height: 15px; 
        background-color: whitesmoke; 
        border-radius: 8px; 
        margin-right: 10px; 
        cursor: pointer; 
      }
      .dot { 
        opacity: 0.2; 
      }
    }
  }
  .activity-panel {
    width: 1220px;
    margin: 0 auto;
    .box {
      overflow: hidden;
      position: relative;
      z-index: 0;
      margin-top: 25px;
      box-sizing: border-box;
      border: 1px solid rgba(0,0,0,.14);
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
    }
    .content {
      float: left;
      position: relative;
      box-sizing: border-box;
      width: 25%;
      height: 200px;
      text-align: center;
      list-style-type:none
    }
    .content ::before{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      box-sizing: border-box;
      border-left: 1px solid #f2f2f2;
      border-left: 1px solid rgba(0,0,0,.1);
      width: 100%;
      height: 100%;
      content: "";
      pointer-events: none;
    }
    .i {
      width: 305px;
      height: 200px;
      margin-left: -26px;
    }
    .cover-link {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 4;
      background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==) repeat;
    }
    a {
      color: #5079d9;
      cursor: pointer;
      transition: all .15s ease-out;
      text-decoration: none;
    }
    a:hover {
      box-shadow: inset 0 0 38px rgba(0,0,0,.08);
      transition: all .15s ease;
    }
  }
  .banner, .banner span, .banner div {
    font-family: "Microsoft YaHei";
    transition: all .3s;
    transition-timing-function: linear;
  }
  .banner {
    cursor: pointer;
    perspective: 3000px;
    position: relative;
    z-index: 19;
    margin: 0 auto;
    width: 1220px;
  }
  .bg {
    position: relative;
    width: 1220px;
    height: 500px;
    margin: 20px auto;
    background-size: 100% 100%;
    border-radius: 10px;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: rotateY(0deg) rotateX(0deg);
    & div{
      position: relative;
      height: 100%;
      width: 100%;
    }
  }
  .img1 {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 10px;
  }
  .img2 {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 5px;
    left: 0;
    background-size: 95% 100%;
    border-radius: 10px;
  }
  .img3 {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 10px;
  }
  .a {
    z-index: 20;
    transform: translateZ(40px);
  }
  .b {
    z-index: 20;
    transform: translateZ(30px);
  }
  .c {
    transform: translateZ(0px);
  }
  .sk_item {
    width: 170px;
    height: 225px;
    padding: 0 14px 0 15px;
    > div {
      width: 100%;
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;
      &:hover {
        transform: translateY(-5px);
      }
    }
    img {
      width: 130px;
      height: 130px;
      margin: 17px 0;
    }
    .sk_item_name {
      color: #999;
      display: block;
      max-width: 100%;
      _width: 100%;
      overflow: hidden;
      font-size: 12px;
      text-align: left;
      height: 32px;
      line-height: 16px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .sk_item_price {
      padding: 3px 0;
      height: 25px;
    }
    .price_new {
      font-size: 18px;
      font-weight: 700;
      margin-right: 8px;
      color: #f10214;
    }
    .price_origin {
      color: #999;
      font-size: 12px;
    }
  }
  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 29px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
  }
  ul.box {
    display: flex;
    li {
      flex: 1;
      img {
        display: block;
        width: 305px;
        height: 200px;
      }
    }
  }
  .mt30 {
    margin-top: 30px;
  }
  .hot {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }
  .floors {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .imgbanner {
      width: 50%;
      height: 430px; 
      .cover-link {
        cursor: pointer;
        display: block;
        position: absolute;
        top: 60px;
        left: 0;
        width: 50%;
        height: 430px; 
        z-index: 4;
        background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==) repeat;
      }
      .cover-link:hover {
        box-shadow: inset 0 0 38px rgba(0,0,0,.08);
        transition: all .15s ease;
      }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .health_knowledge {
    position: relative;
    z-index: 19;
    margin: 0 auto;
    width: 1220px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    .box-card {
      height: 100%;
    }
    .health_content {
      padding: 0 50px;
      .title {
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }


</style>