// ---------- header: scroll state ----------
const siteHeader = document.getElementById('siteHeader');
function updateHeaderScrollState() {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
updateHeaderScrollState();

// ---------- desktop dropdown ("当院について") ----------
const navDropdown = document.getElementById('navDropdown');
const ddToggle = document.getElementById('ddToggle');

navDropdown.addEventListener('mouseenter', () => navDropdown.classList.add('is-open'));
navDropdown.addEventListener('mouseleave', () => navDropdown.classList.remove('is-open'));
ddToggle.addEventListener('click', () => navDropdown.classList.toggle('is-open'));
navDropdown.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => navDropdown.classList.remove('is-open'))
);

// ---------- mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
});
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
  })
);

// ---------- hero carousel ----------
const heroSlides = document.querySelectorAll('#heroSlides .hero-slide');
const heroDots = document.querySelectorAll('#heroDots button');
let heroCurrent = 0;
let heroTimer;

function goToHeroSlide(i) {
  heroSlides[heroCurrent].classList.remove('is-active');
  heroDots[heroCurrent].classList.remove('is-active');
  heroCurrent = i;
  heroSlides[heroCurrent].classList.add('is-active');
  heroDots[heroCurrent].classList.add('is-active');
}

function startHeroTimer() {
  heroTimer = setInterval(() => goToHeroSlide((heroCurrent + 1) % heroSlides.length), 5000);
}

heroDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(heroTimer);
    goToHeroSlide(i);
    startHeroTimer();
  });
});

startHeroTimer();

// ---------- voice carousel ----------
const voiceTrack = document.getElementById('voiceTrack');
const voiceCards = document.querySelectorAll('.voice-card');
const voiceDots = document.querySelectorAll('#voiceDots button');
const voicePrev = document.getElementById('voicePrev');
const voiceNext = document.getElementById('voiceNext');
let voiceCurrent = 0;

function goToVoiceSlide(i) {
  voiceCurrent = (i + voiceCards.length) % voiceCards.length;
  voiceTrack.style.transform = `translateX(-${voiceCurrent * 100}%)`;
  voiceDots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === voiceCurrent));
}

voicePrev.addEventListener('click', () => goToVoiceSlide(voiceCurrent - 1));
voiceNext.addEventListener('click', () => goToVoiceSlide(voiceCurrent + 1));
voiceDots.forEach((dot, i) => dot.addEventListener('click', () => goToVoiceSlide(i)));

// ---------- FAQ accordion (exclusive: opening one closes the others) ----------
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    const willOpen = !item.classList.contains('is-open');
    faqItems.forEach((other) => other.classList.remove('is-open'));
    if (willOpen) item.classList.add('is-open');
  });
});

// ---------- floating reservation widget ----------
const floatWidget = document.getElementById('floatWidget');
const floatToggle = document.getElementById('floatToggle');
floatToggle.addEventListener('click', () => floatWidget.classList.toggle('is-open'));

// ---------- fade-up on scroll ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));
