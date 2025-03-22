/**
 * Script de Visualização de Certificados
 * Gerencia a visualização de certificados em um modal
 */

document.addEventListener('DOMContentLoaded', () => {
    const visualizadorCertificados = new VisualizadorCertificados();
    visualizadorCertificados.inicializar();
});

class VisualizadorCertificados {
    constructor() {
        this.botoesCertificado = document.querySelectorAll('.certificate-btn');
        this.modal = null;
        this.iframe = null;
        this.botaoAbrir = null;
        this.botaoBaixar = null;
    }
    
    inicializar() {
        if (this.botoesCertificado.length === 0) return;
        
        this.criarModal();
        this.atribuirReferencias();
        this.configurarEventos();
    }
    
    criarModal() {
        // Criação do elemento modal
        this.modal = document.createElement('div');
        this.modal.className = 'certificate-modal';
        this.modal.innerHTML = this.obterConteudoHTML();
        
        // Adição do modal ao documento
        document.body.appendChild(this.modal);
        
        // Adição de estilos ao documento
        this.adicionarEstilos();
    }
    
    atribuirReferencias() {
        this.iframe = this.modal.querySelector('iframe');
        this.botaoAbrir = this.modal.querySelector('.open-pdf-btn');
        this.botaoBaixar = this.modal.querySelector('.download-pdf-btn');
    }
    
    configurarEventos() {
        // Configurar fechamento do modal
        const botaoFechar = this.modal.querySelector('.close-certificate-modal');
        
        botaoFechar.addEventListener('click', () => this.fecharModal());
        
        window.addEventListener('click', (evento) => {
            if (evento.target === this.modal) {
                this.fecharModal();
            }
        });
        
        // Configurar abertura do modal pelos botões de certificado
        this.botoesCertificado.forEach(botao => {
            botao.addEventListener('click', (e) => this.abrirModal(e, botao));
        });
    }
    
    abrirModal(evento, botao) {
        evento.preventDefault();
        
        const caminhoArquivo = botao.getAttribute('href');
        if (!caminhoArquivo) return;
        
        // Atualizar fonte do iframe e links
        this.iframe.src = caminhoArquivo;
        this.botaoAbrir.href = caminhoArquivo;
        this.botaoBaixar.href = caminhoArquivo;
        
        // Mostrar modal
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Atualizar traduções se disponível
        this.atualizarTraducoes();
    }
    
    fecharModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Corrigir textos do filtro após fechar
        if (window.fixCertificateFilterTexts) {
            setTimeout(() => window.fixCertificateFilterTexts(), 100);
        }
    }
    
    atualizarTraducoes() {
        if (typeof translations !== 'undefined') {
            // Adicionar traduções de botões
            translations['certificate_open_new_tab'] = {
                'pt': 'Abrir em nova aba',
                'en': 'Open in new tab'
            };
            
            translations['certificate_download'] = {
                'pt': 'Baixar PDF',
                'en': 'Download PDF'
            };
            
            // Atualizar idioma se houver função disponível
            const idiomaAtual = localStorage.getItem('language') || 'pt';
            if (typeof changeLanguage === 'function') {
                changeLanguage(idiomaAtual);
            }
        }
    }
    
    obterConteudoHTML() {
        return `
            <div class="certificate-modal-content">
                <span class="close-certificate-modal">&times;</span>
                <div class="certificate-preview">
                    <iframe src="" width="100%" height="500px" frameborder="0"></iframe>
                </div>
                <div class="certificate-modal-actions">
                    <a href="" target="_blank" class="btn primary-btn open-pdf-btn">
                        <i class="fas fa-external-link-alt"></i> 
                        <span data-i18n="certificate_open_new_tab">Abrir em nova aba</span>
                    </a>
                    <a href="" download class="btn secondary-btn download-pdf-btn">
                        <i class="fas fa-download"></i> 
                        <span data-i18n="certificate_download">Baixar PDF</span>
                    </a>
                </div>
            </div>
        `;
    }
    
    adicionarEstilos() {
        const estilos = document.createElement('style');
        estilos.textContent = this.obterEstilosCSS();
        document.head.appendChild(estilos);
    }
    
    obterEstilosCSS() {
        return `
            .certificate-modal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                overflow: auto;
            }
            
            .certificate-modal-content {
                background-color: var(--card-bg);
                margin: 5% auto;
                padding: 30px;
                width: 90%;
                max-width: 900px;
                border-radius: 15px;
                box-shadow: var(--card-shadow, 0 5px 20px rgba(0, 0, 0, 0.1));
                position: relative;
            }
            
            .close-certificate-modal {
                position: absolute;
                top: 15px;
                right: 25px;
                color: #aaa;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .close-certificate-modal:hover {
                color: var(--primary-color);
            }
            
            .certificate-preview {
                margin: 20px 0;
                overflow: hidden;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            }
            
            .certificate-modal-actions {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-top: 20px;
            }
            
            .dark-mode .certificate-modal-content {
                background-color: #2c2c2e;
                border: 1px solid #444;
            }
            
            @media screen and (max-width: 768px) {
                .certificate-modal-content {
                    width: 95%;
                    padding: 20px;
                }
                
                .certificate-preview iframe {
                    height: 400px;
                }
                
                .certificate-modal-actions {
                    flex-direction: column;
                }
            }
        `;
    }
}