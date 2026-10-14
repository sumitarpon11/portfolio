const $ = s => document.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const D = DATA;

/* ---------- Render content from data.js ---------- */
document.title = D.name + ' | Portfolio';
$('#brand').textContent = D.short;
$('#name').textContent = D.name;
$('#tagline').textContent = D.tagline;
$('#foot-name').textContent = D.name;
$('#year').textContent = new Date().getFullYear();

const sections = [['about','About'],['skills','Skills'],['education','Education'],['projects','Projects'],['achievements','Achievements'],['contact','Contact']];
sections.forEach(([id, label]) => { const a = el('a', '', label); a.href = '#' + id; $('#menu').append(a); });

D.stats.forEach(s => $('#stats').append(el('div', 'stat', `<b data-to="${s.value}">0</b><span>${esc(s.label)}</span>`)));
D.about.forEach(p => $('#about-body').append(el('p', '', esc(p))));
Object.entries(D.skills).forEach(([group, items]) => {
  const g = el('div', 'skill-group', `<h3>${esc(group)}</h3>`);
  const ul = el('ul', 'chips');
  items.forEach(i => ul.append(el('li', '', esc(i))));
  g.append(ul); $('#skill-body').append(g);
});
D.education.forEach(e => $('#edu-body').append(el('li', '', `<h3>${esc(e.title)}</h3><p class="meta">${esc(e.place)}</p><p>${esc(e.text)}</p>`)));
D.achievements.forEach(a => $('#ach-body').append(el('li', '', esc(a))));

const mail = el('a', '', esc(D.contact.email)); mail.href = 'mailto:' + D.contact.email; $('#links').append(mail);
D.contact.links.forEach(l => { const a = el('a', '', esc(l.label)); a.href = l.url; a.target = '_blank'; a.rel = 'noopener'; $('#links').append(a); });

/* ---------- Projects: filter + modal ---------- */
const cats = ['All', ...new Set(D.projects.map(p => p.category))];
let active = 'All';
function renderProjects() {
  $('#project-body').innerHTML = '';
  D.projects.filter(p => active === 'All' || p.category === active).forEach(p => {
    const card = el('article', 'project reveal in', `<h3>${esc(p.title)}</h3><p class="meta">${esc(p.tag)}</p><p>${esc(p.summary)}</p>`);
    card.dataset.cat = p.category;
    const ul = el('ul', 'chips'); p.tech.forEach(t => ul.append(el('li', '', esc(t)))); card.append(ul);
    const acts = el('div', 'card-actions');
    const more = el('button', '', 'Read more'); more.onclick = () => openModal(p);
    acts.append(more);
    if (p.github) { const g = el('a', '', 'GitHub'); g.href = p.github; g.target = '_blank'; g.rel = 'noopener'; acts.append(g); }
    if (p.demo) { const d = el('a', '', 'Live demo'); d.href = p.demo; d.target = '_blank'; d.rel = 'noopener'; acts.append(d); }
    card.append(acts); $('#project-body').append(card);
  });
}
cats.forEach(c => {
  const b = el('button', '', esc(c)); b.setAttribute('aria-pressed', c === active);
  b.onclick = () => { active = c; document.querySelectorAll('#filters button').forEach(x => x.setAttribute('aria-pressed', x === b)); renderProjects(); };
  $('#filters').append(b);
});
renderProjects();

const modal = $('#modal');
function openModal(p) {
  $('#modal-body').innerHTML = `<h3>${esc(p.title)}</h3><p class="meta">${esc(p.tag)}</p><p>${esc(p.details)}</p><ul class="chips">${p.tech.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` +
    (p.github ? `<p><a href="${esc(p.github)}" target="_blank" rel="noopener">View on GitHub</a></p>` : '');
  modal.showModal();
}
$('#modal-close').onclick = () => modal.close();
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

/* ---------- Theme toggle ---------- */
const themeBtn = $('#theme');
const setThemeLabel = () => themeBtn.textContent = document.documentElement.dataset.theme === 'dark' ? 'Light mode' : 'Dark mode';
setThemeLabel();
themeBtn.onclick = () => {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('theme', t); } catch (e) {}
  setThemeLabel();
};

/* ---------- Mobile menu ---------- */
const menuBtn = $('.menu-btn'), menu = $('#menu');
menuBtn.onclick = () => menuBtn.setAttribute('aria-expanded', menu.classList.toggle('open'));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); } });

