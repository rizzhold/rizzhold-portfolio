// Render card changelog dari CHANGELOG_DATA ke dalam #changelogDock,
// urutan mengikuti urutan push (V1.0 -> V1.1 -> V2.0, dari lama ke baru).

document.addEventListener('DOMContentLoaded', () => {
    const dock = document.getElementById('changelogDock');
    if (!dock || typeof CHANGELOG_DATA === 'undefined') return;

    function renderCard(entry) {
        return `
        <div class="changelog-card" data-changelog-id="${entry.id}">
            <div class="changelog-card-header">
                <span class="changelog-version">Changelogs ${entry.version}</span>
                <span class="changelog-date">${entry.date}</span>
            </div>
            <p class="changelog-desc">${entry.desc}</p>
        </div>`;
    }

    dock.innerHTML = CHANGELOG_DATA.map(renderCard).join('\n');
});
