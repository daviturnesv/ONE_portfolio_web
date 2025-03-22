/**
 * Script de Filtros
 * Gerencia a funcionalidade de filtros para projetos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar apenas o filtro de projetos
    initializeFilter('projects');
    
    function initializeFilter(sectionId) {
        const filterBtns = document.querySelectorAll(`#${sectionId} .filter-btn`);
        const itemCards = document.querySelectorAll(`#${sectionId} [data-category]`);
        const hideClass = 'hide-project';
        
        // Mostrar todos os itens por padrão
        itemCards.forEach(card => {
            card.classList.remove(hideClass);
        });
        
        // Definir filtro "all" como ativo por padrão
        const allFilterBtn = document.querySelector(`#${sectionId} .filter-btn[data-filter="all"]`);
        if (allFilterBtn) {
            allFilterBtn.classList.add('active');
        }
        
        // Adicionar manipuladores de clique aos botões de filtro
        filterBtns.forEach(button => {
            // Garantir que o botão tenha atributo type
            if (!button.hasAttribute('type')) {
                button.setAttribute('type', 'button');
            }
            
            // Limpar ouvintes antigos clonando e substituindo
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Adicionar novo ouvinte de evento
            newButton.addEventListener('click', function(event) {
                // Prevenir ação padrão e parar propagação
                event.preventDefault();
                event.stopPropagation();
                
                // Atualizar estado ativo - usando consulta atualizada para obter todos os botões atuais
                document.querySelectorAll(`#${sectionId} .filter-btn`).forEach(btn => btn.classList.remove('active'));
                newButton.classList.add('active');
                
                const filterValue = newButton.getAttribute('data-filter');
                
                console.log(`Filtro clicado: ${filterValue}`); // Log de depuração
                
                // Filtrar itens
                let visibleCount = 0;
                itemCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    console.log(`Categoria do card: ${cardCategory}, Filtro: ${filterValue}`); // Log de depuração
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove(hideClass);
                        visibleCount++;
                    } else {
                        card.classList.add(hideClass);
                    }
                });
                
                console.log(`Itens visíveis: ${visibleCount}`); // Log de depuração
                
                // Reinicializar VanillaTilt para itens visíveis após filtragem
                if (window.tiltManager) {
                    setTimeout(() => {
                        window.tiltManager.reinitForVisible(".project-card:not(.hide-project)");
                    }, 100);
                }
            });
        });
    }
});