/**
 * SILVER PETALS - Interactive Scripts & Pinterest Blogging Engine
 * Fully client-side, zero dependencies, high performance.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initPinterestSharers();
  initSuppliesChecklist();
  initCategoryFilters();
  initShopCategoryUrlFilter();
  initNewsletterForm();
  initLiveSearch();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL OBSERVER
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.drawer-close');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });
}

/* ==========================================================================
   3. ONE-CLICK PINTEREST SHARING & PIN IT HOVER BUTTONS
   ========================================================================== */
function initPinterestSharers() {
  // Delegate clicks on all Pinterest share buttons
  document.addEventListener('click', (e) => {
    const pinBtn = e.target.closest('.js-pin-share, .pin-hover-btn');
    if (!pinBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const url = encodeURIComponent(pinBtn.dataset.url || window.location.href);
    const media = encodeURIComponent(pinBtn.dataset.media || window.location.origin + '/assets/images/pinterest-wire-ring-pin.jpg');
    const desc = encodeURIComponent(pinBtn.dataset.desc || document.title + ' | DIY Jewelry Making Guide & Tutorials');

    const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}`;
    
    // Open in clean Pinterest popup
    const width = 750;
    const height = 550;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      pinUrl,
      'pinterest_share',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    showToast('📌 Opening Pinterest to save this pin!');
  });
}

/* ==========================================================================
   4. INTERACTIVE SUPPLIES CHECKLIST (Tutorial Pages)
   ========================================================================== */
function initSuppliesChecklist() {
  const checkboxes = document.querySelectorAll('.supply-checkbox');
  if (!checkboxes.length) return;

  const storageKey = 'silverpetals_checked_supplies';
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch (err) {
    saved = [];
  }

  checkboxes.forEach((cb) => {
    const id = cb.id || cb.dataset.supplyId;
    if (saved.includes(id)) {
      cb.checked = true;
      cb.closest('.supply-item')?.classList.add('completed');
    }

    cb.addEventListener('change', () => {
      const item = cb.closest('.supply-item');
      if (cb.checked) {
        item?.classList.add('completed');
        if (!saved.includes(id)) saved.push(id);
      } else {
        item?.classList.remove('completed');
        saved = saved.filter(x => x !== id);
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(saved));
      } catch (e) {}
    });
  });
}

/* ==========================================================================
   5. CATEGORY FILTERING (Blog & Tutorials Hub)
   ========================================================================== */
function initCategoryFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.filterable-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const categories = (card.dataset.category || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5B. SHOP PAGE CATEGORY FILTER BY URL PARAM (?category=earrings/necklaces/rings/bracelets...)
   ========================================================================== */
function initShopCategoryUrlFilter() {
  const sections = document.querySelectorAll('main.section section[id]');
  if (!sections.length) return;

  const urlParams = new URLSearchParams(window.location.search);
  let categoryParam = (urlParams.get('category') || '').toLowerCase().trim();

  // Also check window.location.hash if no search param
  if (!categoryParam && window.location.hash) {
    categoryParam = window.location.hash.replace('#', '').toLowerCase().trim();
  }

  if (!categoryParam) return;

  // Map sub-categories to available shop sections
  const categoryMap = {
    'rings': 'rings',
    'earrings': 'earrings',
    'necklaces': 'necklaces',
    'bracelets': 'bracelets',
    'bangles': 'bracelets',
    'bridal': 'necklaces',
    'choker': 'necklaces',
    'jhumka': 'earrings',
    'studs': 'earrings',
    'hoops': 'earrings'
  };

  const targetSectionId = categoryMap[categoryParam] || (document.getElementById(categoryParam) ? categoryParam : null);

  if (targetSectionId) {
    // Show only the relevant section if filtering by category
    sections.forEach(sec => {
      const secId = sec.id.toLowerCase();
      if (secId === targetSectionId) {
        sec.style.display = 'block';
        setTimeout(() => {
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        sec.style.display = 'none';
      }
    });
  }

  // Update navigation active state
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes(`category=${categoryParam}`) || (targetSectionId && href.includes(`category=${targetSectionId}`))) {
      link.parentElement?.classList.add('active');
    } else {
      link.parentElement?.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. NEWSLETTER LEAD MAGNET & FREE GUIDE DOWNLOAD
   ========================================================================== */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim()) return;

      form.innerHTML = `
        <div style="background: #FAF6EF; border: 1px solid var(--color-primary); padding: 1.2rem 1.5rem; border-radius: var(--radius-sm); text-align: center; color: var(--color-text-main); width: 100%;">
          <div style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 0.3rem; color: var(--color-primary-dark);">✨ Welcome to SilverPetals Journal</div>
          <p style="font-size: 0.95rem; margin-bottom: 0.8rem; color: var(--color-text-muted);">Thank you for joining. You will receive our latest jewelry guides and bridal styling articles directly in your inbox.</p>
          <a href="blog.html" class="btn btn-outline btn-sm" style="display: inline-block;">Explore Latest Articles &rarr;</a>
        </div>
      `;

      showToast('✨ Thank you for subscribing to SilverPetals editorial journal!');
    });
  });
}

/* ==========================================================================
   7. LIVE SEARCH FILTER
   ========================================================================== */
function initLiveSearch() {
  const searchInput = document.querySelector('.header-search-input');
  if (!searchInput) return;

  // Check URL query param if present
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q');
  if (qParam) {
    searchInput.value = qParam;
    filterBlogCards(qParam.toLowerCase());
  }

  // Live filter if on blog page
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (document.querySelectorAll('.blog-card').length) {
      filterBlogCards(q);
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim().toLowerCase();
      if (q && !document.querySelectorAll('.blog-card').length) {
        window.location.href = `blog.html?q=${encodeURIComponent(q)}`;
      }
    }
  });
}

function filterBlogCards(query) {
  const cards = document.querySelectorAll('.blog-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (!query || text.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}


/* ==========================================================================
   8. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

// Global copy link function
window.copyPageLink = function() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('🔗 Link copied to clipboard!');
  });
};

/* ==========================================================================
   OPTIONAL ECOMMERCE CART HELPER (Guarded for editorial pages)
   ========================================================================== */
function initCartDrawer() {
  const cartBtn = document.querySelector('.js-open-cart');
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const closeBtn = document.querySelector('.cart-close-btn');

  if (!cartBtn && !cartOverlay) return;

  if (cartBtn && cartOverlay) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && cartOverlay) {
    const close = () => {
      cartOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', close);
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) close();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
});

