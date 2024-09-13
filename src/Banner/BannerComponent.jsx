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
        <div className='flex justify-center flex-col text-justify col-span-2 text-black'>
          <h3 className='text-4xl font-semibold text-red-500'>Software Development Agency</h3>
          <h2 className='text-4xl font-semibold text-red-500'>AetherZenIT</h2>
          <p className='mt-4 text-white text-sm'>At AetherZen, we craft custom software solutions designed to propel your business forward. From groundbreaking apps to seamless integrations, our expert team delivers technology that meets today’s needs while anticipating tomorrow’s opportunities.</p>
          <button className='text-red-500 btn w-1/2 mt-4'>Learn More</button>
        </div>
        <div className='text-justify col-span-3'>
          <FullBanner/>
        </div>
      </div>      
    </div>
  );
};

export default BannerComponent;
