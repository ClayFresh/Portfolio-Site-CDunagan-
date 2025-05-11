/**
 * Clayton Dunagan Portfolio
 * Main JavaScript file
 * 
 * This script handles:
 * - 3D tilt effects
 * - Case study carousel
 * - Split view for case study content and video
 * - Navigation and accessibility
 * - Animations and visual effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===================================================================
    // Initialization & Setup
    // ===================================================================
    
    // First, check if a visualizer already exists and remove it to prevent duplication
    const existingCanvas = document.getElementById('visualizer-canvas');
    if (existingCanvas) {
        existingCanvas.remove();
    }
    
    // Case Study Carousel Data
    const caseStudies = [
        {
          title: "Creative Arts Society Case Study",
          image: "images/Image3.jpeg",
          video: "https://vimeo.com/1083215646/f7096fdc03", // Creative Arts Society Vimeo link
          description: "Redesigned a local art nonprofit's site to feel as inspiring as the artists it supports.",
          link: "#full-case-study",
          favorite: false,
          isVimeo: true // Flag to indicate this is a Vimeo video
        },
        {
          title: "Fuego App Case Study",
          image: "images/IMG_1309.jpg",
          video: "https://vimeo.com/1083215179/1c635d939d", // Fuego App Vimeo link
          description: "UX-first mobile app built to inform, protect, and empower immigrants under pressure.",
          link: "#",
          favorite: false,
          isVimeo: true // Flag to indicate this is a Vimeo video
        },
        {
          title: "Portfolio Case Study",
          image: "images/Image3.jpeg",
          video: "https://player.vimeo.com/video/1083215667?h=450e10daee", // Portfolio Case Study Vimeo link
          description: "Think portfolio meets playlist — styled like Spotify, designed, coded, with my own rhythm.",
          link: "#",
          favorite: false,
          isVimeo: true // Flag to indicate this is a Vimeo video
        }
    ];

    // Case Study Content Data Structure (mimicking lyrics)
    const caseStudyContent = {
        "Creative Arts Society Case Study": [
            "Problem Statement: The Creative Arts Society needed a digital platform to connect artists, showcase work, and manage events.",
            "Research: Conducted interviews with 15 artists and 5 arts administrators to understand their needs and pain points.",
            "Key Finding #1: Artists struggle with visibility and need a platform that showcases their work in a professional manner.",
            "Key Finding #2: Event management was done through multiple disconnected tools, creating confusion and missed opportunities.",
            "Key Finding #3: Community engagement was primarily happening in-person with limited digital touchpoints.",
            "Solution Overview: Created a responsive web platform with integrated event management, artist portfolios, and community features.",
            "Feature: Artist Portfolios - Custom-designed spaces for artists to showcase their work with optimal visual presentation.",
            "Feature: Event Management - Centralized calendar with RSVP functionality and automated reminders.",
            "Feature: Community Forum - Structured discussion areas for collaboration and knowledge sharing.",
            "Design Process: Used a mobile-first approach with emphasis on visual content and intuitive navigation.",
            "User Testing: Conducted usability testing with 12 participants across different artistic disciplines.",
            "Implementation: Delivered interactive prototypes and comprehensive design system for development team.",
            "Results: Platform adoption exceeded expectations with 85% of society members creating profiles within first month.",
            "Feedback: \"The new platform has transformed how we connect and collaborate as artists.\" - Society President",
            "Learnings: Balancing visual showcase needs with performance considerations was a valuable challenge.",
            "Next Steps: Expanding the platform to include integrated e-commerce functionality for artwork sales."
        ],
        "Fuego App Case Study": [
            "Overview: Fuego is a mobile app designed to support and protect immigrants in the United States, built from scratch as a UX capstone project.",
            "The Challenge: Many immigrants face barriers when accessing critical legal information. We set out to create an app offering clarity, protection, and immediate action without overwhelming users during emergencies.",
            "Target Audience: Immigrants of all ages and backgrounds in the U.S., including children, adults, and elders.",
            "My Role: UX research, user interviews, wireframing, high-fidelity prototyping, user testing, and project coordination across a 4-person team.",
            "Tools & Methods: Figma, FigJam, Slack, Zoom, Google Workspace, with light AI support for efficiency.",
            "Key Obstacle #1: Making the Emergency Broadcast sign-up feel safe and supportive rather than intimidating.",
            "Key Obstacle #2: Designing a universal, accessible app for users with varying levels of technical literacy.",
            "Solution #1: Warrant Scanner feature allowing users to quickly verify the legitimacy of documents presented by authorities.",
            "Solution #2: Emergency Broadcast System to alert community members about ICE raids and provide immediate assistance.",
            "Solution #3: \"Know Your Rights\" information hub with accessible, multilingual resources for various scenarios.",
            "User Testing: Conducted sessions with immigrant community members to ensure intuitive navigation during high-stress situations.",
            "Design Evolution: Iterated through multiple versions based on feedback, simplifying pathways and reducing cognitive load.",
            "Accessibility Considerations: Incorporated multilingual support, voice commands, and clear iconography for universal understanding.",
            "Community Impact: Created a tool that empowers individuals with knowledge while fostering community protection networks.",
            "Results & Takeaways: Fuego became more than just a class project — it was a lesson in empathy-driven design that can genuinely protect and uplift vulnerable communities."
        ],
        "Portfolio Case Study": [
            "Overview: My portfolio site is a one-page interactive experience inspired by Spotify's interface, designed to showcase my UI/UX work and developing front-end skills.",
            "The Challenge: I wanted to move beyond a simple resume site and create a real interactive experience, translating ambitious Figma designs into functional code with minimal coding experience.",
            "Target Audience: Hiring managers, creative directors, and peers who want to see both my technical skills and personality.",
            "My Role: Concept development, UX/UI design in Figma, full front-end development (HTML, CSS, JavaScript), and deployment through GitHub Pages.",
            "Tools & Methods: Figma for design, CodePen for prototyping features, GitHub for version control, AI conversational coding assistance, and Google Workspace for planning.",
            "Design Process: Started with competitive analysis of creative portfolios, focusing on interactivity and personality.",
            "Conceptual Framework: Chose a music player metaphor to represent my case studies as 'tracks' in a creative playlist.",
            "Key Obstacle #1: Learning how to code custom features like a lyrics-style scrollable case study module with minimal JavaScript experience.",
            "Key Obstacle #2: Maintaining responsive design consistency across device sizes while preserving interactive elements.",
            "Solution #1: Developed a modular component approach, building and testing individual features before integration.",
            "Solution #2: Implemented a flexible CSS grid system with carefully planned breakpoints for responsive behavior.",
            "Technical Highlights: Custom scrollable case study viewer with auto-scroll functionality mimicking lyrics display.",
            "Visual Design: Created a dark mode aesthetic with accent colors that reflect music visualization themes.",
            "User Experience: Designed intuitive navigation that guides visitors through my work while allowing exploration.",
            "Results & Takeaways: This project significantly improved my confidence in both design and front-end development skills, proving I can design and build interfaces, opening doors for more creative freedom in future projects."
        ]
    };

    // State Management
    const state = {
        currentIndex: 0,
        isPlaying: false,
        slideInterval: null,
        touchStartX: 0,
        touchEndX: 0
    };

    // DOM Elements - Centralized for easier maintenance
    const elements = {
        spotifyPlayer: document.querySelector('.spotify-player'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        playBtn: document.querySelector('.play-btn'),
        favoriteBtn: document.querySelector('.favorite-btn'),
        tracks: document.querySelectorAll('.track'),
        caseStudyGrid: document.querySelector('.case-study-grid'),
        caseStudyTitle: document.querySelector('.case-study-title'),
        caseStudyDescription: document.querySelector('.case-study-description'),
        trackToggles: document.querySelectorAll('.track-toggle'),
        skillsPrevBtn: document.getElementById('skills-prev-btn'),
        skillsNextBtn: document.getElementById('skills-next-btn'),
        skillsIndicators: document.querySelectorAll('.skills-indicator'),
        skillsCarouselSlides: document.getElementById('skills-carousel-slides'),
        
        // Split View Elements
        splitViewContainer: document.querySelector('.split-view-container'),
        expandSplitViewBtn: document.querySelector('.expand-split-view-btn'),
        minimizeSplitViewBtn: document.querySelector('.minimize-split-view-btn'),
        splitViewFullscreen: document.querySelector('.split-view-fullscreen'),
        splitViewCaseStudyVideo: document.querySelector('.case-study-video'),
        fullscreenCaseStudyVideo: document.querySelector('.fullscreen-case-study-video'),
        splitViewProgress: document.querySelector('.split-view-progress .progress-completed'),
        fullscreenSplitViewProgress: document.querySelector('.fullscreen-progress .progress-completed'),
        splitViewLyricsContent: document.querySelector('.lyrics-content'),
        fullscreenSplitViewLyricsContent: document.querySelector('.fullscreen-lyrics-content'),
        
        // Additional elements for the DOM Elements object
        fullscreenPrevBtn: document.querySelector('.fullscreen-prev-btn'),
        fullscreenNextBtn: document.querySelector('.fullscreen-next-btn'),
        fullscreenPlayBtn: document.querySelector('.fullscreen-play-btn'),
        fullscreenFavoriteBtn: document.querySelector('.fullscreen-favorite-btn')
    };

    // Variables for lyrics display
    let autoScrollInterval;
    let currentParagraphIndex = 0;
    let isSplitViewFullscreen = false;
    const SCROLL_INTERVAL = 7000; // 7 seconds per paragraph

    // ===================================================================
    // 3D Effects Initialization
    // ===================================================================
    
    /**
     * Initialize 3D tilt effects for interactive elements
     * Disabled on mobile for better performance
     */
    function initializeTiltEffects() {
        // Check if device is mobile before initializing tilt effects
        if (window.innerWidth <= 768) {
            return; // Skip tilt effects on mobile devices
        }
        
        // Initialize tilt effect on elements with data-tilt attribute
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        if (typeof VanillaTilt !== 'undefined' && tiltElements.length > 0) {
            tiltElements.forEach(element => {
                VanillaTilt.init(element, {
                    max: element.getAttribute('data-tilt-max') || 5,
                    glare: element.hasAttribute('data-tilt-glare'),
                    "max-glare": element.getAttribute('data-tilt-max-glare') || 0.3,
                    scale: 1.03,
                    speed: 400,
                    perspective: 1000,
                    transition: true,
                    gyroscope: false // Disable gyroscope for better accessibility
                });
            });
        }
        
        // Add manual depth effects for depth-card elements without tilt
        document.querySelectorAll('.depth-card:not([data-tilt])').forEach(card => {
            card.addEventListener('mousemove', handleDepthCardMouseMove);
            card.addEventListener('mouseleave', handleDepthCardMouseLeave);
        });
    }
    
    /**
     * Handle mouse movement for depth cards
     * Creates a 3D parallax effect based on mouse position
     */
    function handleDepthCardMouseMove(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to the card (in percentage)
        const mouseX = ((e.clientX - rect.left) / rect.width) - 0.5;
        const mouseY = ((e.clientY - rect.top) / rect.height) - 0.5;
        
        // Apply subtle rotation and movement
        const rotateY = mouseX * 5; // Max 5 degrees rotation
        const rotateX = mouseY * -5; // Max 5 degrees rotation
        const translateZ = 10; // Fixed depth
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    }
    
    /**
     * Reset card transform on mouse leave
     */
    function handleDepthCardMouseLeave() {
        this.style.transform = '';
    }
    
    // ===================================================================
    // Case Study Carousel Functions
    // ===================================================================
    
    /**
     * Update displayed case study content
     * Updates all related UI elements based on current case study index
     */
    function updateCaseStudy() {
        const currentStudy = caseStudies[state.currentIndex];
        
        // Update title and description in the track info section
        if (elements.caseStudyTitle) {
            elements.caseStudyTitle.textContent = currentStudy.title;
        }
        
        if (elements.caseStudyDescription) {
            elements.caseStudyDescription.textContent = currentStudy.description;
        }
        
        // Update fullscreen title and description
        const fullscreenTitle = document.getElementById('fullscreen-split-title');
        const fullscreenDescription = document.querySelector('.fullscreen-description');
        
        if (fullscreenTitle) {
            fullscreenTitle.textContent = currentStudy.title;
        }
        
        if (fullscreenDescription) {
            fullscreenDescription.textContent = currentStudy.description;
        }
        
        // Update favorite button state
        if (elements.favoriteBtn) {
            elements.favoriteBtn.classList.toggle('active', currentStudy.favorite);
            elements.favoriteBtn.setAttribute('aria-pressed', currentStudy.favorite);
        }
        
        // Update grid items to show which one is active
        updateCaseStudyGrid();
        
        // Update lyrics for the current case study
        updateLyrics();
        
        // Load video for the current case study
        loadCurrentVideo();
        
        // Announce to screen readers that content has changed
        announceContentChange(`Now viewing ${currentStudy.title}`);
    }
    
    /**
     * Update mini thumbnails in the grid below
     * Creates or updates the visual state of case study cards
     */
    function updateCaseStudyGrid() {
        if (!elements.caseStudyGrid) return;
        
        // Check if we need to create grid items
        if (elements.caseStudyGrid.children.length === 0) {
            caseStudies.forEach((study, index) => {
                const card = document.createElement('div');
                card.className = 'case-study-card';
                card.dataset.index = index;
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', `View ${study.title}`);
                
                const image = document.createElement('div');
                image.className = 'case-study-image';
                
                const img = document.createElement('img');
                img.src = study.image;
                img.alt = study.title;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.borderRadius = 'inherit';
                
                image.appendChild(img);
                card.appendChild(image);
                
                // Add click and keyboard event to switch to this case study
                card.addEventListener('click', () => {
                    state.currentIndex = index;
                    updateCaseStudy();
                });
                
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        state.currentIndex = index;
                        updateCaseStudy();
                    }
                });
                
                elements.caseStudyGrid.appendChild(card);
            });
        }
        
        // Update active state
        const cards = elements.caseStudyGrid.querySelectorAll('.case-study-card');
        cards.forEach((card, index) => {
            const isActive = index === state.currentIndex;
            card.style.transform = isActive ? 'scale(1.05)' : '';
            card.style.boxShadow = isActive ? '0 10px 15px rgba(0, 0, 0, 0.2)' : '';
            card.setAttribute('aria-selected', isActive);
        });
    }

    /**
     * Navigate to next case study
     */
    function nextSlide() {
        state.currentIndex++;
        if (state.currentIndex >= caseStudies.length) {
            state.currentIndex = 0;
        }
        updateCaseStudy();
    }

    /**
     * Navigate to previous case study
     */
    function previousSlide() {
        state.currentIndex--;
        if (state.currentIndex < 0) {
            state.currentIndex = caseStudies.length - 1;
        }
        updateCaseStudy();
    }

    /**
     * Toggle auto-play for case study content
     */
    function togglePlay() {
        state.isPlaying = !state.isPlaying;
        if (state.isPlaying) {
            elements.playBtn.classList.add('playing');
            elements.playBtn.textContent = '⏸';
            elements.playBtn.setAttribute('aria-label', 'Pause auto-scrolling');
            // Start auto-scrolling the lyrics
            startAutoScroll();
        } else {
            elements.playBtn.classList.remove('playing');
            elements.playBtn.textContent = '▶';
            elements.playBtn.setAttribute('aria-label', 'Play auto-scrolling');
            // Stop auto-scrolling the lyrics
            stopAutoScroll();
        }
    }

    /**
     * Toggle favorite state for current case study
     */
    function toggleFavorite() {
        const isFavorite = !caseStudies[state.currentIndex].favorite;
        caseStudies[state.currentIndex].favorite = isFavorite;
        elements.favoriteBtn.setAttribute('aria-pressed', isFavorite);
        updateCaseStudy();
        
        const message = isFavorite ? 'Added to favorites' : 'Removed from favorites';
        announceContentChange(message);
    }

    // ===================================================================
    // Split View Functions
    // ===================================================================
    
    /**
     * Add event listeners for fullscreen player controls
     */
    function addFullscreenControlListeners() {
        // Navigation controls
        if (elements.fullscreenPrevBtn) {
            elements.fullscreenPrevBtn.addEventListener('click', () => {
                previousSlide();
                // Update the play button state to match main view
                syncPlayButtonStates();
            });
        }
        
        if (elements.fullscreenNextBtn) {
            elements.fullscreenNextBtn.addEventListener('click', () => {
                nextSlide();
                // Update the play button state to match main view
                syncPlayButtonStates();
            });
        }
        
        // Play button
        if (elements.fullscreenPlayBtn) {
            elements.fullscreenPlayBtn.addEventListener('click', () => {
                togglePlay();
                // The play state will be updated in the togglePlay function
                // We just need to make sure the button appearance is synced
                syncPlayButtonStates();
            });
        }
        
        // Favorite button
        if (elements.fullscreenFavoriteBtn) {
            elements.fullscreenFavoriteBtn.addEventListener('click', () => {
                toggleFavorite();
                // Update the favorite button state to match main view
                syncFavoriteButtonStates();
            });
        }
        
        // Ensure the fullscreen controls start with the correct states
        syncPlayButtonStates();
        syncFavoriteButtonStates();
    }

    /**
     * Sync the play button states between regular and fullscreen views
     */
    function syncPlayButtonStates() {
        if (elements.fullscreenPlayBtn && elements.playBtn) {
            // Sync playing class and text content
            elements.fullscreenPlayBtn.classList.toggle('playing', state.isPlaying);
            elements.fullscreenPlayBtn.textContent = state.isPlaying ? '⏸' : '▶';
            elements.fullscreenPlayBtn.setAttribute('aria-label', 
                state.isPlaying ? 'Pause auto-scrolling' : 'Play auto-scrolling');
        }
    }

    /**
     * Sync the favorite button states between regular and fullscreen views
     */
    function syncFavoriteButtonStates() {
        if (elements.fullscreenFavoriteBtn && elements.favoriteBtn) {
            const isFavorite = caseStudies[state.currentIndex].favorite;
            elements.fullscreenFavoriteBtn.classList.toggle('active', isFavorite);
            elements.fullscreenFavoriteBtn.setAttribute('aria-pressed', isFavorite);
        }
    }

    /**
     * Toggle fullscreen split view
     * Modified to handle Vimeo iframes
     */
    function toggleSplitViewFullscreen() {
        isSplitViewFullscreen = !isSplitViewFullscreen;
        
        // Simply toggle the active class
        if (isSplitViewFullscreen) {
            // Show fullscreen view
            elements.splitViewFullscreen.classList.add('active');
            
            // Lock body scrolling
            document.body.style.overflow = 'hidden';
            
            // Transfer video time is not needed for iframes
            
            // Update fullscreen lyrics content
            updateFullscreenLyrics();
            
            // Sync control states
            syncPlayButtonStates();
            syncFavoriteButtonStates();
            
            // Focus close button
            elements.minimizeSplitViewBtn.focus();
        } else {
            // Hide fullscreen view
            elements.splitViewFullscreen.classList.remove('active');
            
            // Restore body scrolling
            document.body.style.overflow = '';
            
            // Transfer video time is not needed for iframes
            
            // Focus expand button
            elements.expandSplitViewBtn.focus();
        }
    }

    /**
     * Update the fullscreen lyrics content to match the main view
     */
    function updateFullscreenLyrics() {
        if (!elements.splitViewLyricsContent || !elements.fullscreenSplitViewLyricsContent) return;
        
        // Clone the content from the main view to the fullscreen view
        elements.fullscreenSplitViewLyricsContent.innerHTML = elements.splitViewLyricsContent.innerHTML;
        
        // Make sure active paragraphs stay active
        const activeParagraph = elements.splitViewLyricsContent.querySelector('p.active');
        if (activeParagraph) {
            const index = activeParagraph.dataset.index;
            const fullscreenParagraph = elements.fullscreenSplitViewLyricsContent.querySelector(`p[data-index="${index}"]`);
            if (fullscreenParagraph) {
                fullscreenParagraph.classList.add('active');
            }
        }
    }

    /**
     * Load video for current case study into both regular and fullscreen players
     * Updated to handle both regular videos and Vimeo embeds
     */
    function loadCurrentVideo() {
        const currentStudy = caseStudies[state.currentIndex];
        
        if (!currentStudy || !currentStudy.video) {
            console.warn('No video available for this case study');
            return;
        }
        
        console.log('Loading video: ', currentStudy.video);
        
        // Function to create iframe for Vimeo
        function createVimeoIframe(url, className) {
            // Convert direct Vimeo URL to embed URL
            // From: https://vimeo.com/1083215667/450e10daee
            // To: https://player.vimeo.com/video/1083215667?h=450e10daee
            
            let embedUrl = url;
            if (url.includes('vimeo.com/') && !url.includes('player.vimeo.com')) {
                const parts = url.split('/');
                const videoId = parts[parts.length - 2];
                const hash = parts[parts.length - 1];
                embedUrl = `https://player.vimeo.com/video/${videoId}?h=${hash}`;
            }
            
            const iframe = document.createElement('iframe');
            iframe.src = embedUrl;
            iframe.className = className;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; fullscreen; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.display = "block";
            iframe.style.visibility = "visible";
            iframe.style.opacity = "1";
            iframe.style.position = "relative";
            iframe.style.zIndex = "10";
            iframe.style.minHeight = "200px";
            
            console.log('Created iframe with src:', embedUrl);
            return iframe;
        }
        
        // Handle Vimeo videos
        if (currentStudy.isVimeo) {
            // Update regular video player
            if (elements.splitViewCaseStudyVideo) {
                // Get the container that holds the video
                const videoContainer = elements.splitViewCaseStudyVideo.parentElement;
                
                // Remove the current video element
                elements.splitViewCaseStudyVideo.remove();
                
                // Create a new iframe for Vimeo
                const vimeoIframe = createVimeoIframe(currentStudy.video, 'case-study-video');
                
                // Add it to the container
                videoContainer.appendChild(vimeoIframe);
                
                // Update the reference in elements object
                elements.splitViewCaseStudyVideo = vimeoIframe;
            }
            
            // Update fullscreen video player
            if (elements.fullscreenCaseStudyVideo) {
                // Get the container that holds the video
                const fullscreenVideoContainer = elements.fullscreenCaseStudyVideo.parentElement;
                
                // Remove the current video element
                elements.fullscreenCaseStudyVideo.remove();
                
                // Create a new iframe for Vimeo
                const fullscreenVimeoIframe = createVimeoIframe(currentStudy.video, 'fullscreen-case-study-video');
                
                // Add it to the container
                fullscreenVideoContainer.appendChild(fullscreenVimeoIframe);
                
                // Update the reference in elements object
                elements.fullscreenCaseStudyVideo = fullscreenVimeoIframe;
            }
        } else {
            // Original code for regular video files (keeping this as a fallback)
            // Update regular video player
            if (elements.splitViewCaseStudyVideo) {
                // First, check if it's an iframe (from previous Vimeo video)
                if (elements.splitViewCaseStudyVideo.tagName === 'IFRAME') {
                    // Replace iframe with video element
                    const videoContainer = elements.splitViewCaseStudyVideo.parentElement;
                    elements.splitViewCaseStudyVideo.remove();
                    
                    const videoElement = document.createElement('video');
                    videoElement.className = 'case-study-video';
                    videoElement.controls = true;
                    
                    const source = document.createElement('source');
                    source.src = currentStudy.video;
                    source.type = 'video/mp4';
                    
                    videoElement.appendChild(source);
                    videoContainer.appendChild(videoElement);
                    
                    elements.splitViewCaseStudyVideo = videoElement;
                } else {
                    // It's already a video element, just update the source
                    let videoSource = elements.splitViewCaseStudyVideo.querySelector('source');
                    
                    if (!videoSource) {
                        videoSource = document.createElement('source');
                        videoSource.type = 'video/mp4';
                        elements.splitViewCaseStudyVideo.appendChild(videoSource);
                    }
                    
                    videoSource.src = currentStudy.video;
                    elements.splitViewCaseStudyVideo.src = currentStudy.video;
                    elements.splitViewCaseStudyVideo.load();
                }
            }
            
            // Similar logic for fullscreen video
            if (elements.fullscreenCaseStudyVideo) {
                // First, check if it's an iframe (from previous Vimeo video)
                if (elements.fullscreenCaseStudyVideo.tagName === 'IFRAME') {
                    // Replace iframe with video element
                    const videoContainer = elements.fullscreenCaseStudyVideo.parentElement;
                    elements.fullscreenCaseStudyVideo.remove();
                    
                    const videoElement = document.createElement('video');
                    videoElement.className = 'fullscreen-case-study-video';
                    videoElement.controls = true;
                    
                    const source = document.createElement('source');
                    source.src = currentStudy.video;
                    source.type = 'video/mp4';
                    
                    videoElement.appendChild(source);
                    videoContainer.appendChild(videoElement);
                    
                    elements.fullscreenCaseStudyVideo = videoElement;
                } else {
                    // It's already a video element, just update the source
                    let videoSource = elements.fullscreenCaseStudyVideo.querySelector('source');
                    
                    if (!videoSource) {
                        videoSource = document.createElement('source');
                        videoSource.type = 'video/mp4';
                        elements.fullscreenCaseStudyVideo.appendChild(videoSource);
                    }
                    
                    videoSource.src = currentStudy.video;
                    elements.fullscreenCaseStudyVideo.src = currentStudy.video;
                    elements.fullscreenCaseStudyVideo.load();
                }
            }
        }
        
        // Update fullscreen title and description
        const fullscreenTitle = document.getElementById('fullscreen-split-title');
        const fullscreenDescription = document.querySelector('.fullscreen-description');
        
        if (fullscreenTitle) {
            fullscreenTitle.textContent = currentStudy.title;
        }
        
        if (fullscreenDescription) {
            fullscreenDescription.textContent = currentStudy.description;
        }
    }

    /**
     * Initialize split view functionality
     */
    function initializeSplitView() {
        // Add event listeners for fullscreen toggle
        if (elements.expandSplitViewBtn) {
            elements.expandSplitViewBtn.addEventListener('click', toggleSplitViewFullscreen);
        }
        
        if (elements.minimizeSplitViewBtn) {
            elements.minimizeSplitViewBtn.addEventListener('click', toggleSplitViewFullscreen);
        }
        
        // Add fullscreen control listeners
        addFullscreenControlListeners();
        
        // Set up video synchronization between regular and fullscreen
        if (elements.splitViewCaseStudyVideo && elements.fullscreenCaseStudyVideo) {
            // Sync play/pause state
            elements.splitViewCaseStudyVideo.addEventListener('play', () => {
                if (isSplitViewFullscreen) {
                    elements.fullscreenCaseStudyVideo.play();
                }
            });
            
            elements.splitViewCaseStudyVideo.addEventListener('pause', () => {
                if (isSplitViewFullscreen) {
                    elements.fullscreenCaseStudyVideo.pause();
                }
            });
            
            elements.fullscreenCaseStudyVideo.addEventListener('play', () => {
                if (!isSplitViewFullscreen) {
                    elements.splitViewCaseStudyVideo.play();
                }
            });
            
            elements.fullscreenCaseStudyVideo.addEventListener('pause', () => {
                if (!isSplitViewFullscreen) {
                    elements.splitViewCaseStudyVideo.pause();
                }
            });
        }
        
        // Preload video for the first case study
        loadCurrentVideo();
        
        // Ensure ESC key closes fullscreen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isSplitViewFullscreen) {
                toggleSplitViewFullscreen();
            }
        });
    }

   // ===================================================================
    // Lyrics & Content Display Functions
    // ===================================================================
    
    /**
     * Update lyrics content when case study changes
     */
    function updateLyrics() {
        const currentStudy = caseStudies[state.currentIndex];
        const title = currentStudy.title;
        const content = caseStudyContent[title] || [];
        
        // Reset state
        currentParagraphIndex = 0;
        stopAutoScroll();
        
        if (!elements.splitViewLyricsContent) return;
        
        // Clear and update content
        elements.splitViewLyricsContent.innerHTML = '';
        
        content.forEach((paragraph, index) => {
            const normalP = document.createElement('p');
            normalP.textContent = paragraph;
            normalP.dataset.index = index;
            // For accessibility - make active paragraph focusable
            if (index === 0) {
                normalP.setAttribute('tabindex', '0');
            }
            elements.splitViewLyricsContent.appendChild(normalP);
        });
        
        // Update fullscreen content if it's active
        if (isSplitViewFullscreen) {
            updateFullscreenLyrics();
        }
        
        // Calculate total duration based on number of paragraphs
        const totalSeconds = content.length * (SCROLL_INTERVAL / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const durationText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        // Update duration displays
        const totalDurationElements = document.querySelectorAll('.total-duration');
        totalDurationElements.forEach(el => {
            el.textContent = durationText;
        });
        
        // Reset progress
        const progressElements = document.querySelectorAll('.progress-completed');
        progressElements.forEach(el => {
            el.style.width = '0%';
        });
        
        const currentTimestampElements = document.querySelectorAll('.current-timestamp');
        currentTimestampElements.forEach(el => {
            el.textContent = '0:00';
        });
        
        // If we were playing before switching case studies, maintain the playing state
        if (state.isPlaying) {
            startAutoScroll();
        }
    }

    /**
     * Start auto-scrolling through lyrics
     */
    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        
        const content = caseStudyContent[caseStudies[state.currentIndex].title] || [];
        if (content.length === 0) return;
        
        // Highlight the first paragraph immediately
        currentParagraphIndex = 0;
        highlightParagraph(currentParagraphIndex);
        updateProgress(0);
        scrollToActiveParagraph();
        updateTimestamp();
        
        // Set interval for scrolling
        autoScrollInterval = setInterval(() => {
            currentParagraphIndex++;
            
            if (currentParagraphIndex >= content.length) {
                currentParagraphIndex = 0;
                updateProgress(0);
            } else {
                const progress = (currentParagraphIndex / (content.length - 1)) * 100;
                updateProgress(progress);
            }
            
            highlightParagraph(currentParagraphIndex);
            scrollToActiveParagraph();
            updateTimestamp();
        }, SCROLL_INTERVAL);
    }

    /**
     * Stop auto-scrolling
     */
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    /**
     * Highlight the active paragraph in both main and fullscreen views
     * @param {number} index - Index of paragraph to highlight
     */
    function highlightParagraph(index) {
        // Remove active class from all paragraphs in both main and fullscreen views
        document.querySelectorAll('.lyrics-content p, .fullscreen-lyrics-content p').forEach(p => {
            p.classList.remove('active');
            p.setAttribute('tabindex', '-1');
        });
        
        // Add active class to current paragraphs in main view
        const mainParagraph = elements.splitViewLyricsContent.querySelector(`p[data-index="${index}"]`);
        if (mainParagraph) {
            mainParagraph.classList.add('active');
            mainParagraph.setAttribute('tabindex', '0');
        }
        
        // Add active class to current paragraphs in fullscreen view if it's active
        if (isSplitViewFullscreen) {
            const fullscreenParagraph = elements.fullscreenSplitViewLyricsContent.querySelector(`p[data-index="${index}"]`);
            if (fullscreenParagraph) {
                fullscreenParagraph.classList.add('active');
                fullscreenParagraph.setAttribute('tabindex', '0');
            }
        }
    }

    /**
     * Scroll to make active paragraph visible in the current view
     */
    function scrollToActiveParagraph() {
        // Scroll in main view
        const mainContainer = elements.splitViewLyricsContent.parentElement;
        const mainActiveParagraph = elements.splitViewLyricsContent.querySelector('p.active');
        
        if (mainActiveParagraph && mainContainer) {
            mainActiveParagraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Scroll in fullscreen view if active
        if (isSplitViewFullscreen) {
            const fullscreenContainer = elements.fullscreenSplitViewLyricsContent;
            const fullscreenActiveParagraph = fullscreenContainer.querySelector('p.active');
            
            if (fullscreenActiveParagraph) {
                fullscreenActiveParagraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    /**
     * Update progress bar in all views
     * @param {number} percentage - Progress percentage (0-100)
     */
    function updateProgress(percentage) {
        // Update progress in all progress bars
        const progressElements = document.querySelectorAll('.progress-completed');
        progressElements.forEach(el => {
            el.style.width = `${percentage}%`;
        });
    }

    /**
     * Update timestamp display in all views
     */
    function updateTimestamp() {
        const content = caseStudyContent[caseStudies[state.currentIndex].title] || [];
        if (content.length === 0) return;
        
        // Calculate time based on current paragraph index and seconds per paragraph
        const currentSeconds = currentParagraphIndex * (SCROLL_INTERVAL / 1000);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = Math.floor(currentSeconds % 60);
        const timestamp = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        // Update all timestamp displays
        const timestampElements = document.querySelectorAll('.current-timestamp');
        timestampElements.forEach(el => {
            el.textContent = timestamp;
        });
    }

    // ===================================================================
    // Touch Events for Mobile
    // ===================================================================
    
    /**
     * Handle touch start event
     */
    function handleTouchStart(e) {
        state.touchStartX = e.touches[0].clientX;
    }

    /**
     * Handle touch end event
     */
    function handleTouchEnd(e) {
        state.touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }

    /**
     * Process swipe gesture and navigate case studies
     */
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = state.touchEndX - state.touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                previousSlide();
            } else {
                nextSlide();
            }
        }
    }

    // ===================================================================
    // Navigation & UI Components
    // ===================================================================

    /**
     * Initialize navigation links with smooth scrolling
     */
    function initializeNavigationLinks() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navHeight = document.querySelector('.navigation').offsetHeight;
                    // Add extra offset to prevent showing horizontal lines
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Set focus to the target element
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            });
        });
    }

    /**
     * Initialize accordion functionality for track toggles
     */
    function initializeTrackAccordion() {
        if (!elements.trackToggles || elements.trackToggles.length === 0) return;

        elements.trackToggles.forEach((toggle) => {
            // Initially collapse all content
            toggle.setAttribute('aria-expanded', 'false');
            
            toggle.addEventListener('click', () => {
                // Get current state
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                
                // Close all other tracks
                elements.trackToggles.forEach((otherToggle) => {
                    if (otherToggle !== toggle) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current track
                toggle.setAttribute('aria-expanded', !isExpanded);
                
                // Toggle class on the content
                const content = toggle.nextElementSibling;
                if (content && content.classList.contains('skills-track-content')) {
                    content.classList.toggle('open', !isExpanded);
                }
            });
            
            // Add keyboard support
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.click();
                }
            });
        });
    }

    /**
     * Initialize floating back to top button
     */
    function initializeFloatingBackToTop() {
        const floatingBackToTop = document.querySelector('.floating-back-to-top');
        if (!floatingBackToTop) return;

        // Show/hide based on scroll position
        function handleFloatingBackToTop() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 400) {
                floatingBackToTop.classList.add('visible');
            } else {
                floatingBackToTop.classList.remove('visible');
            }
        }

        // Scroll to top when clicked
        floatingBackToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        handleFloatingBackToTop();
        window.addEventListener('scroll', handleFloatingBackToTop);
    }

    /**
     * Initialize mobile menu functionality
     */
    function initializeMobileMenu() {
        // Get existing elements
        const menuToggle = document.querySelector('.menu-toggle');
        const navOverlay = document.querySelector('.nav-overlay');
        const navLeft = document.querySelector('.nav-left');
        
        if (!menuToggle || !navLeft) return;
      
        // Add LinkedIn icon to mobile menu
        const linkedInIcon = document.querySelector('.nav-right .social-icon');
        if (linkedInIcon && !document.querySelector('.mobile-linkedin')) {
            const mobileLinkedIn = document.createElement('div');
            mobileLinkedIn.className = 'mobile-linkedin';
            
            const linkedInClone = linkedInIcon.cloneNode(true);
            mobileLinkedIn.appendChild(linkedInClone);
            navLeft.appendChild(mobileLinkedIn);
        }
        
        // Toggle menu function
        function toggleMenu() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            navLeft.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            
            // Toggle between hamburger and close icons
            if (navLeft.classList.contains('active')) {
                menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>`;
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
                
                // Focus on the first nav link for keyboard accessibility
                const firstNavLink = navLeft.querySelector('a');
                if (firstNavLink) {
                    firstNavLink.focus();
                }
            } else {
                menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12h18M3 6h18M3 18h18"></path>
                </svg>`;
                
                // Restore body scroll
                document.body.style.overflow = '';
                
                menuToggle.focus();
            }
        }
        
        // Event listeners
        menuToggle.addEventListener('click', toggleMenu);
        if (navOverlay) {
            navOverlay.addEventListener('click', toggleMenu);
        }
        
        // Close menu when a nav link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLeft.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLeft.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Close menu on window resize to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && navLeft.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    /**
     * Initialize Skills & Interests carousel
     */
    function initializeSkillsCarousel() {
        if (!elements.skillsCarouselSlides) return;
        
        let currentSkillsSlide = 0;
        
        // Update carousel position
        function updateSkillsCarousel() {
            if (!elements.skillsCarouselSlides) return;
            
            elements.skillsCarouselSlides.style.transform = `translateX(-${currentSkillsSlide * 50}%)`;
            
            // Update button states
            if (elements.skillsPrevBtn) {
                elements.skillsPrevBtn.disabled = currentSkillsSlide === 0;
            }
            
            if (elements.skillsNextBtn) {
                elements.skillsNextBtn.disabled = currentSkillsSlide === 1;
            }
            
            // Update indicators
            if (elements.skillsIndicators) {
                elements.skillsIndicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSkillsSlide);
                });
            }
            
            console.log('Skills carousel updated to slide:', currentSkillsSlide);
        }
        
        // Event listeners for skills carousel
        if (elements.skillsPrevBtn) {
            elements.skillsPrevBtn.addEventListener('click', function() {
                if (currentSkillsSlide > 0) {
                    currentSkillsSlide--;
                    updateSkillsCarousel();
                }
            });
        }
        
        if (elements.skillsNextBtn) {
            elements.skillsNextBtn.addEventListener('click', function() {
                if (currentSkillsSlide < 1) {
                    currentSkillsSlide++;
                    updateSkillsCarousel();
                }
            });
        }
        
        // Indicator event listeners
        if (elements.skillsIndicators) {
            elements.skillsIndicators.forEach(function(indicator, index) {
                indicator.addEventListener('click', function() {
                    currentSkillsSlide = index;
                    updateSkillsCarousel();
                });
            });
        }
        
        // Initialize starting position
        updateSkillsCarousel();
        
        // Initialize track toggles
        const trackToggles = document.querySelectorAll('.skills-track-toggle');
        trackToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function() {
                const content = this.nextElementSibling;
                
                // Close all other tracks
                document.querySelectorAll('.skills-track-content').forEach(function(item) {
                    if (item !== content) {
                        item.classList.remove('open');
                    }
                });
                
                // Toggle current track
                content.classList.toggle('open');
            });
        });
    }

    /**
     * Initialize enhanced swipe detection
     */
    function initializeSwipeDetection() {
        document.addEventListener('touchstart', function(e) {
            state.touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            // Only handle horizontal swipes on the main content areas
            if (!e.target.closest('.spotify-player') && 
                !e.target.closest('.case-study-grid') &&
                !e.target.closest('.track-toggle')) {
                return;
            }
            
            state.touchEndX = e.changedTouches[0].clientX;
            const swipeThreshold = 70;
            const swipeDistance = state.touchEndX - state.touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    previousSlide();
                } else {
                    nextSlide();
                }
            }
        }, { passive: true });
    }

    /**
     * Initialize fade-in effects with Intersection Observer
     */
    function initializeFadeInEffects() {
        const fadeEls = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        fadeEls.forEach(el => observer.observe(el));
    }

    // ===================================================================
    // Visualizer
    // ===================================================================

    /**
     * Initialize music visualizer canvas
     * @param {HTMLCanvasElement} canvas - Canvas element for visualizer
     */
    function initializeVisualizer(canvas) {
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        
        // Create visualizer bars
        const barCount = 50; // Increased from 40 for more detail
        const barWidth = canvas.width / barCount;
        const bars = [];
        
        // Initialize bars with random heights
        for (let i = 0; i < barCount; i++) {
            bars.push({
                height: Math.random() * 50,
                targetHeight: Math.random() * 50,
                speed: 0.15 + Math.random() * 0.25,
                // Add custom hue variation to make it more interesting
                hue: 120 + Math.random() * 20 // Green with slight variation
            });
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Center the visualizer vertically
            const yCenter = canvas.height / 2;
            
            for (let i = 0; i < bars.length; i++) {
                // Occasionally change target height
                if (Math.random() < 0.08) {
                    bars[i].targetHeight = Math.random() * 150;
                }
                
                // Move current height toward target
                const diff = bars[i].targetHeight - bars[i].height;
                bars[i].height += diff * bars[i].speed;
                
                const x = i * barWidth;
                const height = bars[i].height;
                
                // Create gradient for each bar
                const gradient = ctx.createLinearGradient(0, yCenter - height, 0, yCenter + height);
                gradient.addColorStop(0, `hsla(${bars[i].hue}, 80%, 60%, 0.8)`); // Top
                gradient.addColorStop(0.5, `hsla(${bars[i].hue}, 80%, 40%, 0.4)`); // Middle
                gradient.addColorStop(1, `hsla(${bars[i].hue}, 80%, 60%, 0.8)`); // Bottom
                
                ctx.fillStyle = gradient;
                
                // Draw upper bar with rounded corners
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(x, yCenter - height, barWidth - 2, height, 3);
                } else {
                    // Fallback for browsers that don't support roundRect
                    ctx.rect(x, yCenter - height, barWidth - 2, height);
                }
                ctx.fill();
                
                // Draw lower bar with rounded corners (mirror)
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(x, yCenter, barWidth - 2, height, 3);
                } else {
                    ctx.rect(x, yCenter, barWidth - 2, height);
                }
                ctx.fill();
                
                // Add glow effect
                ctx.shadowBlur = 5;
                ctx.shadowColor = `hsla(${bars[i].hue}, 80%, 60%, 0.5)`;
            }
            
            // Add pulsing circle effect in center for more depth
            const pulseSize = 100 + Math.sin(Date.now() * 0.001) * 30;
            const pulseOpacity = 0.15 + Math.sin(Date.now() * 0.002) * 0.05;
            
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(21, 168, 77, ${pulseOpacity})`;
            ctx.fill();
            
            // Add subtle particles in background
            for (let i = 0; i < 3; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 3 + 1;
                
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
                ctx.fill();
            }
            
            requestAnimationFrame(animate);
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            resizeCanvas();
        });
        
        // Start animation
        animate();
        
        // Make visualizer react to scroll position
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = scrollY / maxScroll;
            
            // Affect bar heights based on scroll position
            for (let i = 0; i < bars.length; i++) {
                if (i % 3 === 0) {
                    bars[i].targetHeight = 50 + scrollPercent * 100;
                }
            }
        });
    }

    // ===================================================================
    // Accessibility Helpers
    // ===================================================================

    /**
     * Announce content changes for screen readers
     * @param {string} message - Message to announce
     */
    function announceContentChange(message) {
        // Create or use existing live region
        let liveRegion = document.getElementById('a11y-announcer');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'a11y-announcer';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'visually-hidden';
            document.body.appendChild(liveRegion);
        }
        
        // Update content to trigger announcement
        liveRegion.textContent = message;
        
        // Clear after a short delay
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 3000);
    }

    // ===================================================================
    // Event Listeners
    // ===================================================================

    /**
     * Initialize all event listeners
     */
    function initializeEventListeners() {
        if (elements.prevBtn) {
            elements.prevBtn.addEventListener('click', previousSlide);
        }
        
        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', nextSlide);
        }
        
        if (elements.playBtn) {
            elements.playBtn.addEventListener('click', togglePlay);
        }
        
        if (elements.favoriteBtn) {
            elements.favoriteBtn.addEventListener('click', toggleFavorite);
        }

        if (elements.spotifyPlayer) {
            elements.spotifyPlayer.addEventListener('touchstart', handleTouchStart);
            elements.spotifyPlayer.addEventListener('touchend', handleTouchEnd);
        }

        // Keyboard navigation for control buttons
        const controlButtons = document.querySelectorAll('.control-btn');
        controlButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    // ===================================================================
    // Initialization
    // ===================================================================

    /**
     * Main initialization function
     * Calls all setup and initialization functions
     */
    function initialize() {
        // Create a skip link for keyboard accessibility
        const skipLink = document.createElement('a');
        skipLink.setAttribute('class', 'skip-link');
        skipLink.setAttribute('href', '#top-tracks');
        skipLink.textContent = 'Skip to case studies';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Initialize 3D effects first
        initializeTiltEffects();
        
        // Then initialize regular features
        updateCaseStudy();
        initializeEventListeners();
        initializeNavigationLinks();
        initializeFloatingBackToTop();
        initializeTrackAccordion();
        initializeMobileMenu();
        initializeSwipeDetection();
        initializeFadeInEffects();
        initializeSkillsCarousel();
        
        // Initialize split view functionality
        initializeSplitView();
        
        // Create and add canvas for visualizer
        const canvas = document.createElement('canvas');
        canvas.id = 'visualizer-canvas';
        document.body.prepend(canvas);
        
        // Initialize visualizer
        initializeVisualizer(canvas);
        
        // Handle window resize events
        window.addEventListener('resize', function() {
            // Disable tilt on mobile and re-enable on desktop
            if (window.innerWidth <= 768) {
                // Remove tilt effects on mobile
                const tiltElements = document.querySelectorAll('[data-tilt]');
                tiltElements.forEach(element => {
                    if (element.vanillaTilt) {
                        element.vanillaTilt.destroy();
                    }
                });
            } else {
                // Re-initialize tilt effects on desktop
                initializeTiltEffects();
            }
        });
    }

    // Start everything
    initialize();
});