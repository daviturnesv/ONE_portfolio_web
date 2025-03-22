/**
 * Script de Projetos
 * Gerencia o modal de projetos e interações
 */

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Criar modal se não existir
    let projectModal = document.querySelector('.project-modal');
    let modalBody, closeModal;
    
    if (!projectModal) {
        // Criar a estrutura do modal
        projectModal = document.createElement('div');
        projectModal.className = 'project-modal';
        projectModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(projectModal);
    }
    
    // Obter referências para elementos do modal
    modalBody = projectModal.querySelector('.modal-body');
    closeModal = projectModal.querySelector('.close-modal');
    
    // Função de popup do modal
    window.openModal = function(card) {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const image = card.querySelector('img').getAttribute('src');
        const techSpans = card.querySelectorAll('.project-tech span');
        const techList = Array.from(techSpans).map(span => span.textContent);
        
        let repoLink = '';
        const linkElem = card.querySelector('.project-links a');
        if (linkElem) {
            repoLink = linkElem.getAttribute('href');
        }
        
        const lang = localStorage.getItem('language') || 'pt';
        const techTitle = (lang === 'pt') ? 'Tecnologias:' : 'Technologies:';
        const githubText = (lang === 'pt') ? 'Ver no GitHub' : 'View on GitHub';
        
        modalBody.innerHTML = `
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="modal-tech-list">
                <h4>${techTitle}</h4>
                <ul>
                    ${techList.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
            ${repoLink ? `
            <div class="modal-actions">
                <a href="${repoLink}" target="_blank" class="btn primary-btn">
                    <i class="fab fa-github"></i> ${githubText}
                </a>
            </div>
            ` : ''}
        `;
        
        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    
    // Adicionar evento de clique aos cards de projeto
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.project-links')) {
                return; // Não abrir modal se clicar nos links do projeto
            }
            
            openModal(this);
        });
    });
    
    // Fechar modal ao clicar no botão X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});