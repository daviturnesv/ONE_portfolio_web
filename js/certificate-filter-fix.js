/**
 * Correção do Filtro de Certificados - Versão Aprimorada
 * Garante que os botões de filtro de certificados exibam traduções corretas sem oscilação
 */

(function() {
    // Traduções corretas para filtros de certificados
    const certificateFilterTranslations = {
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
    
    // Obter idioma atual
    function getCurrentLanguage() {
        return localStorage.getItem('language') || 'pt';
    }
    
    // Corrigir texto de um único botão preservando o estado ativo
    function fixButtonText(button) {
        const filterValue = button.getAttribute('data-filter');
        const currentLang = getCurrentLanguage();
        
        // Salvar estado ativo antes de modificar
        const wasActive = button.classList.contains('active');
        
        if (filterValue && certificateFilterTranslations[filterValue]) {
            const correctText = certificateFilterTranslations[filterValue][currentLang];
            
            // Atualizar apenas se necessário
            if (button.textContent.trim() !== correctText) {
                button.textContent = correctText;
                // Marcar como corrigido manualmente
                button.setAttribute('data-fixed-text', 'true');
                
                // Restaurar estado ativo se estava ativo
                if (wasActive) {
                    button.classList.add('active');
                }
            }
        }
    }
    
    // Aplicar correção a todos os botões de filtro de certificados
    function fixAllButtonTexts() {
        const filterButtons = document.querySelectorAll('#certificates .filter-btn');
        
        // Primeiro determinar qual botão está ativo
        let activeFilterValue = null;
        filterButtons.forEach(btn => {
            if (btn.classList.contains('active')) {
                activeFilterValue = btn.getAttribute('data-filter');
            }
        });
        
        // Agora corrigir todos os botões
        filterButtons.forEach(fixButtonText);
        
        // Garantir que o botão correto esteja ativo
        if (activeFilterValue) {
            const shouldBeActiveBtn = document.querySelector(`#certificates .filter-btn[data-filter="${activeFilterValue}"]`);
            if (shouldBeActiveBtn && !shouldBeActiveBtn.classList.contains('active')) {
                // Remover ativo de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adicionar ativo ao botão correto
                shouldBeActiveBtn.classList.add('active');
            }
        }
    }
    
    // Configurar observador de mutação para capturar alterações de texto instantaneamente
    function setupMutationObserver() {
        const certificateSection = document.getElementById('certificates');
        if (!certificateSection) return;
        
        // Criar e configurar observador
        const observer = new MutationObserver((mutations) => {
            let needsFix = false;
            
            // Verificar se alguma mutação requer correção
            mutations.forEach(mutation => {
                if (mutation.type === 'characterData' || 
                    mutation.type === 'childList' ||
                    (mutation.type === 'attributes' && mutation.attributeName === 'data-i18n')) {
                    needsFix = true;
                }
            });
            
            // Aplicar correção se necessário
            if (needsFix) {
                fixAllButtonTexts();
            }
        });
        
        // Iniciar observação
        observer.observe(certificateSection, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['data-i18n', 'class']
        });
        
        return observer;
    }
    
    // Tornar a função de correção globalmente disponível com maior confiabilidade
    window.fixCertificateFilterTexts = function(language) {
        if (language) {
            localStorage.setItem('language', language);
        }
        
        // Aplicar correções com atraso zero
        requestAnimationFrame(fixAllButtonTexts);
    };
    
    // Inicializar tudo
    function initialize() {
        // Aplicar correção inicial
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                fixAllButtonTexts();
                setupMutationObserver();
                setupEventListeners();
            });
        } else {
            fixAllButtonTexts();
            setupMutationObserver();
            setupEventListeners();
        }
    }
    
    // Configurar ouvintes de eventos
    function setupEventListeners() {
        // Lidar com mudanças de idioma
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (lang) {
                    // Corrigir imediatamente após a mudança de idioma
                    setTimeout(() => fixAllButtonTexts(), 0);
                    
                    // E também após o processamento i18n ser concluído
                    setTimeout(() => fixAllButtonTexts(), 50);
                    setTimeout(() => fixAllButtonTexts(), 100);
                }
            });
        });
        
        // Lidar com o fechamento de modais de certificados
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('close-certificate-modal') || 
                event.target.classList.contains('certificate-modal')) {
                // Corrigir imediatamente
                setTimeout(() => fixAllButtonTexts(), 0);
                // E após quaisquer atualizações potenciais de i18n
                setTimeout(() => fixAllButtonTexts(), 50);
            }
        });
        
        // Adicionar ouvinte de evento para cliques de botão de filtro
        document.querySelectorAll('#certificates .filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Aguardar que certificate-filter.js processe o clique, então garantir que nossa correção preserva estados ativos
                setTimeout(() => fixAllButtonTexts(), 50);
            });
        });
    }
    
    // Iniciar tudo
    initialize();
})();