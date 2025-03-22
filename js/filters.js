/**
 * Script de Filtros
 * Gerencia a funcionalidade de filtros para projetos
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar apenas o filtro de projetos
    const filtrosProjetos = new GerenciadorFiltros('projects', 'hide-project');
    filtrosProjetos.inicializar();
});

class GerenciadorFiltros {
    constructor(idSecao, classeOcultar) {
        this.idSecao = idSecao;
        this.classeOcultar = classeOcultar;
        this.botoesFiltro = document.querySelectorAll(`#${idSecao} .filter-btn`);
        this.itensFiltraveis = document.querySelectorAll(`#${idSecao} [data-category]`);
    }
    
    inicializar() {
        if (this.botoesFiltro.length === 0 || this.itensFiltraveis.length === 0) return;
        
        this.mostrarTodosItens();
        this.ativarFiltroInicial();
        this.configurarBotoesFiltro();
    }
    
    mostrarTodosItens() {
        this.itensFiltraveis.forEach(item => {
            item.classList.remove(this.classeOcultar);
        });
    }
    
    ativarFiltroInicial() {
        const botaoTodos = document.querySelector(`#${this.idSecao} .filter-btn[data-filter="all"]`);
        if (botaoTodos) {
            botaoTodos.classList.add('active');
        }
    }
    
    configurarBotoesFiltro() {
        this.botoesFiltro.forEach(botao => {
            this.garantirAtributoType(botao);
            
            // Limpar ouvintes antigos clonando e substituindo
            const novoBotao = botao.cloneNode(true);
            botao.parentNode.replaceChild(novoBotao, botao);
            
            // Adicionar novo ouvinte de evento
            novoBotao.addEventListener('click', (evento) => this.aoClicarFiltro(evento, novoBotao));
        });
    }
    
    garantirAtributoType(botao) {
        if (!botao.hasAttribute('type')) {
            botao.setAttribute('type', 'button');
        }
    }
    
    aoClicarFiltro(evento, botao) {
        evento.preventDefault();
        evento.stopPropagation();
        
        this.atualizarEstadoAtivo(botao);
        
        const valorFiltro = botao.getAttribute('data-filter');
        this.aplicarFiltro(valorFiltro);
        this.reinicializarEfeitosTilt();
    }
    
    atualizarEstadoAtivo(botaoAtivo) {
        // Atualizar botões usando consulta para obter todos
        document.querySelectorAll(`#${this.idSecao} .filter-btn`)
            .forEach(btn => btn.classList.remove('active'));
        
        botaoAtivo.classList.add('active');
    }
    
    aplicarFiltro(valorFiltro) {
        let contadorVisiveis = 0;
        
        this.itensFiltraveis.forEach(item => {
            const categoriaItem = item.getAttribute('data-category');
            
            if (valorFiltro === 'all' || categoriaItem === valorFiltro) {
                item.classList.remove(this.classeOcultar);
                contadorVisiveis++;
            } else {
                item.classList.add(this.classeOcultar);
            }
        });
    }
    
    reinicializarEfeitosTilt() {
        if (window.tiltManager) {
            setTimeout(() => {
                window.tiltManager.reinitForVisible(`.project-card:not(.${this.classeOcultar})`);
            }, 100);
        }
    }
}