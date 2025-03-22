/**
 * Script de Alternância de Tema
 * Gerencia a alternância entre os modos claro e escuro
 */

document.addEventListener('DOMContentLoaded', () => {
    const alternadorTema = new AlternadorTema();
    alternadorTema.inicializar();
});

class AlternadorTema {
    constructor() {
        this.botaoAlternador = document.querySelector('.theme-toggle');
        this.chaveLocalStorage = 'dark-mode';
    }
    
    inicializar() {
        if (!this.botaoAlternador) return;
        
        this.aplicarTemaInicial();
        this.configurarEventos();
    }
    
    aplicarTemaInicial() {
        // Verificar se o modo escuro foi ativado anteriormente
        if (localStorage.getItem(this.chaveLocalStorage) === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
    
    configurarEventos() {
        this.botaoAlternador.addEventListener('click', () => this.alternarTema());
    }
    
    alternarTema() {
        // Alternar classe no body
        document.body.classList.toggle('dark-mode');
        
        // Salvar estado no localStorage
        const modoEscuroAtivo = document.body.classList.contains('dark-mode');
        localStorage.setItem(this.chaveLocalStorage, modoEscuroAtivo);
    }
}