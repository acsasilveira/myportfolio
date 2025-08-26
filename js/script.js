/* dropdown */
// Quando clica no botão
function Dropdown() {
   if (document.querySelector(".dropdown").style.display == "none") {
      document.getElementById("dropdown").classList.toggle("show");
      document.querySelector(".dropdown").style.display = "block";
   } else {
      document.getElementById("dropdown").classList.toggle("hide");
      document.querySelector(".dropdown").style.display = "none";
   }
}

// Fecha ao clicar fora do menu
window.onclick = function(e) {
   if(!e.target.closest('.sobremim')){
      const dropdown = document.getElementById("dropdown");
      dropdown.classList.toggle("hide");
      dropdown.style.display = "none";
   }
}


/* efeito de escrita na tela inicial 
const escrito= new Typed('.multiple-text', {
   strings: ['Técnica em Informática', 'Web Developer', 'Aspirante a Palestrante',
      'Full-stack','Low-code Developer', 'Futura Cientista de Dados'],
   typeSpeed: 50,
   backSpeed: 50,
   backDelay: 100,
   loop:true
});
*/

document.addEventListener("DOMContentLoaded", function() {
    const escrito = new Typed('.multiple-text', {
       strings: ['Técnica em Informática', 'Web Developer', 'Aspirante a Palestrante',
          'Full-stack','Low-code Developer', 'Futura Cientista de Dados'],
       typeSpeed: 50,
       backSpeed: 50,
       backDelay: 100,
       loop:true
    });
});


/* Carrossel Experiências */


async function carregarProjetos() {
  const resposta = await fetch("projetos.json");
  const projetos = await resposta.json();

  const container = document.getElementById("projetos-container");

  projetos.forEach(projeto => {
    // Criar slide
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide"); // precisa ser swiper-slide

    slide.innerHTML = `
      <img src="${projeto.imagem}" alt="${projeto.nome}">
      <h2>${projeto.nome}</h2>
      <p>${projeto.descricao}</p>
      <div class="ferramentas">
        ${projeto.ferramentas.map(icon => `<img src="${icon}">`).join("")}
      </div>
    `;

    container.appendChild(slide);
  });

  // Inicializa o carrossel
  new Swiper('.swiper.projetos', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });
}

carregarProjetos();
