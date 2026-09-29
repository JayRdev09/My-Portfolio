// ===== Typing Effect =====
const typingText = document.getElementById('typing-text');
const roles = ['Flutter & Web Developer', 'AI & IoT Innovator', 'CS Student', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// ===== Mobile Navigation =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// ===== Back to Top =====
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Form Submission =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = e.target.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check" style="margin-right: 8px;"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        e.target.reset();
    }, 2500);
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Reveal (Intersection Observer) =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Don't unobserve — only animate once
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Active Nav Highlighting =====
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-80px 0px 0px 0px'
});

sections.forEach(section => navObserver.observe(section));

// ===== Certificate Lightbox Modal =====
function openCertModal(imgSrc) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    modalImg.src = imgSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
        closeVideoModal();
        closeUiScreenModal();
    }
});

// ===== Flagship Project Media Switcher =====
function switchFlagshipMedia(type) {
    const videoTab = document.getElementById('tabVideoBtn');
    const sensorTab = document.getElementById('tabSensorBtn');
    const uiTab = document.getElementById('tabUiBtn');
    const splitTab = document.getElementById('tabSplitBtn');
    
    const videoView = document.getElementById('mediaVideoView');
    const sensorView = document.getElementById('mediaSensorView');
    const uiView = document.getElementById('mediaUiView');
    const splitView = document.getElementById('mediaSplitView');
    
    const cardVideo = document.getElementById('cardVideoPlayer');
    const splitVideo = document.getElementById('splitVideoPlayer');

    // Deactivate all tabs & views
    [videoTab, sensorTab, uiTab, splitTab].forEach(btn => btn && btn.classList.remove('active'));
    [videoView, sensorView, uiView, splitView].forEach(view => view && view.classList.remove('active'));

    // Pause videos when switching away
    if (type !== 'video' && cardVideo && !cardVideo.paused) {
        cardVideo.pause();
    }
    if (type !== 'split' && splitVideo && !splitVideo.paused) {
        splitVideo.pause();
    }

    const grid = document.querySelector('.flagship-grid');
    if (grid) {
        grid.classList.toggle('split-active', type === 'split');
    }

    if (type === 'video') {
        if (videoTab) videoTab.classList.add('active');
        if (videoView) videoView.classList.add('active');
    } else if (type === 'sensor') {
        if (sensorTab) sensorTab.classList.add('active');
        if (sensorView) sensorView.classList.add('active');
    } else if (type === 'ui') {
        if (uiTab) uiTab.classList.add('active');
        if (uiView) uiView.classList.add('active');
    } else if (type === 'split') {
        if (splitTab) splitTab.classList.add('active');
        if (splitView) splitView.classList.add('active');
        renderSplitModule(currentSplitIndex);
    }
}

// ===== ESP32 Hardware Hotspots Interactive System =====
const hardwareData = {
    microcontroller: {
        category: 'Microcontroller',
        icon: 'fas fa-microchip',
        title: 'ESP32 WiFi Module',
        proto: 'ESP32 WiFi Module',
        spec: 'ESP32 DevKIT V1 or ESP32-S3',
        status: 'Telemetry Master & MCU'
    },
    ttl: {
        category: 'TTL converter',
        icon: 'fas fa-exchange-alt',
        title: 'RS485 Transceiver Module',
        proto: 'RS485',
        spec: 'RS485',
        status: 'Modbus RTU Serial Bridge'
    },
    sensor: {
        category: 'Soil Sensor Module',
        icon: 'fas fa-seedling',
        title: 'Basic NPK + pH + Moisture + Temperature Sensor',
        proto: 'Basic NPK + pH + Moisture + Temperature Sensor',
        spec: '7-in-1 Soil Sensor (NPK, pH, Temperature, EC, Humidity/Moisture)',
        status: 'Multi-Parameter Industrial Probe'
    },
    solar: {
        category: 'Solar Panel',
        icon: 'fas fa-solar-panel',
        title: '9V / 4W Polycrystalline',
        proto: '9V / 4W Polycrystalline',
        spec: '9.2V / 5W Monocrystalline (or higher)',
        status: 'Renewable Power Harvester'
    },
    battery: {
        category: 'Rechargeable Batteries',
        icon: 'fas fa-battery-three-quarters',
        title: '2 x 3.7V Li-ion (18650, 2000mAh)',
        proto: '2 x 3.7V Li-ion (18650, 2000mAh)',
        spec: '3 x 3.7V Li-ion (18650 or 21700, 3000mAh+)',
        status: 'Off-Grid Energy Storage'
    },
    dcjack: {
        category: 'DC Jack Female Barrel Connector',
        icon: 'fas fa-plug',
        title: '5.5 mm × 2.1 mm Two-Wire DC Female Barrel Jack',
        proto: '5.5 mm × 2.1 mm two-wire DC female barrel jack (pigtail type)',
        spec: '5.5 mm × 2.1 mm DC female barrel jack with strain relief and thicker gauge wire',
        status: 'Power Delivery Connection'
    }
};

