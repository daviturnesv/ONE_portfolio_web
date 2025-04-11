/**
 * Correções para a página do dicionário HTML
 */
document.addEventListener('DOMContentLoaded', function() {
    // Corrigir o botão de voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Mostrar/ocultar o botão de voltar ao topo
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('show');
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Ação de clique
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Marcar a página como dicionário HTML
    document.body.classList.add('dict-page');
    
    // Aplicar tema atual - CORREÇÃO: usar a mesma chave que a página principal
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Garantir que o toggle de tema funcione - CORREÇÃO: usar a mesma chave que a página principal
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Remover listeners antigos (para evitar duplicação)
        const newThemeToggle = themeToggle.cloneNode(true);
        themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);
        
        // Adicionar novo listener
        newThemeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            
            // Forçar atualização das barras de rolagem
            document.documentElement.style.setProperty('--scrollbar-track', 
                document.body.classList.contains('dark-mode') ? '#2a2a2a' : '#f1f1f1');
            document.documentElement.style.setProperty('--scrollbar-thumb', 
                document.body.classList.contains('dark-mode') ? 'rgba(77, 156, 222, 0.6)' : 'rgba(64, 115, 158, 0.6)');
        });
    }
});