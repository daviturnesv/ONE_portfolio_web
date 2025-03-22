/**
 * Script de Efeitos de Interface
 * Gerencia preloader, barra de progresso de rolagem e botão de voltar ao topo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Manipulação do preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Barra de progresso de rolagem
    window.addEventListener('scroll', function() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
    });
    
    // Botão de voltar ao topo
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Inicializar efeitos de inclinação
    window.tiltManager.init();
});

// Gerenciador de efeitos de inclinação para reinicialização do VanillaTilt
window.tiltManager = {
    init: function() {
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card:not(.hide-project), .certificate-card:not(.hide-certificate)"), {
                max: 5,
                speed: 300,
                glare: true,
                "max-glare": 0.1
            });
        }
    },
    
    reinitForVisible: function(selector) {
        if (typeof VanillaTilt !== 'undefined') {
            // Remover inclinação de todos os elementos
            const elements = document.querySelectorAll(selector.split(':')[0]);
            elements.forEach(el => {
                if (el.vanillaTilt) {
                    el.vanillaTilt.destroy();
                }
            });
            
            // Reinicializar apenas para elementos visíveis
            VanillaTilt.init(document.querySelectorAll(selector), {
                max: 5,
                speed: 300,
                glare: true,
                "max-glare": 0.1
            });
        }
    }
};