'use client';

import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: number[];
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(70);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Colors for dots
    const colors = [
      '#3B82F6', // blue
      '#10B981', // green
      '#F59E0B', // yellow
      '#EF4444', // red
      '#EC4899', // pink
      '#8B5CF6', // purple
    ];

    // Create dots
    const dots: Dot[] = [];
    const numDots = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    
    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
      });
    }

    // Animation loop
    const animate = (): void => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw dots
      dots.forEach((dot, _index) => {
        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edges
        if (dot.x <= 0 || dot.x >= canvas.width) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= canvas.height) dot.vy *= -1;

        // Keep dots within bounds
        dot.x = Math.max(0, Math.min(canvas.width, dot.x));
        dot.y = Math.max(0, Math.min(canvas.height, dot.y));

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections
      dots.forEach((dot, i) => {
        dots.slice(i + 1).forEach((otherDot) => {
          const distance = Math.sqrt(
            Math.pow(dot.x - otherDot.x, 2) + Math.pow(dot.y - otherDot.y, 2)
          );

          if (distance < 150) {
            const opacity = 1 - (distance / 150);
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Add colored connection lines
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.strokeStyle = `${dot.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-100vh pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedBackground; 