/**
 * Sincronização global de tema
 * Garante que o tema seja consistente em todas as páginas
 */
document.addEventListener('DOMContentLoaded', function() {
    // Função para aplicar o tema atual
    function aplicarTemaAtual() {
        const temaAtual = localStorage.getItem('theme');
        
        if (temaAtual === 'dark') {
            document.body.classList.add('dark-mode');
            
            // Atualizar propriedades CSS para barras de rolagem
            document.documentElement.style.setProperty('--scrollbar-track', '#2a2a2a');
            document.documentElement.style.setProperty('--scrollbar-thumb', 'rgba(77, 156, 222, 0.6)');
        } else {
            document.body.classList.remove('dark-mode');
            
            // Atualizar propriedades CSS para barras de rolagem
            document.documentElement.style.setProperty('--scrollbar-track', '#f1f1f1');
            document.documentElement.style.setProperty('--scrollbar-thumb', 'rgba(64, 115, 158, 0.6)');
        }
        
        // Atualizar estado visual do botão de tema
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            if (temaAtual === 'dark') {
                themeToggle.setAttribute('aria-checked', 'true');
            } else {
                themeToggle.setAttribute('aria-checked', 'false');
            }
        }
    }
    
    // Aplicar tema ao carregar a página
    aplicarTemaAtual();
    
    // Escutar por mudanças de tema em outras abas/janelas
    window.addEventListener('storage', function(event) {
        if (event.key === 'theme') {
            aplicarTemaAtual();
        }
    });
});