/* ---------- Scroll: progress bar, back to top, active link ---------- */
const links = [...menu.querySelectorAll('a')];
addEventListener('scroll', () => {
  const h = document.documentElement;
  $('#progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  $('#to-top').hidden = h.scrollTop < 500;
}, { passive: true });
$('#to-top').onclick = () => scrollTo({ top: 0 });
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(([id]) => spy.observe($('#' + id)));

/* ---------- Reveal on scroll + stat counters ---------- */
document.querySelectorAll('.section > *').forEach(x => x.classList.add('reveal'));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal:not(.in)').forEach(x => io.observe(x));

const countIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  countIO.unobserve(e.target);
  const to = +e.target.dataset.to; let n = 0;
  const step = () => { n += Math.max(1, Math.ceil(to / 30)); e.target.textContent = Math.min(n, to); if (n < to) requestAnimationFrame(step); };
  step();
}));
document.querySelectorAll('[data-to]').forEach(x => countIO.observe(x));

/* ---------- Typing effect ---------- */
(function () {
  const out = $('#typed');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { out.textContent = D.roles[0]; return; }
  let r = 0, i = 0, del = false;
  (function tick() {
    const word = D.roles[r];
    out.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && i === 0) { del = false; r = (r + 1) % D.roles.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
})();

/* ---------- Contact form (opens visitor's mail app) ---------- */
const form = $('#contact-form'), status = $('#form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const { name, email, message } = form.elements;
  status.className = '';
  if (!name.value.trim() || !message.value.trim()) { status.textContent = 'Please enter your name and a message.'; status.classList.add('error'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { status.textContent = 'Please enter a valid email address.'; status.classList.add('error'); return; }
  const subject = encodeURIComponent('Portfolio message from ' + name.value.trim());
  const body = encodeURIComponent(message.value.trim() + '\n\nFrom: ' + email.value.trim());
  location.href = `mailto:${D.contact.email}?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email app to send the message.'; status.classList.add('ok');
});

/* ---------- Hero: ultrasound sector scan ---------- */
(function () {
  const c = $('#scan'), ctx = c.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, t = 0, mx = 0;
  const noise = Array.from({ length: 900 }, () => ({ a: Math.random(), r: Math.random(), s: Math.random() }));
  function resize() { const d = devicePixelRatio || 1; w = c.clientWidth; h = c.clientHeight; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
  addEventListener('mousemove', e => { mx = (e.clientX / innerWidth - .5) * .25; }, { passive: true });
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 760, ox = narrow ? w / 2 : w * .72, oy = h * .08;
    const R = Math.min(h * .95, narrow ? w * 1.1 : w * .6), half = Math.PI / 4.2, base = Math.PI / 2 + mx * .4;
    ctx.save(); ctx.beginPath(); ctx.moveTo(ox, oy); ctx.arc(ox, oy, R, base - half, base + half); ctx.closePath(); ctx.clip();
    const g = ctx.createRadialGradient(ox, oy, 10, ox, oy, R);
    g.addColorStop(0, 'rgba(120,180,200,.28)'); g.addColorStop(1, 'rgba(30,80,100,.10)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    noise.forEach(p => {
      const ang = base - half + p.a * half * 2, rad = (p.r ** .8) * R;
      const f = reduce ? .5 : .5 + .5 * Math.sin(t * 2 + p.s * 40);
      ctx.fillStyle = `rgba(190,225,235,${.08 + .3 * f * p.s})`;
      ctx.fillRect(ox + Math.cos(ang) * rad, oy + Math.sin(ang) * rad, 2, 2);
    });
    const beam = reduce ? 0 : Math.sin(t * .9) * half * .9;
    ctx.strokeStyle = 'rgba(240,190,100,.55)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + Math.cos(base + beam) * R, oy + Math.sin(base + beam) * R); ctx.stroke();
    ctx.restore();
    ctx.strokeStyle = 'rgba(143,196,214,.45)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.arc(ox, oy, R, base - half, base + half); ctx.closePath(); ctx.stroke();
  }
  function loop() { t += .016; draw(); if (!reduce) requestAnimationFrame(loop); }
  resize(); draw(); addEventListener('resize', () => { resize(); draw(); });
  if (!reduce) requestAnimationFrame(loop);
})();
