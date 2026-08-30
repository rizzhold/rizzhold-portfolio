// Render kartu project dari PROJECT_DATA ke dalam .projects-grid,
// lalu jalankan logic interaktif "More" / Close (menggantikan logic lama di script.js
// yang sebelumnya nge-bind langsung ke card statis di HTML).

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.projects-grid');
    if (!grid || typeof PROJECT_DATA === 'undefined') return;

    const arrowSvg = (arrClass) => `
        <svg xmlns="http://www.w3.org/2000/svg" class="${arrClass}" viewBox="0 0 24 24">
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>`;

    const checkIcon = `<svg class="silhouette-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    const githubIcon = `<svg class="silhouette-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;

    function renderCard(project) {
        const fallbackClass = project.fallbackColor && project.fallbackColor !== 'default'
            ? `project-img-fallback ${project.fallbackColor}`
            : 'project-img-fallback';

        const featuresHtml = (project.features || [])
            .map(f => `<li>${checkIcon}${f}</li>`)
            .join('\n                            ');

        return `
        <div class="project-card" data-project-id="${project.id}">
            <!-- Tampilan Normal -->
            <div class="project-front">
                <div class="project-img-container">
                    <img src="${project.image}" alt="${project.imageAlt}" class="project-preview-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="${fallbackClass}">${project.fallbackLabel}</div>
                </div>
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.shortDesc}</p>
                    <div class="project-action-area">
                        <button class="view-more-btn more-btn" type="button">
                            ${arrowSvg('arr-2')}
                            <span class="text">More</span>
                            ${arrowSvg('arr-1')}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tampilan Detail -->
            <div class="project-back">
                <button class="modal-close-btn project-close-btn" aria-label="Tutup">&times;</button>
                <div class="project-back-content">
                    <span class="proj-created">Created At: ${project.createdAt}</span>
                    <p class="proj-desc">${project.fullDesc}</p>
                    <p class="proj-tech"><strong>Technologies Used:</strong> ${project.tech}</p>
                    <div class="proj-features">
                        <strong>Feature:</strong>
                        <ul>
                            ${featuresHtml}
                        </ul>
                    </div>
                </div>
                <div class="project-back-actions">
                    <a href="${project.repoUrl}" target="_blank" class="btn-outline repo-btn">
                        ${githubIcon}
                        Repository
                    </a>
                    <a href="${project.launchUrl}" target="_blank" class="btn-primary launch-btn">Launch</a>
                </div>
            </div>
        </div>`;
    }

    grid.innerHTML = PROJECT_DATA.map(renderCard).join('\n');

    // ========================================== */
    // LOGIKA INTERAKTIF KARTU PROYEK (VIEW MORE)  */
    // (dipindahkan dari script.js karena card sekarang di-generate lewat JS,
    //  bukan statis di HTML)
    // ========================================== */
    const projectCards = grid.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const viewMoreBtn = card.querySelector('.view-more-btn');
        const closeBtn = card.querySelector('.project-close-btn');

        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                projectCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active-detail');
                    }
                });

                card.classList.toggle('active-detail');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('active-detail');
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.project-card')) {
            projectCards.forEach(card => {
                card.classList.remove('active-detail');
            });
        }
    });
});
