/* ==========================================================================
   Gut and Health Wellness — Interactive App & WhatsApp Workflows
   ========================================================================== */

(function () {
  'use strict';

  const DATA = window.AppData;
  const CART_KEY = 'gh_wellness_cart_v1';
  const REG_KEY = 'gh_wellness_regs_v1';

  const state = {
    workshopFilter: 'All',
    productFilter: 'All',
    cart: loadJson(CART_KEY, []),
    registrations: loadJson(REG_KEY, [])
  };

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {
      /* ignore */
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatINR(num) {
    return '₹' + Number(num).toLocaleString('en-IN');
  }

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${DATA.brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function showToast(msg) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('is-visible'), 3000);
  }

  /* ------------------------------------------------------------------------
     Workshops Section (Gut Health First -> Yoga Second) + WhatsApp Modal
     ------------------------------------------------------------------------ */
  function renderWorkshops() {
    const filterMount = document.getElementById('workshop-filters');
    const gridMount = document.getElementById('workshops-grid');
    if (!filterMount || !gridMount) return;

    const cats = ['All', 'Gut Health Workshop', 'Yoga Workshop'];
    filterMount.innerHTML = cats
      .map(
        (cat) => `
      <button type="button" class="filter-pill ${state.workshopFilter === cat ? 'is-active' : ''}" data-ws-filter="${escapeHtml(cat)}">
        ${escapeHtml(cat === 'All' ? 'All Workshops (Gut & Yoga)' : cat === 'Gut Health Workshop' ? 'Gut Health Workshops (3)' : 'Yoga Workshop (1)')}
      </button>
    `
      )
      .join('');

    filterMount.querySelectorAll('[data-ws-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.workshopFilter = btn.dataset.wsFilter;
        renderWorkshops();
      });
    });

    const list =
      state.workshopFilter === 'All'
        ? DATA.workshops
        : DATA.workshops.filter((w) => w.category === state.workshopFilter);

    gridMount.innerHTML = list
      .map(
        (ws) => `
      <article class="card">
        <div class="card__media">
          <span class="badge badge--sage badge--live card__overlay-badge">${escapeHtml(ws.category)}</span>
          <img src="${escapeHtml(ws.image)}" alt="${escapeHtml(ws.title)}" loading="lazy">
        </div>
        <div class="card__body">
          <div class="card__meta">
            <span>${escapeHtml(ws.badge)}</span>
            <span>&middot;</span>
            <span>${escapeHtml(ws.duration)}</span>
          </div>
          <h3 class="card__title">${escapeHtml(ws.title)}</h3>
          <p class="card__text">${escapeHtml(ws.summary)}</p>
          <ul class="card__highlights">
            ${ws.highlights.map((h) => `<li>&check; ${escapeHtml(h)}</li>`).join('')}
          </ul>
          <div class="card__footer">
            <div>
              <span class="price-tag">${formatINR(ws.price)}</span>
              <span class="price-tag__old">${formatINR(ws.oldPrice)}</span>
            </div>
            <button type="button" class="btn btn--whatsapp btn--sm" data-register-ws="${escapeHtml(ws.id)}">
              Register &rarr; WhatsApp
            </button>
          </div>
        </div>
      </article>
    `
      )
      .join('');

    gridMount.querySelectorAll('[data-register-ws]').forEach((btn) => {
      btn.addEventListener('click', () => openWorkshopRegisterModal(btn.dataset.registerWs));
    });
  }

  function openWorkshopRegisterModal(wsId) {
    const ws = DATA.workshops.find((w) => w.id === wsId) || DATA.workshops[0];
    const body = document.getElementById('detail-modal-body');
    const batchesHtml = ws.batches.map((b) => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join('');

    body.innerHTML = `
      <span class="badge badge--sage badge--live" style="margin-bottom:10px;">${escapeHtml(ws.category)}</span>
      <h2 style="font-size:1.5rem; margin-bottom:6px;">${escapeHtml(ws.title)}</h2>
      <p style="font-size:0.9rem; color:var(--muted); margin-bottom:18px;">${escapeHtml(ws.duration)} &middot; ${escapeHtml(ws.mode)} &middot; Fee: <strong>${formatINR(ws.price)}</strong></p>

      <form class="form-stack" id="modal-ws-reg-form">
        <div>
          <label class="field-label">Full Name *</label>
          <input type="text" name="name" class="input-field" placeholder="Enter your full name" required>
        </div>
        <div class="form-row-2">
          <div>
            <label class="field-label">WhatsApp Number *</label>
            <input type="tel" name="phone" class="input-field" placeholder="10-digit WhatsApp number" required>
          </div>
          <div>
            <label class="field-label">Email (Optional)</label>
            <input type="email" name="email" class="input-field" placeholder="you@example.com">
          </div>
        </div>
        <div>
          <label class="field-label">Preferred Batch *</label>
          <select name="batch" class="input-field">${batchesHtml}</select>
        </div>
        <div>
          <label class="field-label">Health Goal / Notes (Optional)</label>
          <input type="text" name="goal" class="input-field" placeholder="e.g. Digestion relief, stress calm, flexibility">
        </div>
        <button type="submit" class="btn btn--whatsapp btn--lg" style="width:100%; margin-top:4px;">
          Complete Registration &amp; Open WhatsApp &rarr;
        </button>
      </form>
    `;

    openModal();

    document.getElementById('modal-ws-reg-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const entry = {
        name: String(fd.get('name') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        workshopTitle: ws.title,
        price: ws.price,
        batch: String(fd.get('batch') || ''),
        goal: String(fd.get('goal') || '').trim()
      };
      const waUrl = completeWorkshopRegistration(entry);
      body.innerHTML = renderRegistrationConfirmationHtml(entry, waUrl);
    });
  }

  function completeWorkshopRegistration(entry) {
    state.registrations.push({ ...entry, createdAt: new Date().toISOString() });
    saveJson(REG_KEY, state.registrations);

    const lines = [
      `Namaste ${DATA.brand.name}!`,
      `I would like to register for a workshop:`,
      `• Workshop: ${entry.workshopTitle} (${formatINR(entry.price)})`,
      `• Batch: ${entry.batch}`,
      `• Name: ${entry.name}`,
      `• WhatsApp Phone: ${entry.phone}`
    ];
    if (entry.email) lines.push(`• Email: ${entry.email}`);
    if (entry.goal) lines.push(`• Wellness Goal: ${entry.goal}`);
    lines.push(`Please confirm my seat and share the joining link.`);

    const waUrl = buildWhatsAppUrl(lines.join('\n'));
    showToast('Registration saved! Opening WhatsApp...');
    window.open(waUrl, '_blank', 'noopener');
    return waUrl;
  }

  function renderRegistrationConfirmationHtml(entry, waUrl) {
    return `
      <div style="text-align:center; padding:12px 0;">
        <span class="badge badge--sage" style="margin-bottom:10px;">Registration Saved</span>
        <h3 style="font-size:1.4rem; margin-bottom:8px;">Thank you, ${escapeHtml(entry.name)}!</h3>
        <p style="font-size:0.93rem; color:var(--muted); margin-bottom:18px;">
          Your details for <strong>${escapeHtml(entry.workshopTitle)}</strong> (${escapeHtml(entry.batch)}) are ready. Click below if WhatsApp did not open automatically:
        </p>
        <a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg" style="width:100%;">
          Open WhatsApp Chat Now &rarr;
        </a>
      </div>
    `;
  }

  function initInlineRegistration() {
    const select = document.getElementById('reg-workshop');
    if (select) {
      select.innerHTML = DATA.workshops
        .map((w) => `<option value="${escapeHtml(w.id)}">${escapeHtml(w.title)} — ${formatINR(w.price)}</option>`)
        .join('');
    }

    const container = document.getElementById('inline-register-container');
    const form = document.getElementById('inline-register-form');
    if (!form || !container) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const ws = DATA.workshops.find((w) => w.id === fd.get('workshopId')) || DATA.workshops[0];
      const entry = {
        name: String(fd.get('name') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        workshopTitle: ws.title,
        price: ws.price,
        batch: String(fd.get('batch') || ''),
        goal: String(fd.get('goal') || '').trim()
      };
      const waUrl = completeWorkshopRegistration(entry);
      const originalForm = container.innerHTML;

      container.innerHTML = `
        ${renderRegistrationConfirmationHtml(entry, waUrl)}
        <button type="button" class="btn btn--ghost btn--sm" id="reg-another-btn" style="margin:14px auto 0; display:flex;">
          Register Another Person
        </button>
      `;
      document.getElementById('reg-another-btn')?.addEventListener('click', () => {
        container.innerHTML = originalForm;
        initInlineRegistration();
      });
    });
  }

  /* ------------------------------------------------------------------------
     Advantages of Gut Health & Yoga + FAQs
     ------------------------------------------------------------------------ */
  function renderAdvantages() {
    const gutMount = document.getElementById('gut-advantages-list');
    const yogaMount = document.getElementById('yoga-advantages-list');

    if (gutMount) {
      gutMount.innerHTML = DATA.advantages.gut
        .map(
          (item) => `
        <div class="adv-item">
          <h4>&check; ${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.desc)}</p>
        </div>
      `
        )
        .join('');
    }

    if (yogaMount) {
      yogaMount.innerHTML = DATA.advantages.yoga
        .map(
          (item) => `
        <div class="adv-item">
          <h4>&check; ${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.desc)}</p>
        </div>
      `
        )
        .join('');
    }
  }

  function renderFaqs() {
    const mount = document.getElementById('faq-list');
    if (!mount) return;
    mount.innerHTML = DATA.faqs
      .map(
        (faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
        <button type="button" class="faq-trigger">
          <span>${escapeHtml(faq.q)}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="faq-content">${escapeHtml(faq.a)}</div>
      </div>
    `
      )
      .join('');

    mount.querySelectorAll('.faq-trigger').forEach((btn) => {
      btn.addEventListener('click', () => btn.parentElement.classList.toggle('is-open'));
    });
  }

  /* ------------------------------------------------------------------------
     Products (Bio-Enzyme Home Care + Naturally Dyed Clothing)
     ------------------------------------------------------------------------ */
  function renderProducts() {
    const filterMount = document.getElementById('product-filters');
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (filterMount) {
      const groups = [
        { key: 'All', label: 'All Products (6)' },
        { key: 'Home Care', label: 'Bio-Enzyme Home Care (4)' },
        { key: 'Natural Clothing', label: 'Natural Clothing (2)' }
      ];
      filterMount.innerHTML = groups
        .map(
          (g) => `
        <button type="button" class="filter-pill ${state.productFilter === g.key ? 'is-active' : ''}" data-prod-filter="${escapeHtml(g.key)}">
          ${escapeHtml(g.label)}
        </button>
      `
        )
        .join('');
      filterMount.querySelectorAll('[data-prod-filter]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.productFilter = btn.dataset.prodFilter;
          renderProducts();
        });
      });
    }

    const items =
      state.productFilter === 'All'
        ? DATA.products
        : DATA.products.filter((p) => p.group === state.productFilter);

    grid.innerHTML = items
      .map((p) => {
        const defaultVariant = p.variants ? p.variants[0] : p.size;
        const singleOrderUrl = buildWhatsAppUrl(
          `Hello ${DATA.brand.name}! I would like to order:\n• ${p.name} (${defaultVariant}) — ${formatINR(p.price)}`
        );
        const mediaClass = p.fitContain ? 'card__media card__media--product card__media--contain' : 'card__media card__media--product';
        const variantControl = p.variants
          ? `<select class="product-variant-select" data-variant-for="${escapeHtml(p.id)}" aria-label="Select option for ${escapeHtml(p.name)}">
              ${p.variants.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('')}
            </select>`
          : '';
        return `
        <article class="card">
          <div class="${mediaClass}">
            <span class="badge badge--cream card__overlay-badge">${escapeHtml(p.badge)}</span>
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.subtitle)}" loading="lazy">
          </div>
          <div class="card__body">
            <div class="card__meta">
              <span>${escapeHtml(p.category)}</span>
              <span>&middot;</span>
              <span>${escapeHtml(p.size)}</span>
            </div>
            <h3 class="card__title" style="font-size:1.12rem;">${escapeHtml(p.name)}</h3>
            <p class="card__text" style="font-size:0.88rem;">${escapeHtml(p.description)}</p>
            <div class="card__footer" style="flex-direction:column; align-items:stretch; gap:10px;">
              ${variantControl}
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <span class="price-tag">${formatINR(p.price)}</span>
                  <span class="price-tag__old">${formatINR(p.oldPrice)}</span>
                </div>
                <button type="button" class="btn btn--ghost btn--sm" data-prod-info="${escapeHtml(p.id)}">Details</button>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <button type="button" class="btn btn--primary btn--sm" data-add-prod="${escapeHtml(p.id)}">Add to Bag</button>
                <a href="${escapeHtml(singleOrderUrl)}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--sm" data-wa-prod="${escapeHtml(p.id)}">WhatsApp</a>
              </div>
            </div>
          </div>
        </article>
      `;
      })
      .join('');

    grid.querySelectorAll('[data-variant-for]').forEach((sel) => {
      sel.addEventListener('change', () => {
        const p = DATA.products.find((x) => x.id === sel.dataset.variantFor);
        const waLink = grid.querySelector(`[data-wa-prod="${sel.dataset.variantFor}"]`);
        if (p && waLink) {
          waLink.setAttribute(
            'href',
            buildWhatsAppUrl(`Hello ${DATA.brand.name}! I would like to order:\n• ${p.name} (${sel.value}) — ${formatINR(p.price)}`)
          );
        }
      });
    });

    grid.querySelectorAll('[data-add-prod]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sel = grid.querySelector(`[data-variant-for="${btn.dataset.addProd}"]`);
        addProductToCart(btn.dataset.addProd, sel ? sel.value : null);
      });
    });
    grid.querySelectorAll('[data-prod-info]').forEach((btn) => {
      btn.addEventListener('click', () => openProductDetailModal(btn.dataset.prodInfo));
    });
  }

  function openProductDetailModal(prodId) {
    const p = DATA.products.find((x) => x.id === prodId);
    if (!p) return;
    const body = document.getElementById('detail-modal-body');
    const initialVariant = p.variants ? p.variants[0] : p.size;
    const waUrl = buildWhatsAppUrl(`Hello ${DATA.brand.name}! Please share details/order for ${p.name} (${initialVariant}) — ${formatINR(p.price)}.`);
    const variantSelectHtml = p.variants
      ? `<div style="margin-bottom:14px;">
          <label class="field-label" for="modal-prod-variant">Select Option</label>
          <select id="modal-prod-variant" class="input-field">
            ${p.variants.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('')}
          </select>
        </div>`
      : '';

    body.innerHTML = `
      <span class="badge badge--cream" style="margin-bottom:10px;">${escapeHtml(p.badge)} &middot; ${escapeHtml(p.size)}</span>
      <h2 style="font-size:1.5rem; margin-bottom:4px;">${escapeHtml(p.name)}</h2>
      <p style="font-size:0.9rem; font-weight:600; color:var(--sage); margin-bottom:14px;">${escapeHtml(p.subtitle)}</p>
      <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.subtitle)}" style="width:100%; max-height:340px; object-fit:contain; background:#FAF3E6; border-radius:14px; margin-bottom:14px;">
      <p style="margin-bottom:14px;">${escapeHtml(p.description)}</p>
      <div style="background:var(--cream-soft); padding:16px; border-radius:14px; border:1px solid var(--border); margin-bottom:16px; font-size:0.9rem;">
        <strong>Highlights &amp; Care:</strong> ${escapeHtml(p.details)}
      </div>
      ${variantSelectHtml}
      <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px;">
        <span class="price-tag" style="font-size:1.25rem;">${formatINR(p.price)}</span>
        <div style="display:flex; gap:10px;">
          <button type="button" class="btn btn--primary btn--sm" id="modal-add-prod-btn">Add to Bag</button>
          <a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--sm" id="modal-wa-prod-btn">Order on WhatsApp</a>
        </div>
      </div>
    `;
    openModal();
    const modalVariant = document.getElementById('modal-prod-variant');
    modalVariant?.addEventListener('change', () => {
      const waBtn = document.getElementById('modal-wa-prod-btn');
      if (waBtn) {
        waBtn.setAttribute(
          'href',
          buildWhatsAppUrl(`Hello ${DATA.brand.name}! Please share details/order for ${p.name} (${modalVariant.value}) — ${formatINR(p.price)}.`)
        );
      }
    });
    document.getElementById('modal-add-prod-btn')?.addEventListener('click', () => {
      addProductToCart(p.id, modalVariant ? modalVariant.value : null);
      closeModal();
    });
  }

  function addProductToCart(prodId, selectedVariant = null) {
    const p = DATA.products.find((x) => x.id === prodId);
    if (!p) return;
    const variantLabel = selectedVariant || (p.variants ? p.variants[0] : p.size);
    const existing = state.cart.find((c) => c.id === p.id && c.size === variantLabel);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({ id: p.id, name: p.name, size: variantLabel, price: p.price, image: p.image, qty: 1 });
    }
    saveJson(CART_KEY, state.cart);
    updateCartUI();
    showToast(`Added "${p.name}" (${variantLabel}) to your bag`);
  }

  function changeCartQty(idx, delta) {
    if (!state.cart[idx]) return;
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
    saveJson(CART_KEY, state.cart);
    updateCartUI();
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((s, item) => s + item.qty, 0);
    const badge = document.getElementById('header-cart-count');
    if (badge) badge.textContent = String(totalCount);

    const list = document.getElementById('cart-items-list');
    const foot = document.getElementById('cart-drawer-foot');
    if (!list || !foot) return;

    if (!state.cart.length) {
      list.innerHTML = `<div style="text-align:center; padding:44px 12px;"><p style="font-weight:700; color:var(--ink);">Your bag is empty</p><p style="font-size:0.9rem; color:var(--muted); margin-top:6px;">Add Floor Cleaner, Laundry Liquid, Dishwash Liquid, or Toilet Cleaner.</p></div>`;
      foot.innerHTML = '';
      return;
    }

    list.innerHTML = state.cart
      .map(
        (item, idx) => `
      <div class="cart-item">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
        <div style="flex:1;">
          <div style="font-weight:700; font-size:0.94rem; color:var(--ink);">${escapeHtml(item.name)}</div>
          <div style="font-size:0.78rem; color:var(--muted);">${escapeHtml(item.size)}</div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="cart-qty">
              <button type="button" data-dec="${idx}">&minus;</button>
              <span>${item.qty}</span>
              <button type="button" data-inc="${idx}">+</button>
            </div>
            <strong>${formatINR(item.price * item.qty)}</strong>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    list.querySelectorAll('[data-dec]').forEach((b) => b.addEventListener('click', () => changeCartQty(Number(b.dataset.dec), -1)));
    list.querySelectorAll('[data-inc]').forEach((b) => b.addEventListener('click', () => changeCartQty(Number(b.dataset.inc), 1)));

    const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
    const orderLines = [
      `Hello ${DATA.brand.name}! I would like to order:`,
      ...state.cart.map((i) => `• ${i.name} (${i.size}) x ${i.qty} = ${formatINR(i.price * i.qty)}`),
      `Total: ${formatINR(subtotal)}`
    ];

    const waOrderUrl = buildWhatsAppUrl(orderLines.join('\n'));

    foot.innerHTML = `
      <div style="display:flex; justify-content:space-between; font-size:1.05rem; font-weight:800; color:var(--ink); margin-bottom:14px;">
        <span>Total (${totalCount} items)</span>
        <span>${formatINR(subtotal)}</span>
      </div>
      <a href="${escapeHtml(waOrderUrl)}" target="_blank" rel="noopener" class="btn btn--whatsapp" style="width:100%;">
        Send Order on WhatsApp &rarr;
      </a>
    `;
  }

  /* ------------------------------------------------------------------------
     Modals & Drawers Plumbing
     ------------------------------------------------------------------------ */
  function openModal() {
    const m = document.getElementById('detail-modal');
    m?.classList.add('is-open');
    m?.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    const m = document.getElementById('detail-modal');
    m?.classList.remove('is-open');
    m?.setAttribute('aria-hidden', 'true');
  }

  function openCartDrawer() {
    updateCartUI();
    const d = document.getElementById('cart-drawer-overlay');
    d?.classList.add('is-open');
    d?.setAttribute('aria-hidden', 'false');
  }

  function closeCartDrawer() {
    const d = document.getElementById('cart-drawer-overlay');
    d?.classList.remove('is-open');
    d?.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderWorkshops();
    renderAdvantages();
    renderProducts();
    renderFaqs();
    initInlineRegistration();
    updateCartUI();

    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 10), { passive: true });

    const mobileDrawer = document.getElementById('mobile-drawer');
    document.getElementById('open-mobile-menu')?.addEventListener('click', () => mobileDrawer?.classList.add('is-open'));
    document.querySelectorAll('[data-close-mobile]').forEach((el) => el.addEventListener('click', () => mobileDrawer?.classList.remove('is-open')));

    document.getElementById('open-cart-btn')?.addEventListener('click', openCartDrawer);
    document.getElementById('close-cart-btn')?.addEventListener('click', closeCartDrawer);
    document.getElementById('cart-drawer-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'cart-drawer-overlay') closeCartDrawer();
    });

    document.getElementById('close-detail-modal')?.addEventListener('click', closeModal);
    document.getElementById('detail-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'detail-modal') closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeCartDrawer();
      }
    });
  });
})();
