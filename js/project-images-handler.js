/**
 * Gerenciador de imagens para os cards de projetos
 * Este script verifica se as imagens dos projetos existem e, caso não existam,
 * substitui por placeholders com o nome do projeto
 */
document.addEventListener('DOMContentLoaded', function() {
    // Garantir que o script seja executado após o carregamento completo da página
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const img = card.querySelector('img');
            const title = card.querySelector('h3').textContent;
            
            if (img) {
                // Verificar se a imagem já é um placeholder ou se está quebrada
                if (img.naturalWidth === 0 || img.src.includes('project_placeholder.png') || 
                    img.alt.includes('não disponível') || img.src.includes('não disponível')) {
                    createPlaceholderImage(img, title);
                } else {
                    // Verificar se a imagem existe
                    const testImg = new Image();
                    testImg.src = img.src;
                    
                    testImg.onerror = function() {
                        // Se a imagem não existir, criar um placeholder com o nome do projeto
                        createPlaceholderImage(img, title);
                    };
                }
            }
        });
    }, 500); // Pequeno atraso para garantir que todas as imagens foram processadas
    
    /**
     * Cria uma imagem placeholder com o nome do projeto
     * @param {HTMLImageElement} imgElement - Elemento de imagem a ser substituído
     * @param {string} projectName - Nome do projeto para exibir no placeholder
     */
    function createPlaceholderImage(imgElement, projectName) {
        // Salvar as dimensões originais
        const width = imgElement.width || 300;
        const height = imgElement.height || 200;
        
        // Criar um canvas para o placeholder
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        
        // Definir cores com base no tema atual
        const isDarkMode = document.body.classList.contains('dark-mode');
        const bgColor = isDarkMode ? '#2a2a2a' : '#f5f5f5';
        const textColor = isDarkMode ? '#ffffff' : '#333333';
        const accentColor = isDarkMode ? '#4d9cde' : '#40739e';
        
        // Desenhar fundo
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Desenhar borda
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, width - 4, height - 4);
        
        // Desenhar padrão de fundo
        ctx.fillStyle = accentColor + '20'; // 20% de opacidade
        const patternSize = 20;
        for (let i = 0; i < width; i += patternSize) {
            for (let j = 0; j < height; j += patternSize) {
                if ((i + j) % (patternSize * 2) === 0) {
                    ctx.fillRect(i, j, patternSize, patternSize);
                }
            }
        }
        
        // Desenhar texto
        ctx.fillStyle = textColor;
        ctx.font = 'bold 16px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Limitar o tamanho do texto
        let fontSize = 16;
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        while (ctx.measureText(projectName).width > width - 20 && fontSize > 10) {
            fontSize--;
            ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        }
        
        // Adicionar texto com sombra
        ctx.shadowColor = isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText(projectName, width / 2, height / 2);
        
        // Adicionar texto "Imagem não disponível"
        ctx.font = '12px Arial, sans-serif';
        ctx.shadowBlur = 2;
        ctx.fillText('Imagem não disponível', width / 2, height / 2 + 25);
        
        // Remover sombra
        ctx.shadowColor = 'transparent';
        
        // Substituir a imagem original pelo canvas
        imgElement.src = canvas.toDataURL('image/png');
        imgElement.setAttribute('data-is-placeholder', 'true');
    }
    
    // Adicionar um evento para forçar a verificação de imagens quando a página estiver totalmente carregada
    window.addEventListener('load', function() {
        const brokenImages = document.querySelectorAll('img[alt="Imagem do projeto não disponível"], img[src*="project_placeholder.png"]');
        brokenImages.forEach(img => {
            const card = img.closest('.project-card');
            if (card) {
                const title = card.querySelector('h3').textContent;
                createPlaceholderImage(img, title);
            }
        });
    });
    
    // Atualizar placeholders quando o tema mudar
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Dar tempo para a mudança de tema ser aplicada
            setTimeout(() => {
                const placeholders = document.querySelectorAll('img[data-is-placeholder="true"]');
                placeholders.forEach(img => {
                    const card = img.closest('.project-card');
                    if (card) {
                        const title = card.querySelector('h3').textContent;
                        createPlaceholderImage(img, title);
                    }
                });
            }, 100);
        });
    }
});