/**
 * Filtro de Certificados
 * Tratamento consolidado de filtragem de certificados com suporte a idiomas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS para certificados de maneira controlada
    initializeCertificatesAOS();
    
    // Obter elementos DOM
    const filterButtons = document.querySelectorAll('#certificates .filter-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    // Estado de filtro ativo (persiste entre mudanças de idioma)
    let activeFilter = 'all';
    
    // Função principal de filtragem
    function applyFilter(filterValue) {
        // Forçar que todos os certificados sejam totalmente inicializados antes da filtragem
        ensureAllCertificatesLoaded();
        
        // Forçar que todos os filtros sejam visíveis primeiro (correção crítica)
        certificateCards.forEach(card => {
            card.classList.remove('hide-certificate');
        });
        
        // Armazenar o filtro ativo globalmente
        activeFilter = filterValue;
        
        // Atualizar estados ativos dos botões
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Filtrar os cards
        let visibleCount = 0;
        certificateCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all') {
                // Para filtro "all", sempre mostrar o card
                card.classList.remove('hide-certificate');
                visibleCount++;
            } else if (category === filterValue) {
                card.classList.remove('hide-certificate');
                visibleCount++;
            } else {
                card.classList.add('hide-certificate');
            }
        });
        
        // Reinicializar efeito tilt em cards visíveis
        if (window.tiltManager && typeof window.tiltManager.reinitForVisible === 'function') {
            setTimeout(() => {
                window.tiltManager.reinitForVisible('.certificate-card:not(.hide-certificate)');
            }, 150);
        }
    }
    
    // Forçar que todos os certificados sejam totalmente inicializados
    function ensureAllCertificatesLoaded() {
        // Desativar animações AOS temporariamente para garantir que todos os elementos estejam visíveis
        if (window.AOS) {
            // Obter todos os certificados que ainda não foram inicializados pelo AOS
            const pendingCards = document.querySelectorAll('.certificate-card:not(.aos-animate)');
            
            // Forçá-los a serem visíveis e inicializados
            pendingCards.forEach(card => {
                // Adicionar a classe de animação AOS para "enganar" o AOS fazendo-o pensar que eles foram animados
                card.classList.add('aos-animate');
                
                // Remover quaisquer estilos inline de opacidade ou transformação que o AOS possa ter adicionado
                card.style.opacity = '';
                card.style.transform = '';
                
                // Garantir que o card esteja realmente no fluxo DOM
                card.style.display = '';
            });
        }
    }
    
    // Controlar inicialização AOS para certificados
    function initializeCertificatesAOS() {
        // Configurar AOS especificamente para cards de certificado para funcionar melhor com filtragem
        if (window.AOS) {
            // Encontrar todos os cards de certificado com atributo data-aos
            const aosCards = document.querySelectorAll('.certificate-card[data-aos]');
            
            // Manter atributos AOS, mas tornar o offset menor para que carreguem mais cedo
            aosCards.forEach(card => {
                card.setAttribute('data-aos-offset', '50');
                card.setAttribute('data-aos-once', 'false'); // Permitir re-animação
            });
        }
    }
    
    // Tornar função globalmente disponível para outros scripts
    window.certificateFilter = {
        applyFilter: applyFilter,
        getActiveFilter: function() {
            return activeFilter;
        },
        ensureAllCertificatesLoaded: ensureAllCertificatesLoaded
    };
    
    // Adicionar evento de clique aos botões de filtro (com salvaguardas contra duplicação de eventos)
    filterButtons.forEach(button => {
        // Garantir que o botão tenha atributo type
        if (!button.hasAttribute('type')) {
            button.setAttribute('type', 'button');
        }
        
        // Remover quaisquer ouvintes existentes clonando
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Adicionar ouvinte novo
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const filterValue = this.getAttribute('data-filter');
            
            // Forçar que todos os certificados sejam carregados antes da filtragem
            ensureAllCertificatesLoaded();
            
            // Aplicar o filtro
            applyFilter(filterValue);
        });
    });
    
    // Ouvir mudanças de idioma
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Armazenar filtro atual antes da mudança de idioma
            const currentFilter = activeFilter;
            
            // Após a conclusão da tradução, reaplicar o mesmo filtro
            setTimeout(() => {
                ensureAllCertificatesLoaded();
                applyFilter(currentFilter);
            }, 500);
        });
    });
    
    // Inicializar com atraso para garantir que o DOM esteja totalmente pronto
    setTimeout(() => {
        // Forçar que todos os certificados sejam totalmente carregados e visíveis por padrão
        ensureAllCertificatesLoaded();
        
        certificateCards.forEach(card => {
            card.classList.remove('hide-certificate');
        });
        
        // Então obter o botão ativo inicial ou usar "all" como padrão
        const initialActiveButton = document.querySelector('#certificates .filter-btn.active');
        activeFilter = initialActiveButton ? initialActiveButton.getAttribute('data-filter') : 'all';
        
        // Finalmente aplicar o filtro
        applyFilter(activeFilter);
    }, 300);
});