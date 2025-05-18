document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Service area items
    const portfolioItems = [
        {
            id: 1,
            category: 'seattle',
            image: 'images/portfolio/project1.png',
            title: 'Seattle',
            description: 'Downtown, Capitol Hill, Queen Anne, Ballard, Fremont, University District'
        },
        {
            id: 2,
            category: 'north',
            image: 'images/portfolio/project2.png',
            title: 'North King County',
            description: 'Shoreline, Lake Forest Park, Kenmore, Bothell, Woodinville, Kirkland'
        },
        {
            id: 3,
            category: 'south',
            image: 'images/portfolio/project3.png',
            title: 'South King County',
            description: 'Renton, Kent, Auburn, Federal Way, SeaTac, Tukwila'
        },
        {
            id: 4,
            category: 'seattle',
            image: 'images/portfolio/project4.png',
            title: 'West Seattle',
            description: 'West Seattle, White Center, Burien, Normandy Park'
        },
        {
            id: 5,
            category: 'north',
            image: 'images/portfolio/project5.png',
            title: 'Eastside',
            description: 'Bellevue, Redmond, Issaquah, Sammamish, Newcastle'
        },
        {
            id: 6,
            category: 'seattle',
            image: 'images/portfolio/project6.png',
            title: 'Central Seattle',
            description: 'Madison Valley, Madrona, Leschi, Mount Baker, Columbia City'
        }
    ];
    
    // Populate portfolio grid
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    function renderPortfolioItems(items) {
        portfolioGrid.innerHTML = '';
        
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" onerror="this.src='images/portfolio-placeholder.svg'">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Initial render
    renderPortfolioItems(portfolioItems);
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            if (filter === 'all') {
                renderPortfolioItems(portfolioItems);
            } else {
                const filteredItems = portfolioItems.filter(item => item.category === filter);
                renderPortfolioItems(filteredItems);
            }
        });
    });
    
    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlider && testimonialSlides.length > 0) {
        let currentSlide = 0;
        
        // Create dots
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Show slide
        function showSlide(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Initialize first slide
        showSlide(0);
        
        // Go to specific slide
        function goToSlide(index) {
            currentSlide = index;
            showSlide(currentSlide);
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        }
        
        // Event listeners for navigation
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto slide on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real scenario, you would send the form data to a server
            // For this static site, we'll show a success message
            
            const formData = new FormData(contactForm);
            const formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            // Display success message
            contactForm.innerHTML = `
                <div class="form-success">
                    <h3>Thank you for your message!</h3>
                    <p>We've received your inquiry and will get back to you as soon as possible.</p>
                    <p>For urgent matters, please call us at 206-532-6395.</p>
                </div>
            `;
            
            // Log form data (would be sent to server in production)
            console.log('Form submitted with values:', formValues);
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeElements = document.querySelectorAll('.service-card, .about-image, .about-text, h2');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated-text');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(elem => {
        fadeObserver.observe(elem);
    });
});