/**
 * Script de Animações
 * Gerencia animações das barras de habilidades e contadores
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar barras de habilidades
    const configBarrasHabilidades = new ConfiguradorBarrasHabilidades();
    configBarrasHabilidades.configurar();
    
    // Inicializar contadores
    const configContadores = new ConfiguradorContadores();
    configContadores.configurar();
    
    // Inicializar efeitos de inclinação
    inicializarGerenciadorInclinacao();
});

class ConfiguradorBarrasHabilidades {
    constructor() {
        this.secaoHabilidades = document.querySelector('.skills');
        this.foiAnimado = false;
        this.nivelPadrao = {
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
    }
    
    configurar() {
        if (!this.secaoHabilidades) return;
        
        this.inicializarBarrasProgresso();
        this.configurarDeteccaoVisibilidade();
    }
    
    inicializarBarrasProgresso() {
        const itensHabilidade = document.querySelectorAll('.skill-card .progress-item');
        
        itensHabilidade.forEach(item => {
            const nomeHabilidade = item.querySelector('.skill-name').textContent.trim();
            const barraProgresso = item.querySelector('.progress');
            
            if (!barraProgresso) return;
            
            if (!barraProgresso.getAttribute('data-width')) {
                const larguraPadrao = this.nivelPadrao[nomeHabilidade] || '75%';
                barraProgresso.setAttribute('data-width', larguraPadrao);
            }
            
            // Criar div de progresso se não existir
            if (!barraProgresso.querySelector('.progress')) {
                const divProgresso = document.createElement('div');
                divProgresso.className = 'progress';
                divProgresso.setAttribute('data-width', barraProgresso.getAttribute('data-width'));
                barraProgresso.appendChild(divProgresso);
            }
        });
    }
    
    configurarDeteccaoVisibilidade() {
        // Método 1: Observer de Interseção (browsers modernos)
        this.configurarObserver();
        
        // Método 2: Evento de rolagem (fallback)
        this.configurarEventoRolagem();
        
        // Método 3: Timeout garantido
        this.configurarTimeout();
    }
    
    configurarObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.foiAnimado) {
                    this.animarBarrasHabilidades();
                    this.foiAnimado = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(this.secaoHabilidades);
    }
    
    configurarEventoRolagem() {
        window.addEventListener('scroll', () => {
            if (this.foiAnimado) return;
            
            const rect = this.secaoHabilidades.getBoundingClientRect();
            const alturaJanela = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= alturaJanela * 0.75) {
                this.animarBarrasHabilidades();
                this.foiAnimado = true;
            }
        });
    }
    
    configurarTimeout() {
        setTimeout(() => {
            if (!this.foiAnimado) {
                this.animarBarrasHabilidades();
                this.foiAnimado = true;
            }
        }, 2000);
    }
    
    animarBarrasHabilidades() {
        const barrasProgresso = document.querySelectorAll('.progress');
        
        barrasProgresso.forEach(barra => {
            const largura = barra.getAttribute('data-width') || '80%';
            
            // Forçar reflow para garantir animação
            barra.style.width = '0%';
            
            setTimeout(() => {
                barra.style.width = largura;
            }, 50);
        });
    }
}

class ConfiguradorContadores {
    constructor() {
        this.secaoEstatisticas = document.querySelector('.stats');
    }
    
    configurar() {
        if (!this.secaoEstatisticas) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animarContadores();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(this.secaoEstatisticas);
    }
    
    animarContadores() {
        document.querySelectorAll('.stat-number').forEach(contador => {
            const valorAlvo = parseInt(contador.getAttribute('data-count'));
            const duracao = 2000; // ms
            const incremento = valorAlvo / duracao * 10;
            let valorAtual = 0;
            
            const timer = setInterval(() => {
                valorAtual += incremento;
                contador.textContent = Math.floor(valorAtual);
                
                if (valorAtual >= valorAlvo) {
                    contador.textContent = valorAlvo;
                    clearInterval(timer);
                }
            }, 10);
        });
    }
}

function inicializarGerenciadorInclinacao() {
    // Criação do gerenciador global apenas se não estiver definido
    if (!window.tiltManager) {
        window.tiltManager = criarGerenciadorInclinacao();
    }
    
    // Verificar se VanillaTilt está disponível
    if (typeof VanillaTilt === 'undefined') return;
    
    // Inicializar elementos com base na página atual
    const cardsHabilidades = document.querySelectorAll('.skill-card');
    const cardsProjetos = document.querySelectorAll('.project-card:not(.hide-project)');
    const cardsCertificados = document.querySelectorAll('.certificate-card:not(.hide-certificate)');
    
    const seletores = [];
    
    if (cardsHabilidades.length > 0) {
        seletores.push('.skill-card');
    }
    
    if (cardsProjetos.length > 0) {
        seletores.push('.project-card:not(.hide-project)');
    }
    
    if (seletores.length > 0) {
        window.tiltManager.init(seletores.join(', '));
    }
    
    if (cardsCertificados.length > 0) {
        // Inicializar com delay para garantir renderização completa
        setTimeout(() => {
            window.tiltManager.init('.certificate-card:not(.hide-certificate)');
        }, 100);
    }
}

function criarGerenciadorInclinacao() {
    return {
        opcoesPadrao: {
            max: 5,
            speed: 300,
            glare: true,
            "max-glare": 0.1,
        },
        
        init(seletor, opcoes = {}) {
            if (typeof VanillaTilt === 'undefined' || !seletor) {
                return;
            }
            
            const elementos = document.querySelectorAll(seletor);
            if (elementos.length === 0) return;
            
            const opcoesFinais = {...this.opcoesPadrao, ...opcoes};
            VanillaTilt.init(elementos, opcoesFinais);
        },
        
        reinitForVisible(seletor, opcoes = {}) {
            if (typeof VanillaTilt === 'undefined') return;
            
            // Obter todos os elementos que correspondem ao seletor
            const elementos = document.querySelectorAll(seletor);
            if (elementos.length === 0) return;
            
            // Primeiro destruir instâncias existentes
            elementos.forEach(elemento => {
                if (elemento.vanillaTilt) {
                    elemento.vanillaTilt.destroy();
                }
            });
            
            // Então reinicializar
            const opcoesFinais = {...this.opcoesPadrao, ...opcoes};
            
            // Usar um pequeno atraso para garantir atualização do DOM
            setTimeout(() => {
                VanillaTilt.init(elementos, opcoesFinais);
            }, 50);
        }
    };
}