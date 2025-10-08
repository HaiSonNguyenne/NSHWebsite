// Leadership & Activities Data
const activitiesData = {
    leadership: [
        {
            id: 1,
            title: "Co-Founder & Head of Mathematics Department",
            organization: "The ENTEN Project",
            date: "August 2024 - May 2025",
            description: "A project that helps students advance in Math, Literature, and English",
            achievements: [
                "Developed advanced documents for each topic, sample tests, and extra exercises",
                "Provided academic and motivational guidance through online posts and a workshop (with over 40 participants)",
                "Organized and managed 3 structured classes (more than 50 students) with comprehensive assessment system"
            ],
            image: "enten-project.jpg",
            fullImage: "enten-project-full.jpg",
            links: {
                fanpage: "https://www.facebook.com/enten.project",
                certificate: "https://drive.google.com/your-certificate-link"
            }
        },
        // Add more leadership data
    ],
    "summer-camp": [
        {
            id: 6,
            title: "Camp Participant",
            organization: "PiMA - Projects in Mathematics and Applications",
            date: "August 2025",
            description: "A summer camp for high school students focused on applied mathematics",
            achievements: [
                "Learned about AI and programming generative models",
                "Worked on group projects and presented research reports",
                "Collaborated with talented students from various schools"
            ],
            image: "pima-camp.jpg",
            fullImage: "pima-camp-full.jpg",
            links: {
                fanpage: "https://www.facebook.com/pima.camp",
                certificate: "https://drive.google.com/your-certificate-link"
            }
        },
        {
            id: 7,
            title: "Selected Participant",
            organization: "VIASM Math Summer Camp",
            date: "July 2025",
            description: "Vietnam Institute for Advanced Studies in Mathematics training camp",
            achievements: [
                "Selected as one of 40 students who excelled in the national olympiad",
                "Part of national key program for mathematics development 2021-2030",
                "Experienced college math beyond olympiad level",
                "Met with mathematics professionals and researchers"
            ],
            image: "viasm-camp.jpg",
            fullImage: "viasm-camp-full.jpg",
            links: {
                certificate: "https://drive.google.com/your-certificate-link"
            }
        }
    ],
    speaker: [
        {
            id: 8,
            title: "Guest Speaker",
            organization: "Hoang Hoa Tham Middle School",
            date: "March 2024",
            description: "Educational outreach and mentorship event",
            achievements: [
                "Shared math study experiences with over 1000 students",
                "Provided strategic advice about preparing for upcoming exams",
                "Shared personal journey and learning methodologies",
                "Hosted interactive minigames with book prizes"
            ],
            image: "speaker-event.jpg",
            fullImage: "speaker-event-full.jpg",
            links: {
                photos: "https://drive.google.com/your-photos-link"
            }
        }
    ]
};

// Initialize Leadership & Activities functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeLeadership();
});

function initializeLeadership() {
    // Initialize category tabs
    initializeCategoryTabs();
    
    // Initialize image modal
    initializeImageModal();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize activity cards interactions
    initializeActivityCards();
    
    // Track external links
    trackExternalLinks();
}

// Category Tabs Functionality
function initializeCategoryTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter activities
            const category = this.dataset.category;
            filterActivities(category);
            
            // Update URL hash
            window.location.hash = category;
        });
    });
    
    // Check URL hash on load
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetTab = document.querySelector(`.tab-btn[data-category="${hash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
}

// Filter activities by category
function filterActivities(category) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let visibleCount = 0;
    
    timelineItems.forEach((item, index) => {
        if (category === 'all' || item.dataset.category === category) {
            setTimeout(() => {
                item.classList.remove('hidden');
                item.style.animation = 'slideInLeft 0.6s ease';
                item.style.opacity = '1';
            }, visibleCount * 100);
            visibleCount++;
        } else {
            item.classList.add('hidden');
            item.style.opacity = '0';
        }
    });
    
    // Show message if no items found
    if (visibleCount === 0) {
        showNoResultsMessage(category);
    }
}

// Show no results message
function showNoResultsMessage(category) {
    const container = document.querySelector('.timeline-container');
    const message = document.createElement('div');
    message.className = 'no-results-message';
    message.innerHTML = `
        <p>No activities found in the "${category}" category.</p>
    `;
    container.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Image Modal Functionality
function initializeImageModal() {
    const activityImages = document.querySelectorAll('.activity-image');
    const imageModal = document.getElementById('imageModal');
    const modalFullImage = document.querySelector('.modal-full-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModalBtn = document.querySelector('.close-image-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Open modal on image click
    activityImages.forEach(imageContainer => {
        imageContainer.addEventListener('click', function() {
            const img = this.querySelector('.activity-img');
            const fullImageSrc = img.dataset.full || img.src;
            const activityTitle = this.closest('.activity-card').querySelector('.activity-title').textContent;
            const activityOrg = this.closest('.activity-card').querySelector('.activity-organization').textContent;
            
            modalFullImage.src = fullImageSrc;
            modalCaption.textContent = `${activityTitle} - ${activityOrg}`;
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeImageModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeImageModal);
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });
}

// Track External Links
function trackExternalLinks() {
    const externalLinks = document.querySelectorAll('.link-btn, .sub-link');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const linkUrl = this.href;
            
            // Track with analytics (if you have Google Analytics or similar)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'External Link',
                    'event_label': linkText,
                    'value': linkUrl
                });
            }
            
            console.log(`External link clicked: ${linkText} - ${linkUrl}`);
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Animate timeline marker
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.animation = 'pulse 1s ease';
                }
            }
        });
    }, observerOptions);
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
        animationObserver.observe(item);
    });
}

// Activity Cards Interactions
function initializeActivityCards() {
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Search functionality
function searchActivities(searchTerm) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const searchLower = searchTerm.toLowerCase();
    let foundCount = 0;
    
    timelineItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchLower)) {
            item.classList.remove('hidden');
            foundCount++;
        } else {
            item.classList.add('hidden');
        }
    });
    
    return foundCount;
}

// Export activities to CSV
function exportToCSV() {
    let csvContent = "Category,Title,Organization,Date,Description\n";
    
    Object.keys(activitiesData).forEach(category => {
        activitiesData[category].forEach(activity => {
            const row = [
                category,
                activity.title,
                activity.organization,
                activity.date,
                activity.description
            ].map(field => `"${field}"`).join(',');
            
            csvContent += row + "\n";
        });
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activities.csv';
    a.click();
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLeadership);
} else {
    initializeLeadership();
}