function selectHardwareItem(key) {
    const data = hardwareData[key];
    if (!data) return;

    // Update hotspots active state
    document.querySelectorAll('.hw-hotspot').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-hw') === key);
    });

    // Update chips active state
    document.querySelectorAll('.hw-chip').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-hw') === key);
    });

    // Update table row active state
    document.querySelectorAll('.hw-table-row').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-hw') === key);
    });

    // Update bottom inspector card
    const cardIcon = document.getElementById('hwCardIcon');
    const cardCat = document.getElementById('hwCardCategory');
    const cardTitle = document.getElementById('hwCardTitle');
    const cardSpec = document.getElementById('hwCardSpec');
    const cardStatus = document.getElementById('hwCardStatus');

    if (cardIcon) cardIcon.innerHTML = `<i class="${data.icon}"></i>`;
    if (cardCat) cardCat.textContent = data.category;
    if (cardTitle) cardTitle.textContent = data.title;
    if (cardSpec) cardSpec.textContent = data.spec;
    if (cardStatus) cardStatus.innerHTML = `<i class="fas fa-circle"></i> ${data.status}`;
}

// Toggle on-image labels visibility
let hwLabelsVisible = true;
function toggleHwLabels() {
    hwLabelsVisible = !hwLabelsVisible;
    const container = document.getElementById('sensorHotspotContainer');
    const labelText = document.getElementById('labelToggleText');
    if (container) {
        container.classList.toggle('hide-labels', !hwLabelsVisible);
    }
    if (labelText) {
        labelText.textContent = hwLabelsVisible ? 'Labels: On' : 'Labels: Off';
    }
}

// Toggle between raw photograph and labeled schematic
let isAnnotatedSchema = false;
function toggleSensorImageSource() {
    isAnnotatedSchema = !isAnnotatedSchema;
    const img = document.getElementById('sensorImg');
    const imgText = document.getElementById('imgToggleText');
    if (img) {
        img.src = isAnnotatedSchema ? 'SOIL SENSOR_LABELED.jpg' : 'SOIL SENSOR.jpg';
    }
    if (imgText) {
        imgText.textContent = isAnnotatedSchema ? 'Photo View' : 'Schematic';
    }
}

