import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });

    // create a div
    const newDiv = document.createElement('div');
    newDiv.className = 'cards-card-para hidden';
    const bodyDiv = li.querySelector('.cards-card-body');

    const len = bodyDiv.children.length;
    for (let i = 0; i < len - 2; i += 1) {
      if (bodyDiv.children.length > 0) {
      if (bodyDiv.children.length > 0) {
        const para = bodyDiv.children[2];
        newDiv.append(para);
      }
    }
    bodyDiv.append(newDiv);
    const subbodyDiv = li.querySelector('.cards-card-para');

    // Read More button
    const button = document.createElement('button');
    button.className = 'report-button';
    bodyDiv.append(button);
    button.textContent = '> Read More';
    button.addEventListener('click', () => {
      subbodyDiv.classList.toggle('hidden');
      button.textContent = subbodyDiv.classList.contains('hidden') ? 'Read More >' : 'Read Less <';
    });

    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
