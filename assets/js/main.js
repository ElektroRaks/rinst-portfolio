/* ========================================
   PORTFOLIO MAIN JAVASCRIPT
   ======================================== */

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== Typewriter Effect =====
function typewriter(element, text, speed = 100) {
    if (!element) return;
    element.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    const originalText = typewriterElement.textContent;
    typewriter(typewriterElement, originalText, 50);
}

// ===== Header Scroll Effects =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== Smooth Navigation Active Link =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    navLinks.forEach(link => link.classList.remove('active'));

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);

// ===== Intersection Observer for Fade-in Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ===== Animate Skill Bars on Scroll =====
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => barObserver.observe(bar));
};

document.addEventListener('DOMContentLoaded', animateSkillBars);

// ===== Project Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter cards
            projectCards.forEach(card => {
                const tags = card.getAttribute('data-tags');
                
                if (filter === 'all' || tags.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate form
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-msg').forEach(msg => {
            msg.classList.remove('show');
        });

        document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
            field.classList.remove('error');
        });

        // Validate fields
        if (!data.name.trim()) {
            showError('name', 'Name is required');
            isValid = false;
        }

        if (!validateEmail(data.email)) {
            showError('email', 'Invalid email address');
            isValid = false;
        }

        if (!data.message.trim()) {
            showError('message', 'Message is required');
            isValid = false;
        }

        if (!isValid) {
            showToast('Please fix the errors above', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 1500);
    });
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorMsg = field.nextElementSibling;
    
    field.classList.add('error');
    if (errorMsg && errorMsg.classList.contains('error-msg')) {
        errorMsg.textContent = message;
        errorMsg.classList.add('show');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showToast(message, type = 'success') {
    if (toast) {
        toast.textContent = message;
        toast.classList.remove('error');
        if (type === 'error') {
            toast.classList.add('error');
        }
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLightTheme = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    });
}

// ===== Plugin Initialization and Dynamic Data Loading =====
// Plugin is loaded in portfolio.html with <script src="assets/plugins/plugin.js" defer></script>
// Initialize after DOM load
document.addEventListener('DOMContentLoaded', async () => {
    // Load all dynamic content
    await Promise.all([
        loadSkills(),
        loadTools(),
        loadProjects(),
        loadCapstoneProjects()
    ]);

    // Animate skill bars after loading
    animateSkillBars();

    // Initialize plugin
    if (typeof window.PortfolioPlugin !== 'undefined' && window.PortfolioPlugin.init) {
        window.PortfolioPlugin.init({
            selector: '.project-grid',
            animationSpeed: 300,
            debug: false
        });
    }
});

// ===== Performance: Lazy Load Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== Keyboard Navigation Accessibility =====
document.addEventListener('keydown', (e) => {
    // Skip navigation with keyboard
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Dynamic Data Loading =====
// Fetch JSON files and populate sections

async function loadJSON(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading JSON from ${filePath}:`, error);
        return null;
    }
}

// Load and render skills
async function loadSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    if (!skillsContainer) return;

    const skills = await loadJSON('my-skill-tech.json');
    if (!skills) {
        skillsContainer.innerHTML = '<p style="color: var(--text-secondary);">Unable to load skills</p>';
        return;
    }

    const skillPercentages = {
        'HTML': 95,
        'CSS': 90,
        'JavaScript': 92,
        'Bootstrap': 85,
        'jQuery': 80,
        'PHP': 88,
        'MySQL': 85,
        'CodeIgniter 3 & 4': 82,
        'WordPress': 85,
        'Elementor': 90
    };

    skillsContainer.innerHTML = skills.map(skill => {
        const percentage = skillPercentages[skill.name] || 80;
        return `
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percent">${percentage}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${percentage}%;"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Load and render tools
async function loadTools() {
    const toolsContainer = document.getElementById('toolsContainer');
    if (!toolsContainer) return;

    const tools = await loadJSON('my-tools-used.json');
    if (!tools) {
        toolsContainer.innerHTML = '<p style="color: var(--text-secondary);">Unable to load tools</p>';
        return;
    }

    toolsContainer.innerHTML = tools.map(tool => `
        <div class="tool-card">
            <h4 class="tool-name">${tool.name}</h4>
            <p class="tool-description">${tool.description}</p>
        </div>
    `).join('');

    // Add tools-grid styling if needed
    toolsContainer.style.display = 'grid';
    toolsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    toolsContainer.style.gap = '2rem';
}

// Load and render projects from projects.json
async function loadProjects() {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;

    const projects = await loadJSON('projects.json');
    if (!projects) {
        projectGrid.innerHTML = '<p style="color: var(--text-secondary);">Unable to load projects</p>';
        return;
    }

    projectGrid.innerHTML = projects.map(project => {
        const imagePath = project.image || 'assets/img/placeholder.svg';
        const url = project.project_url && project.project_url !== '#' ? project.project_url : '#';
        const tagList = project.tags ? project.tags.slice(0, 3).join(', ') : 'Web Development';
        
        return `
            <div class="project-card">
                <div class="project-image">
                    <img src="${imagePath}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        ${url !== '#' ? `<a href="${url}" target="_blank" class="project-btn">
                            <i data-lucide="external-link" width="16" height="16"></i>
                            View
                        </a>` : ''}
                        <a href="#" class="project-btn">
                            <i data-lucide="github" width="16" height="16"></i>
                            Details
                        </a>
                    </div>
                </div>
                <div class="project-content">
                    <span class="project-badge">${project.Badge}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Reinitialize Lucide icons for new content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Load and render capstone/personal projects
async function loadCapstoneProjects() {
    const capstoneGrid = document.getElementById('capstoneGrid');
    if (!capstoneGrid) return;

    const capstoneProjects = await loadJSON('own-project.json');
    if (!capstoneProjects) {
        capstoneGrid.innerHTML = '<p style="color: var(--text-secondary);">Unable to load capstone projects</p>';
        return;
    }

    capstoneGrid.innerHTML = capstoneProjects.map(project => {
        const imagePath = project.image ? `assets/img/${project.image}` : 'assets/img/placeholder.svg';
        const projectUrl = project.link || '#';
        
        return `
            <div class="project-card">
                <div class="project-content">
                    <span class="project-badge">${project.badge}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.technologies.split(',').slice(0, 3).map(tech => `<span class="tag">${tech.trim()}</span>`).join('')}
                    </div>
                    <div style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
                        <strong>Features:</strong>
                        <p style="margin-top: 0.5rem;">${project.features}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Reinitialize Lucide icons for new content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

