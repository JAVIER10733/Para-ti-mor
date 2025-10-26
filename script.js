const CONFIG = {
    particleCount: 30,
    minSize: 6,
    maxSize: 15,
    maxDelay: 12
};

function initBackgroundAnimation() {
    const bg = document.getElementById('bgAnimation');
    
    if (!bg) return;
    
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < CONFIG.particleCount; i++) {
        const particle = createParticle(i);
        fragment.appendChild(particle);
    }
    
    bg.appendChild(fragment);
}

function createParticle(index) {
    const span = document.createElement('span');
    const size = getRandomSize();
    const delay = getRandomDelay();
    const position = getRandomPosition();
    
    span.style.cssText = `
        left: ${position}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
    `;
    
    span.setAttribute('data-particle', index);
    
    return span;
}

function getRandomSize() {
    return Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;
}

function getRandomDelay() {
    return Math.random() * CONFIG.maxDelay;
}

function getRandomPosition() {
    return Math.random() * 100;
}

function showSurprise() {
    const mainCard = document.getElementById('mainCard');
    const surpriseCard = document.getElementById('surpriseCard');
    
    if (!mainCard || !surpriseCard) {
        console.error('Elementos de tarjeta no encontrados');
        return;
    }
    
    transitionCards(mainCard, surpriseCard);
}

function transitionCards(hideElement, showElement) {
    hideElement.style.opacity = '0';
    hideElement.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        hideElement.classList.add('hidden');
        showElement.classList.remove('hidden');
        
        requestAnimationFrame(() => {
            showElement.style.opacity = '1';
            showElement.style.transform = 'scale(1)';
        });
    }, 300);
}

function resetView() {
    const mainCard = document.getElementById('mainCard');
    const surpriseCard = document.getElementById('surpriseCard');
    
    if (!mainCard || !surpriseCard) return;
    
    transitionCards(surpriseCard, mainCard);
}

function setupEventListeners() {
    const showBtn = document.getElementById('showBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (showBtn) {
        showBtn.addEventListener('click', showSurprise);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetView);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initBackgroundAnimation();
    setupEventListeners();
});

window.addEventListener('beforeunload', () => {
    const bg = document.getElementById('bgAnimation');
    if (bg) bg.innerHTML = '';
});