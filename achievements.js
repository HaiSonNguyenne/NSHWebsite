// Achievements Data
const certificatesData = {
    1: {
        title: "International Mathematics Olympiad",
        award: "🥇 Gold Medal",
        image: "cert1.jpg",
        description: "Achieved outstanding performance in the International Mathematics Olympiad, demonstrating exceptional problem-solving skills and mathematical reasoning.",
        date: "July 2023",
        organization: "International Mathematical Olympiad Committee",
        location: "Tokyo, Japan"
    },
    2: {
        title: "National Physics Competition",
        award: "🥈 Silver Medal",
        image: "cert2.jpg",
        description: "Demonstrated excellent understanding of advanced physics concepts and practical applications in the national-level competition.",
        date: "March 2023",
        organization: "National Physics Society",
        location: "New York, USA"
    },
    3: {
        title: "Computer Science Championship",
        award: "🥉 Bronze Medal",
        image: "cert3.jpg",
        description: "Showcased strong programming skills and algorithmic thinking in solving complex computational problems.",
        date: "November 2022",
        organization: "ACM International",
        location: "San Francisco, USA"
    },
    4: {
        title: "Chemistry Olympiad",
        award: "🏆 First Prize",
        image: "cert4.jpg",
        description: "Excelled in theoretical and practical chemistry challenges, demonstrating deep understanding of chemical principles.",
        date: "September 2023",
        organization: "International Chemistry Education Association",
        location: "Berlin, Germany"
    },
    5: {
        title: "Robotics Competition",
        award: "🏆 Second Prize",
        image: "cert5.jpg",
        description: "Led team to design and build an innovative robotic solution for real-world automation challenges.",
        date: "May 2023",
        organization: "World Robotics Federation",
        location: "Seoul, South Korea"
    },
    6: {
        title: "Science Fair",
        award: "⭐ Special Recognition",
        image: "cert6.jpg",
        description: "Presented groundbreaking research on sustainable energy solutions, receiving special recognition from the jury.",
        date: "February 2023",
        organization: "International Science Fair Committee",
        location: "London, UK"
    }
};

// Initialize achievements functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAchievements();
});

function initializeAchievements() {
    // Handle certificate card clicks
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on the more info button
            if (!e.target.classList.contains('more-info-btn')) {
                const certId = this.dataset.certId;
                openCertificateModal(certId);
            }
        });
    });

    // Handle more info button clicks
    const moreInfoButtons = document.querySelectorAll('.more-info-btn');
    moreInfoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const certId = this.dataset.certId;
            openCertificateModal(certId);
        });
    });

    // Handle modal close
    const closeModalBtn = document.querySelector('.close-modal');
    const modal = document.getElementById('certModal');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeCertificateModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCertificateModal();
            }
        });
    }

    // Handle ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCertificateModal();
        }
    });

    // Lazy loading for certificate images
    lazyLoadCertificates();

    // Add animation on scroll
    animateOnScroll();
}

// Open certificate modal
function openCertificateModal(certId) {
    const modal = document.getElementById('certModal');
    const certData = certificatesData[certId];
    
    if (!modal || !certData) return;

    // Update modal content
    modal.querySelector('.modal-cert-image').src = certData.image;
    modal.querySelector('.modal-title').textContent = certData.title;
    modal.querySelector('.modal-award').textContent = certData.award;
    modal.querySelector('.modal-description').textContent = certData.description;
    
    // Update details
    const details = modal.querySelectorAll('.detail-value');
    details[0].textContent = certData.date;
    details[1].textContent = certData.organization;
    details[2].textContent = certData.location;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close certificate modal
function closeCertificateModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Lazy loading for certificate images
function lazyLoadCertificates() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('cert-loading');
                observer.unobserve(img);
            }
        });
    });

    const certImages = document.querySelectorAll('.cert-image');
    certImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Animate certificates on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(card);
    });
}

// Filter certificates by category (optional feature)
function filterCertificates(category) {
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Add zoom functionality for images
function enableImageZoom() {
    const certImages = document.querySelectorAll('.cert-image');
    
    certImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.cursor = 'zoom-in';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAchievements);
} else {
    initializeAchievements();
}