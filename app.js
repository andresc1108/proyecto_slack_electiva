/* ══════════════════════════════════════════════════
   app.js — WorkFlow Landing Page
   Módulos:
     1. Navbar  → sombra al hacer scroll
     2. Cards   → animación de entrada con IntersectionObserver
     3. Chat    → interacción del input (demostración)
══════════════════════════════════════════════════ */


/* ─────────────────────────────────────
   1. NAVBAR — sombra al hacer scroll
───────────────────────────────────── */

/**
 * Agrega o quita la clase "scrolled" al navbar
 * dependiendo de si el usuario hizo scroll.
 * La clase aplica box-shadow definido en CSS.
 */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ─────────────────────────────────────
   2. FEATURE CARDS — animación con IntersectionObserver
───────────────────────────────────── */

/**
 * Observa cada .feature-card y, cuando entra al viewport,
 * agrega la clase "visible" que activa la transición CSS.
 * El delay escalonado (stagger) da un efecto en cascada.
 */
(function initCardAnimations() {
  const cards = document.querySelectorAll('.feature-card');
  if (!cards.length) return;

  const STAGGER_MS = 120; // delay entre cada tarjeta

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const card  = entry.target;
          const index = Array.from(cards).indexOf(card);

          // Delay escalonado según posición de la tarjeta
          card.style.transitionDelay = (index * STAGGER_MS) + 'ms';
          card.classList.add('visible');

          // Una vez animada, dejamos de observarla
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.12 }
  );

  cards.forEach(function (card) {
    observer.observe(card);
  });
})();


/* ─────────────────────────────────────
   3. CHAT INPUT — demostración interactiva
───────────────────────────────────── */

/**
 * Simula el envío de un mensaje en el mockup.
 * Al hacer clic en "Enviar" (o presionar Enter),
 * el campo vuelve a su texto original animado.
 */
(function initChatDemo() {
  const input   = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  if (!input || !sendBtn) return;

  const DEFAULT_TEXT   = '¡Todo apunta a que podremos…';
  const SENT_TEXT      = '✓ Mensaje enviado';
  const RESET_DELAY_MS = 1800;

  function sendMessage() {
    if (input.value.trim() === '') return;

    // Feedback visual de envío
    input.value = SENT_TEXT;
    input.style.color = '#007a5a';
    sendBtn.style.background = '#005c44';

    // Resetear después de un momento
    setTimeout(function () {
      input.value = DEFAULT_TEXT;
      input.style.color = '';
      sendBtn.style.background = '';
    }, RESET_DELAY_MS);
  }

  // Clic en botón de envío
  sendBtn.addEventListener('click', sendMessage);

  // Enter desde el teclado
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

  // Permitir escribir en el input (era readonly)
  input.removeAttribute('readonly');
  input.value = DEFAULT_TEXT;
})();
