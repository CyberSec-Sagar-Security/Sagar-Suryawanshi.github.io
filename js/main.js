/**
 * ==========================================
 * SAGAR B. SURYAWANSHI - CYBERSECURITY PORTFOLIO
 * Main JavaScript File
 * ==========================================
 */

// ==================== RESUME DOWNLOAD FUNCTION ====================

/**
 * Download Resume from Base64 encoded data
 */
function downloadResume() {
    if (typeof resumeBase64 === 'undefined') {
        alert('Resume is currently unavailable. Please contact me directly.');
        return;
    }
    
    // Convert Base64 to Blob
    const byteCharacters = atob(resumeBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sagar_Suryawanshi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ==================== DATA OBJECTS ====================

/**
 * Skills Data - Categorized technical skills
 */
const skillsData = [
    {
        category: "SOC & Blue Team",
        icon: "bi-shield-shaded",
        skills: ["SIEM Operations", "Incident Response", "Malware Analysis", "Digital Forensics", "IAM", "Threat Intelligence", "Log Analysis"]
    },
    {
        category: "Tools & Operating Systems",
        icon: "bi-tools",
        skills: ["Linux", "Windows", "Kali Linux", "PowerShell", "Nmap", "Wireshark", "Metasploit", "Burp Suite", "ZAP"]
    },
    {
        category: "Programming & Scripting",
        icon: "bi-code-slash",
        skills: ["Python", "PowerShell", "JavaScript", "Bash", "SQL", "HTML"]
    },
    {
        category: "Cloud & Security Concepts",
        icon: "bi-cloud-check",
        skills: ["AWS", "Azure", "Cloud Security", "MITRE ATT&CK", "Zero Trust", "Network Security"]
    }
];

/**
 * Certifications Data
 */
const certificationsData = [
    {
        name: "CompTIA Security+",
        code: "SY0-701",
        issuer: "CompTIA",
        date: "October 2025",
        icon: "bi-patch-check-fill",
        badgeImage: "https://images.credly.com/size/340x340/images/74790a75-8451-400a-8571-eb76c8f1ae7c/image.png",
        isNew: true,
        link: "https://www.credly.com/earner/earned/badge/61395869-3172-4bd4-8838-37af231abf1f"
    },
    {
        name: "Google Cybersecurity Specialization",
        code: "",
        issuer: "Coursera",
        date: "September 2025",
        icon: "bi-google",
        badgeImage: "https://images.credly.com/size/340x340/images/0bf0f2da-a699-4c82-82e2-56dcf1f2e1c7/image.png",
        isNew: false,
        link: "https://www.coursera.org/account/accomplishments/specialization/BBI4LDE7CDW9"
    },
    {
        name: "Security Operations Center (SOC)",
        code: "",
        issuer: "Cisco",
        date: "June 2025",
        icon: "bi-hdd-network",
        badgeImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png",
        isNew: false,
        link: "https://www.coursera.org/account/accomplishments/verify/WEK4QU74UZ9W"
    },
    {
        name: "Security Operation Center",
        code: "",
        issuer: "LetsDefend",
        date: "December 2025",
        icon: "bi-mortarboard-fill",
        badgeImage: "https://app.letsdefend.io/static/media/logo.5f6d1e0a.svg",
        isNew: true,
        link: "https://app.letsdefend.io/certificate/show/b172f6f9-4aa4-4c3f-a2d2-d482345f2731"
    }
];

/**
 * Projects Data - Featured security projects
 */
const projectsData = [
    {
        title: "PasswordCrack Suite",
        subtitle: "GPU-Accelerated Security Tool",
        description: "Educational password security research tool with modern GUI, GPU acceleration (353M H/s), dictionary & brute-force attacks, hash auto-detection, and comprehensive reporting. Supports MD5, SHA-1, SHA-256, SHA-512 with real-time progress tracking.",
        techStack: ["Python", "Hashcat", "CUDA", "FreeSimpleGUI", "GPU Computing"],
        securityFocus: "Password security research, Cryptography, Hash cracking",
        icon: "bi-key-fill",
        github: "https://github.com/CyberSec-Sagar-Security/PasswordCrack-Suite"
    },
    {
        title: "CryptoVaultX",
        subtitle: "Capstone Project",
        description: "A secure file storage and sharing application implementing client-side AES-256 encryption. Features role-based access control (RBAC), secure API endpoints, and comprehensive audit logging for enterprise-grade security.",
        techStack: ["Python", "Flask", "AES-256", "REST API", "PostgreSQL"],
        securityFocus: "Client-side encryption, RBAC, Secure APIs",
        icon: "bi-safe",
        github: "https://github.com/CyberSec-Sagar-Security/CryptoVaultX"
    },
    {
        title: "Net Trace",
        subtitle: "Network Security Tool",
        description: "A comprehensive network security and port scanning tool designed for security professionals. Provides detailed network reconnaissance, service detection, and vulnerability identification capabilities.",
        techStack: ["Python", "Flask", "Nmap", "Socket", "Threading"],
        securityFocus: "Network reconnaissance, Port scanning, Service detection",
        icon: "bi-diagram-3",
        github: "https://github.com/CyberSec-Sagar-Security/NETTRACE"
    },
    {
        title: "Keystroke Logger",
        subtitle: "Educational Security Research",
        description: "An educational project studying API hooks and credential logging behavior for security research purposes. Demonstrates how keyloggers capture sensitive data to better understand defensive strategies.",
        techStack: ["Python", "Win32 API", "pynput", "Threading"],
        securityFocus: "API hooking analysis, Credential theft research",
        icon: "bi-keyboard",
        github: "https://github.com/CyberSec-Sagar-Security/KeyStroke-Monitor"
    },
    {
        title: "Anti-Keylogger",
        subtitle: "Host-Based Detection Tool",
        description: "A defensive security tool for host-based detection of credential theft attempts. Uses behavior analysis and heuristic techniques to identify and neutralize keylogging threats in real-time.",
        techStack: ["Python", "Process Monitoring", "Heuristics", "Windows API"],
        securityFocus: "Behavior analysis, Credential theft prevention",
        icon: "bi-shield-lock",
        github: "https://github.com/CyberSec-Sagar-Security/Anti-Keylogger"
    },
    {
        title: "SOC Home Lab",
        subtitle: "Security Operations Center",
        description: "A comprehensive home lab environment simulating real-world SOC operations. Includes attack simulations, phishing campaigns, and incident response exercises using industry-standard tools.",
        techStack: ["Kali Linux", "Ubuntu", "Windows", "Wireshark", "Nmap"],
        securityFocus: "Threat simulation, Incident response, OSINT",
        icon: "bi-pc-display-horizontal",
        github: null
    }
];

/**
 * Experience Data - Virtual Internships
 */
const experienceData = [
    {
        title: "Cybersecurity Job Simulation",
        company: "Mastercard",
        platform: "Forage",
        description: "Completed security threat identification and analysis exercises. Developed risk assessment documentation and learned enterprise security frameworks.",
        icon: "bi-credit-card"
    },
    {
        title: "Cybersecurity Job Simulation",
        company: "PwC Switzerland",
        platform: "Forage",
        description: "Participated in cybersecurity consulting simulations including risk assessments, security audits, and developing security recommendations for clients.",
        icon: "bi-building"
    },
    {
        title: "Cybersecurity Job Simulation",
        company: "Tata Group",
        platform: "Forage",
        description: "Engaged in IAM (Identity Access Management) exercises and security awareness training development for enterprise environments.",
        icon: "bi-globe2"
    }
];

/**
 * Education Data
 */
const educationData = [
    {
        degree: "B.Sc. Information Technology",
        institution: "KES Shroff College",
        score: "CGPA: 7.5/10",
        icon: "bi-mortarboard-fill",
        level: "Bachelor's Degree"
    },
    {
        degree: "Higher Secondary Certificate (HSC)",
        institution: "Maharashtra State Board",
        score: "74.50%",
        icon: "bi-journal-bookmark-fill",
        level: "12th Grade"
    },
    {
        degree: "Secondary School Certificate (SSC)",
        institution: "Maharashtra State Board",
        score: "79.80%",
        icon: "bi-book-fill",
        level: "10th Grade"
    }
];

/**
 * Achievements Data
 */
const achievementsData = [
    {
        title: "International Research Paper",
        description: "Published research paper on cyber resilience and modern threat landscape",
        badge: "ISBN Certified",
        icon: "bi-journal-richtext"
    },
    {
        title: "Photography Competition",
        description: "Secured 2nd place in college photography competition",
        badge: "Runner-up",
        icon: "bi-camera-fill"
    }
];

// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initNavbarScroll();
    initSmoothScroll();
    initBackToTop();
    initScrollReveal();
    
    // Render dynamic content
    renderSkills();
    renderCertifications();
    renderProjects();
    renderExperience();
    renderEducation();
    renderAchievements();
});

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'light') {
        icon.className = 'bi bi-sun-fill';
    } else {
        icon.className = 'bi bi-moon-fill';
    }
}

