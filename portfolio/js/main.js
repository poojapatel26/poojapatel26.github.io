// Apple Portfolio - Main JavaScript

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Add scrolled class to navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Add staggered animation to children if they exist
      const children = entry.target.querySelectorAll('.project-card, .skill-category, .stat-card');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  observer.observe(section);
});

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.project-card, .skill-category, .stat-card');

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });
};

// Initialize animations
animateOnScroll();

// Active navigation link on scroll
const highlightNavigation = () => {
  const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', highlightNavigation);

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - scrolled / 700;
    }
  });
}

// Scroll indicator hide on scroll
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
    }
  });
}

// Add smooth transition to scroll indicator
if (scrollIndicator) {
  scrollIndicator.style.transition = 'opacity 0.3s ease';
}

// Preload optimization - Add loading class
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add CSS class for active nav link
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: #0071e3;
    background-color: rgba(0, 113, 227, 0.1);
  }

  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Smooth reveal on page load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
    heroElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Performance optimization - Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }

  scrollTimeout = window.requestAnimationFrame(() => {
    // Scroll-based updates here
  });
});

// Console message (Apple style)
console.log(
  '%c Welcome to Pooja Patel\'s Portfolio ',
  'background: #0071e3; color: white; font-size: 16px; padding: 10px; border-radius: 5px;'
);

console.log(
  '%c Built with HTML, CSS (SASS), and JavaScript ',
  'color: #6e6e73; font-size: 12px;'
);
