/**
 * Sincronizador de Filtros de Certificados
 * Garante a sincronização adequada entre botões de filtro e conteúdo filtrado
 */

document.addEventListener('DOMContentLoaded', function() {
    // Aguardar a conclusão da filtragem inicial
    setTimeout(() => {
        // Conectar botões de filtro à lógica de filtragem real
        const filterButtons = document.querySelectorAll('#certificates .filter-btn');
        
        filterButtons.forEach(button => {
            // Substituir ouvintes de clique existentes por um mais confiável
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Remover classe ativa de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adicionar classe ativa ao botão clicado
                this.classList.add('active');
                
                // Obter o valor do filtro
                const filterValue = this.getAttribute('data-filter');
                
                // Aplicar o filtro através do objeto de filtro global existente
                if (window.certificateFilter && typeof window.certificateFilter.applyFilter === 'function') {
                    window.certificateFilter.applyFilter(filterValue);
                }
            }, true); // Usar fase de captura para garantir que isso seja executado primeiro
        });
    }, 500);
});