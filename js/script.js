// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navToggleArrow = document.querySelector('.nav-toggle-arrow');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Hide navbar on scroll down, show on scroll up, with arrow toggle
let lastScrollY = window.scrollY;
let navIsHidden = false;

function handleNavbarOnScroll() {
    if (!navbar || !navToggleArrow) return;

    const currentY = window.scrollY;
    const deltaY = currentY - lastScrollY;

    // Always show navbar near the top
    if (currentY <= 0) {
        navbar.classList.remove('navbar-hidden');
        navToggleArrow.classList.remove('visible');
        navIsHidden = false;
        lastScrollY = currentY;
        return;
    }

    if (deltaY > 5 && !navIsHidden) {
        // Scrolling down - hide navbar, show arrow
        navbar.classList.add('navbar-hidden');
        navToggleArrow.classList.add('visible');
        navIsHidden = true;
    } else if (deltaY < -5 && navIsHidden) {
        // Scrolling up - show navbar, hide arrow
        navbar.classList.remove('navbar-hidden');
        navToggleArrow.classList.remove('visible');
        navIsHidden = false;
    }

    lastScrollY = currentY;
}

window.addEventListener('scroll', handleNavbarOnScroll);

// Arrow click should bring navbar back
if (navToggleArrow && navbar) {
    navToggleArrow.addEventListener('click', () => {
        navbar.classList.remove('navbar-hidden');
        navToggleArrow.classList.remove('visible');
        navIsHidden = false;
    });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);


// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and game cards
document.querySelectorAll('.skill-card, .game-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add active class styling for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

function buildMarqueeInner(text) {
    const segment = (text || '').trim() + '\u00a0';
    const inner = document.createElement('span');
    inner.className = 'marquee-text__inner';
    const a = document.createElement('span');
    a.className = 'marquee-text__segment';
    a.textContent = segment;
    const b = document.createElement('span');
    b.className = 'marquee-text__segment';
    b.setAttribute('aria-hidden', 'true');
    b.textContent = segment;
    inner.append(a, b);
    return inner;
}

function initTitleMarquees() {
    const skillsTitle = document.querySelector('.skills-title');
    if (skillsTitle && !skillsTitle.querySelector('.marquee-text__inner')) {
        const raw = (skillsTitle.textContent || '').trim();
        skillsTitle.textContent = '';
        skillsTitle.appendChild(buildMarqueeInner(raw));
        skillsTitle.classList.add('marquee-text', 'marquee-text--left');
    }

    const skillsRepeat = document.querySelector('.skills-title-repeat');
    if (skillsRepeat && !skillsRepeat.querySelector('.marquee-text__inner')) {
        const raw = (skillsRepeat.textContent || '').trim();
        skillsRepeat.textContent = '';
        skillsRepeat.appendChild(buildMarqueeInner(raw));
        skillsRepeat.classList.add('marquee-text', 'marquee-text--right');
    }

    document.querySelectorAll('.game-title').forEach((title) => {
        title.querySelectorAll('.game-title-text').forEach((el, i) => {
            if (el.querySelector('.marquee-text__inner')) return;
            const raw = (el.textContent || '').trim();
            if (!raw) return;
            el.textContent = '';
            el.appendChild(buildMarqueeInner(raw));
            el.classList.add('marquee-text', i % 2 === 0 ? 'marquee-text--left' : 'marquee-text--right');
        });
    });
}

initTitleMarquees();

// Add scrolling animation to game titles that overflow
document.querySelectorAll('.game-card-bottom-title').forEach(title => {
    const span = title.querySelector('span');
    if (span) {
        const text = span.textContent;
        span.setAttribute('data-text', text);
        span.textContent = text + ' ' + text; // Duplicate for seamless scroll
        
        // Check if text overflows
        if (span.scrollWidth > title.offsetWidth) {
            title.classList.add('scrolling');
        }
    }
});

// Timeline circle animation - move circle from top to bottom when images are shown
document.querySelectorAll('.timeline-toggle').forEach(toggle => {
    toggle.addEventListener('change', function() {
        const timelineItem = this.closest('.timeline-item');
        if (this.checked) {
            timelineItem.classList.add('images-active');
        } else {
            timelineItem.classList.remove('images-active');
        }
    });
    
    // Set initial state
    if (toggle.checked) {
        const timelineItem = toggle.closest('.timeline-item');
        timelineItem.classList.add('images-active');
    }
});

// Programming education interactions (degree detail and certificates slider)
const educationBody = document.querySelector('.skill-main-card-body-education');
if (educationBody) {
    const degreeCard = educationBody.querySelector('.skill-achievement-card[data-education="degree"]');
    const certsCard = educationBody.querySelector('.skill-achievement-card[data-education="certificates"]');
    const degreeView = educationBody.querySelector('.skill-degree-view');
    const certsView = educationBody.querySelector('.skill-certificates-view');
    const educationCard = educationBody.closest('.skill-main-card');
    const educationAccent = educationCard ? educationCard.querySelector('.skill-main-card-accent') : null;

    // Helper to clear state
    function resetEducationState() {
        educationBody.classList.remove('education-degree-active', 'education-certs-active');
        if (educationCard) {
            educationCard.classList.remove('detail-active');
        }
    }

    function updateEducationDetailState() {
        if (!educationCard) return;
        if (
            educationBody.classList.contains('education-degree-active') ||
            educationBody.classList.contains('education-certs-active')
        ) {
            educationCard.classList.add('detail-active');
        } else {
            educationCard.classList.remove('detail-active');
        }
    }

    if (degreeCard && degreeView) {
        degreeCard.addEventListener('click', () => {
            const isActive = educationBody.classList.contains('education-degree-active');
            resetEducationState();
            if (!isActive) {
                educationBody.classList.add('education-degree-active');
            }
            updateEducationDetailState();
        });
    }

    if (certsCard && certsView) {
        certsCard.addEventListener('click', () => {
            const isActive = educationBody.classList.contains('education-certs-active');
            resetEducationState();
            if (!isActive) {
                educationBody.classList.add('education-certs-active');
            }
            updateEducationDetailState();
        });

        // Certificates slider logic
        const slides = Array.from(certsView.querySelectorAll('.certificate-slide'));
        const prevBtn = certsView.querySelector('.cert-nav-prev');
        const nextBtn = certsView.querySelector('.cert-nav-next');
        const currentIndexEl = certsView.querySelector('.cert-current-index');
        const totalCountEl = certsView.querySelector('.cert-total-count');

        if (slides.length && prevBtn && nextBtn && currentIndexEl && totalCountEl) {
            let currentIndex = 0;
            totalCountEl.textContent = String(slides.length);

            function updateSlides() {
                slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === currentIndex);
                });
                currentIndexEl.textContent = String(currentIndex + 1);
            }

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlides();
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlides();
            });

            // Initialize
            updateSlides();
        }
    }

    if (educationAccent && educationCard) {
        educationAccent.addEventListener('click', () => {
            if (educationCard.classList.contains('detail-active')) {
                resetEducationState();
            }
        });
    }
}

// Game jam overlay image for Game Development Bootcamp
document.querySelectorAll('.game-jam-games').forEach(gamesBlock => {
    const grid = gamesBlock.querySelector('.game-jam-grid');
    const overlay = gamesBlock.querySelector('.game-jam-overlay');
    const overlayImage = gamesBlock.querySelector('.game-jam-overlay-image');
    const cardContainer = gamesBlock.closest('.skill-main-card');
    if (!grid || !overlay || !overlayImage || !cardContainer) return;

    const cards = Array.from(grid.querySelectorAll('.game-jam-card'));

    // You can replace these URLs with real screenshots of your jam games
    const gameImages = [
        'https://via.placeholder.com/1200x500/111827/ffffff?text=FIRST+GAME+JAM',
        'https://via.placeholder.com/1200x500/1f2937/ffffff?text=SECOND+GAME+JAM',
        'https://via.placeholder.com/1200x500/4b5563/ffffff?text=THIRD+GAME+JAM'
    ];

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const imgSrc = gameImages[index] || gameImages[0];
            overlayImage.src = imgSrc;
            overlayImage.alt = card.querySelector('.game-jam-game-title')?.textContent || 'Game jam project image';
            gamesBlock.classList.add('overlay-active');
            cardContainer.classList.add('images-overlay-active');
        });
    });

    const closeAccent = cardContainer.querySelector('.skill-main-card-accent');
    if (closeAccent) {
        closeAccent.addEventListener('click', () => {
            if (cardContainer.classList.contains('images-overlay-active')) {
                cardContainer.classList.remove('images-overlay-active');
                gamesBlock.classList.remove('overlay-active');
            }
        });
    }

    // Clicking overlay closes it
    overlay.addEventListener('click', () => {
        gamesBlock.classList.remove('overlay-active');
        cardContainer.classList.remove('images-overlay-active');
    });
});

