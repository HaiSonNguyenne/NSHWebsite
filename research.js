// Research & Internship Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initResearchSection();
});

function initResearchSection() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.research-tab');
    const panels = document.querySelectorAll('.research-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const tabType = this.getAttribute('data-tab');
            const targetPanel = document.getElementById(`${tabType}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Animate cards on tab switch
            animateCards(tabType);
        });
    });
    
    // Animate cards function
    function animateCards(type) {
        let cards;
        if (type === 'research') {
            cards = document.querySelectorAll('.research-card');
        } else {
            cards = document.querySelectorAll('.internship-card');
        }
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Add hover effect for research links
    const researchLinks = document.querySelectorAll('.research-link');
    researchLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('.link-arrow').style.transform = 'translate(3px, -3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.querySelector('.link-arrow').style.transform = 'translate(0, 0)';
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate keywords
                if (entry.target.classList.contains('research-card')) {
                    const keywords = entry.target.querySelectorAll('.keyword');
                    keywords.forEach((keyword, index) => {
                        setTimeout(() => {
                            keyword.style.animation = 'slideIn 0.3s ease forwards';
                        }, index * 50);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.research-card, .internship-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add ripple effect on button click
    document.querySelectorAll('.research-tab, .research-link, .certificate-link').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .research-card.visible,
    .internship-card.visible {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
