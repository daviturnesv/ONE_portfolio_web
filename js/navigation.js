/**
 * Script de Navegação
 * Gerencia o destaque do menu ao rolar e a navegação mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar funcionalidade de alternância do menu mobile
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            mobileMenuButton.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Fechar menu mobile ao clicar em um link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('show');
                    mobileMenuButton.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }
    
    // Funcionalidade de destaque do menu ao rolar
    function highlightMenuOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                // Ativar apenas links que apontam para seções dentro da página atual
                const href = link.getAttribute('href');
                if (href.startsWith('#') && href.substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    highlightMenuOnScroll();
});