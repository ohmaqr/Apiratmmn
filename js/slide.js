document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const leftArrow = document.querySelector('.slider-arrow.left');
    const rightArrow = document.querySelector('.slider-arrow.right');
    let currentSlide = 0;
    let startX;
    let scrollLeft;
    let isDown = false;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % 10;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + 10) % 10;
        showSlide(currentSlide);
    }


    leftArrow.addEventListener('click', prevSlide);
    rightArrow.addEventListener('click', nextSlide);

    slides.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slides.offsetLeft;
        scrollLeft = slides.scrollLeft;
    });

    slides.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slides.addEventListener('mouseup', () => {
        isDown = false;
    });

    slides.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slides.offsetLeft;
        const walk = (x - startX) * 10;
        if (walk < -100) {
            nextSlide();
            isDown = false;
        } else if (walk > 100) {
            prevSlide();
            isDown = false;
        }
    });

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('mouseenter', () => {
            option.style.transform = 'translateY(-5px)';
        });
        option.addEventListener('mouseleave', () => {
            option.style.transform = 'translateY(0)';
        });
    });
});

/* Slide picture experience */
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}