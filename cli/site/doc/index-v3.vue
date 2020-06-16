<template>
  <div class="container">
    <template v-if="notWebgl">
      <div class="css-animation">
        <span class="blue-bg"></span>
        <span class="phone"></span>
        <span class="goods"></span>
        <span class="nut"></span>
        <span class="people"></span>
        <span class="flower">
          <span class="leaf_2"></span>
          <span class="leaf_1"></span>
          <span class="leaf_4"></span>
          <span class="leaf_3"></span>

          <span class="flowerpot"></span>
        </span>
        <span class="fengche"></span>
      </div>
    </template>
    <template v-else>
      <canvas id="output"></canvas>
    </template>
    <div class="wrapper">
      <div class="header">
        <span class="logo">
          NUTUI
          <s></s>
        </span>
        <search />

        <div class="menu">
          <ul>
            <li>
              <a href="#/intro">指南</a>
            </li>
            <li>
              <a href="#/ActionSheet">组件</a>
            </li>
            <li>
              <a href="/demo.html#/index" class="qrcode top-qr" target="_blank">
                示例
                <a>
                  <span>请使用手机扫码体验</span>
                  <img
                    src="https://img14.360buyimg.com/uba/jfs/t1/32118/11/559/2782/5c3d81ecEbda0c0f1/5f2b637d11817204.png"
                    alt />
                </a>
              </a>
            </li>
          </ul>
          <select @change="openwindow">
            <option value="3">3.X</option>
            <option value="2">2.X</option>
            <option value="1">1.X</option>
          </select>
          <a href="https://github.com/jdf2e/nutui" title="Github" target="_blank" class="github-icon">github</a>
        </div>
      </div>
      <div class="content">
        <div class="mouseDiv" id="mouseDiv"></div>
        <p class="title">NutUI 3</p>
        <p class="sub-title">一套京东风格的轻量级移动端Vue组件库 3</p>
        <a href="#/intro" class="blue-btn">开始使用</a>
        <a href="javascript:;" class="qrcode btn">
          扫码体验
          <a>
            <span>请使用手机扫码体验</span>
            <img src="https://img14.360buyimg.com/uba/jfs/t1/32118/11/559/2782/5c3d81ecEbda0c0f1/5f2b637d11817204.png"
              alt />
          </a>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import search from "./search.vue";
export default {
  name: "frontCover_v3",
  data() {
    return {
      timer: null,
      notWebgl: true,
      isSmall: false
    };
  },
  components: {
    search
  },
  methods: {
    openwindow(val) {
      switch (val.target.value.toString()) {
        case "1":
          window.location.href = " https://nutui.jd.com/1x/";
          break;
        case "2":
          window.location.href = " https://nutui.jd.com/";
          break;
        default:
          break;
      }
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      //获取浏览器宽度
      let windowWidth = document.body.clientWidth;
      if (windowWidth <= 990) {
        this.isSmall = true;
      }

      this.notWebgl = true;
      // if (!Detector.webgl) {
      //   //Detector.addGetWebGLMessage();
      // } else {
      //   this.notWebgl = false;
      //   this.threeAnimation();
      // }
    });
  },
  destroyed() {}
};
</script>
<style lang="scss" scoped>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRightAndTop {
  from {
    opacity: 0;
    transform: translate(100%, 100%, 0);
    transform: scale3d(1, 1, 1);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transform: scale3d(1.06, 1.06, 1.06);
  }
}
@keyframes leafShake {
  form,
  to {
    transform: rotate(0);
    transform-origin: bottom;
  }
  20%,
  60% {
    transform: rotate(2deg);
    transform-origin: bottom;
  }
  40%,
  80% {
    transform: rotate(-2deg);
    transform-origin: bottom;
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: rotate(20deg);
  }
  to {
    opacity: 1;
    transform: rotate(0deg);
  }
}

