/**
 * Script para corrigir problemas com os filtros de projetos
 */

document.addEventListener('DOMContentLoaded', () => {
    // Confirma que todos os cards são inicializados corretamente
    setTimeout(() => {
        const filtrosProjetos = document.querySelectorAll('.project-filter .filter-btn');
        const projetosCards = document.querySelectorAll('.project-card');
        
        // Verifica se temos filtros e cartões
        if (filtrosProjetos.length === 0 || projetosCards.length === 0) {
            console.warn('Filtros ou projetos não encontrados');
            return;
        }
        
        // Restaura a visibilidade de todos os cartões
        projetosCards.forEach(card => {
            card.classList.remove('hide-project');
        });
        
        // Re-aplica o filtro ativo
        const filtroAtivo = document.querySelector('.project-filter .filter-btn.active');
        if (filtroAtivo) {
            const filtroValor = filtroAtivo.getAttribute('data-filter');
            if (filtroValor && filtroValor !== 'all') {
                projetosCards.forEach(card => {
                    const categoriaCard = card.getAttribute('data-category');
                    if (categoriaCard !== filtroValor) {
                        card.classList.add('hide-project');
                    }
                });
            }
        }
        
        console.log('✅ Filtros de projetos corrigidos com sucesso');
    }, 500);
});
