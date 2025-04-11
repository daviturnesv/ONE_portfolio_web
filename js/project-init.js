/**
 * Script de inicialização para os projetos
 * Garante que todos os componentes relacionados aos projetos sejam inicializados corretamente
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando componentes de projetos...');
    
    // Verificar se os scripts necessários foram carregados
    const requiredScripts = [
        'project-images-handler.js',
        'project-cards-fix.js',
        'filter-fix.js'
    ];
    
    const loadedScripts = Array.from(document.scripts).map(script => {
        const src = script.src;
        const filename = src.substring(src.lastIndexOf('/') + 1);
        return filename;
    });
    
    requiredScripts.forEach(script => {
        if (!loadedScripts.some(loaded => loaded.includes(script))) {
            console.warn(`⚠️ Script necessário não encontrado: ${script}`);
        }
    });
    
    // Forçar a verificação de imagens
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        console.log(`📊 Verificando ${projectCards.length} cards de projetos...`);
        
        projectCards.forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                // Verificar se a imagem está carregada corretamente
                if (img.complete && img.naturalWidth === 0) {
                    console.warn(`⚠️ Imagem quebrada detectada: ${img.src}`);
                    // Disparar evento de erro para acionar o handler
                    const errorEvent = new Event('error');
                    img.dispatchEvent(errorEvent);
                }
            }
        });
        
        console.log('✅ Verificação de imagens concluída');
    }, 1000);
    
    // Garantir que os filtros estejam funcionando
    if (typeof initializeFilters === 'function') {
        initializeFilters();
    } else {
        console.warn('⚠️ Função initializeFilters não encontrada');
    }
});