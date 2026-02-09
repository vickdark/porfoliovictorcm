document.addEventListener('DOMContentLoaded', () => {
    // Configuración de ScrollReveal
    const sr = ScrollReveal({
        distance: '50px',
        duration: 1500,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: true
    });

    sr.reveal('.reveal', {
        origin: 'bottom',
        interval: 100
    });

    // Manejo del formulario de contacto con EmailJS
    const contactForm = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    const emailInput = document.getElementById('email');
    const emailFeedback = document.getElementById('email-feedback');
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (emailInput && emailFeedback) {
        emailInput.addEventListener('input', function() {
            if (this.value === "") {
                emailFeedback.style.display = 'none';
                this.classList.remove('is-invalid', 'is-valid');
            } else if (emailRegex.test(this.value)) {
                emailFeedback.style.display = 'block';
                emailFeedback.textContent = 'Correo válido';
                emailFeedback.style.color = '#2ecc71'; // Verde esmeralda
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                emailFeedback.style.display = 'block';
                emailFeedback.textContent = 'Formato de correo inválido';
                emailFeedback.style.color = '#e74c3c'; // Rojo alizarina
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validación de JS adicional
            if (!emailRegex.test(emailInput.value)) {
                Swal.fire({
                    title: 'Correo inválido',
                    text: 'Por favor, ingresa una dirección de correo electrónico válida.',
                    icon: 'warning',
                    confirmButtonColor: '#9b59b6',
                    background: '#1E1E1E',
                    color: '#fff'
                });
                return;
            }

            // Cambiar estado del botón
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            statusDiv.textContent = '';

            // Estos IDs los obtienes de tu cuenta de EmailJS
            const serviceID = 'default_service';
            const templateID = 'template_p6oqjj4'; // ID que suele dar EmailJS tras guardar la plantilla

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensaje';
                    
                    Swal.fire({
                        title: '¡Enviado!',
                        text: 'Tu mensaje ha sido enviado con éxito.',
                        icon: 'success',
                        confirmButtonColor: '#9b59b6',
                        background: '#1E1E1E',
                        color: '#fff'
                    });

                    contactForm.reset();
                }, (err) => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensaje';

                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo.',
                        icon: 'error',
                        confirmButtonColor: '#9b59b6',
                        background: '#1E1E1E',
                        color: '#fff'
                    });
                    console.error('EmailJS Error:', err);
                });
        });
    }

    // Lógica del botón Volver Arriba
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Actualizar año actual en el footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
