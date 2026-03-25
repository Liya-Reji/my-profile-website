document.addEventListener('DOMContentLoaded', () => {

    // Set Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Dynamic Greeting based on time of day
    const setGreeting = () => {
        const hour = new Date().getHours();
        const greetingElement = document.getElementById('dynamic-greeting');
        let greeting = 'Welcome to my portfolio';
        
        if (hour < 12) greeting = 'Good morning! Welcome to my profile';
        else if (hour < 18) greeting = 'Good afternoon! Welcome to my profile';
        else greeting = 'Good evening! Welcome to my profile';
        
        greetingElement.textContent = greeting;
    };
    setGreeting();

    // Intersection Observer for scroll animations (Slide up elements)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS transition
                entry.target.classList.add('visible');
                
                // If it's the skills section, animate the bars
                if(entry.target.classList.contains('skills-section')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        // Small timeout to ensure transition plays smoothly
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 100);
                    });
                }
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all slide-up elements
    document.querySelectorAll('.slide-up').forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
