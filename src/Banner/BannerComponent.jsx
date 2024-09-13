/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from 'react';
import FullBanner from './FullBanner';

const BannerComponent = () => {
  const canvasRef = useRef(null);
  const rgb = [
    "rgb(26, 188, 156)",
    "rgb(46, 204, 113)",
    "rgb(52, 152, 219)",
    "rgb(155, 89, 182)",
    "rgb(241, 196, 15)",
    "rgb(230, 126, 34)",
    "rgb(231, 76, 60)"
  ];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, balls = [];
    let mouse = { x: undefined, y: undefined };
    
    const resizeReset = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const animationLoop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      drawBalls();

      let temp = [];
      for (let i = 0; i < balls.length; i++) {
        if (balls[i].time <= balls[i].ttl) {
          temp.push(balls[i]);
        }
      }
      balls = temp;

      requestAnimationFrame(animationLoop);
    };

    const drawBalls = () => {
      for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
      }
    };

    const mousemove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;

      for (let i = 0; i < 3; i++) {
        balls.push(new Ball());
      }
    };

    const mouseout = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    function getRandomInt(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    }

    function easeOutQuart(x) {
      return 1 - Math.pow(1 - x, 4);
    }

    class Ball {
      constructor() {
        this.start = {
          x: mouse.x + getRandomInt(-20, 20),
          y: mouse.y + getRandomInt(-20, 20),
          size: getRandomInt(30, 40)
        };
        this.end = {
          x: this.start.x + getRandomInt(-300, 300),
          y: this.start.y + getRandomInt(-300, 300)
        };

        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;

        this.style = rgb[getRandomInt(0, rgb.length - 1)];

        this.time = 0;
        this.ttl = 120;
      }

      draw() {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (this.time <= this.ttl) {
          let progress = 1 - (this.ttl - this.time) / this.ttl;

          this.size = this.start.size * (1 - easeOutQuart(progress));
          this.x = this.x + (this.end.x - this.x) * 0.01;
          this.y = this.y + (this.end.y - this.y) * 0.01;
        }
        this.time++;
      }
    }

    resizeReset();
    animationLoop();

    window.addEventListener("resize", resizeReset);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseout);

    return () => {
      window.removeEventListener("resize", resizeReset);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseout", mouseout);
    };
  }, [rgb]);

  return (
    <div className="App">
      <canvas id="canvas" ref={canvasRef}></canvas>  


      <div className='absolute left-0 top-0 grid gap-4 grid-cols-5 p-4'>
        <div className='text-justify col-span-2 text-black'>
          <h2>AetherZenIT Limited</h2>
          <p>Since pioneering the digital universe 15 years ago, Analyzen has evolved into a multiverse of reanalyzing creativity’s core. We seamlessly weave science into the art of advertising communication, encompassing all media from offline to digital, and intricately infuse art into the science of technological advancement.</p>
          <p>A league of versatile superheroes at Analyzen shapes a broad spectrum of solutions. This encompasses brand strategy and architecture, advertising content development, web and search experiences, immersive events & activations, influencer and content marketing, data analytics, community management and insight mining, media buying, enterprise software development, apps and games craftsmanship, and more.</p>
        </div>
        <div className='text-justify col-span-3'>
          <FullBanner/>
        </div>
      </div>      
    </div>
  );
};

export default BannerComponent;
