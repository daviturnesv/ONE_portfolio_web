/**
 * Filtro de Certificados
 * Tratamento consolidado de filtragem de certificados com suporte a idiomas
 */

document.addEventListener('DOMContentLoaded', () => {
    const filtroCertificados = new FiltroCertificados();
    filtroCertificados.inicializar();
});

class FiltroCertificados {
    constructor() {
        this.botoesFiltro = document.querySelectorAll('#certificates .filter-btn');
        this.cardsCertificado = document.querySelectorAll('.certificate-card');
        this.filtroAtivo = 'all';
        this.tempoReinicioTilt = 150; // ms
        this.tempoInicializacao = 300; // ms
    }
    
    inicializar() {
        // Configurar AOS para certificados
        this.inicializarAOS();
        
        // Disponibilizar funções globalmente
        this.exportarFuncoesGlobais();
        
        // Configurar eventos de filtragem
        this.configurarBotoesFiltro();
        this.configurarEventosMudancaIdioma();
        
        // Inicializar com atraso
        setTimeout(() => this.inicializarEstadoInicial(), this.tempoInicializacao);
    }
    
    inicializarAOS() {
        if (!window.AOS) return;
        
        // Configurar AOS para certificados
        const cardsComAOS = document.querySelectorAll('.certificate-card[data-aos]');
        
        cardsComAOS.forEach(card => {
            card.setAttribute('data-aos-offset', '50');
            card.setAttribute('data-aos-once', 'false');
        });
    }
    
    exportarFuncoesGlobais() {
        window.certificateFilter = {
            applyFilter: (valorFiltro) => this.aplicarFiltro(valorFiltro),
            getActiveFilter: () => this.filtroAtivo,
            ensureAllCertificatesLoaded: () => this.garantirCardsMostrados()
        };
    }
    
    configurarBotoesFiltro() {
        this.botoesFiltro.forEach(botao => {
            // Garantir que o botão tenha atributo type
            if (!botao.hasAttribute('type')) {
                botao.setAttribute('type', 'button');
            }
            
            // Remover ouvintes antigos
            const novoBotao = botao.cloneNode(true);
            botao.parentNode.replaceChild(novoBotao, botao);
            
            // Adicionar novo ouvinte
            novoBotao.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const valorFiltro = novoBotao.getAttribute('data-filter');
                this.garantirCardsMostrados();
                this.aplicarFiltro(valorFiltro);
            });
        });
    }
    
    configurarEventosMudancaIdioma() {
        document.querySelectorAll('.lang-btn').forEach(botao => {
            botao.addEventListener('click', () => {
                // Armazenar filtro atual
                const filtroAtual = this.filtroAtivo;
                
                // Reaplicar após tradução concluída
                setTimeout(() => {
                    this.garantirCardsMostrados();
                    this.aplicarFiltro(filtroAtual);
                }, 500);
            });
        });
    }
    
    inicializarEstadoInicial() {
        // Garantir que todos os certificados estejam visíveis
        this.garantirCardsMostrados();
        
        // Remover classe de ocultação de todos os cards
        this.cardsCertificado.forEach(card => {
            card.classList.remove('hide-certificate');
        });
        
        // Obter filtro ativo inicial
        const botaoAtivoInicial = document.querySelector('#certificates .filter-btn.active');
        this.filtroAtivo = botaoAtivoInicial 
            ? botaoAtivoInicial.getAttribute('data-filter') 
            : 'all';
        
        // Aplicar filtro inicial
        this.aplicarFiltro(this.filtroAtivo);
    }
    
    garantirCardsMostrados() {
        if (!window.AOS) return;
        
        // Encontrar cards pendentes de animação
        const cardsPendentes = document.querySelectorAll('.certificate-card:not(.aos-animate)');
        
        // Forçar visibilidade
        cardsPendentes.forEach(card => {
            // Adicionar classe de animação
            card.classList.add('aos-animate');
            
            // Limpar estilos inline que possam estar ocultando
            card.style.opacity = '';
            card.style.transform = '';
            card.style.display = '';
        });
    }
    
    aplicarFiltro(valorFiltro) {
        // Primeiro garantir que todos os cards estejam no DOM
        this.garantirCardsMostrados();
        
        // Mostrar todos primeiro para evitar problemas
        this.cardsCertificado.forEach(card => {
            card.classList.remove('hide-certificate');
        });
        
        // Armazenar filtro ativo
        this.filtroAtivo = valorFiltro;
        
        // Atualizar botões de filtro
        this.atualizarBotoesAtivos();
        
        // Aplicar filtro aos cards
        this.filtrarCards();
        
        // Reinicializar efeito tilt
        this.reinicializarEfeitosTilt();
    }
    
    atualizarBotoesAtivos() {
        this.botoesFiltro.forEach(btn => {
            if (btn.getAttribute('data-filter') === this.filtroAtivo) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    filtrarCards() {
        this.cardsCertificado.forEach(card => {
            const categoria = card.getAttribute('data-category');
            
            if (this.filtroAtivo === 'all' || categoria === this.filtroAtivo) {
                card.classList.remove('hide-certificate');
            } else {
                card.classList.add('hide-certificate');
            }
        });
    }
    
    reinicializarEfeitosTilt() {
        if (window.tiltManager && typeof window.tiltManager.reinitForVisible === 'function') {
            setTimeout(() => {
                window.tiltManager.reinitForVisible('.certificate-card:not(.hide-certificate)');
            }, this.tempoReinicioTilt);
        }
    }
}