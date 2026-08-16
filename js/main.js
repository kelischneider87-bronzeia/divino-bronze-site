// =========================================================
// DIVINO BRONZE — interações do site
// =========================================================
document.addEventListener('DOMContentLoaded', function () {

                            // Ano dinâmico no rodapé
                            document.querySelectorAll('[data-year]').forEach(function (el) {
                                  el.textContent = new Date().getFullYear();
                            });

                            // Header: encolhe / ganha fundo ao rolar
                            var header = document.querySelector('.site-header');
    function handleScroll() {
          if (!header) return;
          if (window.scrollY > 40) header.classList.add('scrolled');
          else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

                            // Menu mobile
                            var toggle = document.querySelector('.nav-toggle');
    var panel = document.querySelector('.mobile-panel');
    var closeBtn = document.querySelector('.mobile-close');
    function openPanel() { panel && panel.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closePanel() { panel && panel.classList.remove('open'); document.body.style.overflow = ''; }
    toggle && toggle.addEventListener('click', openPanel);
    closeBtn && closeBtn.addEventListener('click', closePanel);
    panel && panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closePanel); });

                            // Marca link ativo no menu conforme a página atual
                            var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a, .mobile-panel a').forEach(function (a) {
          var href = a.getAttribute('href');
          if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
    });

                            // FAQ accordion
                            document.querySelectorAll('.faq-item').forEach(function (item) {
                                  var q = item.querySelector('.faq-q');
                                  var a = item.querySelector('.faq-a');
                                  if (!q || !a) return;
                                  a.style.maxHeight = item.classList.contains('open') ? a.scrollHeight + 'px' : '0px';
                                  q.addEventListener('click', function () {
                                          var isOpen = item.classList.contains('open');
                                          // fecha os outros itens do mesmo grupo
                                                           var group = item.closest('.faq-list');
                                          if (group) {
                                                    group.querySelectorAll('.faq-item.open').forEach(function (openItem) {
                                                                if (openItem !== item) {
                                                                              openItem.classList.remove('open');
                                                                              openItem.querySelector('.faq-a').style.maxHeight = '0px';
                                                                }
                                                    });
                                          }
                                          item.classList.toggle('open', !isOpen);
                                          a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : '0px';
                                  });
                            });

                            // Tabs (teoria / prática)
                            document.querySelectorAll('.tabs-head').forEach(function (head) {
                                  var wrapper = head.closest('.tabs');
                                  if (!wrapper) return;
                                  var btns = head.querySelectorAll('.tab-btn');
                                  var panels = wrapper.querySelectorAll('.tab-panel');
                                  btns.forEach(function (btn) {
                                          btn.addEventListener('click', function () {
                                                    var target = btn.getAttribute('data-tab');
                                                    btns.forEach(function (b) { b.classList.remove('active'); });
                                                    panels.forEach(function (p) { p.classList.remove('active'); });
                                                    btn.classList.add('active');
                                                    var panel = wrapper.querySelector('.tab-panel[data-tab="' + target + '"]');
                                                    panel && panel.classList.add('active');
                                          });
                                  });
                            });

                            // Reveal on scroll — content is visible by default (see CSS); we only
                            // opt elements into the hidden/fade-in state once the observer is ready,
                            // so a JS error elsewhere can never leave the page permanently blank.
                            var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
          var io = new IntersectionObserver(function (entries) {
                  entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                        entry.target.classList.add('in-view');
                                        io.unobserve(entry.target);
                            }
                  });
          }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
          revealEls.forEach(function (el) {
                  el.classList.add('reveal-pending');
                  io.observe(el);
          });
    }
});