.container {
  position: relative;
  min-width: 1260px;
  height: 870px;
  overflow: hidden;
}
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .header {
    top: 0;
    min-width: 990px;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .menu {
    position: absolute;
    top: 0;
    right: 14%;
    width: 376px;
    font-size: 12px;
    li {
      float: left;
      width: 70px;
      text-align: center;
      height: 64px;
      line-height: 64px;
      cursor: pointer;
      color: #fff;
      position: relative;
      & > a {
        display: block;
        height: 100%;
        line-height: 64px;
      }
      a {
        color: #fff;
        text-decoration: none;
      }
    }
    select {
      width: 74px;
      height: 28px;
      margin-top: 18px;
      margin-left: 20px;
      font-size: 12px;
    }

    li::before {
      content: "";
      position: absolute;
      top: 0;
      left: 100%;
      width: 0;
      height: 100%;
      border-bottom: 2px solid #fff;
      transition: 0.2s all linear;
    }
    li:hover:before {
      width: 100%;
      top: 0;
      left: 0;
      transition-delay: 0.1s;
      border-bottom-color: #fff;
      z-index: -1;
    }
    li:hover ~ li::before {
      left: 0;
    }
    .github-icon {
      display: inline-block;
      height: 26px;
      width: 26px;
      font-size: 0;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 16 16' version='1.1' width='24' aria-hidden='true'%3E%3Cpath fill-rule='evenodd' fill='rgb(255,255,255)' d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'%3E%3C/path%3E%3C/svg%3E")
        no-repeat;
      vertical-align: middle;
      position: relative;
      top: -1px;
      margin-left: 35px;
      cursor: pointer;
      &:hover,
      &:active {
        opacity: 0.7;
      }
    }
  }
  .logo {
    height: 100%;
    line-height: 64px;
    float: left;
    width: 245px;
    font-size: 0;
    position: relative;
    s {
      background: url(./asset/css/i/nut.png) 0 0 no-repeat;
      background-size: contain;
      height: 46px;
      width: 120px;
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50px;
      margin-top: -23px;
    }
  }
  .search {
    margin: 20px 0;
    display: inline-block;
    border-left: 1px solid #d8d8d8;
    padding-left: 84px;
    position: relative;
    &:before {
      content: "";
      display: inline-block;
      background: url(./asset/css/i/search.png) 0 0 no-repeat;
      height: 22px;
      width: 22px;
      position: absolute;
      top: 50%;
      margin-top: -11px;
      left: 40px;
    }
    .search-input {
      border: none;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      outline: none;
      width: 200px;
      background: transparent;
    }
  }
  .content {
    padding: 15% 0 0 8.8%;
    z-index: 999;
    position: relative;
    .mouseDiv {
      height: 300px;
      width: 500px;
      //background:#ccc;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -250px;
      margin-top: -50px;
    }
    .title {
      font-size: 42px;
      color: #333;
      font-weight: bold;
      animation: fadeInLeft 1s both;
    }
    .sub-title {
      font-size: 24px;
      color: #333;
      padding-top: 30px;
      padding-bottom: 100px;
      animation: fadeInLeft 1s both 0.5s;
    }
    .btn,
    .blue-btn {
      border: 1px solid rgba(83, 150, 255, 1);
      background: #fff;
      color: rgba(83, 150, 255, 1);
      width: 130px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      display: inline-block;
      font-size: 14px;
      text-decoration: none;
      border-radius: 20px;
      animation: fadeInLeft 1s both 1.2s;
      &:hover,
      &:active {
        border-color: rgba(83, 150, 255, 0.8);
        color: rgba(83, 150, 255, 0.8);
      }
    }
    .blue-btn {
      color: #fff;
      background: rgba(83, 150, 255, 1);
      margin-right: 40px;
      &:hover,
      &:active {
        background: rgba(83, 150, 255, 0.8);
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  .qrcode {
    background: none;
    width: auto;
    margin: 0;
    opacity: 1;
    &.top-qr {
      a {
        left: -65px;
        top: 60px;
      }
    }
    a {
      position: absolute; //display: none;
      top: 44px;
      width: 200px;
      height: 240px;
      transform: scale(0.5);
      transform-origin: 50% top 0;
      transition: all 100ms ease-in-out 50ms;
      background: url("./asset/css/i/kuang.png") no-repeat;
      background-size: 200px;
      text-decoration: none;
      font-style: normal;
      text-align: center;
      left: -35px;
      overflow: hidden;
      pointer-events: none;
      span {
        display: block;
        overflow: hidden;
        color: #666;
        font-size: 14px;
        text-align: center;
        height: 45px;
        width: 100%;
        line-height: 60px;
      }
      img {
        opacity: 0.8;
        width: 166px;
        height: 166px;
      }
    }
    &:hover {
      opacity: 1;
      a {
        display: inline-block;
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}

.css-animation {
  position: absolute;
  top: 0;
  right: 0;
  height: 757px;
  width: 963px;
  animation: fadeInRightAndTop 1.2s 1;
  transform: scale3d(1.06, 1.06, 1.06);

  .blue-bg {
    background: url("//img12.360buyimg.com/uba/jfs/t1/22824/40/3136/6504/5c24a3f4E76fdafde/802d02d1ec5d3d55.png")
      0 0 no-repeat;
    height: 757px;
    width: 963px;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .phone {
    background: url("//img10.360buyimg.com/uba/jfs/t1/19171/19/3175/23282/5c24a440Ee2a94261/45321aeaf173f237.png")
      0 0 no-repeat;
    height: 419px;
    width: 227px;
    background-size: 100% 100%;
    position: absolute;
    right: 350px;
    top: 250px;
    display: inline-block;
  }
  .goods {
    background: url("//img14.360buyimg.com/uba/jfs/t1/21115/40/3224/5652/5c24a411E03ef9eb6/83781b97e59da905.png")
      0 0 no-repeat;
    height: 165px;
    width: 117px;
    background-size: 100% 100%;
    position: absolute;
    display: inline-block;
    top: 500px;
    right: 710px;
  }
  .people {
    background: url("//img12.360buyimg.com/uba/jfs/t1/9330/16/10894/8662/5c24a42aE708692b3/14455d20eca1ccee.png");
    width: 184px;
    height: 334px;
    background-size: 100% 100%;
    position: absolute;
    top: 334px;
    right: 500px;
  }
  .flower {
    position: absolute;
    right: 195px;
    top: 510px;
    height: 160px;
    width: 208px;
    .leaf_1 {
      position: absolute;
      background: url(./asset/css/i/leaf_1.png) 0 0 no-repeat;
      height: 113px;
      width: 60px;
      background-size: 100% 100%;
      bottom: 36px;
      right: 79px;
      animation: leafShake 8s infinite;
    }
    .leaf_2 {
      position: absolute;
      background: url(./asset/css/i/leaf_2.png) 0 0 no-repeat;
      height: 64px;
      width: 66px;
      background-size: 100% 100%;
      bottom: 36px;
      right: 35px;
      animation: leafShake 8s infinite 0.6s;
    }
    .leaf_3 {
      position: absolute;
      background: url(./asset/css/i/leaf_3.png) 0 0 no-repeat;
      height: 28px;
      width: 64px;
      background-size: 100% 100%;
      bottom: 38px;
      right: 42px;
      //animation:leafShake 3s infinite 0.5s;
    }
    .leaf_4 {
      position: absolute;
      background: url(./asset/css/i/leaf_4.png) 0 0 no-repeat;
      height: 113px;
      width: 99px;
      background-size: 100% 100%;
      bottom: 38px;
      left: 2px;
      //animation:leafShake 3s infinite 0.2s;
    }
    .flowerpot {
      position: absolute;
      background: url(./asset/css/i/flowerpot.png) 0 0 no-repeat;
      height: 42px;
      width: 130px;
      bottom: 0;
      right: 5px;
      background-size: 100% 100%;
    }
  }
  .nut {
    position: absolute;
    height: 46px;
    width: 46px;
    background: url(./asset/css/i/nut-icon.png) 0 0 no-repeat;
    background-size: 100% 100%;
    top: 308px;
    right: 493px;
    animation: fadeInRight 2s both;
  }
  .fengche {
    position: absolute;
    background: url(./asset/css/i/fengche.png) 0 0 no-repeat;
    background-size: 100% 100%;
    width: 679px;
    height: 476px;
    top: 195px;
    right: 180px;
    animation: fadeIn 2s both 2s;
  }
}
@media screen and (max-width: 1500px) {
  .css-animation {
    .blue-bg {
      transform: translateX(155px);
    }
  }
  .wrapper {
    .content {
      padding-left: 5%;
    }
    .menu {
      right: 6%;
    }
  }
}
</style>
