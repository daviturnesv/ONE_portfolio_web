/**
 * Script do Formulário de Contato
 * Gerencia o envio do formulário com EmailJS
 */

// IIFE para execução imediata e isolamento
(function() {
    console.log('🚀 Inicializando gerenciador de formulário de contato...');
    
    // Verificação de carregamento do DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }
    
    function inicializar() {
        const formulario = document.getElementById('contactForm');
        const botaoSubmit = document.querySelector('.submit-btn');
        
        if (!formulario) {
            console.error('❌ Formulário não encontrado');
            return;
        }
        
        if (!botaoSubmit) {
            console.error('❌ Botão de envio não encontrado');
            return;
        }
        
        console.log('✅ Elementos do formulário encontrados');
        console.log('🔍 Botão de envio:', botaoSubmit);
        
        // Habilitar o botão e remover quaisquer atributos que possam estar impedindo cliques
        botaoSubmit.disabled = false;
        botaoSubmit.style.pointerEvents = 'auto';
        botaoSubmit.style.position = 'relative';
        botaoSubmit.style.zIndex = '100';
        
        // Usar múltiplos métodos para garantir que o botão seja clicável
        // 1. Event Listener direto
        botaoSubmit.addEventListener('click', enviarFormulario);
        
        // 2. Event Listener para o formulário
        formulario.addEventListener('submit', evitarRecarregamento);
        
        console.log('✅ Events listeners configurados');
        
        // Função para evitar o recarregamento da página ao enviar o formulário
        function evitarRecarregamento(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔄 Evitando recarregamento do formulário');
            enviarFormulario(e);
            return false;
        }
        
        // Função para enviar o formulário
        function enviarFormulario(e) {
            if (e) e.preventDefault();
            console.log('📧 Tentando enviar formulário...');
            
            // Estado visual de carregamento
            const statusOriginal = botaoSubmit.innerHTML;
            botaoSubmit.disabled = true;
            botaoSubmit.innerHTML = '<div class="spinner"></div> Enviando...';
            botaoSubmit.classList.add('loading');
            
            // Coletar dados do formulário
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };
            
            // Verificação básica dos campos
            if (!formData.name || !formData.email || !formData.message) {
                mostrarMensagem('error', 'Por favor, preencha todos os campos obrigatórios.');
                resetarBotao();
                return;
            }
            
            // Verificação do EmailJS
            if (typeof emailjs === 'undefined') {
                console.error('❌ EmailJS não está disponível');
                mostrarMensagem('error', 'Serviço de envio não disponível. Por favor, tente novamente mais tarde.');
                resetarBotao();
                return;
            }
            
            // Enviar usando EmailJS
            emailjs.sendForm(
                'service_o7jhryx', 
                'template_j65zerc', 
                formulario,
                'IPeVkOWJQgdJL18Xp'
            )
            .then((resposta) => {
                console.log('✅ Email enviado com sucesso!', resposta);
                mostrarMensagem('success', 'Mensagem enviada com sucesso! Obrigado pelo contato.');
                formulario.reset();
            })
            .catch((erro) => {
                console.error('❌ Erro ao enviar email:', erro);
                mostrarMensagem('error', 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            })
            .finally(() => {
                resetarBotao();
            });
            
            function resetarBotao() {
                botaoSubmit.disabled = false;
                botaoSubmit.innerHTML = statusOriginal;
                botaoSubmit.classList.remove('loading');
            }
        }
        
        // Função para mostrar mensagens de sucesso ou erro
        function mostrarMensagem(tipo, texto) {
            // Buscar ou criar elementos de mensagem
            let containerStatus = formulario.querySelector('.form-status');
            if (!containerStatus) {
                containerStatus = document.createElement('div');
                containerStatus.className = 'form-status';
                formulario.appendChild(containerStatus);
            }
            
            // Buscar ou criar mensagens de sucesso/erro
            let msgSucesso = containerStatus.querySelector('.success-message');
            let msgErro = containerStatus.querySelector('.error-message');
            
            if (!msgSucesso) {
                msgSucesso = document.createElement('div');
                msgSucesso.className = 'success-message';
                containerStatus.appendChild(msgSucesso);
            }
            
            if (!msgErro) {
                msgErro = document.createElement('div');
                msgErro.className = 'error-message';
                containerStatus.appendChild(msgErro);
            }
            
            // Exibir a mensagem apropriada
            if (tipo === 'success') {
                msgSucesso.textContent = texto;
                msgSucesso.style.cssText = 'display: block !important; visibility: visible !important;';
                msgSucesso.classList.add('active');
                msgErro.style.display = 'none';
                msgErro.classList.remove('active');
                
                // Esconder após alguns segundos
                setTimeout(() => {
                    msgSucesso.style.display = 'none';
                    msgSucesso.classList.remove('active');
                }, 8000);
            } else {
                msgErro.textContent = texto;
                msgErro.style.cssText = 'display: block !important; visibility: visible !important;';
                msgErro.classList.add('active');
                msgSucesso.style.display = 'none';
                msgSucesso.classList.remove('active');
                
                // Esconder após alguns segundos
                setTimeout(() => {
                    msgErro.style.display = 'none';
                    msgErro.classList.remove('active');
                }, 8000);
            }
            
            // Rolar para a mensagem
            setTimeout(() => {
                containerStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
})();