// ==================== NAVBAR SCROLL EFFECT ====================
function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Add scrolled class on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Highlight active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== SCROLL REVEAL ANIMATION ====================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.skill-card, .cert-card, .project-card, .timeline-item, .education-card, .achievement-card, .contact-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// ==================== RENDER SKILLS ====================
function renderSkills() {
    const container = document.getElementById('skillsContainer');
    
    skillsData.forEach((category, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'col-lg-6';
        skillCard.innerHTML = `
            <div class="skill-card" style="animation-delay: ${index * 0.1}s">
                <div class="skill-card-header">
                    <div class="skill-icon">
                        <i class="bi ${category.icon}"></i>
                    </div>
                    <h3>${category.category}</h3>
                </div>
                <div class="skill-tags">
                    ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(skillCard);
    });
}

// ==================== RENDER CERTIFICATIONS ====================
function renderCertifications() {
    const container = document.getElementById('certificationsContainer');
    
    certificationsData.forEach((cert, index) => {
        const certCard = document.createElement('div');
        certCard.className = 'col-lg-3 col-md-6';
        
        // Use badge image if available, otherwise fallback to icon
        const badgeContent = cert.badgeImage 
            ? `<img src="${cert.badgeImage}" alt="${cert.name}" class="cert-badge-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div class="cert-badge cert-badge-fallback" style="display:none;"><i class="bi ${cert.icon}"></i></div>`
            : `<div class="cert-badge"><i class="bi ${cert.icon}"></i></div>`;
        
        certCard.innerHTML = `
            <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-card-link">
                <div class="cert-card" style="animation-delay: ${index * 0.1}s">
                    ${cert.isNew ? '<div class="cert-new">New</div>' : ''}
                    <div class="cert-badge-container">
                        ${badgeContent}
                    </div>
                    <h3>${cert.name}${cert.code ? ` (${cert.code})` : ''}</h3>
                    <p class="cert-issuer">${cert.issuer}</p>
                    <p class="cert-date"><i class="bi bi-calendar3 me-1"></i>${cert.date}</p>
                    <span class="cert-verify"><i class="bi bi-box-arrow-up-right me-1"></i>Verify</span>
                </div>
            </a>
        `;
        container.appendChild(certCard);
    });
}

