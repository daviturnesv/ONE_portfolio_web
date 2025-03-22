/**
 * Script de Animações
 * Gerencia animações das barras de habilidades e contadores
 */

document.addEventListener('DOMContentLoaded', function() {
    // Animação das barras de habilidades com inicialização confiável
    function animateSkillBars() {
        console.log("Animando barras de habilidades...");
        const progressBars = document.querySelectorAll('.progress');
        
        progressBars.forEach(bar => {
            // Definir largura padrão se data-width estiver ausente
            const width = bar.getAttribute('data-width') || '80%';
            
            // Forçar um reflow antes de definir a largura para melhor animação
            bar.style.width = '0%';
            
            // Definir um timeout para garantir que a animação aconteça
            setTimeout(() => {
                bar.style.width = width;
                console.log(`Largura da barra de progresso definida para ${width}`);
            }, 50);
        });
    }
    
    // Inicializar barras de progresso com valores padrão se ausentes
    function initializeProgressBars() {
        const skillItems = document.querySelectorAll('.skill-card .progress-item');
        
        // Níveis de habilidade padrão - ajuste conforme necessário
        const defaultSkills = {
            'HTML5': '90%',
            'CSS3 & Flexbox/Grid': '85%',
            'JavaScript ES6+': '80%',
            'React.js': '75%',
            'API Integration': '80%',
            'Node.js': '70%',
            'Java & Spring': '75%',
            'Python': '70%',
            'SQL/NoSQL': '75%',
            'Git/GitHub': '85%',
            'CI/CD': '70%',
            'Clean Code': '80%'
        };
        
        skillItems.forEach(item => {
            const skillName = item.querySelector('.skill-name').textContent.trim();
            const progressBar = item.querySelector('.progress');
            
            if (!progressBar.getAttribute('data-width')) {
                const defaultWidth = defaultSkills[skillName] || '75%';
                progressBar.setAttribute('data-width', defaultWidth);
                console.log(`Largura padrão definida para ${skillName}: ${defaultWidth}`);
            }
            
            // Criar div de progresso se não existir
            if (!progressBar.querySelector('.progress')) {
                const progressDiv = document.createElement('div');
                progressDiv.className = 'progress';
                progressDiv.setAttribute('data-width', progressBar.getAttribute('data-width'));
                progressBar.appendChild(progressDiv);
            }
        });
    }
    
    // Gatilho de animação mais confiável que funciona em todos os dispositivos
    function setupSkillAnimations() {
        const skillSection = document.querySelector('.skills');
        
        if (!skillSection) return;
        
        // Inicializar barras de progresso primeiro
        initializeProgressBars();
        
        // Múltiplos métodos para garantir que a animação seja acionada corretamente
        
        // Método 1: Intersection Observer com threshold menor
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                    console.log("Animação acionada via Intersection Observer");
                }
            });
        }, { threshold: 0.1 }); // Threshold menor para melhor detecção em dispositivos móveis
        
        observer.observe(skillSection);
        
        // Método 2: Evento de rolagem como backup para navegadores mais antigos
        let animated = false;
        window.addEventListener('scroll', function() {
            if (animated) return;
            
            const rect = skillSection.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight * 0.75) {
                animateSkillBars();
                animated = true;
                console.log("Animação acionada via evento de rolagem");
            }
        });
        
        // Método 3: Acionamento garantido após o carregamento da página
        setTimeout(() => {
            if (!animated) {
                animateSkillBars();
                animated = true;
                console.log("Animação acionada via timeout");
            }
        }, 2000);
    }
    
    // Chamar a função de configuração
    setupSkillAnimations();
    
    // Animação de contadores
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // ms
            const step = target / duration * 10;
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 10);
        });
    }

    // Animar contadores quando a seção de estatísticas estiver visível
    const statsSection = document.querySelector('.stats');
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }
    
    // Inicialização do VanillaTilt para elementos da página
    // Criar um objeto utilitário global para gerenciamento do VanillaTilt
    window.tiltManager = {
        // Opções padrão
        defaultOptions: {
            max: 5,
            speed: 300,
            glare: true,
            "max-glare": 0.1,
        },
        
        // Inicializar VanillaTilt para elementos
        init: function(selector, options = {}) {
            if (typeof VanillaTilt === 'undefined') {
                console.warn('VanillaTilt não está definido. Certifique-se de que o script está carregado.');
                return;
            }
            
            // Verificar se o seletor está definido antes de usá-lo
            if (!selector) {
                console.warn('Nenhum seletor fornecido para inicialização do VanillaTilt');
                return;
            }
            
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) {
                console.log(`Nenhum elemento encontrado para o seletor: ${selector}`);
                return;
            }
            
            // Combinar opções padrão com quaisquer opções passadas
            const tiltOptions = {...this.defaultOptions, ...options};
            
            // Inicializar VanillaTilt
            VanillaTilt.init(elements, tiltOptions);
            console.log(`VanillaTilt inicializado para ${elements.length} elementos com seletor: ${selector}`);
        },
        
        // Reinicializar VanillaTilt após filtragem
        reinitForVisible: function(selector, options = {}) {
            if (typeof VanillaTilt === 'undefined') {
                console.warn('VanillaTilt não está definido. Certifique-se de que o script está carregado.');
                return;
            }
            
            // Obter todos os elementos que correspondem ao seletor
            const elements = document.querySelectorAll(selector);
            console.log(`Encontrados ${elements.length} elementos para reinicialização com seletor: ${selector}`);
            
            if (elements.length === 0) return;
            
            // Primeiro destruir instâncias existentes
            elements.forEach(element => {
                if (element.vanillaTilt) {
                    element.vanillaTilt.destroy();
                }
            });
            
            // Então reinicializar
            const tiltOptions = {...this.defaultOptions, ...options};
            
            // Usar um pequeno atraso para garantir que o DOM foi atualizado
            setTimeout(() => {
                VanillaTilt.init(elements, tiltOptions);
                console.log(`VanillaTilt reinicializado para ${elements.length} elementos`);
            }, 50);
        }
    };
    
    // Inicializar elementos VanillaTilt apropriados com base no conteúdo da página
    if (typeof VanillaTilt !== 'undefined') {
        // Verificar cards de habilidades e projetos (página principal)
        const skillCards = document.querySelectorAll('.skill-card');
        const projectCards = document.querySelectorAll('.project-card:not(.hide-project)');
        
        if (skillCards.length > 0 || projectCards.length > 0) {
            const selector = [];
            if (skillCards.length > 0) selector.push('.skill-card');
            if (projectCards.length > 0) selector.push('.project-card:not(.hide-project)');
            
            tiltManager.init(selector.join(', '));
        }
        
        // Verificar cards de certificados (página de certificados)
        const certificateCards = document.querySelectorAll('.certificate-card:not(.hide-certificate)');
        if (certificateCards.length > 0) {
            // Inicializar com um pequeno atraso para garantir que todos os cards foram renderizados
            setTimeout(() => {
                tiltManager.init('.certificate-card:not(.hide-certificate)');
            }, 100);
        }
    } else {
        console.warn('Biblioteca VanillaTilt não está carregada. Efeitos de inclinação não serão aplicados.');
    }
});