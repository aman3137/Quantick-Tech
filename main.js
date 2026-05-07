document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // Reveal on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));

    // Mouse Glow Tracking
    const mouseGlow = document.getElementById('mouse-glow');
    window.addEventListener('mousemove', (e) => {
        if (mouseGlow) {
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        }
    });

    // Hero Parallax Effect
    const hero = document.getElementById('hero');
    const meshBg = document.querySelector('.mesh-bg');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            if (meshBg) {
                meshBg.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }

    // Lightweight Particle System
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `particleFloat ${duration}s linear ${delay}s infinite`;
            particlesContainer.appendChild(particle);
        }
    }

    // Robo Assistant Roaming & Messaging
    const roboAssistant = document.getElementById('robo-assistant');
    const roboBubble = document.getElementById('robo-bubble');
    const roboMessages = [
        "Welcome to Quantick Tech! 🚀",
        "Need Marketing Automation? We've got you.",
        "We build scalable web solutions.",
        "Status: Innovating for your growth... 🍏",
        "Build once. Grow forever.",
        "Our automation saves you 20+ hours weekly!"
    ];
    let roboIndex = 0;

    function moveRoboRandomly() {
        if (!roboAssistant) return;
        
        const padding = 100;
        const maxX = window.innerWidth - padding;
        const maxY = window.innerHeight - padding;
        
        const randomX = Math.random() * (maxX - padding) + padding;
        const randomY = Math.random() * (maxY - padding) + padding;
        
        roboAssistant.style.left = `${randomX}px`;
        roboAssistant.style.top = `${randomY}px`;
        
        // Change message when moving
        if (roboBubble) {
            roboBubble.classList.remove('active');
            setTimeout(() => {
                roboBubble.textContent = roboMessages[roboIndex];
                roboBubble.classList.add('active');
                roboIndex = (roboIndex + 1) % roboMessages.length;
            }, 600);
        }
    }

    // Initial move and then every 6 seconds
    if (roboAssistant) {
        moveRoboRandomly();
        setInterval(moveRoboRandomly, 6500);
    }

    const terminalLines = [
        { type: 'command', text: '> Who is Quantick Tech?' },
        { type: 'text', text: '> We build systems...' },
        { type: 'success', text: '✔ Marketing Automation' },
        { type: 'success', text: '✔ Smart Websites' },
        { type: 'success', text: '✔ Scalable Solutions' },
        { type: 'command', text: '> Running growth engine...' },
        { type: 'success', text: '✔ Leads Generated' },
        { type: 'success', text: '✔ Systems Automated' },
        { type: 'success', text: '✔ Businesses Scaled' },
        { type: 'text', text: '> Status: Innovating Daily 🚀' }
    ];

    const terminalContainer = document.getElementById('terminal-content');
    let lineIndex = 0;
    let charIndex = 0;
    let isTyping = false;

    function typeLine() {
        if (lineIndex >= terminalLines.length) {
            setTimeout(() => {
                terminalContainer.innerHTML = '';
                lineIndex = 0;
                typeLine();
            }, 6000);
            return;
        }

        const line = terminalLines[lineIndex];
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        
        if (line.type === 'success') {
            lineDiv.style.color = '#27c93f'; // Green
        } else if (line.type === 'command') {
            lineDiv.style.color = '#FFA500'; // Orange
        }

        terminalContainer.appendChild(lineDiv);
        
        let currentText = '';
        const typingInterval = setInterval(() => {
            if (charIndex < line.text.length) {
                currentText += line.text[charIndex];
                lineDiv.innerHTML = currentText + '<span class="terminal-cursor"></span>';
                charIndex++;
            } else {
                clearInterval(typingInterval);
                lineDiv.innerHTML = line.text; 
                charIndex = 0;
                lineIndex++;
                setTimeout(typeLine, 600);
            }
        }, 40);
    }

    const terminalObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isTyping) {
            isTyping = true;
            typeLine();
        }
    }, { threshold: 0.5 });

    const terminalElement = document.querySelector('.terminal');
    if (terminalElement) terminalObserver.observe(terminalElement);

    // Contact Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Sending...';
            lucide.createIcons();

            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    contactForm.innerHTML = `
                        <div class="success-message reveal active" style="text-align: center; padding: 2rem;">
                            <i data-lucide="check-circle" style="color: var(--primary); width: 60px; height: 60px; margin-bottom: 1rem;"></i>
                            <h3>Message Received!</h3>
                            <p>Thank you for reaching out. We've sent a confirmation to ${formData.get('email')}.</p>
                            <p style="font-size: 0.8rem; color: #888; margin-top: 1rem; border-top: 1px solid #eee; pt-3;">
                                <strong>Important:</strong> If this is your first time using this form, please check your inbox (**quanticktech@zohomail.in**) and click the activation link to start receiving messages.
                            </p>
                        </div>
                    `;
                    lucide.createIcons();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                alert('Oops! There was a problem sending your message. Please try again or email us directly.');
            }
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});