// ==================== RENDER PROJECTS ====================
function renderProjects() {
    const container = document.getElementById('projectsContainer');
    
    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-lg-4 col-md-6';
        
        const githubButton = project.github 
            ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-github-btn">
                   <i class="bi bi-github me-2"></i>View on GitHub
               </a>`
            : '';
        
        projectCard.innerHTML = `
            <div class="project-card" style="animation-delay: ${index * 0.1}s">
                <div class="project-header">
                    <div class="project-icon">
                        <i class="bi ${project.icon}"></i>
                    </div>
                    <div>
                        <h3>${project.title}</h3>
                        <small class="text-muted">${project.subtitle}</small>
                    </div>
                </div>
                <div class="project-body">
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        <h4>Tech Stack</h4>
                        <div class="tech-stack">
                            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="security-focus">
                        <i class="bi bi-shield-check"></i>
                        <span>${project.securityFocus}</span>
                    </div>
                    ${githubButton}
                </div>
            </div>
        `;
        container.appendChild(projectCard);
    });
}

// ==================== RENDER EXPERIENCE ====================
function renderExperience() {
    const container = document.getElementById('experienceContainer');
    
    experienceData.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-marker">
                <i class="bi ${exp.icon}"></i>
            </div>
            <div class="timeline-content" style="animation-delay: ${index * 0.1}s">
                <h3>${exp.title}</h3>
                <p class="timeline-company">${exp.company}</p>
                <span class="timeline-platform"><i class="bi bi-laptop me-1"></i>${exp.platform}</span>
                <p class="timeline-description">${exp.description}</p>
            </div>
        `;
        container.appendChild(timelineItem);
    });
}

// ==================== RENDER EDUCATION ====================
function renderEducation() {
    const container = document.getElementById('educationContainer');
    
    educationData.forEach((edu, index) => {
        const educationCard = document.createElement('div');
        educationCard.className = 'col-lg-4 col-md-6';
        educationCard.innerHTML = `
            <div class="education-card" style="animation-delay: ${index * 0.1}s">
                <div class="education-icon">
                    <i class="bi ${edu.icon}"></i>
                </div>
                <h3>${edu.degree}</h3>
                <p class="education-institution">${edu.institution}</p>
                <span class="education-score"><i class="bi bi-award me-1"></i>${edu.score}</span>
            </div>
        `;
        container.appendChild(educationCard);
    });
}

// ==================== RENDER ACHIEVEMENTS ====================
function renderAchievements() {
    const container = document.getElementById('achievementsContainer');
    
    achievementsData.forEach((achievement, index) => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'col-lg-4 col-md-6';
        achievementCard.innerHTML = `
            <div class="achievement-card" style="animation-delay: ${index * 0.1}s">
                <div class="achievement-icon">
                    <i class="bi ${achievement.icon}"></i>
                </div>
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <span class="achievement-badge"><i class="bi bi-star-fill me-1"></i>${achievement.badge}</span>
            </div>
        `;
        container.appendChild(achievementCard);
    });
}

// ==================== TYPING EFFECT (Optional Enhancement) ====================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const titles = [
        'Entry-Level Information Security & Cybersecurity',
        'Aspiring SOC Analyst',
        'Digital Forensics Enthusiast',
        'Blue Team Defender'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before typing new title
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Uncomment to enable typing effect
    // setTimeout(type, 1000);
}

// ==================== CONSOLE EASTER EGG ====================
console.log(`
%c╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   👋 Hello, curious developer!                        ║
║                                                       ║
║   🔐 Welcome to my cybersecurity portfolio            ║
║                                                       ║
║   💼 Looking for a dedicated SOC Analyst?             ║
║      Let's connect!                                   ║
║                                                       ║
║   📧 sagar.suryawanshi@outlook.in                     ║
║   🔗 linkedin.com/in/sagar--suryawanshi               ║
║   💻 github.com/CyberSec-Sagar-Security               ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`, 'color: #06b6d4; font-family: monospace; font-size: 12px;');
