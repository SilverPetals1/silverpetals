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
   6. NEWSLETTER LEAD MAGNET & FREE GUIDE DOWNLOAD
   ========================================================================== */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim()) return;

      const email = input.value.trim();
      
      // Simulate success and guide delivery
      form.innerHTML = `
        <div style="background: rgba(31,190,202,0.15); border: 1px solid var(--color-primary); padding: 1rem 1.5rem; border-radius: var(--radius-sm); text-align: center; color: #FFFFFF; width: 100%;">
          <div style="font-size: 1.4rem; margin-bottom: 0.3rem;">🎉 Welcome to the Artisan Club!</div>
          <p style="font-size: 0.9rem; margin-bottom: 0.6rem;">We've sent your <strong>Free 28-Page Jewelry Making Guide</strong> to <em>${email}</em>.</p>
          <a href="tutorial-detail.html" class="btn btn-gold btn-sm" style="display: inline-block;">Start Your 1st DIY Project Now &rarr;</a>
        </div>
      `;

      showToast('💌 Guide sent to your inbox! Happy crafting!');
    });
  });
}

/* ==========================================================================
   7. LIVE SEARCH FILTER
   ========================================================================== */
function initLiveSearch() {
  const searchInput = document.querySelector('.header-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim().toLowerCase();
      if (q) {
        window.location.href = `blog.html?q=${encodeURIComponent(q)}`;
      }
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
   ECOMMERCE SHOPPING CART ENGINE (SilverPetals)
   ========================================================================== */
const cartState = {
  items: [
    {
      id: 'sp-earrings-1',
      title: 'SilverPetals™ Rainbow Moonstone Drop Earrings',
      variant: '925 Sterling Silver / Teardrop',
      price: 68.00,
      image: 'assets/images/silver-petal-earrings.jpg',
      qty: 1
    }
  ]
};

function initCartDrawer() {
  const cartBtn = document.querySelector('.js-open-cart');
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const closeBtn = document.querySelector('.cart-close-btn');

  if (cartBtn && cartOverlay) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  }

  if (closeBtn && cartOverlay) {
    closeBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // Delegate Add to Bag buttons
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.btn-add-bag');
    if (!addBtn) return;

    e.preventDefault();
    const id = addBtn.dataset.id || 'sp-custom-' + Date.now();
    const title = addBtn.dataset.title || 'SilverPetals™ Artisan Jewelry';
    const price = parseFloat(addBtn.dataset.price || '58.00');
    const image = addBtn.dataset.image || 'assets/images/silver-petal-earrings.jpg';

    // Add or increment
    const existing = cartState.items.find(i => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cartState.items.push({ id, title, variant: '925 Sterling Silver', price, image, qty: 1 });
    }

    renderCart();
    openCart();
    showToast(`🛍️ Added ${title} to your bag!`);
  });

  renderCart();
}

function openCart() {
  const overlay = document.querySelector('.cart-drawer-overlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const overlay = document.querySelector('.cart-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function renderCart() {
  const itemsContainer = document.querySelector('.cart-items-body');
  const badge = document.querySelector('.cart-badge-count');
  const subtotalEl = document.querySelector('.cart-subtotal-val');

  const totalCount = cartState.items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartState.items.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (badge) badge.textContent = totalCount;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  if (!itemsContainer) return;

  if (cartState.items.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛍️</div>
        <p style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-main);">Your Shopping Bag is Empty</p>
        <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Discover our bestselling SilverPetals botanical collections.</p>
        <a href="shop.html" class="btn btn-primary btn-sm" onclick="closeCart()">Explore Jewelry &rarr;</a>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cartState.items.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.title}</div>
        <div class="cart-item-variant">${item.variant} &times; ${item.qty}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <span class="cart-item-remove" onclick="removeCartItem('${item.id}')">Remove</span>
      </div>
    </div>
  `).join('');
}

window.removeCartItem = function(id) {
  cartState.items = cartState.items.filter(i => i.id !== id);
  renderCart();
  showToast('Item removed from shopping bag');
};

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
});
