/**
 * Script de Projetos
 * Gerencia o modal de projetos e interações
 */

document.addEventListener('DOMContentLoaded', () => {
    const gerenciadorProjetos = new GerenciadorProjetos();
    gerenciadorProjetos.inicializar();
});

class GerenciadorProjetos {
    constructor() {
        this.cardsProjeto = document.querySelectorAll('.project-card');
        this.modal = null;
        this.corpoModal = null;
        this.botaoFechar = null;
    }
    
    inicializar() {
        if (this.cardsProjeto.length === 0) return;
        
        this.criarModal();
        this.configurarEventos();
        
        // Disponibilizar função global
        window.openModal = (card) => this.abrirModal(card);
    }
    
    criarModal() {
        // Se o modal já existe, apenas obter referências
        this.modal = document.querySelector('.project-modal');
        
        if (!this.modal) {
            // Criar novo modal
            this.modal = document.createElement('div');
            this.modal.className = 'project-modal';
            this.modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-body"></div>
                </div>
            `;
            document.body.appendChild(this.modal);
        }
        
        // Obter referências
        this.corpoModal = this.modal.querySelector('.modal-body');
        this.botaoFechar = this.modal.querySelector('.close-modal');
    }
    
    configurarEventos() {
        // Evento nos cards de projeto
        this.cardsProjeto.forEach(card => {
            card.addEventListener('click', (e) => this.aoClicarCard(e, card));
        });
        
        // Evento no botão de fechar
        if (this.botaoFechar) {
            this.botaoFechar.addEventListener('click', () => this.fecharModal());
        }
        
        // Evento de clique fora do modal
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.fecharModal();
            }
        });
    }
    
    aoClicarCard(evento, card) {
        // Não abrir modal se clicar nos links do projeto
        if (evento.target.closest('.project-links')) {
            return;
        }
        
        this.abrirModal(card);
    }
    
    abrirModal(card) {
        const titulo = card.querySelector('h3').textContent;
        const descricao = card.querySelector('p').textContent;
        const imagem = card.querySelector('img').getAttribute('src');
        const listaTecnologias = this.obterListaTecnologias(card);
        const linkRepositorio = this.obterLinkRepositorio(card);
        
        // Idioma atual
        const idioma = localStorage.getItem('language') || 'pt';
        const tituloTecnologias = (idioma === 'pt') ? 'Tecnologias:' : 'Technologies:';
        const textoGithub = (idioma === 'pt') ? 'Ver no GitHub' : 'View on GitHub';
        
        // Atualizar conteúdo do modal
        this.corpoModal.innerHTML = this.gerarHTMLConteudoModal(
            imagem, titulo, descricao, tituloTecnologias, 
            listaTecnologias, linkRepositorio, textoGithub
        );
        
        // Mostrar modal
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    fecharModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    obterListaTecnologias(card) {
        const elementos = card.querySelectorAll('.project-tech span');
        return Array.from(elementos).map(span => span.textContent);
    }
    
    obterLinkRepositorio(card) {
        const linkElem = card.querySelector('.project-links a');
        return linkElem ? linkElem.getAttribute('href') : '';
    }
    
    gerarHTMLConteudoModal(imagem, titulo, descricao, tituloTecnologias, listaTecnologias, linkRepositorio, textoGithub) {
        return `
            <img src="${imagem}" alt="${titulo}">
            <h3>${titulo}</h3>
            <p>${descricao}</p>
            <div class="modal-tech-list">
                <h4>${tituloTecnologias}</h4>
                <ul>
                    ${listaTecnologias.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
            ${linkRepositorio ? `
            <div class="modal-actions">
                <a href="${linkRepositorio}" target="_blank" class="btn primary-btn">
                    <i class="fab fa-github"></i> ${textoGithub}
                </a>
            </div>
            ` : ''}
        `;
    }
}