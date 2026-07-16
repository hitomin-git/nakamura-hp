// ---------- header: scroll state ----------
const siteHeader = document.getElementById('siteHeader');
const mobileMenu = document.getElementById('mobileMenu');
function updateHeaderScrollState() {
  // while the mobile menu is open, force the "scrolled" (light) header style so it
  // doesn't clash with the light menu panel underneath — even at the very top of the page.
  const shouldBeLight = window.scrollY > 60 || mobileMenu.classList.contains('is-open');
  siteHeader.classList.toggle('is-scrolled', shouldBeLight);
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

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  updateHeaderScrollState();
});
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    updateHeaderScrollState();
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

// ---------- voice carousel (infinite loop via cloned end slides) ----------
const voiceTrack = document.getElementById('voiceTrack');
const voiceDots = document.querySelectorAll('#voiceDots button');
const voicePrev = document.getElementById('voicePrev');
const voiceNext = document.getElementById('voiceNext');

const voiceRealSlides = Array.from(voiceTrack.children);
const voiceTotal = voiceRealSlides.length;

const voiceFirstClone = voiceRealSlides[0].cloneNode(true);
const voiceLastClone = voiceRealSlides[voiceTotal - 1].cloneNode(true);
voiceFirstClone.setAttribute('aria-hidden', 'true');
voiceLastClone.setAttribute('aria-hidden', 'true');
voiceTrack.appendChild(voiceFirstClone);
voiceTrack.insertBefore(voiceLastClone, voiceRealSlides[0]);

const voiceSlideCount = voiceTotal + 2; // + 2 clones
const voiceTransitionMs = 500;
let voiceRealIndex = 0;
let voiceTrackPos = 1; // 1..voiceTotal are the real slides; 0 and voiceSlideCount-1 are clones
let voiceIsAnimating = false;
let voiceSettleTimer = null;

function renderVoiceTrack(withTransition, dragOffsetPx = 0) {
  voiceTrack.style.transition = withTransition ? `transform ${voiceTransitionMs}ms ease` : 'none';
  voiceTrack.style.transform =
    `translateX(calc(-${voiceTrackPos} * (var(--voice-card-width) + 1rem) + (100% - var(--voice-card-width)) / 2 + ${dragOffsetPx}px))`;
  voiceDots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === voiceRealIndex));
}

// after sliding onto a clone, snap (without animating) back to the matching real slide,
// then unlock so the next navigation input is accepted again
function settleVoiceTrack() {
  clearTimeout(voiceSettleTimer);
  if (voiceTrackPos === voiceSlideCount - 1) {
    voiceTrackPos = 1;
    renderVoiceTrack(false);
  } else if (voiceTrackPos === 0) {
    voiceTrackPos = voiceTotal;
    renderVoiceTrack(false);
  }
  voiceIsAnimating = false;
}

// transitionend normally fires this, but if a rapid input somehow interrupts the
// transition before it completes, this fallback timer still unlocks navigation
// instead of leaving the track stuck past the clones with nothing rendered.
voiceTrack.addEventListener('transitionend', settleVoiceTrack);

function goToVoiceSlide(step) {
  if (voiceIsAnimating) return;
  voiceIsAnimating = true;
  voiceRealIndex = (voiceRealIndex + step + voiceTotal) % voiceTotal;
  voiceTrackPos += step;
  renderVoiceTrack(true);
  clearTimeout(voiceSettleTimer);
  voiceSettleTimer = setTimeout(settleVoiceTrack, voiceTransitionMs + 100);
}

function jumpToVoiceSlide(index) {
  if (voiceIsAnimating) return;
  voiceIsAnimating = true;
  voiceRealIndex = index;
  voiceTrackPos = index + 1;
  renderVoiceTrack(true);
  clearTimeout(voiceSettleTimer);
  voiceSettleTimer = setTimeout(settleVoiceTrack, voiceTransitionMs + 100);
}

voicePrev.addEventListener('click', () => goToVoiceSlide(-1));
voiceNext.addEventListener('click', () => goToVoiceSlide(1));
voiceDots.forEach((dot, i) => dot.addEventListener('click', () => jumpToVoiceSlide(i)));

// ---------- swipe / drag support ----------
let voiceDragStartX = null;
let voiceDragDeltaX = 0;
const voiceSwipeThreshold = 40;

voiceTrack.addEventListener('pointerdown', (e) => {
  if (voiceIsAnimating) return;
  voiceDragStartX = e.clientX;
  voiceDragDeltaX = 0;
  voiceTrack.setPointerCapture(e.pointerId);
});

voiceTrack.addEventListener('pointermove', (e) => {
  if (voiceDragStartX === null) return;
  voiceDragDeltaX = e.clientX - voiceDragStartX;
  renderVoiceTrack(false, voiceDragDeltaX);
});

function endVoiceDrag() {
  if (voiceDragStartX === null) return;
  const delta = voiceDragDeltaX;
  voiceDragStartX = null;
  voiceDragDeltaX = 0;
  if (delta > voiceSwipeThreshold) {
    goToVoiceSlide(-1);
  } else if (delta < -voiceSwipeThreshold) {
    goToVoiceSlide(1);
  } else {
    renderVoiceTrack(true);
  }
}

voiceTrack.addEventListener('pointerup', endVoiceDrag);
voiceTrack.addEventListener('pointercancel', endVoiceDrag);

renderVoiceTrack(false);

// ---------- FAQ accordion (each item opens/closes independently) ----------
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    item.classList.toggle('is-open');
  });
});

// ---------- floating reservation widget ----------
const floatWidget = document.getElementById('floatWidget');
const floatToggle = document.getElementById('floatToggle');

// PC: open automatically on first load, then close as soon as the user scrolls at all.
// Mobile: never auto-open (shown as a full-width bar at the bottom instead).
if (window.innerWidth > 640) {
  floatWidget.classList.add('is-open');
  window.addEventListener('scroll', () => floatWidget.classList.remove('is-open'), {
    passive: true,
    once: true,
  });
}

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
