/**
 * Correção para os cards de projetos
 * Este script garante que os cards de projetos sejam exibidos corretamente
 * e adiciona funcionalidades adicionais como visualização em modal
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há imagens faltando e substituir por placeholders
    const projectImages = document.querySelectorAll('.project-card img');
    
    projectImages.forEach(img => {
        // Verificar se a imagem existe
        const testImg = new Image();
        testImg.src = img.src;
        
        testImg.onerror = function() {
            // Se a imagem não existir, substituir por um placeholder
            console.warn(`Imagem não encontrada: ${img.src}`);
            img.src = 'assets/img/project_placeholder.png';
            img.alt = 'Imagem do projeto não disponível';
        };
    });
    
    // Adicionar efeito de hover nos cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--card-shadow)';
        });
    });
    
    // Garantir que os filtros funcionem corretamente
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Filtrar projetos
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    
                    if (category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
            
            // Reativar animações AOS para os cards visíveis
            if (typeof AOS !== 'undefined') {
                setTimeout(() => {
                    AOS.refresh();
                }, 100);
            }
        });
    });
});