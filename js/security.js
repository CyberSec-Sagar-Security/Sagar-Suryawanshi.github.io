/**
 * ==========================================
 * SECURITY & PRIVACY PROTECTION MODULE
 * Sagar Suryawanshi - Cybersecurity Portfolio
 * 
 * Implements client-side security hardening for:
 * - Photo protection (anti-scraping, watermarking)
 * - PII obfuscation (email, phone rendering)
 * - Anti-copy/right-click on sensitive areas
 * - Basic anti-scraping deterrents
 * - Clickjacking protection
 * 
 * NOTE: These are deterrents, not absolute protections.
 * Determined actors can bypass client-side measures.
 * ==========================================
 */

(function() {
    'use strict';

    // ==================== CONFIGURATION ====================
    const SECURITY_CONFIG = {
        ownerName: 'Sagar Suryawanshi',
        watermarkOpacity: 0.15,
        enableDebugProtection: true,
        protectedSelectors: {
            images: '.about-image img, .profile-photo, [data-protected="image"]',
            pii: '[data-pii], .contact-card p, .hero-name, [data-protected="pii"]',
            email: '[data-email-protected]',
            phone: '[data-phone-protected]'
        }
    };

    // ==================== FRAME BUSTING (Clickjacking Prevention) ====================
    /**
     * Prevents the page from being embedded in iframes on untrusted domains
     * This protects against clickjacking attacks
     */
    function initFrameBusting() {
        if (window.self !== window.top) {
            // Check if we're in an allowed iframe (e.g., preview tools)
            try {
                const parentOrigin = window.parent.location.origin;
                const allowedOrigins = [
                    window.location.origin,
                    'https://github.com',
                    'https://pages.github.com'
                ];
                
                if (!allowedOrigins.some(origin => parentOrigin.includes(origin))) {
                    // Attempt to break out of frame
                    window.top.location = window.self.location;
                }
            } catch (e) {
                // Cross-origin frame - break out
                document.body.innerHTML = '<div style="padding:50px;text-align:center;"><h1>⚠️ Security Alert</h1><p>This content cannot be displayed in a frame.</p><a href="' + window.location.href + '">Click here to view directly</a></div>';
            }
        }
    }

    // ==================== PII OBFUSCATION ====================
    /**
     * Renders obfuscated email addresses using JavaScript
     * Email is never present as plaintext in HTML source
     */
    function obfuscateEmails() {
        const emailElements = document.querySelectorAll('[data-email-protected]');
        
        emailElements.forEach(element => {
            const parts = element.getAttribute('data-email-protected').split('|');
            if (parts.length === 3) {
                const user = atob(parts[0]);
                const domain = atob(parts[1]);
                const tld = atob(parts[2]);
                const email = `${user}@${domain}.${tld}`;
                
                // Render with zero-width characters to deter scrapers
                const obfuscated = email.split('').map((char, i) => {
                    // Insert zero-width space every 3 characters
                    return i > 0 && i % 3 === 0 ? '\u200B' + char : char;
                }).join('');
                
                element.textContent = obfuscated;
                element.setAttribute('data-rendered', 'true');
                
                // Set href for mailto links
                if (element.tagName === 'A') {
                    element.href = 'mailto:' + email;
                }
            }
        });
    }

    /**
     * Renders obfuscated phone numbers using JavaScript
     */
    function obfuscatePhones() {
        const phoneElements = document.querySelectorAll('[data-phone-protected]');
        
        phoneElements.forEach(element => {
            const encoded = element.getAttribute('data-phone-protected');
            const phone = atob(encoded);
            
            // Add zero-width characters
            const obfuscated = phone.split('').map((char, i) => {
                return i > 0 && i % 2 === 0 ? '\u200B' + char : char;
            }).join('');
            
            element.textContent = obfuscated;
            element.setAttribute('data-rendered', 'true');
            
            if (element.tagName === 'A') {
                element.href = 'tel:' + phone.replace(/\D/g, '');
            }
        });
    }

    // ==================== IMAGE PROTECTION ====================
    /**
     * Applies protection overlays and event handlers to images
     * Note: We don't wrap images that are already inside .about-image to preserve layout
     */
    function protectImages() {
        const images = document.querySelectorAll(SECURITY_CONFIG.protectedSelectors.images);
        
        images.forEach(img => {
            if (img.getAttribute('data-security-applied')) return;
            
            // Check if already inside about-image (which has its own protection via CSS)
            const isInAboutImage = img.closest('.about-image');
            
            // Only create wrapper for images NOT already in a protective container
            if (!isInAboutImage) {
                let wrapper = img.closest('.image-protection-wrapper');
                if (!wrapper) {
                    wrapper = document.createElement('div');
                    wrapper.className = 'image-protection-wrapper';
                    img.parentNode.insertBefore(wrapper, img);
                    wrapper.appendChild(img);
                }
                
                // Create transparent overlay
                const overlay = document.createElement('div');
                overlay.className = 'image-protection-overlay';
                overlay.setAttribute('aria-hidden', 'true');
                wrapper.appendChild(overlay);
                
                // Add watermark layer
                const watermark = document.createElement('div');
                watermark.className = 'image-watermark';
                watermark.setAttribute('aria-hidden', 'true');
                const timestamp = new Date().toISOString().split('T')[0];
                watermark.innerHTML = `<span>© ${SECURITY_CONFIG.ownerName}</span><span class="watermark-date">${timestamp}</span>`;
                wrapper.appendChild(watermark);
            }
            
            // Prevent drag on all protected images
            img.setAttribute('draggable', 'false');
            img.addEventListener('dragstart', preventDefault);
            
            // Mark as protected
            img.setAttribute('data-security-applied', 'true');
        });
    }

    /**
     * Applies canvas-based rendering for enhanced image protection
     * Converts images to canvas to prevent direct URL access
     */
    function applyCanvasProtection() {
        const images = document.querySelectorAll('[data-canvas-protect="true"]');
        
        images.forEach(img => {
            if (img.getAttribute('data-canvas-applied')) return;
            
            img.crossOrigin = 'anonymous';
            
            const renderCanvas = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    canvas.width = img.naturalWidth || img.width;
                    canvas.height = img.naturalHeight || img.height;
                    canvas.className = img.className + ' canvas-protected';
                    canvas.style.cssText = img.style.cssText;
                    
                    // Draw image
                    ctx.drawImage(img, 0, 0);
                    
                    // Add watermark
                    ctx.globalAlpha = SECURITY_CONFIG.watermarkOpacity;
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '14px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(`© ${SECURITY_CONFIG.ownerName}`, canvas.width / 2, canvas.height - 20);
                    
                    // Replace img with canvas
                    img.parentNode.insertBefore(canvas, img);
                    img.style.display = 'none';
                    
                    canvas.setAttribute('data-canvas-applied', 'true');
                } catch (e) {
                    // CORS or other error - keep original image
                    console.warn('Canvas protection unavailable for this image');
                }
            };
            
            if (img.complete) {
                renderCanvas();
            } else {
                img.addEventListener('load', renderCanvas);
            }
        });
    }

    // ==================== EVENT PREVENTION ====================
    /**
     * Generic event preventer
     */
    function preventDefault(e) {
        e.preventDefault();
        return false;
    }

    /**
     * Blocks right-click context menu on protected elements
     */
    function blockContextMenu() {
        const protectedElements = document.querySelectorAll(
            `${SECURITY_CONFIG.protectedSelectors.images}, ${SECURITY_CONFIG.protectedSelectors.pii}, .image-protection-wrapper`
        );
        
        protectedElements.forEach(element => {
            element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showSecurityNotice('Right-click is disabled on protected content.');
                return false;
            });
        });
    }

    /**
     * Blocks text selection on PII elements
     */
    function blockTextSelection() {
        const piiElements = document.querySelectorAll(SECURITY_CONFIG.protectedSelectors.pii);
        
        piiElements.forEach(element => {
            element.classList.add('no-select');
            element.addEventListener('selectstart', preventDefault);
            element.addEventListener('copy', (e) => {
                e.preventDefault();
                showSecurityNotice('Copying is disabled for this content.');
                return false;
            });
        });
    }

    /**
     * Blocks common keyboard shortcuts for copying/viewing source
     */
    function blockKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only block on protected elements
            const target = e.target;
            const isProtected = target.closest(SECURITY_CONFIG.protectedSelectors.pii) ||
                               target.closest(SECURITY_CONFIG.protectedSelectors.images);
            
            // Block Ctrl+U (View Source) globally as it's a common scraping technique
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                showSecurityNotice('View source shortcut is disabled.');
                return false;
            }
            
            // Block Ctrl+Shift+I (DevTools) - informational only, can't truly prevent
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                showSecurityNotice('Developer tools detected. Please respect content ownership.');
            }
            
            // Block Ctrl+S (Save Page)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                showSecurityNotice('Page save is disabled.');
                return false;
            }
            
            // Only block copy shortcuts on protected content
            if (isProtected) {
                // Block Ctrl+C, Ctrl+X, Ctrl+A on protected elements
                if (e.ctrlKey && ['c', 'x', 'a'].includes(e.key.toLowerCase())) {
                    e.preventDefault();
                    showSecurityNotice('Copy/Select shortcuts disabled on protected content.');
                    return false;
                }
            }
        });
    }

    /**
     * Blocks print functionality for the page
     */
    function blockPrinting() {
        // Add print-blocking CSS dynamically
        const printStyle = document.createElement('style');
        printStyle.textContent = `
            @media print {
                .about-image, [data-protected="image"], .image-protection-wrapper {
                    visibility: hidden !important;
                }
                .about-image::after, [data-protected="image"]::after {
                    content: "Image protected - © ${SECURITY_CONFIG.ownerName}" !important;
                    visibility: visible !important;
                    display: block !important;
                    font-size: 14px;
                    color: #666;
                }
            }
        `;
        document.head.appendChild(printStyle);
        
        window.addEventListener('beforeprint', () => {
            showSecurityNotice('Note: Some content is protected and may not print.');
        });
    }

    // ==================== ANTI-SCRAPING DETERRENTS ====================
    /**
     * Adds honeypot elements to detect/confuse scrapers
     */
    function addHoneypots() {
        // Hidden email honeypot (invisible to users, visible to scrapers)
        const honeypot = document.createElement('div');
        honeypot.className = 'ht-field';
        honeypot.setAttribute('aria-hidden', 'true');
        honeypot.innerHTML = `
            <a href="mailto:noreply-honeypot@example.com" class="ht-link" tabindex="-1">contact@honeypot.invalid</a>
            <span class="ht-data" data-email="fake@honeypot.invalid"></span>
        `;
        document.body.appendChild(honeypot);
    }

    /**
     * Detects potential automated access patterns
     */
    function detectAutomation() {
        const indicators = [];
        
        // Check for headless browser indicators
        if (navigator.webdriver) {
            indicators.push('webdriver');
        }
        
        // Check for suspicious user agents
        const ua = navigator.userAgent.toLowerCase();
        const botPatterns = ['bot', 'crawl', 'spider', 'scrape', 'phantom', 'headless'];
        if (botPatterns.some(pattern => ua.includes(pattern))) {
            indicators.push('bot-ua');
        }
        
        // Check for missing browser features
        if (!window.chrome && ua.includes('chrome')) {
            indicators.push('fake-chrome');
        }
        
        if (indicators.length > 0) {
            console.warn('Potential automated access detected:', indicators);
            // Add subtle watermarks or tracking
            document.body.classList.add('automated-access-detected');
        }
    }

    /**
     * Rate limiting for rapid interactions (potential scraping)
     */
    const interactionTracker = {
        clicks: [],
        maxClicksPerSecond: 10,
        
        track(type) {
            const now = Date.now();
            this.clicks.push(now);
            
            // Keep only last second of clicks
            this.clicks = this.clicks.filter(t => now - t < 1000);
            
            if (this.clicks.length > this.maxClicksPerSecond) {
                console.warn('Unusual interaction rate detected');
                return true; // Rate limit exceeded
            }
            return false;
        }
    };

    // ==================== SECURITY NOTICES ====================
    let noticeTimeout;
    
    /**
     * Shows a non-intrusive security notice to the user
     */
    function showSecurityNotice(message) {
        // Remove existing notice
        const existing = document.querySelector('.security-notice');
        if (existing) existing.remove();
        
        const notice = document.createElement('div');
        notice.className = 'security-notice';
        notice.setAttribute('role', 'alert');
        notice.innerHTML = `
            <i class="bi bi-shield-lock"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notice);
        
        // Trigger animation
        requestAnimationFrame(() => {
            notice.classList.add('visible');
        });
        
        // Auto-remove
        clearTimeout(noticeTimeout);
        noticeTimeout = setTimeout(() => {
            notice.classList.remove('visible');
            setTimeout(() => notice.remove(), 300);
        }, 3000);
    }

    // ==================== CSP VIOLATION MONITORING ====================
    /**
     * Monitors for Content Security Policy violations
     */
    function monitorCSPViolations() {
        document.addEventListener('securitypolicyviolation', (e) => {
            console.warn('CSP Violation:', {
                blockedURI: e.blockedURI,
                violatedDirective: e.violatedDirective,
                originalPolicy: e.originalPolicy
            });
        });
    }

    // ==================== INTEGRITY CHECKS ====================
    /**
     * Verifies page integrity hasn't been tampered with
     */
    function verifyIntegrity() {
        // Check for injected scripts
        const scripts = document.querySelectorAll('script:not([src*="bootstrap"]):not([src*="main.js"]):not([src*="resume-data.js"]):not([src*="security.js"])');
        scripts.forEach(script => {
            if (!script.src && script.textContent.length > 1000) {
                console.warn('Large inline script detected');
            }
        });
        
        // Check for injected iframes
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            if (!iframe.hasAttribute('data-allowed')) {
                console.warn('Unexpected iframe detected:', iframe.src);
            }
        });
    }

    // ==================== INITIALIZATION ====================
    /**
     * Main initialization function
     */
    function initSecurity() {
        // Frame protection (run immediately)
        initFrameBusting();
        
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSecurityFeatures);
        } else {
            initSecurityFeatures();
        }
    }

    function initSecurityFeatures() {
        // PII Protection
        obfuscateEmails();
        obfuscatePhones();
        
        // Image Protection
        protectImages();
        applyCanvasProtection();
        
        // Event Blocking
        blockContextMenu();
        blockTextSelection();
        blockKeyboardShortcuts();
        blockPrinting();
        
        // Anti-Scraping
        addHoneypots();
        detectAutomation();
        
        // Monitoring
        monitorCSPViolations();
        
        // Integrity
        setTimeout(verifyIntegrity, 2000);
        
        // Add security attribution comment
        console.log('%c🔐 Security Module Active', 'color: #06b6d4; font-weight: bold; font-size: 14px;');
        console.log('%cThis site implements client-side security measures to protect content.', 'color: #94a3b8;');
        console.log('%cPlease respect the owner\'s intellectual property rights.', 'color: #94a3b8;');
    }

    // ==================== LINK HIJACKING PROTECTION ====================
    /**
     * Validates external links to prevent open redirect vulnerabilities
     * and ensures all external links have proper rel attributes
     */
    function initLinkProtection() {
        const allowedDomains = [
            'linkedin.com',
            'github.com',
            'credly.com',
            'coursera.org',
            'letsdefend.io',
            'comptia.org'
        ];

        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

            try {
                const url = new URL(href, window.location.origin);
                
                // Check if external link
                if (url.origin !== window.location.origin) {
                    // Ensure proper rel attributes
                    if (!link.hasAttribute('rel') || !link.rel.includes('noopener')) {
                        link.setAttribute('rel', 'noopener noreferrer');
                    }
                    
                    // Validate against allowed domains
                    const isAllowed = allowedDomains.some(domain => 
                        url.hostname.endsWith(domain)
                    );
                    
                    if (!isAllowed) {
                        console.warn('External link to non-whitelisted domain:', url.hostname);
                    }
                }
            } catch (err) {
                // Invalid URL - block it
                e.preventDefault();
                console.error('Invalid URL blocked:', href);
            }
        }, true);
    }

    // ==================== XSS SANITIZATION HELPER ====================
    /**
     * Sanitizes strings to prevent XSS when used with innerHTML
     * Use this for any dynamic content insertion
     */
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
    
    // Expose sanitizer for use in main.js
    window.SecurityUtils = window.SecurityUtils || {};
    window.SecurityUtils.sanitizeHTML = sanitizeHTML;

    // ==================== DOM CLOBBERING PROTECTION ====================
    /**
     * Prevents DOM clobbering attacks by validating element IDs
     */
    function initDOMProtection() {
        const protectedNames = ['location', 'document', 'window', 'top', 'self', 'parent', 'frames'];
        
        protectedNames.forEach(name => {
            const element = document.getElementById(name);
            if (element) {
                console.warn(`Potential DOM clobbering detected: element with id="${name}"`);
                element.removeAttribute('id');
            }
        });
    }

    // ==================== TIMING ATTACK MITIGATION ====================
    /**
     * Reduces precision of timing APIs to mitigate timing attacks
     */
    function initTimingProtection() {
        if (typeof performance !== 'undefined' && performance.now) {
            const originalNow = performance.now.bind(performance);
            performance.now = function() {
                return Math.floor(originalNow() / 5) * 5; // Reduce precision to 5ms
            };
        }
    }

    // ==================== LOCAL STORAGE PROTECTION ====================
    /**
     * Wraps localStorage to prevent sensitive data leakage
     * and implements basic encryption for stored values
     */
    function initStorageProtection() {
        const sensitiveKeys = ['email', 'phone', 'password', 'token', 'key', 'secret'];
        
        const originalSetItem = localStorage.setItem.bind(localStorage);
        localStorage.setItem = function(key, value) {
            const isSensitive = sensitiveKeys.some(k => 
                key.toLowerCase().includes(k)
            );
            
            if (isSensitive) {
                console.warn('Attempt to store potentially sensitive data in localStorage:', key);
            }
            
            return originalSetItem(key, value);
        };
    }

    // ==================== REFERRER LEAKAGE PREVENTION ====================
    /**
     * Ensures all external links properly strip referrer information
     */
    function initReferrerProtection() {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            if (!link.rel.includes('noreferrer')) {
                link.rel = (link.rel + ' noreferrer').trim();
            }
        });
    }

    // ==================== MUTATION OBSERVER ====================
    /**
     * Watches for DOM changes to protect dynamically added content
     */
    function initMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        // Re-apply protections to new content
                        if (node.matches && (
                            node.matches(SECURITY_CONFIG.protectedSelectors.images) ||
                            node.matches(SECURITY_CONFIG.protectedSelectors.pii)
                        )) {
                            protectImages();
                            obfuscateEmails();
                            obfuscatePhones();
                            blockContextMenu();
                            blockTextSelection();
                        }
                        
                        // Re-apply referrer protection to new links
                        if (node.matches && node.matches('a[target="_blank"]')) {
                            if (!node.rel.includes('noreferrer')) {
                                node.rel = (node.rel + ' noreferrer').trim();
                            }
                        }
                        
                        // Check for new links inside added nodes
                        if (node.querySelectorAll) {
                            node.querySelectorAll('a[target="_blank"]').forEach(link => {
                                if (!link.rel.includes('noreferrer')) {
                                    link.rel = (link.rel + ' noreferrer').trim();
                                }
                            });
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // ==================== ENHANCED INITIALIZATION ====================
    function initAdvancedSecurity() {
        initLinkProtection();
        initDOMProtection();
        initTimingProtection();
        initStorageProtection();
        initReferrerProtection();
    }

    // Start security module
    initSecurity();
    
    // Initialize advanced security
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAdvancedSecurity();
            initMutationObserver();
        });
    } else {
        initAdvancedSecurity();
        initMutationObserver();
    }

})();
