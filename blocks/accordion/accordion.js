export default function decorate(block) {
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
        rowEl = document.createElement('tr');
        rowEl.classList.add('accordion-item-row');
        table.appendChild(rowEl);
      }
      const cell = document.createElement('td');
      cell.classList.add('accordion-item-cell');
      cell.textContent = item.textContent;
      rowEl.appendChild(cell);
    });
    // Fill remaining cells
    const remainder = items.length % 3;
    if (remainder !== 0) {
      const emptyCount = 3 - remainder;
      for (let i = 0; i < emptyCount; i += 1) {
        const emptyCell = document.createElement('td');
        emptyCell.classList.add('accordion-item-cell');
        rowEl.appendChild(emptyCell);
      }
    }
    // Add one empty top row
    const topRow = document.createElement('tr');
    topRow.classList.add('accordion-item-row');
    for (let i = 0; i < 3; i += 1) {
      const emptyCell = document.createElement('td');
      emptyCell.classList.add('accordion-item-cell');
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
    // close other accordians
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