// ===== Appendix A Manual Data & Modules =====
const appendixModules = [
    {
        id: 0,
        title: "LOGIN / SIGN UP PAGE",
        badge: "Module 1",
        icon: "fas fa-sign-in-alt",
        heading: "Accessing the Mobile Application",
        desc: "Upon opening the Tomato AI Assistant app, users are greeted by the Sign Up and Login screen. New users must register using a valid email address and password, while returning users can enter their credentials to access their personalized dashboard.",
        screens: [
            { id: 1, src: "tomatoai features images/image1.png", label: "Sign Up Screen", caption: "New User Registration with Email and Password" },
            { id: 2, src: "tomatoai features images/image2.png", label: "Login Screen", caption: "Returning User Login & Authentication" }
        ]
    },
    {
        id: 1,
        title: "TOMATO PLANT PROFILING PAGE",
        badge: "Module 2",
        icon: "fas fa-seedling",
        heading: "Tomato Plant Profiling Page",
        desc: "Navigate to the \"Plant Details\" or \"New Plant\" screen to register a new tomato plant in the system for personalized tracking. You will be asked to enter required information such as Plant Variety (e.g., Cherry, Roma), Planting Date, and initial health notes. The system then creates a unique profile for the plant to track its progress.",
        screens: [
            { id: 3, src: "tomatoai features images/image3.png", label: "Add New Plant Screen", caption: "Plant Variety Selection (Cherry, Roma) & Date Registration" },
            { id: 4, src: "tomatoai features images/image4.png", label: "Plant Profile Overview", caption: "Individual Plant Tracking Profile & Health Log" }
        ]
    },
    {
        id: 2,
        title: "GROWTH STAGE & HARVEST PREDICTION",
        badge: "Module 3",
        icon: "fas fa-calendar-alt",
        heading: "Growth Stage & Harvest Prediction",
        desc: "Select a plant from your list of profiles to view its current developmental stage. The system will automatically display its current Growth Stage. An Estimated Harvest Date is then calculated based on the planting date and typical growth timelines to help you plan farm activities.",
        screens: [
            { id: 5, src: "tomatoai features images/image5.png", label: "Current Growth Stage", caption: "Developmental Stage Indicator" },
            { id: 6, src: "tomatoai features images/image6.png", label: "Growth Timeline", caption: "Timeline Tracking Vegetative to Fruiting Phases" },
            { id: 7, src: "tomatoai features images/image7.png", label: "Milestones Tracking", caption: "Plant Physiological Milestones Benchmarking" },
            { id: 8, src: "tomatoai features images/image8.png", label: "Stage Health Metrics", caption: "Health & Progress Parameters" },
            { id: 9, src: "tomatoai features images/image9.png", label: "Harvest Prediction Calendar", caption: "Estimated Harvest Date Calculation" },
            { id: 10, src: "tomatoai features images/image10.png", label: "Harvest Schedule Window", caption: "Farm Labor & Harvest Window Planning" }
        ]
    },
    {
        id: 3,
        title: "REAL-TIME SOIL DATA",
        badge: "Module 4",
        icon: "fas fa-flask",
        heading: "Real-Time Soil Data Telemetry",
        desc: "Tap on the \"Soil Status\" or similar button on the dashboard to view live soil conditions gathered from the ESP32-based 7-in-1 soil sensor. The screen displays readings for Moisture (%), Temperature (°C), pH Level, and Nutrient Levels (NPK) including Nitrogen (N), Phosphorus (P), and Potassium (K).",
        screens: [
            { id: 11, src: "tomatoai features images/image11.png", label: "Live Soil Sensor Dashboard", caption: "ESP32 7-in-1 Telemetry: Moisture %, Temp °C, pH, and NPK Levels" }
        ]
    },
    {
        id: 4,
        title: "SOIL SUITABILITY CHECK",
        badge: "Module 5",
        icon: "fas fa-check-circle",
        heading: "Soil Suitability Evaluation",
        desc: "On the Soil Status page, click the \"Check Soil Suitability\" button to determine if the current soil conditions are optimal for tomato growth. The system compares the live sensor data against optimal ranges and returns a verdict while providing direct recommendations for amendments like watering or fertilization.",
        screens: [
            { id: 12, src: "tomatoai features images/image12.png", label: "Suitability Assessment", caption: "Automated Comparison Against Optimal Tomato Agronomic Thresholds" },
            { id: 13, src: "tomatoai features images/image13.png", label: "Nutrient Range Verdict", caption: "High/Low Status for Moisture, pH, and Nutrients" },
            { id: 14, src: "tomatoai features images/image14.png", label: "Actionable Soil Amendments", caption: "Targeted Soil Amendments, Fertilization & Irrigation Advice" }
        ]
    },
    {
        id: 5,
        title: "CAPTURE & UPLOAD PLANT IMAGE",
        badge: "Module 6",
        icon: "fas fa-camera",
        heading: "Capture & Upload Plant Image",
        desc: "Navigate to the \"Capture and Upload Image\" screen to take a photo of a tomato leaf or fruit for disease detection. You may either take a new photo using your phone's camera or select an existing image from your gallery, ensuring the photo is clear and well-lit while focusing on the leaf or fruit surface. The \"Image Enhancement\" screen allows you to adjust brightness or contrast to improve image clarity before analysis.",
        screens: [
            { id: 15, src: "tomatoai features images/image15.png", label: "Camera Leaf Capture", caption: "Live In-App Camera Leaf & Fruit Viewfinder" },
            { id: 16, src: "tomatoai features images/image16.png", label: "Gallery Image Picker", caption: "High-Resolution Image Picker with Focus Framing" }
        ]
    },
    {
        id: 6,
        title: "AI ANALYSIS & RESULTS",
        badge: "Module 7",
        icon: "fas fa-brain",
        heading: "AI Analysis & Automated Diagnosis",
        desc: "After capturing an image, tap the \"Analyze Now\" button to receive an automated diagnosis of the plant's health. The AI system processes the image and displays an Analysis Output screen which includes the confirmed Plant Type as \"Tomato,\" the Health Status, a summary of the latest sensor data integrated with the analysis, and actionable Recommendations such as \"Apply copper-based fungicide\" or \"Soil phosphorus is low; add bone meal.\"",
        screens: [
            { id: 17, src: "tomatoai features images/image17.png", label: "Image Enhancement", caption: "Contrast & Brightness Adjustment for Optimal Feature Extraction" },
            { id: 18, src: "tomatoai features images/image18.png", label: "Analysis Trigger Screen", caption: "Confirmation & Pre-Processing for Deep Learning Classifier" },
            { id: 19, src: "tomatoai features images/image19.png", label: "AI Classification Result", caption: "Confirmed Plant Type: Tomato | Disease Status Classification" },
            { id: 20, src: "tomatoai features images/image20.png", label: "Integrated Treatment Plan", caption: "Sensor-Integrated Treatment Recommendations & Chemical Dosages" }
        ]
    },
    {
        id: 7,
        title: "REQUIREMENTS AND BEST PRACTICES GUIDE",
        badge: "Module 8",
        icon: "fas fa-book",
        heading: "Requirements and Best Practices Guide",
        desc: "Tap the \"Best Practices and Tips\" icon to access a static reference for optimal tomato cultivation techniques. The app displays expert guides on topics such as proper watering, spacing, pruning, and integrated pest management for common tomato diseases.",
        screens: [
            { id: 21, src: "tomatoai features images/image21.png", label: "Cultivation Best Practices", caption: "Agronomic Guide for Watering, Spacing & Pruning" },
            { id: 22, src: "tomatoai features images/image22.png", label: "Pest Management Protocols", caption: "Integrated Pest Management (IPM) Reference for Tomato Diseases" }
        ]
    },
    {
        id: 8,
        title: "ANALYSIS HISTORY",
        badge: "Module 9",
        icon: "fas fa-history",
        heading: "Plant Diagnostic History Log",
        desc: "Tap the \"History\" icon to review past diagnoses, soil readings, and recommendations. The app shows a chronological list of all previous plant analyses, and selecting an entry allows you to view the full report again to track the progression of a plant's health over time.",
        screens: [
            { id: 23, src: "tomatoai features images/image23.png", label: "Diagnostic Timeline Log", caption: "Chronological History of Past Diagnoses, Soil Telemetry & Treatment Outcomes" }
        ]
    },
    {
        id: 9,
        title: "LOGOUT",
        badge: "Module 10",
        icon: "fas fa-sign-out-alt",
        heading: "User Logout & Session Management",
        desc: "To logout the application, navigate to this icon on the top right of the screen and click it. Quick Actions will display and then find the Logout label, clicking it will then logout the user and displays the login screen.",
        screens: [
            { id: 24, src: "tomatoai features images/image24.png", label: "Top-Right Quick Actions", caption: "Dropdown Menu for Navigation & Account Settings" },
            { id: 25, src: "tomatoai features images/image25.png", label: "Logout Confirmation", caption: "Secure Session Termination & Return to Login Screen" }
        ]
    }
];

