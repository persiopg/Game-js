let imagens = [];

for(let i = 1;i <= 8; i++){
    // let r = Math.trunc(Math.random() * 80 + i);
    imagens.push(`http://picsum.photos/id/${i}/80`);
}
let fundo = 'http://picsum.photos/80?grayscale';

let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

onload = () =>{
    //carrega fundo
    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach((img,i) => {
        img.src = fundo;
        img.setAttribute('data-valor', i);
        img.setAttribute('crossorigin',"anonymous");
        img.style.opacity = 0.8;
    });

    document.querySelector('#btInicio').onclick = iniciaJogo;
}

const iniciaJogo = () => {

    //embaralhar cartas
    for(let i = 0; i < cartas.length; i++){
        let j = Math.trunc(Math.random() * cartas.length);
        let temp = cartas[j];
        cartas[j] = cartas[i];
        cartas[i] = temp;
    };
    
    console.log(cartas);
    //associar evento as cartas
let elemImagens = document.querySelectorAll('#memoria img');
elemImagens.forEach((img,i) => {
    img.onclick = trataClickImage;
    img.style.opacity = 1;
});
}

const trataClickImage = (e) => {
    const p = +e.target.getAttribute('data-valor');
    const valor = cartas[p];
    e.target.src = imagens[valor - 1];
    e.target.onclick = null;
    setTimeout(() => {
        e.target.src = fundo;
        e.target.onclick = trataClickImage;
    }, 1500);
};