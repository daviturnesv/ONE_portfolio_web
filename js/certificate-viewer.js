/**
 * Script de Visualização de Certificados
 * Gerencia a visualização de certificados em um modal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referenciar todos os botões de certificado
    const certificateButtons = document.querySelectorAll('.certificate-btn');
    
    // Criar um modal para visualização de certificados
    const createCertificateModal = () => {
        const modal = document.createElement('div');
        modal.className = 'certificate-modal';
        modal.innerHTML = `
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
        document.body.appendChild(modal);
        
        // Estilo para o modal
        const style = document.createElement('style');
        style.textContent = `
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
        document.head.appendChild(style);
        
        // Adicionar funcionalidade ao modal
        const closeBtn = modal.querySelector('.close-certificate-modal');
        closeBtn.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            
            // Corrigir textos do filtro de certificados após fechar o modal
            if (window.fixCertificateFilterTexts) {
                setTimeout(() => window.fixCertificateFilterTexts(), 100);
            }
        };
        
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
                
                // Corrigir textos do filtro de certificados após fechar o modal
                if (window.fixCertificateFilterTexts) {
                    setTimeout(() => window.fixCertificateFilterTexts(), 100);
                }
            }
        });
        
        return modal;
    };
    
    // Criar o modal uma vez
    const certificateModal = createCertificateModal();
    const modalIframe = certificateModal.querySelector('iframe');
    const openPdfBtn = certificateModal.querySelector('.open-pdf-btn');
    const downloadBtn = certificateModal.querySelector('.download-pdf-btn');
    
    // Adicionar evento de clique a todos os botões de certificado
    certificateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pdfPath = this.getAttribute('href');
            
            if (pdfPath) {
                // Atualizar fonte do iframe e links dos botões
                modalIframe.src = pdfPath;
                openPdfBtn.href = pdfPath;
                downloadBtn.href = pdfPath;
                
                // Mostrar modal
                certificateModal.style.display = "block";
                document.body.style.overflow = "hidden";
                
                // Adicionar às traduções se o recurso de idioma for usado
                if (typeof translations !== 'undefined') {
                    translations['certificate_open_new_tab'] = {
                        'pt': 'Abrir em nova aba',
                        'en': 'Open in new tab'
                    };
                    translations['certificate_download'] = {
                        'pt': 'Baixar PDF',
                        'en': 'Download PDF'
                    };
                    
                    // Atualizar idioma se houver um idioma ativo
                    const currentLang = localStorage.getItem('language') || 'pt';
                    if (typeof changeLanguage === 'function') {
                        changeLanguage(currentLang);
                    }
                }
            }
        });
    });
});