// Generic skill image overlay for skill sections (e.g., 3D art)
document.querySelectorAll('.skill-main-card').forEach(card => {
    const overlay = card.querySelector('.skill-image-overlay');
    const overlayImg = overlay ? overlay.querySelector('.skill-image-overlay-img') : null;
    const accent = card.querySelector('.skill-main-card-accent');
    const triggers = card.querySelectorAll('[data-skill-image]');

    if (!overlay || !overlayImg || !triggers.length || !accent) return;

    // Map keys to example images (replace these URLs with your actual screenshots)
    const imageMap = {
        '3d-character': 'https://via.placeholder.com/1200x450/1f2937/ffffff?text=Character+Modelling',
        '3d-environment': 'https://via.placeholder.com/1200x450/0f766e/ffffff?text=Environment+Assets',
        '3d-texturing': 'https://via.placeholder.com/1200x450/f97316/ffffff?text=Texturing+%26+Materials',
        '3d-rigging': 'https://via.placeholder.com/1200x450/7c3aed/ffffff?text=Rigging+%26+Animation'
    };

    triggers.forEach(trigger => {
        trigger.style.cursor = 'pointer';
        trigger.addEventListener('click', () => {
            const key = trigger.getAttribute('data-skill-image');
            const src = key && imageMap[key] ? imageMap[key] : overlayImg.getAttribute('src');
            if (src) {
                overlayImg.src = src;
            }
            overlayImg.alt = trigger.textContent.trim();
            card.classList.add('images-overlay-active');
        });
    });

    // Close overlay when clicking the accent block
    accent.addEventListener('click', () => {
        if (card.classList.contains('images-overlay-active')) {
            card.classList.remove('images-overlay-active');
        }
    });

    // Optional: clicking on the overlay itself also closes it
    overlay.addEventListener('click', () => {
        card.classList.remove('images-overlay-active');
    });
});

// Game image modal for index.html games section
const gameImageModal = document.getElementById('gameImageModal');
if (gameImageModal) {
    const modalImg = gameImageModal.querySelector('.game-image-modal-img');
    const modalClose = gameImageModal.querySelector('.game-image-modal-close');
    const modalBackdrop = gameImageModal.querySelector('.game-image-modal-backdrop');
    const expandButtons = document.querySelectorAll('.game-image-expand');

    expandButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const imageContainer = button.closest('.game-card-top-image');
            const img = imageContainer ? imageContainer.querySelector('img') : null;
            
            if (img && modalImg) {
                modalImg.src = img.src;
                modalImg.alt = img.alt || 'Expanded game image';
                gameImageModal.classList.add('visible');
                document.body.classList.add('game-modal-open');
            }
        });
    });

    function closeModal() {
        gameImageModal.classList.remove('visible');
        document.body.classList.remove('game-modal-open');
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameImageModal.classList.contains('visible')) {
            closeModal();
        }
    });
}

// Gallery image functionality for about section
const mainPortrait = document.querySelector('.main-portrait');
const imageTextOverlay = document.querySelector('.image-text-overlay');
const imageTextOverlayContent = document.querySelector('.image-text-overlay-content');
const imageTextOverlayClose = document.querySelector('.image-text-overlay-close');
const galleryItems = document.querySelectorAll('.gallery-item');