// Flattened list of all 25 screens for modal lightbox
const allAppendixScreens = [];
appendixModules.forEach(mod => {
    mod.screens.forEach(sc => {
        allAppendixScreens.push({
            id: sc.id,
            src: sc.src,
            module: mod.title,
            badge: mod.badge,
            label: sc.label,
            caption: sc.caption,
            desc: mod.desc
        });
    });
});

let currentModalScreenIndex = 0;

// ===== App UI Feature Switcher =====
function showUiFeature(index) {
    document.querySelectorAll('.ui-feat-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.ui-feature-panel').forEach((panel, i) => {
        panel.classList.toggle('active', i === index);
    });
}

// ===== Side-by-Side Split View Module Navigation =====
let currentSplitIndex = 0;
function navSplitFeature(delta) {
    currentSplitIndex = (currentSplitIndex + delta + appendixModules.length) % appendixModules.length;
    renderSplitModule(currentSplitIndex);
}

function renderSplitModule(index) {
    const mod = appendixModules[index];
    if (!mod) return;
    currentSplitIndex = index;
    
    const titleEl = document.getElementById('splitModuleTitle');
    const counterEl = document.getElementById('splitCounter');
    const descEl = document.getElementById('splitModuleDesc');
    const carouselEl = document.getElementById('splitScreensCarousel');

    if (titleEl) titleEl.innerHTML = `<i class="${mod.icon}"></i> ${mod.title}`;
    if (counterEl) counterEl.textContent = `${index + 1} / ${appendixModules.length}`;
    if (descEl) descEl.textContent = mod.desc;

    if (carouselEl) {
        carouselEl.innerHTML = mod.screens.map(sc => `
            <div class="split-screen-card" onclick="openUiScreenModal('${sc.src}', '${sc.label}', '${mod.desc}', ${sc.id - 1})">
                <div class="split-screen-img-box">
                    <img src="${sc.src}" alt="${sc.label}" loading="lazy">
                    <div class="split-screen-hover-badge"><i class="fas fa-search-plus"></i> View Full Screen</div>
                </div>
                <div class="split-screen-meta">
                    <span class="split-screen-id">Screen #${sc.id}</span>
                    <strong class="split-screen-label">${sc.label}</strong>
                    <p class="split-screen-caption">${sc.caption}</p>
                </div>
            </div>
        `).join('');
    }
}

