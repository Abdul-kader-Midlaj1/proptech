// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if(el){
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if(toggle){
  toggle.addEventListener('click', ()=> {
    links.classList.toggle('open');
    toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
  });
}

// Intersection Observer for reveal animations
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Simple counter animation (ordinal / big numbers)
function animateCounter(el, target){
  let value = 0;
  const isBig = target > 100000;
  const duration = 1600;
  const start = performance.now();
  function step(ts){
    const t = Math.min(1, (ts - start) / duration);
    // easeOutQuad
    const eased = 1 - (1 - t) * (1 - t);
    const current = Math.floor(eased * target);
    el.textContent = isBig ? current.toLocaleString() : current;
    if(t < 1) requestAnimationFrame(step);
    else el.textContent = isBig ? target.toLocaleString() : target;
  }
  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const counters = document.querySelectorAll('.counter');
  counters.forEach(c=> {
    const target = Number(c.getAttribute('data-target')) || 0;
    // start animation when counter enters view
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          animateCounter(c, target);
          io.disconnect();
        }
      });
    }, {threshold: 0.3});
    io.observe(c);
  });
});
