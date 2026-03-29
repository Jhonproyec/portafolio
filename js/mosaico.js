document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('#proyectos');

  // ── Renderizar proyectos ────────────────────────────────────────
  projects.forEach((project, projIdx) => {
    const linksHTML = buildLinks(project.links);
    const techsHTML = project.technologies.map(t => `
      <span>
        <img src="${t.icon}" alt="${t.name}" title="${t.name}" loading="lazy">
        ${t.name}
      </span>`).join('');

    const article = document.createElement('article');
    article.className = 'project';
    article.innerHTML = `
      <h2 class="title-movil">${project.title}</h2>
      <div class="img-mosaic" id="mosaic-${projIdx}"></div>
      <div class="project-content">
        <div class="header">
          <h2>${project.title}</h2>
          <div class="technologies">${techsHTML}</div>
        </div>
        <p class="project-description">${project.description}</p>
        ${linksHTML ? `<div class="buttons">${linksHTML}</div>` : ''}
      </div>`;

    container.appendChild(article);
    buildMosaic(document.getElementById(`mosaic-${projIdx}`), project.images, projIdx);
  });

  // ── Construir mosaico ───────────────────────────────────────────
  function buildMosaic(el, images, projIdx) {
    if (!images.length) return;

    const preview = images.slice(0, 4);  // máximo 4 en el mosaico
    const [first, ...rest] = preview;

    if (preview.length === 1) {
      el.innerHTML = thumbHTML(images[0], projIdx, 0, true);
    } else {
      const lastIdx = rest.length - 1;
      const restThumbs = rest.map((src, i) => {
        const isLast = i === lastIdx && images.length > 4;
        const extra = images.length - 4;
        return `
        <div class="mosaic-thumb ${isLast ? 'mosaic-more' : ''}" onclick="openLb(${projIdx}, ${i + 1})">
          <img src="${src}" alt="" loading="lazy">
          <div class="mosaic-overlay"><span>Ver imagen</span></div>
          ${isLast ? `<div class="mosaic-count">+${extra}</div>` : ''}
        </div>`;
      }).join('');

      el.innerHTML = `
      ${thumbHTML(first, projIdx, 0, true)}
      <div class="mosaic-row">${restThumbs}</div>`;
    }
  }

  function thumbHTML(src, projIdx, imgIdx, isMain) {
    return `
      <div class="mosaic-thumb ${isMain ? 'main' : ''}" onclick="openLb(${projIdx}, ${imgIdx})">
        <img src="${src}" alt="" loading="lazy">
        <div class="mosaic-overlay"><span>Ver imagen</span></div>
      </div>`;
  }

  function buildLinks({ code, demo }) {
    let html = '';
    if (code) html += `<a href="${code}" target="_blank"><i class="fab fa-github"></i> Código</a>`;
    if (demo) html += `<a href="${demo}" target="_blank"><i class="fas fa-link"></i> Ver</a>`;
    return html;
  }

  // ── Lightbox ────────────────────────────────────────────────────
  const overlay = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbDots = document.getElementById('lb-dots');
  const lbCounter = document.getElementById('lb-counter');

  let curProject = 0, curIdx = 0;

  window.openLb = (proj, idx) => {
    curProject = proj; curIdx = idx;
    renderLb();
    overlay.classList.add('active');
  };

  function renderLb() {
    const imgs = projects[curProject].images;
    lbImg.src = imgs[curIdx];
    lbCounter.textContent = `${curIdx + 1} / ${imgs.length}`;

    lbDots.innerHTML = '';
    imgs.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'lb-dot' + (i === curIdx ? ' active' : '');
      d.onclick = (e) => { e.stopPropagation(); curIdx = i; renderLb(); };
      lbDots.appendChild(d);
    });

    const [prev, next] = document.querySelectorAll('.lb-arrow');
    const show = imgs.length > 1 ? 'flex' : 'none';
    prev.style.display = next.style.display = show;
  }

  window.closeLb = () => overlay.classList.remove('active');

  overlay.addEventListener('click', e => { if (e.target === overlay) closeLb(); });

  document.querySelectorAll('.lb-arrow').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const dir = btn.classList.contains('prev') ? -1 : 1;
      const len = projects[curProject].images.length;
      curIdx = (curIdx + dir + len) % len;
      renderLb();
    });
  });

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') { curIdx = (curIdx + 1) % projects[curProject].images.length; renderLb(); }
    if (e.key === 'ArrowLeft') { curIdx = (curIdx - 1 + projects[curProject].images.length) % projects[curProject].images.length; renderLb(); }
  });
  document.dispatchEvent(new CustomEvent('proyectosListos'));
});