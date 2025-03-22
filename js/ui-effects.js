/**
 * Script de Efeitos de Interface
 * Gerencia preloader, barra de progresso de rolagem e botão de voltar ao topo
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarPreloader();
    inicializarBarraProgresso();
    inicializarBotaoTopo();
    inicializarEfeitosInclinacao();
});

function inicializarPreloader() {
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

function inicializarBarraProgresso() {
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const barraProgresso = document.querySelector('.scroll-progress');
        if (barraProgresso) {
            barraProgresso.style.width = scrollPercent + '%';
        }
    });
}

function inicializarBotaoTopo() {
    const botaoTopo = document.querySelector('.back-to-top');
    if (!botaoTopo) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            botaoTopo.classList.add('visible');
        } else {
            botaoTopo.classList.remove('visible');
        }
    });
    
    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function inicializarEfeitosInclinacao() {
    if (window.tiltManager && typeof window.tiltManager.init === 'function') {
        window.tiltManager.init();
    }
}

// Gerenciador de efeitos de inclinação para reinicialização do VanillaTilt
window.tiltManager = {
    init() {
        if (!this.verificarVanillaTilt()) return;
        
        const seletores = ".skill-card, .project-card:not(.hide-project), .certificate-card:not(.hide-certificate)";
        const elementos = document.querySelectorAll(seletores);
        
        if (elementos.length === 0) return;
        
        VanillaTilt.init(elementos, this.obterOpcoesTilt());
    },
    
    reinitForVisible(seletor) {
        if (!this.verificarVanillaTilt() || !seletor) return;
        
        // Remover inclinação de todos os elementos
        const seletorBase = seletor.split(':')[0];
        const todosElementos = document.querySelectorAll(seletorBase);
        
        todosElementos.forEach(elemento => {
            if (elemento.vanillaTilt) {
                elemento.vanillaTilt.destroy();
            }
        });
        
        // Reinicializar apenas para elementos visíveis
        const elementosVisiveis = document.querySelectorAll(seletor);
        if (elementosVisiveis.length === 0) return;
        
        VanillaTilt.init(elementosVisiveis, this.obterOpcoesTilt());
    },
    
    verificarVanillaTilt() {
        return typeof VanillaTilt !== 'undefined';
    },
    
    obterOpcoesTilt() {
        return {
            max: 5,
            speed: 300,
            glare: true,
            "max-glare": 0.1
        };
    }
};