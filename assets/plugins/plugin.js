/* ========================================
   PORTFOLIO PLUGIN - Project Grid Enhancement
   ======================================== */

(function(window) {
    'use strict';

    const PortfolioPlugin = {
        options: {
            selector: '.project-grid',
            animationSpeed: 300,
            debug: false
        },

        init: function(opts) {
            this.options = Object.assign({}, this.options, opts || {});
            this.log('Plugin initialized', this.options);
            this.enhanceProjectGrid();
        },

        enhanceProjectGrid: function() {
            const grid = document.querySelector(this.options.selector);
            if (!grid) {
                this.log('Project grid not found');
                return;
            }

            const cards = grid.querySelectorAll('.project-card');
            
            // Add staggered animation to cards
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('fade-in');
            });

            // Add interaction tracking
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    this.log('Card hover', card.querySelector('.project-title').textContent);
                });

                // Track external link clicks
                const links = card.querySelectorAll('.project-btn');
                links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        this.log('Project button clicked', {
                            text: link.textContent,
                            project: card.querySelector('.project-title').textContent
                        });
                    });
                });
            });

            this.log('Project grid enhanced');
        },

        log: function(message, data) {
            if (this.options.debug) {
                console.log(`[PortfolioPlugin] ${message}`, data || '');
            }
        }
    };

    // Export to global scope
    window.PortfolioPlugin = PortfolioPlugin;

})(window);

// Auto-initialize if data attribute exists
document.addEventListener('DOMContentLoaded', function() {
    if (typeof PortfolioPlugin !== 'undefined') {
        PortfolioPlugin.init();
    }
});
