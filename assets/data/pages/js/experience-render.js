// Render baris timeline Work Experience dari EXPERIENCE_DATA ke dalam #timelineRows.
// Urutan "left"/"right" zig-zag mengikuti index (genap = left, ganjil = right),
// mengikuti pola markup asli. .timeline-line & .timeline-progress-line TIDAK
// ikut di-generate karena itu elemen struktural container, bukan per-item.

document.addEventListener('DOMContentLoaded', () => {
    const rowsContainer = document.getElementById('timelineRows');
    if (!rowsContainer || typeof EXPERIENCE_DATA === 'undefined') return;

    function renderRow(exp, index) {
        const side = index % 2 === 0 ? 'left' : 'right';

        const tagsHtml = (exp.tags || [])
            .map(t => `<span>${t}</span>`)
            .join('');

        const content = `
                <div class="timeline-content card">
                    <span class="year">${exp.year}</span>
                    <h3>${exp.title}</h3>
                    <p class="company">${exp.company}</p>
                    <p class="desc">${exp.desc}</p>
                    <div class="tags">
                        ${tagsHtml}
                    </div>
                </div>`;

        const dot = `<div class="timeline-dot"></div>`;

        if (side === 'left') {
            return `
            <div class="timeline-row left">${content}
                ${dot}
            </div>`;
        }

        return `
            <div class="timeline-row right">
                ${dot}${content}
            </div>`;
    }

    rowsContainer.innerHTML = EXPERIENCE_DATA.map(renderRow).join('\n');
});
