// Create floating mathematical symbols and philosophy terms
const symbols = [
    '∫', '∂', '∇', 'Σ', 'π', '∞', '√', 'θ', 'λ', 'φ', 
    'Δ', 'α', 'β', 'γ', '∈', '∀', '∃', 'ℝ', 'ℂ', 'ℕ',
    '∏', '∪', '∩', '⊆', '⊇', '≈', '≠', '≤', '≥', '±'
];

const philosophyTerms = [
    'Cogito', 'Logos', 'Ethos', 'Pathos', 'Sophia', 'Episteme',
    'Nous', 'Telos', 'Arete', 'Eudaimonia'
];

// Initialize floating symbols
function createFloatingSymbols() {
    const container = document.getElementById('starsContainer');
    const allSymbols = [...symbols, ...philosophyTerms];
    
    for (let i = 0; i < 30; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'math-symbol';
        symbol.textContent = allSymbols[Math.floor(Math.random() * allSymbols.length)];
        symbol.style.left = Math.random() * 100 + '%';
        symbol.style.fontSize = (Math.random() * 20 + 15) + 'px';
        symbol.style.animationDuration = (Math.random() * 10 + 15) + 's';
        symbol.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(symbol);
    }
}

// Create 3D Sphere with mathematical symbols
function initSphere() {
    const canvas = document.getElementById('sphereCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 500;
    canvas.height = 500;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;
    
    const points = [];
    const numPoints = 200;
    
    // Create points on sphere
    for (let i = 0; i < numPoints; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(1 - 2 * Math.random());
        
        points.push({
            x: Math.sin(phi) * Math.cos(theta),
            y: Math.sin(phi) * Math.sin(theta),
            z: Math.cos(phi),
            symbol: symbols[Math.floor(Math.random() * symbols.length)]
        });
    }
    
    let rotation = 0;
    
    function drawSphere() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Sort points by z-index (back to front)
        const rotatedPoints = points.map(point => {
            const x = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
            const z = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
            const y = point.y;
            
            return {
                x: x * radius + centerX,
                y: y * radius + centerY,
                z: z,
                symbol: point.symbol,
                scale: (z + 1) / 2
            };
        }).sort((a, b) => a.z - b.z);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(74, 144, 226, 0.05)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < rotatedPoints.length; i++) {
            for (let j = i + 1; j < rotatedPoints.length; j++) {
                const p1 = rotatedPoints[i];
                const p2 = rotatedPoints[j];
                const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                
                if (distance < 50) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw points with symbols
        rotatedPoints.forEach(point => {
            const opacity = 0.3 + point.scale * 0.7;
            const size = 12 + point.scale * 8;
            
            ctx.font = `${size}px Poppins`;
            ctx.fillStyle = `rgba(74, 144, 226, ${opacity})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(point.symbol, point.x, point.y);
        });
        
        rotation += 0.005;
        requestAnimationFrame(drawSphere);
    }
    
    drawSphere();
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    createFloatingSymbols();
    initSphere();
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            navMenu.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Dynamic quote rotation
    const quotes = [
        { text: "Mathematics is the language with which God has written the universe", author: "Galileo Galilei" },
        { text: "To find yourself, think for yourself", author: "Socrates" },
        { text: "The hardest thing to learn in life is which bridge to cross and which to burn.", author: "Bertrand Russell" },
        { text: "I think, therefore I am", author: "René Descartes" },
        { text: "To be is to be perceived", author: "George Berkeley" },
        { text: "Mathematics is the music of reason", author: "James Joseph Sylvester" }
    ];
    
    let currentQuote = 0;
    const quoteElement = document.querySelector('.quote');
    const authorElement = document.querySelector('.author');
    
    function changeQuote() {
        if (quoteElement && authorElement) {
            currentQuote = (currentQuote + 1) % quotes.length;
            
            quoteElement.style.opacity = '0';
            authorElement.style.opacity = '0';
            
            setTimeout(() => {
                quoteElement.textContent = `"${quotes[currentQuote].text}"`;
                authorElement.textContent = `- ${quotes[currentQuote].author}`;
                quoteElement.style.opacity = '1';
                authorElement.style.opacity = '1';
            }, 500);
        }
    }
    
    setInterval(changeQuote, 5000);
    
    // Parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const avatar = document.querySelector('.avatar');
        if (avatar) {
            avatar.style.transform = `translateY(${-10 + mouseY * 5}px) translateX(${mouseX * 5}px)`;
        }
    });
    
    // Typing effect for name
    const nameElement = document.querySelector('.highlight');
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < text.length) {
                nameElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.sphere-wrapper');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});

// Add interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    const interestItems = document.querySelectorAll('.interest-item');
    
    interestItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});