/**
 * Correção para os contadores de estatísticas
 * Este script garante que os contadores na seção "Sobre Mim" sejam animados corretamente
 */
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar os elementos de estatísticas
    const statsContainer = document.querySelector('.stats-container');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statsContainer || statNumbers.length === 0) {
        console.warn('Elementos de estatísticas não encontrados');
        return;
    }
    
    // Função para animar um contador
    function animateCounter(counter, targetValue, duration = 2000) {
        // Garantir que o valor alvo seja um número
        const target = parseInt(targetValue, 10);
        if (isNaN(target)) {
            console.warn('Valor alvo inválido para contador:', counter);
            return;
        }
        
        // Configurar a animação
        let startTime = null;
        const startValue = 0;
        
        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(progress * (target - startValue) + startValue);
            
            counter.textContent = currentValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        window.requestAnimationFrame(updateCounter);
    }
    
    // Configurar o observador de interseção para iniciar a animação quando visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Iniciar animação para cada contador com um pequeno atraso entre eles
                statNumbers.forEach((counter, index) => {
                    const targetValue = counter.getAttribute('data-count');
                    setTimeout(() => {
                        animateCounter(counter, targetValue);
                    }, index * 200); // Atraso escalonado para cada contador
                });
                
                // Parar de observar após iniciar a animação
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Iniciar quando 30% do elemento estiver visível
        rootMargin: '0px 0px -100px 0px' // Margem negativa para iniciar um pouco antes
    });
    
    // Iniciar observação
    observer.observe(statsContainer);
    
    // Fallback: se o IntersectionObserver não funcionar, iniciar após um tempo
    setTimeout(() => {
        if (statNumbers[0].textContent === '0') {
            statNumbers.forEach((counter, index) => {
                const targetValue = counter.getAttribute('data-count');
                setTimeout(() => {
                    animateCounter(counter, targetValue);
                }, index * 200);
            });
        }
    }, 3000);
});