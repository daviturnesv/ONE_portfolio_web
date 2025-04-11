/**
 * Script para garantir a correta aplicação do layout da seção hero
 */
document.addEventListener('DOMContentLoaded', function() {
    // Forçar a aplicação do layout correto
    const heroContent = document.querySelector('.hero-content');
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (heroContent && heroText && heroImage) {
        // Garantir que o grid seja aplicado
        heroContent.style.display = 'grid';
        heroContent.style.gridTemplateColumns = window.innerWidth > 992 ? '1fr 1fr' : '1fr';
        
        if (window.innerWidth > 992) {
            // Desktop layout
            heroText.style.gridColumn = '1';
            heroImage.style.gridColumn = '2';
        } else {
            // Mobile layout
            heroText.style.gridRow = '2';
            heroImage.style.gridRow = '1';
            heroImage.style.gridColumn = '1';
        }
        
        // Garantir que os botões estejam em coluna
        if (ctaButtons) {
            ctaButtons.style.display = 'flex';
            ctaButtons.style.flexDirection = 'column';
            ctaButtons.style.alignItems = window.innerWidth > 992 ? 'flex-start' : 'center';
            
            // Ajustar largura dos botões
            const buttons = ctaButtons.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.style.width = '100%';
                btn.style.maxWidth = window.innerWidth > 992 ? '250px' : '300px';
                btn.style.margin = '0 0 15px 0';
            });
        }
    }
    
    // Atualizar layout quando a janela for redimensionada
    window.addEventListener('resize', function() {
        if (heroContent && heroText && heroImage) {
            heroContent.style.gridTemplateColumns = window.innerWidth > 992 ? '1fr 1fr' : '1fr';
            
            if (window.innerWidth > 992) {
                // Desktop layout
                heroText.style.gridColumn = '1';
                heroImage.style.gridColumn = '2';
                heroText.style.gridRow = 'auto';
                heroImage.style.gridRow = 'auto';
            } else {
                // Mobile layout
                heroText.style.gridRow = '2';
                heroImage.style.gridRow = '1';
                heroImage.style.gridColumn = '1';
            }
            
            // Atualizar alinhamento dos botões
            if (ctaButtons) {
                ctaButtons.style.alignItems = window.innerWidth > 992 ? 'flex-start' : 'center';
            }
        }
    });
});