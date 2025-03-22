/**
 * Script do Formulário de Contato
 * Gerencia o envio do formulário com EmailJS
 */

document.addEventListener('DOMContentLoaded', () => {
    const gerenciadorFormulario = new GerenciadorFormularioContato();
    gerenciadorFormulario.inicializar();
});

class GerenciadorFormularioContato {
    constructor() {
        this.formulario = document.getElementById('contactForm');
        this.mensagemSucesso = document.querySelector('.success-message');
        this.mensagemErro = document.querySelector('.error-message');
        this.tempoExibicaoMensagem = 5000; // 5 segundos
        this.serviceId = 'service_o7jhryx';
        this.templateId = 'template_j65zerc';
        this.userId = 'RfQczQRFEdJV5YpK-';
    }
    
    inicializar() {
        if (!this.formulario) return;
        
        this.inicializarEmailJS();
        this.configurarEnvioFormulario();
    }
    
    inicializarEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.userId);
        }
    }
    
    configurarEnvioFormulario() {
        this.formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            this.enviarFormulario();
        });
    }
    
    enviarFormulario() {
        this.formulario.classList.add('submitting');
        
        const parametros = this.obterParametrosFormulario();
        
        emailjs.send(this.serviceId, this.templateId, parametros)
            .then(() => this.tratarEnvioSucesso())
            .catch(erro => this.tratarEnvioErro(erro));
    }
    
    obterParametrosFormulario() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
    }
    
    tratarEnvioSucesso() {
        this.formulario.classList.remove('submitting');
        this.exibirMensagem(this.mensagemSucesso, this.mensagemErro);
        this.formulario.reset();
    }
    
    tratarEnvioErro(erro) {
        console.error('Erro ao enviar email:', erro);
        this.formulario.classList.remove('submitting');
        this.exibirMensagem(this.mensagemErro, this.mensagemSucesso);
    }
    
    exibirMensagem(mensagemMostrar, mensagemEsconder) {
        mensagemMostrar.style.display = 'block';
        mensagemEsconder.style.display = 'none';
        
        setTimeout(() => {
            mensagemMostrar.style.display = 'none';
        }, this.tempoExibicaoMensagem);
    }
}