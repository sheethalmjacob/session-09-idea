document.addEventListener('DOMContentLoaded', ()=>{
  // Mobile nav toggle
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  btn && btn.addEventListener('click', ()=>{
    const visible = nav.style.display === 'flex';
    nav.style.display = visible ? 'none' : 'flex';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // small interactive hoop effect: rotate ring slowly and increase on hover
  const hoop = document.querySelector('.hoop-ring');
  if(hoop){
    let angle = 0;
    function tick(){
      angle += 0.02; // slow rotation
      hoop.style.transform = `rotate(${angle}deg)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    const svg = document.getElementById('fire-hoop');
    svg.addEventListener('mouseenter', ()=>{ hoop.style.transition = 'transform .25s'; hoop.style.transform += ' scale(1.01)'; });
    svg.addEventListener('mouseleave', ()=>{ hoop.style.transition = 'transform .25s'; });
  }

  // Contact form: warn user before using mailto fallback (keeps backend free)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      // default action uses mailto and may open email client; show tiny confirm on desktop
      if(!/Mobi|Android/i.test(navigator.userAgent)){
        const ok = confirm('This form will open your email client to send a message. Continue?');
        if(!ok) e.preventDefault();
      }
    });
  }
  // Animated particle fire cursor (canvas) — degrades on touch devices
  if(!('ontouchstart' in window)){
    const canvas = document.createElement('canvas');
    canvas.className = 'fire-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d', {alpha: true});
    let DPR = window.devicePixelRatio || 1;
    function resizeCanvas(){
      DPR = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, {passive:true});

    let particles = [];
    const MAX_PARTICLES = 600;

    function spawnParticles(x, y, count=6){
      for(let i=0;i<count;i++){
        particles.push({
          x: x + (Math.random()-0.5)*6,
          y: y + (Math.random()-0.5)*6,
          vx: (Math.random()-0.5) * 1.6,
          vy: - (Math.random()*2 + 1.2),
          life: 0,
          ttl: 30 + Math.random()*30,
          size: 6 + Math.random()*6
        });
      }
      if(particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
    }

    let lastMove = {x: -9999, y: -9999};
    window.addEventListener('mousemove', (e)=>{
      lastMove.x = e.clientX; lastMove.y = e.clientY;
      // spawn relative to movement speed
      spawnParticles(e.clientX, e.clientY, 4 + Math.round(Math.min(6, Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0))));
    }, {passive:true});

    function update(){
      ctx.clearRect(0,0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      for(let i = particles.length - 1; i >= 0; i--){
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        // mimick rising smoke/flame easing
        p.vy += 0.06; // gravity (pull down) reduces upward speed over time
        p.life++;
        const t = p.life / p.ttl;
        const alpha = Math.max(0, 1 - t);
        const size = p.size * (1 - t*0.6);

        // gradient glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size*2);
        g.addColorStop(0, `rgba(255, 245, 180, ${alpha})`);
        g.addColorStop(0.4, `rgba(255, 150, 40, ${alpha*0.95})`);
        g.addColorStop(1, `rgba(255, 40, 0, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI*2);
        ctx.fill();

        // remove if dead
        if(p.life >= p.ttl) particles.splice(i, 1);
      }
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
});