// ===== UI Screen Lightbox Modal with Next / Prev Navigation =====
function openUiScreenModal(imgSrc, label, desc, screenIndex) {
    const modal = document.getElementById('uiScreenModal');
    if (!modal) return;

    if (typeof screenIndex === 'number' && screenIndex >= 0 && screenIndex < allAppendixScreens.length) {
        currentModalScreenIndex = screenIndex;
    } else {
        const found = allAppendixScreens.findIndex(s => s.src === imgSrc);
        currentModalScreenIndex = found !== -1 ? found : 0;
    }

    updateUiModalContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateUiModalContent() {
    const sc = allAppendixScreens[currentModalScreenIndex];
    if (!sc) return;

    const img = document.getElementById('uiScreenModalImg');
    const cap = document.getElementById('uiScreenModalCaption');
    const title = document.getElementById('uiScreenModalTitle');
    const badge = document.getElementById('uiScreenModalBadge');
    const counter = document.getElementById('uiScreenModalCounter');
    const desc = document.getElementById('uiScreenModalDesc');

    if (img) {
        img.src = sc.src;
        img.alt = sc.label;
    }
    if (title) title.textContent = sc.label;
    if (badge) badge.textContent = sc.badge + ' — ' + sc.module;
    if (counter) counter.textContent = `Screen ${currentModalScreenIndex + 1} of ${allAppendixScreens.length}`;
    if (cap) cap.textContent = sc.caption;
    if (desc) desc.textContent = sc.desc;
}

function prevUiModal() {
    currentModalScreenIndex = (currentModalScreenIndex - 1 + allAppendixScreens.length) % allAppendixScreens.length;
    updateUiModalContent();
}

function nextUiModal() {
    currentModalScreenIndex = (currentModalScreenIndex + 1) % allAppendixScreens.length;
    updateUiModalContent();
}

function closeUiScreenModal() {
    const modal = document.getElementById('uiScreenModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Keyboard shortcuts for modal
window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('uiScreenModal');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
        prevUiModal();
    } else if (e.key === 'ArrowRight') {
        nextUiModal();
    } else if (e.key === 'Escape') {
        closeUiScreenModal();
    }
});


// ===== Abstract Accordion Toggle =====
function toggleAbstract() {
    const drawer = document.getElementById('abstractDrawer');
    const arrow = document.getElementById('abstractArrow');
    const btn = document.getElementById('abstractToggleBtn');
    if (!drawer || !arrow || !btn) return;
    
    drawer.classList.toggle('open');
    arrow.classList.toggle('rotated');

    const span = btn.querySelector('span');
    if (span) {
        if (drawer.classList.contains('open')) {
            span.innerHTML = '<i class="fas fa-book-reader"></i> Hide Research Abstract';
        } else {
            span.innerHTML = '<i class="fas fa-book-open"></i> Read Full Research Abstract';
        }
    }
}

// ===== Video Demo Lightbox Modal =====
function openVideoModal(videoSrc) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('modalVideoPlayer');
    const cardVideo = document.getElementById('cardVideoPlayer');

    // Pause card video if playing
    if (cardVideo && !cardVideo.paused) {
        cardVideo.pause();
    }

    if (videoSrc) {
        player.querySelector('source').src = videoSrc;
        player.load();
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Play modal video
    player.play().catch(() => {
        // Autoplay may require user interaction in some browsers
    });
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('modalVideoPlayer');
    
    if (player) {
        player.pause();
    }

    modal.classList.remove('active');
    document.body.style.overflow = '';
}