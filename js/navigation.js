/**
 * Script de Navegação
 * Gerencia o destaque do menu ao rolar e a navegação mobile
 */

document.addEventListener('DOMContentLoaded', () => {
    const navegacao = new GerenciadorNavegacao();
    navegacao.inicializar();
});

class GerenciadorNavegacao {
    constructor() {
        this.botaoMenuMobile = document.querySelector('.mobile-menu-button');
        this.menuNavegacao = document.querySelector('nav');
        this.linksNavegacao = document.querySelectorAll('nav menu li a');
        this.secoes = document.querySelectorAll('main section');
        this.tamanhoDaTela = {
            mobile: 767
        };
    }
    
    inicializar() {
        this.configurarMenuMobile();
        this.configurarDestaqueMenu();
        this.configurarNavegacaoSuave();
    }
    
    configurarMenuMobile() {
        if (!this.botaoMenuMobile) {
            console.warn('Botão de menu mobile não encontrado.');
            return;
        }
        
        // Alternar menu ao clicar no botão
        this.botaoMenuMobile.addEventListener('click', () => this.alternarMenuMobile());
        
        // Fechar menu ao clicar em um link no mobile
        this.linksNavegacao.forEach(link => {
            link.addEventListener('click', () => this.fecharMenuMobileSeNecessario());
        });
        
        // Fechar menu ao redimensionar a janela para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > this.tamanhoDaTela.mobile) {
                this.fecharMenuMobileSeNecessario();
            }
        });
    }
    
    alternarMenuMobile() {
        this.botaoMenuMobile.classList.toggle('active');
        this.menuNavegacao.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    fecharMenuMobileSeNecessario() {
        this.botaoMenuMobile.classList.remove('active');
        this.menuNavegacao.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    configurarDestaqueMenu() {
        window.addEventListener('scroll', () => this.destacarMenuAtual());
        // Também destacar no carregamento inicial
        this.destacarMenuAtual();
    }
    
    configurarNavegacaoSuave() {
        this.linksNavegacao.forEach(link => {
            link.addEventListener('click', (e) => {
                // Se é um link interno
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    destacarMenuAtual() {
        let secaoAtual = '';
        const scrollPos = window.pageYOffset;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // Encontrar a seção atual visível
        this.secoes.forEach(secao => {
            const secaoTop = secao.offsetTop - headerHeight - 10;
            const secaoAltura = secao.offsetHeight;
            
            if (scrollPos >= secaoTop && scrollPos < secaoTop + secaoAltura) {
                secaoAtual = secao.getAttribute('id');
            }
        });
        
        // Atualizar estado ativo nos links do menu
        this.linksNavegacao.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.substring(1) === secaoAtual) {
                link.classList.add('active');
            }
        });
    }
}