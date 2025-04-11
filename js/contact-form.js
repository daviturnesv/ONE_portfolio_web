/**
 * Script do Formulário de Contato
 * Gerencia o envio do formulário com EmailJS
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando gerenciador de formulário de contato...');
    
    // Verificar se o EmailJS está disponível
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS não está disponível. Carregando script...');
        carregarEmailJS(() => {
            inicializarFormulario();
        });
    } else {
        console.log('✅ EmailJS já está disponível');
        inicializarFormulario();
    }
});

function carregarEmailJS(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
        console.log('✅ EmailJS carregado com sucesso');
        callback();
    };
    script.onerror = () => {
        console.error('❌ Falha ao carregar EmailJS');
    };
    document.head.appendChild(script);
}

function inicializarFormulario() {
    const gerenciadorFormulario = new GerenciadorFormularioContato();
    gerenciadorFormulario.inicializar();
}

class GerenciadorFormularioContato {
    constructor() {
        this.formulario = document.getElementById('contactForm');
        this.mensagemSucesso = document.querySelector('.success-message');
        this.mensagemErro = document.querySelector('.error-message');
        this.botaoSubmit = document.querySelector('.submit-btn');
        this.botaoTextoOriginal = this.botaoSubmit ? this.botaoSubmit.innerHTML : 'Enviar Mensagem';
        this.tempoExibicaoMensagem = 5000; // 5 segundos
        
        // Credenciais do EmailJS - Atualizadas
        this.serviceId = 'service_o7jhryx';
        this.templateId = 'template_j65zerc';
        this.userId = 'IPeVkOWJQgdJL18Xp'; // Certifique-se de que este ID está correto
        
        // Debug info
        this.debugMode = true;
    }
    
    inicializar() {
        if (!this.formulario) {
            console.warn('⚠️ Formulário de contato não encontrado');
            return;
        }
        
        console.log('✅ Formulário de contato encontrado');
        
        // Verificar se os elementos de mensagem existem
        if (!this.mensagemSucesso) {
            console.warn('⚠️ Elemento de mensagem de sucesso não encontrado, criando...');
            this.criarElementoMensagem('success');
        }
        
        if (!this.mensagemErro) {
            console.warn('⚠️ Elemento de mensagem de erro não encontrado, criando...');
            this.criarElementoMensagem('error');
        }
        
        this.inicializarEmailJS();
        this.configurarEnvioFormulario();
    }
    
    criarElementoMensagem(tipo) {
        const formStatus = this.formulario.querySelector('.form-status');
        
        if (!formStatus) {
            console.log('Criando container de status do formulário');
            const novoFormStatus = document.createElement('div');
            novoFormStatus.className = 'form-status';
            this.formulario.appendChild(novoFormStatus);
            
            // Atualizar a referência
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
            novoFormStatus.appendChild(successMsg);
            
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.innerHTML = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.';
            novoFormStatus.appendChild(errorMsg);
            
            // Atualizar as referências
            this.mensagemSucesso = successMsg;
            this.mensagemErro = errorMsg;
        } else {
            if (tipo === 'success') {
                this.mensagemSucesso = document.createElement('div');
                this.mensagemSucesso.className = 'success-message';
                this.mensagemSucesso.innerHTML = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
                formStatus.appendChild(this.mensagemSucesso);
            } else {
                this.mensagemErro = document.createElement('div');
                this.mensagemErro.className = 'error-message';
                this.mensagemErro.innerHTML = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.';
                formStatus.appendChild(this.mensagemErro);
            }
        }
    }
    
    inicializarEmailJS() {
        if (typeof emailjs !== 'undefined') {
            console.log('✅ EmailJS encontrado, inicializando...');
            try {
                // Inicializar com o ID de usuário público
                emailjs.init(this.userId, {
                    publicKey: this.userId
                });
                console.log('✅ EmailJS inicializado com sucesso');
            } catch (erro) {
                console.error('❌ Erro ao inicializar EmailJS:', erro);
                this.exibirMensagem(this.mensagemErro, this.mensagemSucesso);
            }
        } else {
            console.error('❌ EmailJS não encontrado! Verifique se o script foi carregado corretamente.');
            this.exibirMensagem(this.mensagemErro, this.mensagemSucesso);
        }
    }
    
    configurarEnvioFormulario() {
        this.formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            console.log('🔄 Formulário submetido, processando...');
            this.enviarFormulario();
        });
    }
    
    enviarFormulario() {
        this.formulario.classList.add('submitting');
        this.atualizarBotaoEstado(true);
        
        const parametros = this.obterParametrosFormulario();
        
        if (this.debugMode) {
            console.log('📧 Enviando email com os parâmetros:', parametros);
            console.log('📧 Service ID:', this.serviceId);
            console.log('📧 Template ID:', this.templateId);
            console.log('📧 User ID:', this.userId);
        }
        
        // Verificar se os parâmetros são válidos
        if (!this.validarParametros(parametros)) {
            this.tratarEnvioErro(new Error('Parâmetros inválidos'));
            return;
        }
        
        // Adicionar um timeout para garantir que o botão seja atualizado visualmente
        setTimeout(() => {
            // Tentar enviar o email com tratamento de erro aprimorado
            try {
                emailjs.sendForm(this.serviceId, this.templateId, this.formulario)
                    .then((resposta) => {
                        console.log('✅ Email enviado com sucesso!', resposta);
                        this.tratarEnvioSucesso();
                    })
                    .catch(erro => {
                        console.error('❌ Erro ao enviar email:', erro);
                        this.tratarEnvioErro(erro);
                    });
            } catch (erro) {
                console.error('❌ Erro ao chamar emailjs.send:', erro);
                this.tratarEnvioErro(erro);
            }
        }, 100);
    }
    
    validarParametros(parametros) {
        // Verificar se os campos obrigatórios estão preenchidos
        if (!parametros.name || !parametros.email || !parametros.message) {
            console.error('❌ Campos obrigatórios não preenchidos');
            return false;
        }
        
        // Verificar se o email é válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(parametros.email)) {
            console.error('❌ Email inválido');
            return false;
        }
        
        return true;
    }
    
    obterParametrosFormulario() {
        const nameElement = document.getElementById('name');
        const emailElement = document.getElementById('email');
        const subjectElement = document.getElementById('subject');
        const messageElement = document.getElementById('message');
        
        if (this.debugMode) {
            console.log('Elementos do formulário:', {
                name: nameElement,
                email: emailElement,
                subject: subjectElement,
                message: messageElement
            });
        }
        
        return {
            name: nameElement ? nameElement.value : '',
            email: emailElement ? emailElement.value : '',
            subject: subjectElement ? subjectElement.value : '',
            message: messageElement ? messageElement.value : ''
        };
    }
    
    tratarEnvioSucesso() {
        this.formulario.classList.remove('submitting');
        this.atualizarBotaoEstado(false);
        this.exibirMensagem(this.mensagemSucesso, this.mensagemErro);
        this.formulario.reset();
    }
    
    tratarEnvioErro(erro) {
        console.error('Erro ao enviar email:', erro);
        this.formulario.classList.remove('submitting');
        this.atualizarBotaoEstado(false);
        
        // Atualizar a mensagem de erro com detalhes específicos
        if (this.mensagemErro) {
            let mensagemDetalhada = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.';
            
            if (erro.message) {
                if (erro.message.includes('Network Error') || erro.message.includes('Failed to fetch')) {
                    mensagemDetalhada = 'Erro de conexão. Verifique sua internet e tente novamente.';
                } else if (erro.message.includes('Invalid Parameters')) {
                    mensagemDetalhada = 'Parâmetros inválidos. Verifique se todos os campos estão preenchidos corretamente.';
                }
            }
            
            this.mensagemErro.innerHTML = mensagemDetalhada;
        }
        
        this.exibirMensagem(this.mensagemErro, this.mensagemSucesso);
    }
    
    exibirMensagem(mensagemMostrar, mensagemEsconder) {
        if (!mensagemMostrar) {
            console.warn('⚠️ Elemento de mensagem não encontrado');
            alert(mensagemMostrar === this.mensagemSucesso ? 
                'Mensagem enviada com sucesso!' : 
                'Erro ao enviar mensagem. Por favor, tente novamente.');
            return;
        }
        
        // Forçar a exibição da mensagem com estilo inline
        mensagemMostrar.style.cssText = 'display: block !important; visibility: visible !important;';
        
        // Esconder a outra mensagem se existir
        if (mensagemEsconder) {
            mensagemEsconder.style.display = 'none';
        }
        
        // Adicionar classe para destacar a mensagem
        mensagemMostrar.classList.add('active');
        
        // Rolar até a mensagem para garantir que o usuário a veja
        setTimeout(() => {
            mensagemMostrar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // Definir um timeout para esconder a mensagem após um tempo
        setTimeout(() => {
            if (mensagemMostrar) {
                mensagemMostrar.style.display = 'none';
                mensagemMostrar.classList.remove('active');
            }
        }, this.tempoExibicaoMensagem);
    }
    
    atualizarBotaoEstado(enviando) {
        if (!this.botaoSubmit) return;
        
        if (enviando) {
            this.botaoSubmit.disabled = true;
            
            // Guardar o texto original se ainda não foi guardado
            if (!this.botaoTextoOriginal || this.botaoTextoOriginal === 'Enviar Mensagem') {
                this.botaoTextoOriginal = this.botaoSubmit.innerHTML;
            }
            
            // Atualizar o texto do botão com ícone de carregamento
            this.botaoSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Adicionar classe para estilização adicional
            this.botaoSubmit.classList.add('loading');
        } else {
            // Remover atributo disabled
            this.botaoSubmit.disabled = false;
            
            // Restaurar o texto original
            this.botaoSubmit.innerHTML = this.botaoTextoOriginal;
            
            // Remover classe de carregamento
            this.botaoSubmit.classList.remove('loading');
        }
    }
}