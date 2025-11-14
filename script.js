// ==============================
// Portfolio Filter Functionality
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Photography Portfolio Loaded');

  // Portfolio Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');

          if (filterValue === 'all' || filterValue === itemCategory) {
            item.style.display = 'block';
            // Add fade-in animation
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ==============================
  // Booking Form Validation & Submission
  // ==============================
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const sessionDate = document.getElementById('sessionDate').value;
      const sessionType = document.getElementById('sessionType').value;
      const terms = document.getElementById('terms').checked;

      // Validation
      let errors = [];

      if (fullName === '') {
        errors.push('Please enter your full name');
      }

      if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
      }

      if (phone === '') {
        errors.push('Please enter your phone number');
      }

      if (sessionDate === '') {
        errors.push('Please select a session date');
      } else {
        // Check if date is in the future
        const selectedDate = new Date(sessionDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          errors.push('Please select a future date');
        }
      }

      if (sessionType === '') {
        errors.push('Please select a session type');
      }

      if (!terms) {
        errors.push('Please agree to the terms and conditions');
      }

      const formMessage = document.getElementById('formMessage');

      if (errors.length > 0) {
        formMessage.className = 'form-message error';
        formMessage.innerHTML = '<strong>Please fix the following errors:</strong><br>' + errors.join('<br>');
      } else {
        // Success - In a real application, this would send data to a server
        formMessage.className = 'form-message success';
        formMessage.innerHTML = '<strong>Success!</strong> Your booking request has been submitted. We\'ll contact you within 24 hours to confirm your session.';

        // Reset form
        bookingForm.reset();

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // ==============================
  // Contact Form Validation & Submission
  // ==============================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validation
      let errors = [];

      if (name === '') {
        errors.push('Please enter your name');
      }

      if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
      }

      if (subject === '') {
        errors.push('Please enter a subject');
      }

      if (message === '') {
        errors.push('Please enter a message');
      }

      const formMessage = document.getElementById('contactFormMessage');

      if (errors.length > 0) {
        formMessage.className = 'form-message error';
        formMessage.innerHTML = '<strong>Please fix the following errors:</strong><br>' + errors.join('<br>');
      } else {
        // Success - In a real application, this would send data to a server
        formMessage.className = 'form-message success';
        formMessage.innerHTML = '<strong>Message sent!</strong> Thank you for contacting us. We\'ll get back to you soon.';

        // Reset form
        contactForm.reset();

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // ==============================
  // Email Validation Helper
  // ==============================
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // ==============================
  // Smooth Scroll for Anchor Links
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==============================
  // Set Minimum Date for Booking Form
  // ==============================
  const sessionDateInput = document.getElementById('sessionDate');
  if (sessionDateInput) {
    // Set min date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    sessionDateInput.setAttribute('min', minDate);
  }

  // ==============================
  // Add Animation on Scroll
  // ==============================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe service cards, testimonials, etc.
  const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .featured-item, .info-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ==============================
  // Mobile Menu Toggle (if needed)
  // ==============================
  const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');

    if (window.innerWidth <= 768 && nav && !document.querySelector('.mobile-menu-toggle')) {
      const menuToggle = document.createElement('button');
      menuToggle.className = 'mobile-menu-toggle';
      menuToggle.innerHTML = '☰';
      menuToggle.style.cssText = 'display: block; font-size: 1.5rem; background: none; border: none; cursor: pointer; color: var(--primary-color);';

      nav.insertBefore(menuToggle, navUl);

      menuToggle.addEventListener('click', () => {
        navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
        navUl.style.flexDirection = 'column';
        navUl.style.width = '100%';
        navUl.style.marginTop = '1rem';
      });
    }
  };

  // Check on load and resize
  createMobileMenu();
  window.addEventListener('resize', createMobileMenu);
});
  