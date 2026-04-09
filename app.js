// BANTEX AI映像制作 LP v1.0

(function () {
  'use strict';

  // --- スムーズスクロール ---
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.body.classList.remove('menu-open');
      }
    });
  });

  // --- ハンバーガーメニュー ---
  var hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
    });
  }

  // --- ヘッダースクロール ---
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // --- ヒーロー背景動画ローテーション ---
  var heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    var heroSources = [
      'assets/videos/demo1.mp4',
      'assets/videos/demo6.mp4',
      'assets/videos/sweets.mp4'
    ];
    var heroIndex = 0;
    heroVideo.addEventListener('ended', function () {
      heroVideo.style.opacity = '0';
      setTimeout(function () {
        heroIndex = (heroIndex + 1) % heroSources.length;
        heroVideo.src = heroSources[heroIndex];
        heroVideo.play();
      }, 500);
    });
    heroVideo.addEventListener('playing', function () {
      heroVideo.style.opacity = '1';
    });
  }

  // --- 動画カードホバー再生 ---
  document.querySelectorAll('.video-card, .video-card-thumb').forEach(function (card) {
    var video = card.querySelector('video');
    if (!video) return;
    card.addEventListener('mouseenter', function () {
      video.play().catch(function () {});
    });
    card.addEventListener('mouseleave', function () {
      video.pause();
      video.currentTime = 0;
    });
  });

  // --- 動画モーダル ---
  var modal = document.getElementById('videoModal');
  var modalVideo = document.getElementById('modalVideo');
  var modalSource = document.getElementById('modalSource');

  function openModal(src) {
    modalSource.src = src;
    modalVideo.load();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalVideo.play();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  // video-card (CM section)
  document.querySelectorAll('.video-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(this.getAttribute('data-video'));
    });
  });

  // video-showcase-card (映像制作 & SNS sections)
  document.querySelectorAll('.video-showcase-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(this.getAttribute('data-video'));
    });
  });

  document.querySelector('.modal-close').addEventListener('click', closeModal);
  document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // --- スクロールアニメーション ---
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.section-header, .cm-item, .video-showcase-card, .price-card, .pricing-old, .pricing-vs'
  ).forEach(function (el) {
    el.classList.add('anim');
    observer.observe(el);
  });

  // --- CM flowのスタガーアニメーション ---
  document.querySelectorAll('.cm-item').forEach(function (item, i) {
    item.style.transitionDelay = (i * 0.15) + 's';
  });
  document.querySelectorAll('.price-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.1) + 's';
  });
})();
