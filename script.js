
document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    
    const viewImageButtons = document.querySelectorAll('.view-image-btn'); 
    const copyCards = document.querySelectorAll('.copy-card');

    const transitionDuration = 400; 


    // 1.1 MENÚ RESPONSIVE
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });


        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    

    // 2. FUNCIONES DEL MODAL (OPEN/CLOSE)
    const openModal = (imageUrl) => {
        modalImage.src = imageUrl; 
        
        modal.style.display = 'block'; 
        
        requestAnimationFrame(() => {
            modal.classList.add('open');
        });
    };


    const closeModal = () => {
        modal.classList.remove('open');
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, transitionDuration); 
    };


    // 3. LISTENERS DEL MODAL

    viewImageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const imageUrl = button.getAttribute('data-image');
            
            if (imageUrl) {

                if (imageUrl.startsWith('C:\\') || imageUrl.includes('...')) {
                     console.error('Error: La ruta de la imagen es inválida. Asegúrate de usar rutas RELATIVAS (ej: project-images/mi-proyecto.png).');
                     alert('Error: La ruta de la imagen es de sistema (C:). Por favor, cámbiala a una ruta RELATIVA (ej: project-images/mi-proyecto.png) y recarga la página.');
                } else {
                    openModal(imageUrl); 
                }
            } else {
                console.error('El botón no tiene una ruta de imagen (data-image).');
            }
        });
    });


    closeBtn.addEventListener('click', closeModal);


    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });


    // 4. LISTENERS DE COPIA AL PORTAPAPELES

    copyCards.forEach(card => {
        card.addEventListener('click', async () => {
            const textToCopy = card.getAttribute('data-copy');
            const feedbackElement = card.querySelector('.copy-feedback');

            if (!textToCopy) {
                console.error("El atributo 'data-copy' no está definido en la tarjeta.");
                return;
            }

            try {
                
                await navigator.clipboard.writeText(textToCopy);
                
                
                feedbackElement.textContent = '¡Copiado!';
                
                
                card.classList.add('copied');

                
                setTimeout(() => {
                    card.classList.remove('copied');
                    feedbackElement.textContent = '';
                }, 1500);

            } catch (err) {
                console.error('Error al intentar copiar el texto:', err);
                
                alert(`Error al copiar. Por favor, copia manualmente: ${textToCopy}`);
            }
        });
    });
});