if (mainPortrait && imageTextOverlay && galleryItems.length > 0) {
    // Store original portrait image source
    const originalPortraitSrc = mainPortrait.src;

    // Add click listeners to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const galleryImage = item.getAttribute('data-gallery-image');
            const galleryText = item.getAttribute('data-gallery-text');

            if (galleryImage && galleryText) {
                // Update main portrait image
                mainPortrait.src = galleryImage;
                
                // Update overlay text
                if (imageTextOverlayContent) {
                    imageTextOverlayContent.textContent = galleryText;
                } else {
                    const pTag = imageTextOverlay.querySelector('p');
                    if (pTag) {
                        pTag.textContent = galleryText;
                    }
                }

                // Show overlay
                imageTextOverlay.classList.add('active');
            }
        });
    });

    // Close overlay functionality
    function closeImageOverlay() {
        imageTextOverlay.classList.remove('active');
        // Restore original portrait image
        mainPortrait.src = originalPortraitSrc;
    }

    if (imageTextOverlayClose) {
        imageTextOverlayClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeImageOverlay();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageTextOverlay.classList.contains('active')) {
            closeImageOverlay();
        }
    });
}

// Hero image slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
const heroCardImage1 = document.getElementById('hero-card-image-1');
const heroCardImage2 = document.getElementById('hero-card-image-2');
const heroImages = [
    'img/hero/Hero1.png',
    'img/hero/Hero2.png',
    'img/hero/Hero3.png',
    'img/hero/Hero4.png',
    'img/hero/Hero5.jpg'
];

if (heroSlides.length > 0) {
    let currentSlide = 0;
    
    function updateUpcomingImages() {
        // Calculate next two images
        const nextIndex1 = (currentSlide + 1) % heroImages.length;
        const nextIndex2 = (currentSlide + 2) % heroImages.length;
        
        // Update the card images
        if (heroCardImage1) {
            heroCardImage1.src = heroImages[nextIndex1];
        }
        if (heroCardImage2) {
            heroCardImage2.src = heroImages[nextIndex2];
        }
    }
    
    function showNextSlide() {
        // Remove active class from current slide
        heroSlides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % heroSlides.length;
        
        // Add active class to new slide
        heroSlides[currentSlide].classList.add('active');
        
        // Update upcoming images in cards
        updateUpcomingImages();
    }
    
    // Initialize upcoming images
    updateUpcomingImages();
    
    // Start slideshow - switch every 7 seconds
    setInterval(showNextSlide, 7000);
}

// Certificate Modal functionality
const certificateModal = document.getElementById('certificateModal');
if (certificateModal) {
    const modalBackdrop = certificateModal.querySelector('.certificate-modal-backdrop');
    const modalClose = certificateModal.querySelector('.certificate-modal-close');
    const modalTitle = certificateModal.querySelector('.certificate-modal-title');
    const modalImage = certificateModal.querySelector('.certificate-modal-image');
    const certificateThumbnails = document.querySelectorAll('.achievement-certificate-thumbnail, .capability-image-thumbnail');

    function openCertificateModal(imageSrc, title) {
        if (modalImage && modalTitle) {
            modalImage.src = imageSrc;
            modalImage.alt = title || 'Certificate';
            modalTitle.textContent = title || 'Certificate';
            certificateModal.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCertificateModal() {
        certificateModal.classList.remove('visible');
        document.body.style.overflow = '';
    }

    // Add click listeners to certificate thumbnails and capability image thumbnails
    certificateThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering parent element clicks
            const imageSrc = thumbnail.getAttribute('data-cert-image');
            const title = thumbnail.getAttribute('data-cert-title');
            if (imageSrc) {
                openCertificateModal(imageSrc, title);
            }
        });
    });

    // Close modal handlers
    if (modalClose) {
        modalClose.addEventListener('click', closeCertificateModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeCertificateModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certificateModal.classList.contains('visible')) {
            closeCertificateModal();
        }
    });
}
