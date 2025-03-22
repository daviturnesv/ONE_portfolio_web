/**
 * Correção do Filtro de Certificados
 * Garante que os botões de filtro de certificados exibam traduções corretas sem oscilação
 */

document.addEventListener('DOMContentLoaded', () => {
    const corretorFiltros = new CorretorFiltrosCertificados();
    corretorFiltros.inicializar();
});

class CorretorFiltrosCertificados {
    constructor() {
        // Traduções corretas para filtros de certificados
        this.traducoes = {
            'all': {
                'pt': 'Todos',
                'en': 'All'
            },
            'front-end': {
                'pt': 'Front-End',
                'en': 'Front-End'
            },
            'back-end': {
                'pt': 'Back-End',
                'en': 'Back-End'
            },
            'programming-fundamentals': {
                'pt': 'Fundamentos',
                'en': 'Fundamentals'
            },
            'tools-ai': {
                'pt': 'Ferramentas & IA',
                'en': 'Tools & AI'
            },
            'dev-personal': {
                'pt': 'Desenvolvimento Pessoal',
                'en': 'Personal Development'
            },
            'marketing': {
                'pt': 'Marketing',
                'en': 'Marketing'
            }
        };
        
        this.secaoCertificados = document.getElementById('certificates');
    }
    
    inicializar() {
        // Disponibilizar função global
        window.fixCertificateFilterTexts = (idioma) => this.corrigirTextosFiltros(idioma);
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.configurar());
        } else {
            this.configurar();
        }
    }
    
    configurar() {
        this.corrigirTextosFiltros();
        this.configurarObservadorMutacoes();
        this.configurarEventos();
    }
    
    obterIdiomaAtual() {
        return localStorage.getItem('language') || 'pt';
    }
    
    corrigirTextosFiltros(idioma) {
        if (idioma) {
            localStorage.setItem('language', idioma);
        }
        
        // Aplicar correções imediatamente
        requestAnimationFrame(() => this.aplicarCorrecoesBotoes());
    }
    
    aplicarCorrecoesBotoes() {
        const botoesFiltro = document.querySelectorAll('#certificates .filter-btn');
        if (botoesFiltro.length === 0) return;
        
        // Identificar qual botão está ativo
        let filtroAtivo = null;
        botoesFiltro.forEach(btn => {
            if (btn.classList.contains('active')) {
                filtroAtivo = btn.getAttribute('data-filter');
            }
        });
        
        // Corrigir textos de todos os botões
        botoesFiltro.forEach(botao => this.corrigirTextoBotao(botao));
        
        // Garantir que o botão correto esteja ativo
        if (filtroAtivo) {
            const botaoQueDeveEstarAtivo = document.querySelector(
                `#certificates .filter-btn[data-filter="${filtroAtivo}"]`
            );
            
            if (botaoQueDeveEstarAtivo && !botaoQueDeveEstarAtivo.classList.contains('active')) {
                botoesFiltro.forEach(btn => btn.classList.remove('active'));
                botaoQueDeveEstarAtivo.classList.add('active');
            }
        }
    }
    
    corrigirTextoBotao(botao) {
        const filtro = botao.getAttribute('data-filter');
        const idioma = this.obterIdiomaAtual();
        
        // Salvar estado ativo
        const estaAtivo = botao.classList.contains('active');
        
        // Verificar se temos tradução para este filtro
        if (filtro && this.traducoes[filtro]) {
            const textoCorreto = this.traducoes[filtro][idioma];
            
            // Atualizar apenas se necessário
            if (botao.textContent.trim() !== textoCorreto) {
                botao.textContent = textoCorreto;
                botao.setAttribute('data-fixed-text', 'true');
                
                // Restaurar estado ativo se necessário
                if (estaAtivo) {
                    botao.classList.add('active');
                }
            }
        }
    }
    
    configurarObservadorMutacoes() {
        if (!this.secaoCertificados) return;
        
        // Criar e configurar observador
        const observador = new MutationObserver((mutacoes) => {
            let precisaCorrigir = mutacoes.some(mutacao => 
                mutacao.type === 'characterData' || 
                mutacao.type === 'childList' ||
                (mutacao.type === 'attributes' && mutacao.attributeName === 'data-i18n')
            );
            
            if (precisaCorrigir) {
                this.aplicarCorrecoesBotoes();
            }
        });
        
        // Iniciar observação
        observador.observe(this.secaoCertificados, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['data-i18n', 'class']
        });
    }
    
    configurarEventos() {
        // Lidar com mudanças de idioma
        document.querySelectorAll('.lang-btn').forEach(botao => {
            botao.addEventListener('click', () => {
                const idioma = botao.getAttribute('data-lang');
                if (idioma) {
                    // Correções imediatas e após atualizações i18n
                    setTimeout(() => this.corrigirTextosFiltros(), 0);
                    setTimeout(() => this.corrigirTextosFiltros(), 50);
                    setTimeout(() => this.corrigirTextosFiltros(), 100);
                }
            });
        });
        
        // Lidar com fechamento do modal de certificados
        document.addEventListener('click', (evento) => {
            if (evento.target.classList.contains('close-certificate-modal') || 
                evento.target.classList.contains('certificate-modal')) {
                setTimeout(() => this.corrigirTextosFiltros(), 0);
                setTimeout(() => this.corrigirTextosFiltros(), 50);
            }
        });
        
        // Lidar com cliques no botão de filtro
        document.querySelectorAll('#certificates .filter-btn').forEach(botao => {
            botao.addEventListener('click', () => {
                setTimeout(() => this.corrigirTextosFiltros(), 50);
            });
        });
    }
}