import { createTag } from '../../scripts/scripts.js';

function getVideoEmbed(videoUrl) {
  try {
    const url = new URL(videoUrl);
    if (videoUrl.includes('youtube') || videoUrl.includes('youtu.be')) {
      // YouTube embed
      let vid = url.searchParams.get('v');
      if (!vid && url.hostname === 'youtu.be') {
        [, vid] = url.pathname.split('/');
      }
      const embedUrl = `https://www.youtube.com/embed/${vid}?rel=0`;
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.paddingBottom = '56.25%';
      wrapper.style.height = 0;
      wrapper.innerHTML = `<iframe src="${embedUrl}" style="border:0;top:0;left:0;width:100%;height:100%;position:absolute;" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
      return wrapper;
    }
    if (videoUrl.includes('vimeo')) {
      // Vimeo embed
      const videoId = url.pathname.split('/')[1];
      const embedUrl = `https://player.vimeo.com/video/${videoId}`;
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.paddingBottom = '56.25%';
      wrapper.style.height = 0;
      wrapper.innerHTML = `<iframe src="${embedUrl}" style="border:0;top:0;left:0;width:100%;height:100%;position:absolute;" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
      return wrapper;
    }
    // Direct video file
    const video = document.createElement('video');
    video.src = videoUrl;
    video.controls = true;
    video.style.width = '100%';
    video.style.display = 'block';
    const wrapper = document.createElement('div');
    wrapper.className = 'video-block';
    wrapper.appendChild(video);
    return wrapper;
  } catch (e) {
    // fallback: just show the URL
    const div = document.createElement('div');
    div.textContent = videoUrl;
    return div;
  }
}

export default function decorate(block) {
  if (block.classList.contains('accordion') && block.classList.contains('video')) {
    [...block.children].forEach((row) => {
      const label = row.children[0];
      const videoCell = row.children[1];
      const videoUrl = videoCell ? videoCell.textContent : '';

      const summary = document.createElement('summary');
      summary.className = 'accordion-item-label';
      summary.append(...label.childNodes);

      const body = document.createElement('div');
      body.className = 'accordion-item-body';

      const details = document.createElement('details');
      details.className = 'accordion-item';
      details.append(summary, body);

      details.addEventListener('toggle', () => {
        if (details.open && videoUrl) {
          body.appendChild(getVideoEmbed(videoUrl));
        } else if (!details.open) {
          body.innerHTML = '';
        }
      });

      row.replaceWith(details);
    });
    return;
  }

  if (block.classList.contains('accordion') && block.classList.contains('table')) {
    // Logic for accordion + table
    [...block.children].forEach((row) => {
      // Create summary from label
      const label = row.children[0];
      const summary = document.createElement('summary');
      summary.className = 'accordion-item-label';
      summary.append(...label.childNodes);
      // Create table and rows from body list items
      const body = row.children[1];
      const items = body.querySelectorAll('li');
      const table = document.createElement('table');
      table.classList.add('accordion-item-table');
      let rowEl;
      items.forEach((item, i) => {
        if (i % 3 === 0) {
          rowEl = createTag('tr', { class: 'accordion-item-row' });
          table.appendChild(rowEl);
        }
        const cell = createTag('td', { class: 'accordion-item-cell' });
        cell.textContent = item.textContent;
        rowEl.appendChild(cell);
      });
      // Fill remaining cells
      const remainder = items.length % 3;
      if (remainder !== 0) {
        const emptyCount = 3 - remainder;
        for (let i = 0; i < emptyCount; i += 1) {
          const emptyCell = createTag('td', { class: 'accordion-item-cell' });
          rowEl.appendChild(emptyCell);
        }
      }
      // Add one empty top row
      const topRow = createTag('tr', { class: 'accordion-item-row' });
      for (let i = 0; i < 3; i += 1) {
        const emptyCell = createTag('td', { class: 'accordion-item-cell' });
        topRow.appendChild(emptyCell);
      }
      table.insertBefore(topRow, table.firstChild);
      // Replace content
      body.innerHTML = '';
      body.className = 'accordion-item-body';
      body.appendChild(table);
      const details = document.createElement('details');
      details.className = 'accordion-item';
      details.append(summary, body);
      row.replaceWith(details);
      // close other accordions
      const val = document.querySelectorAll('.accordion-item');
      val.forEach((target) => {
        target.addEventListener('toggle', () => {
          if (target.open) {
            document.querySelectorAll('.accordion-item').forEach((el) => {
              if (el !== target) el.removeAttribute('open');
            });
          }
        });
      });
    });
  }
}
