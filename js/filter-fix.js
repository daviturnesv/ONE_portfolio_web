/**
 * Script para corrigir problemas com os filtros de projetos
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização imediata e com retry
    initializeFilters();
    
    // Retry após um tempo para garantir que todos os elementos estejam carregados
    setTimeout(initializeFilters, 500);
    
    function initializeFilters() {
        const filtrosProjetos = document.querySelectorAll('.project-filter .filter-btn');
        const projetosCards = document.querySelectorAll('.project-card');
        
        // Verifica se temos filtros e cartões
        if (filtrosProjetos.length === 0 || projetosCards.length === 0) {
            console.warn('Filtros ou projetos não encontrados');
            return;
        }
        
        // Limpa eventos anteriores para evitar duplicação
        filtrosProjetos.forEach(btn => {
            btn.removeEventListener('click', filterClickHandler);
            btn.addEventListener('click', filterClickHandler);
        });
        
        // Restaura a visibilidade de todos os cartões
        projetosCards.forEach(card => {
            card.style.display = '';
            card.classList.remove('hide-project');
        });
        
        // Re-aplica o filtro ativo
        const filtroAtivo = document.querySelector('.project-filter .filter-btn.active');
        if (filtroAtivo) {
            applyFilter(filtroAtivo.getAttribute('data-filter'));
        }
        
        console.log('✅ Filtros de projetos corrigidos com sucesso');
    }
    
    function filterClickHandler(e) {
        const btn = e.currentTarget;
        const filtro = btn.getAttribute('data-filter');
        
        // Atualiza classe ativa
        document.querySelectorAll('.project-filter .filter-btn').forEach(el => {
            el.classList.remove('active');
        });
        btn.classList.add('active');
        
        // Aplica o filtro
        applyFilter(filtro);
    }
    
    function applyFilter(filtro) {
        const projetosCards = document.querySelectorAll('.project-card');
        
        projetosCards.forEach(card => {
            if (filtro === 'all') {
                card.style.display = '';
                card.classList.remove('hide-project');
            } else {
                const categoriaCard = card.getAttribute('data-category');
                if (categoriaCard === filtro) {
                    card.style.display = '';
                    card.classList.remove('hide-project');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hide-project');
                }
            }
        });
    }
});
