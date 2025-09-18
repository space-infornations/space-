// Main JavaScript file for the Cosmic Blog

/**
 * Initializes all the interactive elements of the website once the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Cosmic Blog is ready to launch!');

    // Initialize Particles.js for the animated background
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 160,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "star",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 1,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 4,
                        "size_min": 0.3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 250,
                        "size": 0,
                        "duration": 2,
                        "opacity": 0,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 400,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Smooth scroll for "Go to Top" button
    const goToTopButton = document.querySelector('.go-to-top');
    if (goToTopButton) {
        // Scroll to top on click
        goToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                goToTopButton.style.display = 'block';
            } else {
                goToTopButton.style.display = 'none';
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.style.color = '#ff00ff';
            } else {
                // On successful validation, show a success message and reset the form
                formStatus.textContent = 'Thank you for your message!';
                formStatus.style.color = '#00ffff';
                contactForm.reset();
            }
        });
    }

    // Blog Post Search
    const searchInput = document.getElementById('blog-search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            const searchQuery = searchInput.value.toLowerCase();
            const blogPosts = document.querySelectorAll('.blog-grid .post-card');

            blogPosts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const summary = post.querySelector('.summary').textContent.toLowerCase();

                if (title.includes(searchQuery) || summary.includes(searchQuery)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Blog Pagination
    const blogGrid = document.querySelector('.blog-grid');
    if (blogGrid) {
        const posts = Array.from(blogGrid.querySelectorAll('.post-card'));
        const postsPerPage = 3;
        const paginationContainer = document.querySelector('.pagination');
        let currentPage = 1;

        function displayPage(page) {
            currentPage = page;
            const startIndex = (page - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;

            posts.forEach((post, index) => {
                if (index >= startIndex && index < endIndex) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });

            renderPagination();
        }

        function renderPagination() {
            const pageCount = Math.ceil(posts.length / postsPerPage);
            paginationContainer.innerHTML = '';

            for (let i = 1; i <= pageCount; i++) {
                const link = document.createElement('a');
                link.href = '#';
                link.innerText = i;
                if (i === currentPage) {
                    link.classList.add('active');
                }
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    displayPage(i);
                });
                paginationContainer.appendChild(link);
            }
        }

        displayPage(1);
    }

    // Animated Timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.5
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Category Filters for the featured posts on the Home page
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');

    if (filterButtons.length > 0 && postCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter posts
                postCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
