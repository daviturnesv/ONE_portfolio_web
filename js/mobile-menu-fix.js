/**
 * Correção para o menu mobile
 * Este script garante que o menu dropdown funcione corretamente
 */
document.addEventListener('DOMContentLoaded', function() {
    // Identificar qual página estamos
    const isDictPage = window.location.href.includes('html_dict.html');
    if (isDictPage) {
        document.body.classList.add('dict-page');
    } else {
        document.body.classList.add('main-page');
    }
    
    // Elementos do DOM
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    
    // Garantir que o botão de menu mobile funcione
    if (mobileMenuButton && nav) {
        // Remover listeners antigos (para evitar duplicação)
        const newButton = mobileMenuButton.cloneNode(true);
        mobileMenuButton.parentNode.replaceChild(newButton, mobileMenuButton);
        
        // Adicionar novo listener
        newButton.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Forçar visibilidade do menu quando ativo
            if (this.classList.contains('active')) {
                nav.style.visibility = 'visible';
                nav.style.opacity = '1';
                nav.style.transform = 'translateY(0)';
            } else {
                // Usar timeout para permitir a animação antes de esconder
                setTimeout(() => {
                    if (!this.classList.contains('active')) {
                        nav.style.visibility = 'hidden';
                    }
                }, 300);
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('nav menu li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                if (mobileMenuButton) mobileMenuButton.classList.remove('active');
                if (nav) {
                    nav.classList.remove('active');
                    // Usar timeout para permitir a animação antes de esconder
                    setTimeout(() => {
                        nav.style.visibility = 'hidden';
                    }, 300);
                }
                document.body.classList.remove('menu-open');
            }
        });
    });
});