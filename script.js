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

  // Animated fire cursor (follow mouse). Degrades on touch devices.
  if(!('ontouchstart' in window)){
    const cursor = document.createElement('div');
    cursor.className = 'fire-cursor';
    cursor.innerHTML = '<div class="flame-core"></div><div class="flame-flicker"></div>';
    document.body.appendChild(cursor);

    let lastX = 0, lastY = 0;
    window.addEventListener('mousemove', (e)=>{
      lastX = e.clientX; lastY = e.clientY;
      cursor.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%,-50%)`;
    }, {passive:true});

    // hide on pointerdown for text selection, show again on pointerup
    window.addEventListener('pointerdown', ()=>{ cursor.style.opacity = '0' });
    window.addEventListener('pointerup', ()=>{ cursor.style.opacity = '1' });
  }
});
