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
        if (window.innerWidth <= this.tamanhoDaTela.mobile && this.botaoMenuMobile.classList.contains('active')) {
            this.botaoMenuMobile.classList.remove('active');
            this.menuNavegacao.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Forçar fechamento do menu com um pequeno atraso para permitir a animação
            setTimeout(() => {
                this.menuNavegacao.style.transform = 'translateY(-100%)';
                this.menuNavegacao.style.opacity = '0';
                this.menuNavegacao.style.visibility = 'hidden';
            }, 50);
        }
    }
    
    configurarDestaqueMenu() {
        window.addEventListener('scroll', () => this.destacarMenuAtual());
        // Também destacar no carregamento inicial
        this.destacarMenuAtual();
    }
    
    configurarNavegacaoSuave() {
        this.linksNavegacao.forEach(link => {
            link.addEventListener('click', (e) => {
                // Verificar se o link é para uma seção na mesma página
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    // Fechar o menu mobile se necessário
                    this.fecharMenuMobileSeNecessario();
                    
                    // Rolar suavemente para a seção
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Atualizar URL sem recarregar a página
                        history.pushState(null, null, href);
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