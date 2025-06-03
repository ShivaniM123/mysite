

export default function decorate(block) {
    console.log(block);
    const testing1= document.createElement('div');


   

    const button=document.createElement('button');
    button.innerText='Click Me';
    testing1.append(button);

 block.append(testing1);

}