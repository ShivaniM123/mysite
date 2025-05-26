/*export default function decorate(block) {
    

    ['AWS', 'GCP', 'Azure'].forEach((text, i) => {
        const title = document.createElement('p');
        title.textContent = text;
        block.appendChild(title);
      
       for (let j = 1; j <= 5; j++) {
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = `option${i}`; // group for Option 1 and Option 2 separately
          radio.id = `opt${i}_val${j}`;
          radio.value = j;
      
          const label = document.createElement('label');
          console.log(label);
         // label.htmlFor = radio.id;
          label.textContent = j;
          label.style.marginRight = '10px';
      
          block.append(radio, label);
        }
      
     //   block.appendChild(document.createElement('br'));
      });
    }
      */
      
  