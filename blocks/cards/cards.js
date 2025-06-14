import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });

    const button = document.createElement('button');
    button.textContent = 'Read More >';
    button.classList.add('report-button');
    li.append(button);

    button.addEventListener('click', () => {
      const body = li.querySelector('.cards-card-body');
      body.classList.toggle('hidden');
      button.textContent = body.classList.contains('hidden') ? 'Read Less <' : 'Read More >';
    });
    const newdiv1 = document.createElement('div');
    newdiv1.className = 'cards-div1';

    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      for (let i = 0; i < 2; i += 1) {
        if (bodyDiv.children.length > 0) {
          newdiv1.appendChild(bodyDiv.children[0]); // Moves the element
        }
      }
      li.insertBefore(newdiv1, bodyDiv);
    }
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(
    createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
  ));

  block.textContent = '';
  block.append(ul);
}
