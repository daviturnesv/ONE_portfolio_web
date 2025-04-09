/**
 * Animações adicionais para a seção de habilidades
 */

document.addEventListener('DOMContentLoaded', () => {
    // Aguardar a renderização dos cards de habilidades
    setTimeout(() => {
        const skillCards = document.querySelectorAll('.skill-card');
        
        // Aplicar animações personalizadas
        skillCards.forEach((card, index) => {
            // Adicionar transições suaves
            card.style.transition = 'all 0.3s ease-in-out';
            
            // Adicionar efeitos ao passar o mouse
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
            
            // Animar barras de progresso ao entrar na visualização
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBars = entry.target.querySelectorAll('.progress');
                        progressBars.forEach((bar, i) => {
                            const width = bar.getAttribute('data-width');
                            setTimeout(() => {
                                bar.style.width = width;
                            }, i * 150);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(card);
        });
        
        console.log("🎨 Animações adicionais aplicadas aos cards de habilidades");
    }, 1000);
});