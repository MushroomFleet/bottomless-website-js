/**
 * Bottomless.js v1.0.0
 * 
 * A lightweight JavaScript library that creates an infinite vertical scrolling experience.
 * Users can scroll endlessly in either direction, with page content seamlessly looping.
 * 
 * https://github.com/username/bottomless
 * 
 * MIT License
 */

(function(global) {
    'use strict';

    /**
     * Bottomless class
     * Creates an infinite scrolling effect on the page
     */
    class Bottomless {
        /**
         * Create a new bottomless page instance
         * @param {Object} options - Configuration options
         * @param {string} options.contentSelector - CSS selector for the content to be looped
         * @param {boolean} options.showPageIndicator - Whether to show the current page indicator
         * @param {number} options.maxClones - Maximum number of clones to keep in DOM
         * @param {boolean} options.smoothTransition - Whether to use CSS transitions when jumping
         * @param {Function} options.onPageChange - Callback when page changes
         */
        constructor(options = {}) {
            // Default options
            this.options = {
                contentSelector: '.page-content',
                showPageIndicator: false,
                maxClones: 3,
                smoothTransition: true,
                onPageChange: null,
                ...options
            };

            // State variables
            this.initialized = false;
            this.currentPage = 1;
            this.pageHeight = 0;
            this.lastScrollY = 0;
            this.isTransitioning = false;
            this.container = null;
            this.originalContent = null;
            this.pageIndicator = null;
            
            // Bind methods
            this.handleScroll = this.handleScroll.bind(this);
            this.init = this.init.bind(this);
            this.destroy = this.destroy.bind(this);

            // Initialize if DOM is already loaded
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                this.init();
            } else {
                document.addEventListener('DOMContentLoaded', this.init);
            }
        }

        /**
         * Initialize the bottomless page effect
         */
        init() {
            try {
                // Find the content element
                this.originalContent = document.querySelector(this.options.contentSelector);
                
                if (!this.originalContent) {
                    throw new Error(`Content element not found: ${this.options.contentSelector}`);
                }

                // Create container
                this.container = document.createElement('div');
                this.container.className = 'bottomless-container';
                this.container.style.position = 'relative';
                this.container.style.minHeight = '100vh';
                
                // Wrap original content
                this.originalContent.parentNode.insertBefore(this.container, this.originalContent);
                this.container.appendChild(this.originalContent);
                this.originalContent.id = 'bottomless-content-original';
                
                // Get page height
                this.pageHeight = this.originalContent.offsetHeight;
                
                if (this.pageHeight === 0) {
                    throw new Error('Content has zero height. Cannot create bottomless page.');
                }

                // Create clones
                this.createInitialClones();
                
                // Create page indicator if needed
                if (this.options.showPageIndicator) {
                    this.createPageIndicator();
                }
                
                // Add scroll event listener
                window.addEventListener('scroll', this.handleScroll, { passive: true });
                
                // Additional initialization for smooth transitions
                if (this.options.smoothTransition) {
                    document.documentElement.style.scrollBehavior = 'smooth';
                }
                
                this.initialized = true;
                this.log('Bottomless page initialized');
            } catch (error) {
                this.error('Failed to initialize bottomless page:', error);
            }
        }

        /**
         * Create initial clones of the original content
         */
        createInitialClones() {
            // Clone for below
            const cloneBelow = this.originalContent.cloneNode(true);
            cloneBelow.id = 'bottomless-content-below';
            this.container.appendChild(cloneBelow);
            
            // Clone for above (initially positioned out of view)
            const cloneAbove = this.originalContent.cloneNode(true);
            cloneAbove.id = 'bottomless-content-above';
            this.container.insertBefore(cloneAbove, this.originalContent);
        }

        /**
         * Create the page indicator element
         */
        createPageIndicator() {
            this.pageIndicator = document.createElement('div');
            this.pageIndicator.className = 'bottomless-page-indicator';
            this.pageIndicator.innerHTML = 'Page: <span id="bottomless-current-page">1</span>';
            this.pageIndicator.style.position = 'fixed';
            this.pageIndicator.style.right = '10px';
            this.pageIndicator.style.top = '10px';
            this.pageIndicator.style.background = 'rgba(0,0,0,0.7)';
            this.pageIndicator.style.color = 'white';
            this.pageIndicator.style.padding = '5px 10px';
            this.pageIndicator.style.borderRadius = '15px';
            this.pageIndicator.style.fontSize = '12px';
            this.pageIndicator.style.zIndex = '9999';
            document.body.appendChild(this.pageIndicator);
        }

        /**
         * Handle scroll events
         */
        handleScroll() {
            if (!this.initialized || this.isTransitioning) return;
            
            const scrollY = window.scrollY;
            const direction = scrollY > this.lastScrollY ? 'down' : 'up';
            this.lastScrollY = scrollY;
            
            // Calculate current position within the page sequence
            const relativeScrollY = scrollY % this.pageHeight;
            const currentPageEstimate = Math.floor(scrollY / this.pageHeight) + 1;
            
            // Update page indicator and trigger callback if page changed
            if (currentPageEstimate !== this.currentPage) {
                this.currentPage = currentPageEstimate;
                
                if (this.options.showPageIndicator) {
                    document.getElementById('bottomless-current-page').textContent = this.currentPage;
                }
                
                if (typeof this.options.onPageChange === 'function') {
                    this.options.onPageChange(this.currentPage);
                }
            }
            
            // Handle downward scrolling - add clone at bottom when needed
            if (direction === 'down' && relativeScrollY < 50 && scrollY > this.pageHeight) {
                this.isTransitioning = true;
                
                // Create another clone for below
                const newCloneBelow = this.originalContent.cloneNode(true);
                newCloneBelow.id = `bottomless-content-below-${this.currentPage}`;
                this.container.appendChild(newCloneBelow);
                
                // Remove excess clones to prevent memory issues
                this.cleanupClones();
                
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 100);
            }
            
            // Handle upward scrolling - add clone at top when needed
            if (direction === 'up' && relativeScrollY > this.pageHeight - 50 && scrollY < this.pageHeight * (this.container.children.length - 2)) {
                this.isTransitioning = true;
                
                // Create another clone for above
                const newCloneAbove = this.originalContent.cloneNode(true);
                newCloneAbove.id = `bottomless-content-above-${this.currentPage}`;
                this.container.insertBefore(newCloneAbove, this.container.firstChild);
                
                // Remove excess clones to prevent memory issues
                this.cleanupClones();
                
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 100);
            }
        }
        
        /**
         * Clean up excess clones to prevent memory issues
         */
        cleanupClones() {
            while (this.container.children.length > this.options.maxClones + 1) {
                // Remove from bottom if we're scrolling up
                if (this.lastScrollY < this.pageHeight * 2) {
                    this.container.removeChild(this.container.lastChild);
                } 
                // Remove from top if we're scrolling down
                else {
                    this.container.removeChild(this.container.firstChild);
                }
            }
        }
        
        /**
         * Get the current page number
         * @returns {number} Current page number
         */
        getCurrentPage() {
            return this.currentPage;
        }
        
        /**
         * Reset to the first page
         */
        resetToFirstPage() {
            window.scrollTo({
                top: this.pageHeight,
                behavior: this.options.smoothTransition ? 'smooth' : 'auto'
            });
            this.currentPage = 1;
            
            if (this.options.showPageIndicator) {
                document.getElementById('bottomless-current-page').textContent = "1";
            }
        }
        
        /**
         * Destroy the bottomless page and clean up
         */
        destroy() {
            if (!this.initialized) return;
            
            window.removeEventListener('scroll', this.handleScroll);
            
            // Remove page indicator
            if (this.pageIndicator) {
                document.body.removeChild(this.pageIndicator);
            }
            
            // Unwrap original content from container
            if (this.container && this.originalContent) {
                const parent = this.container.parentNode;
                
                // Move original content out
                parent.insertBefore(this.originalContent, this.container);
                
                // Remove container with clones
                parent.removeChild(this.container);
                
                // Reset original content ID
                this.originalContent.id = '';
            }
            
            // Reset state
            this.initialized = false;
            this.log('Bottomless page destroyed');
        }
        
        /**
         * Log a message to the console
         */
        log(...args) {
            console.log('%c[Bottomless]', 'color: #6366F1', ...args);
        }
        
        /**
         * Log an error to the console
         */
        error(...args) {
            console.error('%c[Bottomless]', 'color: #EF4444', ...args);
        }
    }
    
    // Add to global scope
    global.Bottomless = Bottomless;
    
})(typeof window !== 'undefined' ? window : this);

// Support for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.Bottomless;
}