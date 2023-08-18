<template>
  <Box
    :use-scroll-content-box="true"
    @scroll="scroll"
    data-aos-easing="ease-out-back"
    data-aos-duration="1000"
    data-aos-delay="0"
    class="scroll-box"
  >
    <div class="backgrounds overlay">
      <div
        class="background aos-init aos-animate"
        data-aos="fade-in"
        data-aos-duration="1500"
        data-aos-anchor=".section--hero"
      ></div>
    </div>

    <header class="hero">
      <div class="hero-center">
        <h1 class="hero__logo aos-init aos-animate" data-aos="zoom-in">AOS</h1>
        <h2
          class="hero__text aos-init aos-animate"
          data-aos="fade-up"
          data-aos-easing="ease"
          data-aos-delay="400"
        >
          Animate On Scroll <span>Library</span>
        </h2>
      </div>
      <span
        class="hero__scroll aos-init aos-animate"
        data-aos="fade-up"
        data-aos-easing="ease"
        data-aos-delay="800"
      >
        Scroll down <br />
        <i class="chevron bottom"></i>
      </span>
      <a
        href="http://github.com/michalsnik/aos"
        target="_blank"
        class="octocat aos-init aos-animate"
        data-aos="zoom-out"
        data-aos-delay="1500"
      >
        <!-- <img src="img/github_octocat.png" alt=""> -->
      </a>
    </header>

    <section class="section section--code">
      <div class="container">
        <h2 class="section-title">Fade</h2>
        <div class="code code--small code--left aos-init" data-aos="fade-up">
          <pre><code class="html hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="fade-down">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-down"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--left aos-init" data-aos="fade-right">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="fade-left">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--left aos-init" data-aos="fade-up-right">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="fade-up-left">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--left aos-init" data-aos="fade-down-right">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-down-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="fade-down-left">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-down-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
      </div>
    </section>

    <section class="section section--code">
      <div class="container">
        <h2 class="section-title">Flip</h2>
        <div class="code code--small code--left aos-init" data-aos="flip-left">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"flip-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="flip-right">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"flip-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--left aos-init" data-aos="flip-up">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"flip-up"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="flip-down">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"flip-down"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
      </div>
    </section>

    <section class="section section--code">
      <div class="container">
        <h2 class="section-title">Zoom</h2>
        <div class="code code--small code--left aos-init" data-aos="zoom-in">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-in"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="zoom-in-up">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-in-up"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--left aos-init" data-aos="zoom-in-down">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-in-down"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="zoom-in-left">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-in-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--left aos-init" data-aos="zoom-in-right">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-in-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>

        <div class="code code--small code--right aos-init" data-aos="zoom-out">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-out"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--left aos-init" data-aos="zoom-out-up">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-out-up"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="zoom-out-down">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-out-down"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--left aos-init" data-aos="zoom-out-right">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-out-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div class="code code--small code--right aos-init" data-aos="zoom-out-left">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"zoom-out-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
      </div>
    </section>

    <section class="section section--code">
      <div class="container">
        <h2 class="section-title">Different settings examples</h2>
        <div class="code code--left aos-init" data-aos="fade-up" data-aos-duration="3000">
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-duration</span>=<span class="hljs-value">"3000"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div
          class="code code--right aos-init"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-down"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-easing</span>=<span class="hljs-value">"linear"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-duration</span>=<span class="hljs-value">"1500"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div
          id="example-anchor"
          class="code code--left aos-init"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-right"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-offset</span>=<span class="hljs-value">"300"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-easing</span>=<span class="hljs-value">"ease-in-sine"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div
          class="code code--right aos-init"
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="500"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-left"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-anchor</span>=<span class="hljs-value">"#example-anchor"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-offset</span>=<span class="hljs-value">"500"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-duration</span>=<span class="hljs-value">"500"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div
          class="code code--left aos-init"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-zoom-in"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-easing</span>=<span class="hljs-value">"ease-in-back"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-delay</span>=<span class="hljs-value">"300"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-offset</span>=<span class="hljs-value">"0"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div
          class="code code--right aos-init"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"flip-left"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-easing</span>=<span class="hljs-value">"ease-out-cubic"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-duration</span>=<span class="hljs-value">"2000"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
      </div>
    </section>

    <section class="section section--code">
      <div class="container">
        <h2 class="section-title">Anchor placement</h2>

        <div
          class="code code--wider code--left aos-init"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-anchor-placement</span>=<span class="hljs-value">"top-bottom"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div
          class="code code--wider code--right aos-init"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-anchor-placement</span>=<span class="hljs-value">"center-bottom"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div
          class="code code--wider code--left aos-init"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-anchor-placement</span>=<span class="hljs-value">"bottom-bottom"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>

        <div
          class="code code--wider code--right aos-init"
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-anchor-placement</span>=<span class="hljs-value">"top-center"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div
          class="code code--wider code--left aos-init"
          data-aos="fade-up"
          data-aos-anchor-placement="center-center"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-anchor-placement</span>=<span class="hljs-value">"center-center"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
        <div
          class="code code--wider code--right aos-init"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-aos</span>=<span class="hljs-value">"fade-up"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-attribute">data-aos-anchor-placement</span>=<span class="hljs-value">"bottom-center"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span></code></pre>
        </div>
      </div>
    </section>

    <section class="section section--more">
      <div class="container">
        <div class="section-group">
          <h3>Get it</h3>

          <a href="https://github.com/michalsnik/aos/archive/master.zip" class="btn"
            ><span>Download</span></a
          >
          <a href="https://github.com/michalsnik/aos" target="_blank" class="btn"
            ><span>View on github</span></a
          >
        </div>

        <div class="section-group">
          <h3>Install using Yarn, Npm, Bower</h3>

          <pre><code class="hljs nginx"><span class="hljs-title">yarn</span> add aos</code></pre>

          <pre><code class="hljs sql">npm <span class="hljs-operator"><span class="hljs-keyword">install</span> aos <span class="hljs-comment">--save</span></span></code></pre>

          <pre><code class="hljs sql">bower <span class="hljs-operator"><span class="hljs-keyword">install</span> aos <span class="hljs-comment">--save</span></span></code></pre>
        </div>

        <div class="section-group">
          <h3>CDN sources</h3>
          <h4>CSS</h4>
          <pre><code class="hljs perl">&lt;<span class="hljs-keyword">link</span> href=<span class="hljs-string">"https://unpkg.com/aos<span class="hljs-variable">@2</span>.3.1/dist/aos.css"</span> rel=<span class="hljs-string">"stylesheet"</span>&gt;</code></pre>

          <h4>JS</h4>
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">src</span>=<span class="hljs-value">"https://unpkg.com/aos@2.3.1/dist/aos.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span></code></pre>
        </div>

        <div class="section-group">
          <h3>Initialize AOS</h3>
          <pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">script</span>&gt;</span><span class="css">
