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
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `
      <div class="projeto-imagem">
        <img src="${projeto.imagem}" alt="${projeto.nome}" loading="lazy">
      </div>
      <h2 class="projeto-titulo">${projeto.nome}</h2>
      <p class="projeto-descricao">${projeto.descricao}</p>
      <h3 class="ferramentas-titulo">Ferramentas Utilizadas</h3>
      <div class="ferramentas-container">
        ${projeto.ferramentas.map(icon => 
          `<img src="${icon}" class="ferramenta-icon" alt="ferramenta">`
        ).join("")}
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

  function handleImageLoad() {
    this.style.opacity = '1';
  }

  setTimeout(() => {
    const images = document.querySelectorAll('.projeto-imagem img');
    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      img.addEventListener('load', handleImageLoad);
      
      // Se a imagem já estiver em cache
      if (img.complete) {
        handleImageLoad.call(img);
      }
    });
  }, 100);
}

carregarProjetos();
