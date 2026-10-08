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


document.addEventListener("DOMContentLoaded", function() {
    const escrito = new Typed('.multiple-text', {
       strings: ['Técnica em Informática', 'Web Developer', 'Aspirante a Palestrante',
          'Full-stack','Low-code Developer', 'Futura Cientista da Computação'],
       typeSpeed: 50,
       backSpeed: 50,
       backDelay: 100,
       loop:true
    });
});


/* Carrossel Experiências (Carregamento dinâmico via projetos.json) */
async function carregarProjetos() {
    const projetosFallback = [
        {
            nome: "Plataforma EAD",
            descricao: "Solução em Moodle sobre LGPD para um escritório jurídico.",
            imagem: "img/experiencias/logoadvogada.png",
            ferramentas: [
                "img/icones_gerais/ferramentas_identidade/moodle.svg",
                "img/icones_gerais/ferramentas_identidade/php.svg",
                "img/icones_gerais/ferramentas_identidade/clickup.svg"
            ]
        },
        {
            nome: "Refeição Sustentável",
            descricao: "App em FlutterFlow e Firebase para o restaurante estudantil.",
            imagem: "img/experiencias/RefeicaoSustentavel.png",
            ferramentas: [
                "img/icones_gerais/ferramentas_identidade/flutterflow.svg",
                "img/icones_gerais/ferramentas_identidade/firebase.svg",
                "img/icones_gerais/ferramentas_identidade/figma.svg"
            ]
        },
        {
            nome: "Estragou, e agora?",
            descricao: "Projeto de TCC do curso Técnico.",
            imagem: "img/experiencias/bicho.png",
            ferramentas: [
                "img/icones_gerais/ferramentas_identidade/laravel.svg",
                "img/icones_gerais/ferramentas_identidade/mysql.svg",
                "img/icones_gerais/ferramentas_identidade/php.svg"
            ]
        }
    ];

    let projetos = projetosFallback;

    try {
        const resposta = await fetch("projetos.json");
        if (resposta.ok) {
            projetos = await resposta.json();
        }
    } catch (err) {
        console.warn("Utilizando projetos padrão fallback:", err);
    }

    const container = document.getElementById("projetos-container");
    if (!container) return;

    container.innerHTML = ""; // Limpa qualquer conteúdo prévio

    projetos.forEach(proj => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
            <div class="projeto-imagem">
                <img src="${proj.imagem}" alt="${proj.nome}">
            </div>
            <h2 class="projeto-titulo">${proj.nome}</h2>
            <p class="projeto-descricao">${proj.descricao}</p>
            <h3 class="ferramentas-titulo">Ferramentas Utilizadas</h3>
            <div class="ferramentas-container">
                ${proj.ferramentas.map(icon => `<img src="${icon}" class="ferramenta-icon" alt="Ferramenta">`).join('')}
            </div>
        `;
        container.appendChild(slide);
    });

    // Inicializa o SwiperJS após a injeção dos slides
    new Swiper('.swiper.projetos', {
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", carregarProjetos);
} else {
    carregarProjetos();
}

