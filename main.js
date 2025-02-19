const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');
let cursorX = 0;
let cursorY = 0;
let blurX = 0;
let blurY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

function animate() {
    blurX += (cursorX - blurX) * 0.1;
    blurY += (cursorY - blurY) * 0.1;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    cursorBlur.style.left = `${blurX}px`;
    cursorBlur.style.top = `${blurY}px`;
    
    requestAnimationFrame(animate);
}
animate();

document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '64px';
        cursor.style.height = '64px';
        cursorBlur.style.width = '96px';
        cursorBlur.style.height = '96px';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursorBlur.style.width = '128px';
        cursorBlur.style.height = '128px';
    });
});

function addCursorEffects(element) {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '64px';
        cursor.style.height = '64px';
        cursorBlur.style.width = '96px';
        cursorBlur.style.height = '96px';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursorBlur.style.width = '128px';
        cursorBlur.style.height = '128px';
    });
}

function createConfetti(x, y) {
    const colors = ['#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const velocity = 3 + Math.random() * 3;
        const size = 4 + Math.random() * 6;
        
        confetti.style.setProperty('--angle', angle);
        confetti.style.setProperty('--velocity', velocity);
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        confetti.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        confetti.style.opacity = 0.8 + Math.random() * 0.2;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 1500);
    }
}

document.querySelector('nav a[href="#"]').addEventListener('click', (e) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + (rect.width / 2);
    const y = rect.top + (rect.height / 2);
    createConfetti(x, y);
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('button');

function openLightbox(imgSrc) {
    lightboxImg.src = imgSrc;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

async function loadImages() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    try {
        const response = await fetch('gallery-data.json');
        const data = await response.json();

        data.images.forEach(fileName => {
            const div = document.createElement('div');
            div.className = 'relative group gallery-item cursor-pointer overflow-hidden aspect-square';
            
            const img = document.createElement('img');
            img.src = `images/${fileName}`;
            img.alt = 'Gallery Image';
            img.loading = 'lazy';
            img.className = 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-110';
            
            div.addEventListener('click', () => {
                openLightbox(img.src);
            });
            
            addCursorEffects(div);
            
            div.appendChild(img);
            galleryGrid.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading images:', error);
        const errorMessage = document.createElement('p');
        errorMessage.className = 'text-center text-red-400 mt-4';
        errorMessage.textContent = 'Unable to load gallery images.';
        galleryGrid.appendChild(errorMessage);
    }
}

function createStars() {
    const backgroundEffects = document.createElement('div');
    backgroundEffects.className = 'background-effects';
    document.body.appendChild(backgroundEffects);

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        const moveX = (Math.random() - 0.5) * 20;
        const moveY = (Math.random() - 0.5) * 20;
        star.style.setProperty('--star-x', `${moveX}px`);
        star.style.setProperty('--star-y', `${moveY}px`);
        
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.opacity = Math.random() * 0.5 + 0.1;
        
        if (Math.random() > 0.8) {
            star.style.width = '3px';
            star.style.height = '3px';
        }
        
        star.style.animationDuration = `
            ${3 + Math.random() * 2}s,
            ${10 + Math.random() * 10}s
        `;
        
        backgroundEffects.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    createStars();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});