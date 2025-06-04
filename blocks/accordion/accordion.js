/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];

    body.className = 'accordion-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);


    


    row.replaceWith(details);
  });

//
    const t= document.createElement('table');
    t.className = 'accordion-table';
    const tr = document.createElement('tr');
    const td = document.createElement('td');
   // td.innerText=Textg;
  block.appendChild(t);
  t.appendChild(tr);
  tr.appendChild(td);

console.log(block);

}







/* export default function decorate(block) {
  [...block.children].forEach((row, index) => {
    // Decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    // Decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';

    // Add options with radio buttons based on the accordion index
    const options = index === 0
      ? ['AWS', 'Azure', 'GCP'] // First accordion options
      : ['C', 'C++', 'Java']; // Second accordion options

    options.forEach((option) => {
      // Add a title for each option
      const title = document.createElement('p');
      title.textContent = option;
      body.appendChild(title);

      // Add 5 radio buttons for each option
      for (let j = 1; j <= 5; j++) {
        const radio = document.createElement('input');
        radio.type = 'radio';
        const optionName = option.toLowerCase().replace(/\+/g, 'plus');
        radio.name = `${optionName}-options`; // Group name for each option
        radio.id = `${option.toLowerCase().replace(/\+/g, 'plus')}-option-${j}`;
        radio.value = j;

        const label = document.createElement('label');
        label.htmlFor = radio.id;
        label.textContent = j;
        label.style.marginRight = '10px';

        // Append the radio button and label to the body
        body.append(radio, label);
      }
    });

    // Decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });

  // Add a "Report" button before the accordion block
  const button = document.createElement('button');
  button.innerText = 'Report';
  button.classList.add('report-button');
  block.before(button);
}
  */
