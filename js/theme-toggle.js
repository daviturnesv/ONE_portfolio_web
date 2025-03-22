/**
 * Script de Alternância de Tema
 * Gerencia a alternância entre os modos claro e escuro
 */

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Adicionar funcionalidade de alternância de tema
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });
    
    // Verificar se o usuário ativou anteriormente o modo escuro
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});