&nbsp;&nbsp;<span class="hljs-tag">AOS</span><span class="hljs-class">.init</span>();
</span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span></code></pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container"></div>
    </footer>
  </Box>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import Box from '@/components/zh-box/index.vue';
  import AOSImg from '@/assets/img/aos-bg.jpg';

  import AOS from 'aos';

  // 参考：https://blog.csdn.net/m0_49245194/article/details/122901171
  const scroll = (e: any) => {
    window.pageYOffset = e.scrollTop;
    window.scrollY = e.scrollTop;
    AOS.refresh();
  };

  onMounted(async () => {
    AOS.init({});
  });

  // onMounted(() => {
  //   let scrollRef = 0;

  // window.addEventListener('scroll', function() {
  //   // increase value up to 10, then refresh AOS
  //   scrollRef <= 10 ? scrollRef++ : AOS.refresh();
  // });
  // });
</script>

<style lang="scss" scoped>
  // .scroll-box {
  //     background-image: url('../../assets/img/aos-bg.jpg');
  // }

  .hljs-params,
  .hljs-constant {
    color: #c76b29;
  }

  /* Atelier-Sulphurpool Yellow */
  .ruby .hljs-class .hljs-title,
  .css .hljs-rule .hljs-attribute {
    color: #c08b30;
  }

  /* Atelier-Sulphurpool Green */
  .hljs-string,
  .hljs-value,
  .hljs-inheritance,
  .hljs-header,
  .ruby .hljs-symbol,
  .xml .hljs-cdata {
    color: darkorange;
  }

  /* Atelier-Sulphurpool Aqua */
  .hljs-title,
  .css .hljs-hexcolor {
    color: #22a2c9;
  }

  /* Atelier-Sulphurpool Blue */
  .hljs-function,
  .python .hljs-decorator,
  .python .hljs-title,
  .ruby .hljs-function .hljs-title,
  .ruby .hljs-title .hljs-keyword,
  .perl .hljs-sub,
  .javascript .hljs-title,
  .coffeescript .hljs-title {
    color: #3d8fd1;
  }

  /* Atelier-Sulphurpool Purple */
  .hljs-keyword,
  .javascript .hljs-function {
    color: #6679cc;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    background: #202746;
    color: #979db4;
    padding: 0.5em;
    -webkit-text-size-adjust: none;
  }

  .coffeescript .javascript,
  .javascript .xml,
  .tex .hljs-formula,
  .xml .javascript,
  .xml .vbscript,
  .xml .css,
  .xml .hljs-cdata {
    opacity: 0.5;
  }

  body {
    font-family: Helvetica, Tahoma;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: #ff4081;
  }

  /**
 * Backgrounds
 */
  .backgrounds {
    width: 100%;
    height: 100%;
    position: fixed;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    z-index: -1;
  }
  .backgrounds .background {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    background-attachment: fixed;
    background-image: url('../../assets/img/aos-bg.jpg');
  }

  .overlay:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #3f51b5 !important;
    opacity: 0.8;
  }

  /**
 * Hero
 */
  .hero {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    color: #fff;
    text-align: center;
  }

  .hero-center {
    width: 100%;
    position: absolute;
    top: 40%;
    left: 0;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }

  .hero__logo {
    font-size: 60px;
    color: rgba(0, 0, 0, 0.5);
  }

  .hero__text {
    font-weight: normal;
    opacity: 0.8;
  }

  .hero__scroll {
    position: absolute;
    bottom: 60px;
    width: 200px;
    margin: auto;
    display: block;
    cursor: pointer;
    padding-bottom: 40px;
    left: 0;
    right: 0;
    text-transform: uppercase;
  }
  .hero__scroll .chevron {
    margin-top: 20px;
    display: block;
    -webkit-animation: pulse 2s infinite;
    animation: pulse 2s infinite;
    color: #ff4081;
  }

  @-webkit-keyframes pulse {
    0% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    50% {
      -webkit-transform: translate(0, 10px);
      transform: translate(0, 10px);
    }
    100% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }

  @keyframes pulse {
    0% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    50% {
      -webkit-transform: translate(0, 10px);
      transform: translate(0, 10px);
    }
    100% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }

  .octocat {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 80px;
  }
  .octocat img {
    display: block;
    width: 100%;
  }

  .chevron::before {
    border-style: solid;
    border-width: 0.25em 0.25em 0 0;
    content: '';
    display: inline-block;
    height: 20px;
    position: relative;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    vertical-align: top;
    width: 20px;
  }

  .chevron.right:before {
    left: 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .chevron.bottom:before {
    top: 0;
    -webkit-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    transform: rotate(135deg);
  }

  .chevron.left:before {
    left: 0.25em;
    -webkit-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }

  /**
 * Sections
 */
  .section {
    width: 100%;
    float: left;
    overflow: hidden;
  }

  .section-title {
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    font-weight: normal;
    padding: 30px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    width: 100%;
    clear: both;
  }

  .container {
    width: 970px;
    margin: 0 auto;
    max-width: 90%;
    -webkit-transform: translateZ(1000px);
    transform: translateZ(1000px);
  }

  .code {
    width: 40%;
    clear: both;
    height: 200px;
    background: #fff;
    border-radius: 2px;
    margin: 12vh 0;
    padding: 10px;
  }
  .code pre,
  .code code {
    height: 100%;
    margin: 0;
  }
  .code code {
    padding: 20px 0 0 20px;
  }
  .code--small code {
    padding-top: 75px;
  }
  .code--left {
    float: left;
  }
  .code--right {
    float: right;
  }
  .code--wider {
    width: 60%;
  }
  .code--wider code {
    padding-top: 60px;
  }

  .section--more {
    color: #fff;
    background: #0e0f34;
    padding: 20px 0 40px 0;
  }

  .section-group {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 30px 0;
  }
  .section-group h3 {
    margin: 0 0 20px 0;
    text-transform: uppercase;
  }
  .section-group h4 {
    font-weight: normal;
    color: rgba(255, 255, 255, 0.6);
  }
  .section-group code {
    padding: 20px;
    font-size: 1.2em;
  }
  .section-group .btn {
    margin-right: 20px;
  }

  .btn {
    padding: 10px 20px;
    border: 1px solid #ff4081;
    display: inline-block;
    position: relative;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    overflow: hidden;
  }
  .btn:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    width: 1px;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #ff4081;
    -webkit-transition: -webkit-transform 0.2s ease;
    transition: transform 0.2s ease;
    z-index: 0;
    opacity: 0;
  }
  .btn span {
    position: relative;
    z-index: 5;
  }
  .btn:hover {
    color: #fff;
  }
  .btn:hover:before {
    -webkit-transform: scaleX(200);
    -ms-transform: scaleX(200);
    transform: scaleX(200);
    opacity: 1;
  }
</style>
