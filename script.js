// ===================================
// VELOURA FASHION HOUSE - JAVASCRIPT
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app features
function initializeApp() {
    setupMobileNav();
    setupThemeToggle();
    setupProductFilters();
    setupFormValidation();
    setupDOMDemos();
    loadThemePreference();
}

// ===================================
// MOBILE NAVIGATION
// ===================================
function setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// ===================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ===================================
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');

            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
    }
}

function loadThemePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// ===================================
// PRODUCT FILTERS
// ===================================
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter products with animation
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===================================
// FORM VALIDATION
// ===================================
function setupFormValidation() {
    const form = document.getElementById('appointmentForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Clear previous errors
            clearErrors();

            let isValid = true;

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;

            // Validate name
            if (name === '') {
                showError('nameError', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate phone
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (phone === '') {
                showError('phoneError', 'Phone number is required');
                isValid = false;
            } else if (!phoneRegex.test(phone) || phone.length < 10) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }

            // Validate date
            if (date === '') {
                showError('dateError', 'Appointment date is required');
                isValid = false;
            } else {
                const selectedDate = new Date(date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {
                    showError('dateError', 'Please select a future date');
                    isValid = false;
                }
            }

            // If form is valid, show success message
            if (isValid) {
                form.style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';

                // Log form data (in real app, this would be sent to server)
                console.log('Form submitted:', {
                    name,
                    email,
                    phone,
                    date,
                    service: document.getElementById('service').value,
                    message: document.getElementById('message').value
                });
            }
        });
    }
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// ===================================
// EVENTS PAGE - RSVP
// ===================================
function rsvpEvent(eventName) {
    alert(`Thank you for your interest in: ${eventName}\n\nWe'll contact you shortly with more details!`);
}

// ===================================
// DOM MANIPULATION DEMOS
// ===================================
function setupDOMDemos() {
    // Set up event listener for hover box demo
    const hoverBox = document.getElementById('hoverBox');
    const eventOutput = document.getElementById('eventOutput');

    if (hoverBox && eventOutput) {
        let hoverCount = 0;

        hoverBox.addEventListener('mouseenter', function() {
            hoverCount++;
            eventOutput.textContent = `Mouse entered! (${hoverCount} times)`;
        });

        hoverBox.addEventListener('mouseleave', function() {
            eventOutput.textContent = `Mouse left! (${hoverCount} total enters)`;
        });

        hoverBox.addEventListener('click', function() {
            eventOutput.textContent = 'Box clicked! Event listeners are working!';
        });
    }
}

// Demo 1: Change Text
function changeText() {
    const textElement = document.getElementById('demoText');
    const messages = [
        'Text changed using textContent!',
        'Welcome to Veloura Fashion House!',
        'JavaScript DOM Manipulation',
        'Original Text: Welcome to Veloura!'
    ];

    const currentText = textElement.textContent;
    const currentIndex = messages.indexOf(currentText);
    const nextIndex = (currentIndex + 1) % messages.length;

    textElement.textContent = messages[nextIndex];
}

// Demo 2: Change Styles
function changeStyle() {
    const styleBox = document.getElementById('styleBox');
    const colors = ['#d4af37', '#1a1a1a', '#c9a961', '#8b7355', '#2c2c2c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    styleBox.style.backgroundColor = randomColor;
    styleBox.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4})`;
    styleBox.style.borderRadius = `${Math.random() * 50}%`;
}

function resetStyle() {
    const styleBox = document.getElementById('styleBox');
    styleBox.style.backgroundColor = '#d4af37';
    styleBox.style.transform = 'rotate(0deg) scale(1)';
    styleBox.style.borderRadius = '0';
}

// Demo 3: Toggle Class
function toggleClass() {
    const classBox = document.getElementById('classBox');
    classBox.classList.toggle('highlight');
}

// Demo 4: Add Items
function addItem() {
    const input = document.getElementById('itemInput');
    const itemList = document.getElementById('itemList');
    const itemText = input.value.trim();

    if (itemText === '') {
        alert('Please enter an item name');
        return;
    }

    // Create new element
    const newItem = document.createElement('div');
    newItem.className = 'list-item';

    const textSpan = document.createElement('span');
    textSpan.textContent = itemText;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-item';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() {
        newItem.remove();
    };

    newItem.appendChild(textSpan);
    newItem.appendChild(removeBtn);

    // Add to list
    itemList.appendChild(newItem);

    // Clear input
    input.value = '';
}

function clearItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
}

// Demo 5: Remove Box
function removeBox(element) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0)';
    setTimeout(() => {
        element.remove();
    }, 300);
}

function resetBoxes() {
    const container = document.getElementById('boxContainer');
    container.innerHTML = `
        <div class="removable-box" onclick="removeBox(this)">Click to Remove 1</div>
        <div class="removable-box" onclick="removeBox(this)">Click to Remove 2</div>
        <div class="removable-box" onclick="removeBox(this)">Click to Remove 3</div>
        <div class="removable-box" onclick="removeBox(this)">Click to Remove 4</div>
    `;
}

// Demo 6: Query Selectors
function highlightAll() {
    const items = document.querySelectorAll('.query-item');
    items.forEach(item => {
        item.classList.add('highlighted');
    });
}

function highlightFirst() {
    resetHighlight();
    const firstItem = document.querySelector('.query-item');
    if (firstItem) {
        firstItem.classList.add('highlighted');
    }
}

function resetHighlight() {
    const items = document.querySelectorAll('.query-item');
    items.forEach(item => {
        item.classList.remove('highlighted');
    });
}

// Demo 7: Attributes
function setAttributes() {
    const img = document.getElementById('demoImage');
    img.setAttribute('src', 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="%23d4af37"/><text x="50%" y="50%" text-anchor="middle" fill="white" font-size="24">Veloura</text></svg>');
    img.setAttribute('alt', 'Veloura Logo');
    img.setAttribute('title', 'Fashion House Logo');
    img.style.display = 'block';

    const attrInfo = document.getElementById('attrInfo');
    attrInfo.textContent = 'Attributes have been set! Click "Show Attributes" to view them.';
}

function showAttributes() {
    const img = document.getElementById('demoImage');
    const attrInfo = document.getElementById('attrInfo');

    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    const title = img.getAttribute('title');

    if (src) {
        attrInfo.innerHTML = `
            <strong>Image Attributes:</strong><br>
            src: ${src ? 'SVG data URL' : 'Not set'}<br>
            alt: ${alt || 'Not set'}<br>
            title: ${title || 'Not set'}
        `;
    } else {
        attrInfo.textContent = 'No attributes set yet. Click "Set Attributes" first.';
    }
}

// ===================================
// SMOOTH SCROLL (BONUS FEATURE)
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// PRODUCT CARD HOVER EFFECTS
// ===================================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        const productName = this.querySelector('h3').textContent;
        const productPrice = this.querySelector('.product-price').textContent;
        alert(`Product: ${productName}\nPrice: ${productPrice}\n\nThank you for your interest!`);
    });
});

// ===================================
// CONSOLE LOG - APP INITIALIZED
// ===================================
console.log('🎨 Veloura Fashion House - Website Initialized');
console.log('✓ Navigation setup complete');
console.log('✓ Theme toggle active');
console.log('✓ Product filters ready');
console.log('✓ Form validation enabled');
console.log('✓ DOM demos configured');
