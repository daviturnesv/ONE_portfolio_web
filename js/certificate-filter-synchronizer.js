/**
 * Sincronizador de Filtros de Certificados
 * Garante a sincronização adequada entre botões de filtro e conteúdo filtrado
 */

document.addEventListener('DOMContentLoaded', () => {
    const sincronizadorFiltros = new SincronizadorFiltrosCertificados();
    sincronizadorFiltros.inicializar();
});

class SincronizadorFiltrosCertificados {
    constructor() {
        this.tempoInicializacao = 500; // ms
    }
    
    inicializar() {
        // Aguardar a conclusão da filtragem inicial
        setTimeout(() => this.configurarBotoesFiltro(), this.tempoInicializacao);
    }
    
    configurarBotoesFiltro() {
        const botoesFiltro = document.querySelectorAll('#certificates .filter-btn');
        if (botoesFiltro.length === 0) return;
        
        botoesFiltro.forEach(botao => {
            // Substituir ouvintes antigos por um mais confiável
            this.adicionarEventoCaptura(botao);
        });
    }
    
    adicionarEventoCaptura(botao) {
        // Usar event capture para garantir que esse evento seja processado primeiro
        botao.addEventListener('click', (evento) => {
            evento.preventDefault();
            evento.stopPropagation();
            
            this.atualizarEstadoAtivo(botao);
            this.aplicarFiltro(botao);
            
        }, true); // true ativa a fase de captura
    }
    
    atualizarEstadoAtivo(botaoAtivo) {
        // Desativar todos os botões
        const botoesFiltro = document.querySelectorAll('#certificates .filter-btn');
        botoesFiltro.forEach(btn => btn.classList.remove('active'));
        
        // Ativar apenas o clicado
        botaoAtivo.classList.add('active');
    }
    
    aplicarFiltro(botao) {
        const valorFiltro = botao.getAttribute('data-filter');
        
        // Usar o objeto global de filtro se disponível
        if (window.certificateFilter && typeof window.certificateFilter.applyFilter === 'function') {
            window.certificateFilter.applyFilter(valorFiltro);
        }
    }
}