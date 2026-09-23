// Toggle Navbar Menu on Mobile
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// Scroll Active Link Highlight
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Remove Toggle Icon and Navbar on Scroll Link Click
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};



/* ===== Interactive Project Filter ===== */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        projectCards.forEach(card => {
            const matches = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !matches);
        });
    });
});

/* ===== Scroll Progress + Back To Top ===== */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.prepend(progressBar);

const backToTop = document.createElement('button');
backToTop.id = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(backToTop);

function updateScrollUI() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = progress + '%';
    backToTop.classList.toggle('show', window.scrollY > 450);
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== Smooth Reveal / Section Animation ===== */
const revealElements = document.querySelectorAll(
    'section, .services-box, .project-card, .contact form'
);

revealElements.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
} else {
    revealElements.forEach(el => el.classList.add('visible'));
}
