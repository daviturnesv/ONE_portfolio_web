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
        this.menuNavegacao = document.querySelector('nav ul');
        this.linksNavegacao = document.querySelectorAll('nav ul li a');
        this.secoes = document.querySelectorAll('section');
        this.tamanhoDaTela = {
            mobile: 768
        };
    }
    
    inicializar() {
        this.configurarMenuMobile();
        this.configurarDestaqueMenu();
    }
    
    configurarMenuMobile() {
        if (!this.botaoMenuMobile || !this.menuNavegacao) return;
        
        // Alternar menu ao clicar no botão
        this.botaoMenuMobile.addEventListener('click', () => this.alternarMenuMobile());
        
        // Fechar menu ao clicar em um link no mobile
        this.linksNavegacao.forEach(link => {
            link.addEventListener('click', () => this.fecharMenuMobileSeNecessario());
        });
    }
    
    alternarMenuMobile() {
        this.menuNavegacao.classList.toggle('show');
        this.botaoMenuMobile.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    fecharMenuMobileSeNecessario() {
        if (window.innerWidth <= this.tamanhoDaTela.mobile) {
            this.menuNavegacao.classList.remove('show');
            this.botaoMenuMobile.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    configurarDestaqueMenu() {
        window.addEventListener('scroll', () => this.destacarMenuAtual());
    }
    
    destacarMenuAtual() {
        let secaoAtual = '';
        const offsetDestaque = 200;
        
        // Encontrar a seção atual visível
        this.secoes.forEach(secao => {
            const topoSecao = secao.offsetTop;
            
            if (window.pageYOffset >= topoSecao - offsetDestaque) {
                secaoAtual = secao.getAttribute('id');
            }
        });
        
        // Atualizar estado ativo nos links do menu
        this.linksNavegacao.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href.startsWith('#') && href.substring(1) === secaoAtual) {
                link.classList.add('active');
            }
        });
    }
}