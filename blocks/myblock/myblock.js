

export default function decorate(block) {
  console.log(block);
  const searchWrapper = document.querySelector('.myblock');
    const input = document.createElement('input');

    input.type = "text";
    input.placeholder = "Enter text...";
     searchWrapper.appendChild(input);
     block.appendChild(searchWrapper);
  };
