/**
 * Script para garantir que a imagem da barra lateral seja exibida corretamente
 */
document.addEventListener('DOMContentLoaded', function() {
    const sidebarImage = document.querySelector('.blured-box img');
    
    if (sidebarImage) {
        // Garantir que a imagem seja carregada corretamente
        sidebarImage.addEventListener('load', function() {
            // Adicionar classe para indicar que a imagem foi carregada
            this.classList.add('loaded');
        });
        
        // Se a imagem já estiver em cache, pode não disparar o evento load
        if (sidebarImage.complete) {
            sidebarImage.classList.add('loaded');
        }
        
        // Fallback para garantir que a imagem seja exibida
        setTimeout(function() {
            sidebarImage.classList.add('loaded');
        }, 1000);
    }
    
    // Ajustar a barra lateral quando a janela for redimensionada
    window.addEventListener('resize', function() {
        const sidebar = document.querySelector('aside');
        if (sidebar) {
            // Garantir que a barra lateral tenha altura adequada
            sidebar.style.height = window.innerHeight + 'px';
        }
    });
    
    // Disparar o evento de redimensionamento uma vez para ajustar inicialmente
    window.dispatchEvent(new Event('resize'));
});