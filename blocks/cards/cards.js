import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    const bodyDiv = li.querySelector('.cards-card-body');
    // Create hidden div
    const newDiv = document.createElement('div');
    newDiv.className = 'cards-card-para hidden';
    // Move all paragraphs after the first two into the hidden div
    while (bodyDiv.children.length > 2) {
      newDiv.append(bodyDiv.children[2]); // index 2 because index 0 and 1 are preserved
    }
    bodyDiv.append(newDiv);
    // Read More button
    const button = document.createElement('button');
    button.className = 'report-button';
    button.textContent = '> Read More';
    button.addEventListener('click', () => {
      newDiv.classList.toggle('hidden');
      button.textContent = newDiv.classList.contains('hidden') ? 'Read More >' : 'Read Less <';
    });
    bodyDiv.append(button);
    ul.append(li);
  });
  // Optimize pictures
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
