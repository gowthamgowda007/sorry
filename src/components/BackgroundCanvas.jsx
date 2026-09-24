import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles array (Bokeh lights + hearts)
    const numBokeh = 25;
    const numHearts = 18;
    const bokehList = [];
    const heartList = [];

    const colors = [
      'rgba(255, 182, 193, ', // Light Pink
      'rgba(230, 230, 250, ', // Lavender
      'rgba(212, 240, 240, ', // Baby Blue
      'rgba(255, 228, 225, ', // Misty Rose
      'rgba(255, 240, 245, '  // Lavender Blush
    ];

    for (let i = 0; i < numBokeh; i++) {
      bokehList.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 60 + 20,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    for (let i = 0; i < numHearts; i++) {
      heartList.push({
        x: Math.random() * width,
        y: Math.random() * height + height,
        size: Math.random() * 14 + 10,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        swing: Math.random() * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    function drawHeart(x, y, size, opacity) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.fillStyle = `rgba(244, 143, 177, ${opacity})`;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -10, -15, 5, 0, 15);
      ctx.bezierCurveTo(15, 5, 10, -10, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Bokeh Lights
      bokehList.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        const gradient = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          b.radius
        );
        gradient.addColorStop(0, `${b.colorPrefix}${b.alpha})`);
        gradient.addColorStop(1, `${b.colorPrefix}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Floating Hearts
      heartList.forEach((h) => {
        h.y -= h.speed;
        h.swing += h.swingSpeed;
        const currentX = h.x + Math.sin(h.swing) * 15;

        drawHeart(currentX, h.y, h.size, h.opacity);

        if (h.y < -30) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
