/**
 * Extensão para o sistema de internacionalização
 * Adiciona suporte para tradução de placeholders
 */

document.addEventListener('idiomaMudou', function(evento) {
    const idioma = evento.detail.idioma;
    console.log('🔤 Aplicando traduções extras para placeholders no idioma:', idioma);
    
    // Traduzir placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(elemento => {
        const chave = elemento.getAttribute('data-i18n-placeholder');
        const traducao = window.traducoes && window.traducoes[chave] && window.traducoes[chave][idioma];
        
        if (traducao) {
            elemento.setAttribute('placeholder', traducao);
        } else {
            console.warn(`⚠️ Placeholder tradução não encontrada para: ${chave} (${idioma})`);
        }
    });
    
    // Traduzir elementos com HTML complexo que precisam manter as tags
    document.querySelectorAll('[data-i18n-html]').forEach(elemento => {
        const chave = elemento.getAttribute('data-i18n-html');
        const traducao = window.traducoes[chave] && window.traducoes[chave][idioma];
        
        if (traducao) {
            elemento.innerHTML = traducao;
        } else {
            console.warn(`⚠️ Tradução HTML não encontrada para: ${chave} (${idioma})`);
        }
    });
    
    // Ajustar direção do texto para idiomas RTL quando necessário
    // (não aplicável para PT e EN, mas útil para futuros idiomas como árabe ou hebraico)
    document.documentElement.setAttribute('lang', idioma);
    if (['ar', 'he', 'fa'].includes(idioma)) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
});

// Adicionar os listeners aos botões novamente, como fallback
window.addEventListener('load', function() {
    const botoesTraduzir = document.querySelectorAll('.lang-btn');
    
    if (botoesTraduzir.length) {
        console.log('🔄 Aplicando listeners de idioma extras nos botões');
        
        botoesTraduzir.forEach(botao => {
            botao.addEventListener('click', function() {
                const idioma = this.dataset.lang;
                
                // Atualizar estado ativo
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Chamar função de tradução global
                if (typeof traduzirInterface === 'function') {
                    traduzirInterface(idioma);
                } else {
                    // Disparar evento de mudança de idioma manualmente
                    document.dispatchEvent(new CustomEvent('idiomaMudou', {
                        detail: { idioma }
                    }));
                }
            });
        });
    }
});
