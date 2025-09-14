// (Dans votre fichier script.js)
    const bookingForm = document.getElementById('bookingRequestForm');
    const formStatus = document.getElementById('formStatus'); // Assurez-vous d'avoir un élément avec cet ID

    if (bookingForm && formStatus) {
        bookingForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Empêche la soumission classique

            // Validation de base (ajoutez des validations plus spécifiques)
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    // Mieux : afficher un message d'erreur près du champ
                    console.error(`Le champ ${field.name} est requis.`);
                }
            });

            if (!isValid) {
                formStatus.textContent = 'Veuillez remplir tous les champs obligatoires.';
                formStatus.style.color = 'red';
                return;
            }

            const formData = new FormData(bookingForm);
            formStatus.textContent = 'Envoi en cours...';
            formStatus.style.color = 'inherit'; // ou votre couleur de texte normale

            try {
                const response = await fetch(bookingForm.action, {
                    method: bookingForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Important pour Formspree pour renvoyer du JSON
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Merci ! Votre demande a été envoyée avec succès.';
                    formStatus.style.color = 'var(--primary-green)'; // Ou une couleur de succès
                    bookingForm.reset(); // Réinitialise le formulaire
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formStatus.textContent = data.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = 'Oops! Une erreur s\'est produite lors de l\'envoi.';
                    }
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                formStatus.textContent = 'Oops! Une erreur réseau s\'est produite.';
                formStatus.style.color = 'red';
                console.error('Erreur de soumission du formulaire:', error);
            }
        });
    }
     
        // Objet des prix
        const servicePrices = {
            "Basic Clean (Voiture)": {
                "Citadine": 50,
                "Berline": 60,
                "SUV Moyen/4x4": 70,
                "SUV Grand/4x4": 80,
                "Autre": 70
            },
            "Special Clean (Voiture)": {
                "Citadine": 80,
                "Berline": 90,
                "SUV Moyen/4x4": 100,
                "SUV Grand/4x4": 110,
                "Autre": 100
            },
            "Premium Clean (Voiture)": {
                "Citadine": 300,
                "Berline": 300,
                "SUV Moyen/4x4": 400,
                "SUV Grand/4x4": 400,
                "Autre": 350
            },
            "Moto Clean": {
                "Moto/Scooter": 50,
                "Moto/Roadster": 60,
                "Moto/Custom": 70,
                "Autre": 60
            }
        };

        function calculatePrice(serviceType, vehicleType) {
            if (servicePrices[serviceType] && servicePrices[serviceType][vehicleType]) {
                return servicePrices[serviceType][vehicleType];
            }
            if (serviceType === "Moto Clean" && servicePrices[serviceType] && servicePrices[serviceType]["Autre"]) {
                return servicePrices[serviceType]["Autre"];
            }
            if (servicePrices[serviceType] && servicePrices[serviceType]["Autre"]) {
                return servicePrices[serviceType]["Autre"];
            }
            return "À confirmer";
        }

        // --- Current Year for Footer ---
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // --- Mobile Navigation ---
        const burgerMenu = document.querySelector('.burger-menu');
        const navLinks = document.querySelector('.nav-links');
        const navLinkItems = document.querySelectorAll('.nav-links li a');

        burgerMenu.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('active');
            burgerMenu.setAttribute('aria-expanded', isExpanded);
            burgerMenu.classList.toggle('toggle-burger');
            const icon = burgerMenu.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                icon.setAttribute('aria-label', 'Fermer le menu de navigation');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.setAttribute('aria-label', 'Ouvrir le menu de navigation');
            }
        });

        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burgerMenu.classList.remove('toggle-burger');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    const icon = burgerMenu.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    icon.setAttribute('aria-label', 'Ouvrir le menu de navigation');
                }
                navLinkItems.forEach(item => item.classList.remove('active-link'));
                link.classList.add('active-link');
            });
        });

        // --- FAQ Accordion ---
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = questionButton.querySelector('i');

            questionButton.addEventListener('click', () => {
                const isSelected = questionButton.getAttribute('aria-selected') === 'true';
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestionButton = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        otherQuestionButton.setAttribute('aria-selected', 'false');
                        otherAnswer.setAttribute('hidden', '');
                        otherAnswer.style.maxHeight = null;
                        otherIcon.classList.remove('fa-chevron-up');
                        otherIcon.classList.add('fa-chevron-down');
                    }
                });
                if (!isSelected) {
                    questionButton.setAttribute('aria-selected', 'true');
                    answer.removeAttribute('hidden');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    questionButton.setAttribute('aria-selected', 'false');
                    answer.setAttribute('hidden', '');
                    answer.style.maxHeight = null;
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });

        // --- Active Link Highlighting on Scroll ---
        const sections = document.querySelectorAll('main section[id]');
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.4 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinkItems.forEach(link => {
                        link.classList.remove('active-link');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active-link');
                        }
                    });
                     if (entry.target.id === 'hero' && window.pageYOffset < (sections[1] ? sections[1].offsetTop / 2 : window.innerHeight / 2) ) {
                         document.querySelector('.nav-links a[href="#hero"]').classList.add('active-link');
                    }
                }
            });
        }, observerOptions);
        sections.forEach(section => { observer.observe(section); });
         if (window.pageYOffset < (sections[0] ? sections[0].offsetHeight / 2 : window.innerHeight / 2)) {
             document.querySelector('.nav-links a[href="#hero"]').classList.add('active-link');
        }


        // --- Back to Top Button ---
        const backToTopButton = document.querySelector(".back-to-top");
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) { backToTopButton.style.display = "flex"; }
            else { backToTopButton.style.display = "none"; }
        });
        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });


        // --- Modal Functionality for Tarifs ---
        const modalOpenLinks = document.querySelectorAll('.open-modal-link');
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.modal .close-button');
        modalOpenLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = link.getAttribute('data-modal-target');
                const targetModal = document.getElementById(modalId);
                if (targetModal) {
                    targetModal.style.display = 'flex';
                    targetModal.setAttribute('aria-hidden', 'false');
                    targetModal.querySelector('.close-button').focus();
                }
            });
        });
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            });
        });
        window.addEventListener('click', (event) => {
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    modal.setAttribute('aria-hidden', 'true');
                }
            });
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modals.forEach(modal => {
                    if (modal.style.display === 'flex') {
                        modal.style.display = 'none';
                        modal.setAttribute('aria-hidden', 'true');
                    }
                });
            }
        });


        // --- Navbar Scroll Effect ---
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { navbar.classList.add('scrolled');}
            else { navbar.classList.remove('scrolled'); }
        });


        // --- Form Submission to WhatsApp ---
        const whatsAppForm = document.getElementById('bookingRequestFormWhatsApp');
        const formStatusMessageWhatsApp = document.getElementById('formStatusMessageWhatsApp');
        const yourMainWhatsAppNumber = "212630288194"; // IMPORTANT: Remplacez par votre numéro

        if (whatsAppForm && formStatusMessageWhatsApp) {
            const showFieldError = (field, message) => {
                field.classList.add('is-invalid');
                const errorContainer = field.parentElement;
                let errorElement = errorContainer.querySelector('.error-message');
                if (!errorElement) {
                    errorElement = document.createElement('small');
                    errorElement.className = 'error-message';
                    errorElement.setAttribute('aria-live', 'polite');
                    if(field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')){
                         field.nextElementSibling.textContent = message;
                    } else {
                        field.insertAdjacentElement('afterend', errorElement);
                    }
                }
                errorElement.textContent = message;
            };

            const clearFieldErrors = () => {
                whatsAppForm.querySelectorAll('.form-control').forEach(field => {
                    field.classList.remove('is-invalid');
                    const errorContainer = field.parentElement;
                    const errorElement = errorContainer.querySelector('.error-message');
                    if (errorElement) { errorElement.textContent = ''; }
                });
                formStatusMessageWhatsApp.textContent = '';
                formStatusMessageWhatsApp.className = 'form-status-message';
            };

            const validateWhatsAppForm = () => {
                clearFieldErrors();
                let isValid = true;

                const clientName = document.getElementById('clientName');
                if (!clientName.value.trim()) {
                    showFieldError(clientName, 'Le nom complet est requis.');
                    isValid = false;
                }

                const clientPhone = document.getElementById('clientPhone');
                if (!clientPhone.value.trim()) {
                    showFieldError(clientPhone, 'Le numéro de téléphone est requis.');
                    isValid = false;
                } else if (!/^[0-9\s+()-]{10,20}$/.test(clientPhone.value)) {
                     showFieldError(clientPhone, 'Format de téléphone invalide (10-20 chiffres/espaces/tirets).');
                     isValid = false;
                }

                const clientEmail = document.getElementById('clientEmail');
                if (clientEmail.value.trim() && !/^\S+@\S+\.\S+$/.test(clientEmail.value)) {
                    showFieldError(clientEmail, 'Format d\'email invalide.');
                    isValid = false;
                }

                const vehicleType = document.getElementById('vehicleType');
                if (!vehicleType.value) {
                    showFieldError(vehicleType, 'Le type de véhicule est requis.');
                    isValid = false;
                }

                const serviceType = document.getElementById('serviceType');
                if (!serviceType.value) {
                    showFieldError(serviceType, 'La formule de lavage est requise.');
                    isValid = false;
                }

                const serviceZone = document.getElementById('serviceZone');
                if (!serviceZone.value) {
                    showFieldError(serviceZone, 'La zone d\'intervention est requise.');
                    isValid = false;
                }

                const preferredDateTime = document.getElementById('preferredDateTime');
                if (!preferredDateTime.value) { // MODIFIÉ ICI pour rendre obligatoire
                    showFieldError(preferredDateTime, 'La date et l\'heure souhaitées sont requises.');
                    isValid = false;
                } else {
                    const selectedDateTime = new Date(preferredDateTime.value);
                    const now = new Date();
                    now.setMinutes(now.getMinutes() - 1);
                    if (selectedDateTime < now) {
                        showFieldError(preferredDateTime, 'La date et l\'heure souhaitées ne peuvent pas être dans le passé.');
                        isValid = false;
                    }
                }
                return isValid;
            };

            whatsAppForm.addEventListener('submit', function(event) {
                event.preventDefault();

                if (!validateWhatsAppForm()) {
                    formStatusMessageWhatsApp.textContent = 'Veuillez corriger les erreurs indiquées dans le formulaire.';
                    formStatusMessageWhatsApp.className = 'form-status-message error';
                    const firstInvalidField = whatsAppForm.querySelector('.is-invalid');
                    if (firstInvalidField) {
                        firstInvalidField.focus();
                    }
                    return;
                }

                const name = document.getElementById('clientName').value.trim();
                const phone = document.getElementById('clientPhone').value.trim();
                const email = document.getElementById('clientEmail').value.trim();
                const vehicle = document.getElementById('vehicleType').value;
                const registration = document.getElementById('vehicleRegistration').value.trim();
                const service = document.getElementById('serviceType').value;
                const zone = document.getElementById('serviceZone').value;
                const dateTimeInput = document.getElementById('preferredDateTime').value;
                const additionalInfo = document.getElementById('additionalInfo').value.trim();

                const calculatedPrice = calculatePrice(service, vehicle);
                let priceText = "Prix : À confirmer";
                if (typeof calculatedPrice === 'number') {
                    priceText = `Prix estimé : ${calculatedPrice} DH`;
                } else if (calculatedPrice) {
                    priceText = `Prix : ${calculatedPrice}`;
                }

                let formattedDateTime = "Non spécifié(e)"; // Ne devrait plus arriver
                if (dateTimeInput) {
                    try {
                        const dateObj = new Date(dateTimeInput);
                        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
                        const fDate = dateObj.toLocaleDateString('fr-FR', optionsDate);
                        const fTime = dateObj.toLocaleTimeString('fr-FR', optionsTime);
                        formattedDateTime = `${fDate} à ${fTime}`;
                    } catch (e) {
                        formattedDateTime = dateTimeInput; // Fallback
                    }
                }

                let message = ` Nouvelle demande de lavage Alkhairy Shine \n`;
                message += `-----------------------------------\n`;
                message += ` Nom : ${name}\n`;
                message += ` Téléphone : ${phone}\n`; // WhatsApp rendra cliquable
                if (email) message += ` Email : ${email}\n`; // WhatsApp rendra cliquable
                message += ` Type de véhicule : ${vehicle}\n`;
                if (registration) message += ` Immatriculation : ${registration}\n`;
                message += ` Formule : ${service}\n`;
                message += ` ${priceText}\n`;
                message += ` Zone : ${zone}\n`;
                message += ` Date/Heure souhaitée : ${formattedDateTime}\n`;
                if (additionalInfo) message += ` Infos supplémentaires : ${additionalInfo}\n`;
                message += `-----------------------------------\n`;
                message += `Merci de confirmer la disponibilité et le prix.`;

                const whatsappUrl = `https://wa.me/${yourMainWhatsAppNumber}?text=${encodeURIComponent(message)}`;

                formStatusMessageWhatsApp.textContent = 'Préparation du message pour WhatsApp...';
                formStatusMessageWhatsApp.className = 'form-status-message info';

                const submitButton = whatsAppForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirection...';


                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    whatsAppForm.reset();
                    clearFieldErrors();
                    formStatusMessageWhatsApp.textContent = 'Votre demande a été préparée pour envoi via WhatsApp.';
                    formStatusMessageWhatsApp.className = 'form-status-message success';
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }, 1000);
            });
        }
    