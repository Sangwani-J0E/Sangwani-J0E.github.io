document.addEventListener("DOMContentLoaded", () => {
    const typewriterText = document.getElementById("typewriter-text");
    const text = "Get to know more about my journey and experience as a web developer.";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typewriterText.textContent += text[index];
            index++;
            setTimeout(typeEffect, 50); // Adjust speed of typing
        }
    }

    typeEffect();
});

document.addEventListener("DOMContentLoaded", () => {
    const typewriterText = document.getElementById("typewriter-text2");
    const text = "something about skills.";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typewriterText.textContent += text[index];
            index++;
            setTimeout(typeEffect, 50); // Adjust speed of typing
        }
    }

    typeEffect();
});

document.addEventListener("DOMContentLoaded", () => {
    const typewriterText = document.getElementById("typewriter-text3");
    const text = "something about projects.";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typewriterText.textContent += text[index];
            index++;
            setTimeout(typeEffect, 50); // Adjust speed of typing
        }
    }

    typeEffect();
});

document.addEventListener("DOMContentLoaded", () => {
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;

    function updateCarousel() {
        const slideWidth = slides[0].clientWidth;
        document.querySelector(".carousel").style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    nextButton.addEventListener("click", () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0; // Loop back to the first slide
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = slides.length - 1; // Loop back to the last slide
        }
        updateCarousel();
    });
});
