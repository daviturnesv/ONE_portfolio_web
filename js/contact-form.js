/**
 * Script do Formulário de Contato
 * Gerencia o envio do formulário com EmailJS
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("RfQczQRFEdJV5YpK-");
    }
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const form = this;
            form.classList.add('submitting');
            
            const params = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            emailjs.send('service_o7jhryx', 'template_j65zerc', params)
                .then(function() {
                    form.classList.remove('submitting');
                    document.querySelector('.success-message').style.display = 'block';
                    document.querySelector('.error-message').style.display = 'none';
                    
                    form.reset();
                    
                    setTimeout(() => {
                        document.querySelector('.success-message').style.display = 'none';
                    }, 5000);
                }, function(error) {
                    console.error('Erro ao enviar email:', error);
                    form.classList.remove('submitting');
                    document.querySelector('.error-message').style.display = 'block';
                    document.querySelector('.success-message').style.display = 'none';
                    
                    setTimeout(() => {
                        document.querySelector('.error-message').style.display = 'none';
                    }, 5000);
                });
        });
    }
});