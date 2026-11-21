/**
 * BAI BAI BAKE — CART & CHECKOUT MODULE (cart.js)
 * Estado reactivo, persistencia en localStorage, modal drawer y formateador de pedidos a WhatsApp.
 * Estándar de ingeniería comercial SALMAN
 */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'baibaibake_cart_v3';
  const WHATSAPP_PHONE = '573017796023'; // Línea oficial de Ángela Duque

  let cart = [];
  let toastTimer = null;

  /**
   * Formateador monetario (COP)
   */
  function formatCOP(amount) {
    return '$' + amount.toLocaleString('es-CO') + ' COP';
  }

  /**
   * Cargar y guardar en LocalStorage
   */
  function loadCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      cart = data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('No se pudo acceder a localStorage', e);
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Error al guardar carrito', e);
    }
  }

  /**
   * Operaciones del Carrito
   */
  function addItem(productId) {
    const product = window.BakeProducts ? window.BakeProducts.getById(productId) : null;
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        portions: product.portions,
        qty: 1
      });
    }

    saveCart();
    renderUI();
    showToast(`¡${product.name} agregado a tu pedido!`);
    animateBadge();
  }

  function updateQty(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    cart[itemIndex].qty += delta;
    if (cart[itemIndex].qty <= 0) {
      cart.splice(itemIndex, 1);
    }

    saveCart();
    renderUI();
  }

  function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderUI();
  }

  function clearCart() {
    cart = [];
    saveCart();
    renderUI();
  }

  /**
   * Renderizar UI del Carrito
   */
  function renderUI() {
    const badge = document.getElementById('cartCountBadge');
    const container = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotalVal');
    const totalEl = document.getElementById('cartTotalVal');

    const totalCount = cart.reduce((acc, curr) => acc + curr.qty, 0);
    const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

    // Actualizar badge del header
    if (badge) {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.style.transform = 'scale(1)';
      } else {
        badge.style.transform = 'scale(0)';
      }
    }

    // Actualizar totales financieros
    if (subtotalEl) subtotalEl.textContent = formatCOP(subtotal);
    if (totalEl) totalEl.textContent = formatCOP(subtotal);

    if (!container) return;

    // Estado vacío
    if (cart.length === 0) {
      container.innerHTML = `
        <div class="py-14 text-center space-y-3">
          <div class="w-14 h-14 mx-auto rounded-full bg-mantequilla flex items-center justify-center text-chocolate-muted">
            <svg class="w-7 h-7 text-dorado" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h4 class="font-serif text-lg font-medium text-chocolate">Tu canasto está esperando</h4>
          <p class="text-xs text-chocolate-muted max-w-xs mx-auto">
            Elige brownies, tortas de celebración o galletas para hornear bajo encargo con Ángela Duque.
          </p>
          <a href="#vitrina" onclick="BakeCart.close()" class="inline-block mt-2 px-4 py-2 rounded-full bg-chocolate text-crema text-xs uppercase font-semibold tracking-wider hover:bg-chocolate-soft transition-colors">
            Explorar Vitrina
          </a>
        </div>
      `;
      return;
    }

    // Listado de ítems
    container.innerHTML = cart.map(item => `
      <div class="pt-4 first:pt-0 flex items-center gap-3">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-2xl object-cover bg-mantequilla shrink-0">
        
        <div class="flex-1 min-w-0">
          <h4 class="font-serif text-xs sm:text-sm font-semibold text-chocolate truncate">${item.name}</h4>
          <span class="text-[10px] text-chocolate-muted block">${item.portions}</span>
          <span class="text-xs font-bold text-chocolate">${formatCOP(item.price)}</span>
        </div>

        <div class="flex items-center gap-1.5 bg-mantequilla rounded-full px-2 py-0.5 border border-chocolate/5">
          <button onclick="BakeCart.updateQty('${item.id}', -1)" class="w-5 h-5 rounded-full flex items-center justify-center text-chocolate hover:bg-crema text-xs font-bold" aria-label="Restar">-</button>
          <span class="text-xs font-bold text-chocolate px-1">${item.qty}</span>
          <button onclick="BakeCart.updateQty('${item.id}', 1)" class="w-5 h-5 rounded-full flex items-center justify-center text-chocolate hover:bg-crema text-xs font-bold" aria-label="Sumar">+</button>
        </div>

        <button onclick="BakeCart.remove('${item.id}')" class="text-chocolate-muted hover:text-melocoton p-1" title="Quitar ítem" aria-label="Eliminar ${item.name}">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" /></svg>
        </button>
      </div>
    `).join('');
  }

  /**
   * Animación háptica/visual del badge
   */
  function animateBadge() {
    const badge = document.getElementById('cartCountBadge');
    if (badge) {
      badge.classList.remove('badge-pop');
      void badge.offsetWidth; // Trigger reflow
      badge.classList.add('badge-pop');
    }
  }

  /**
   * Notificación Toast
   */
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');
    if (!toast || !msgEl) return;

    clearTimeout(toastTimer);
    msgEl.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');

    toastTimer = setTimeout(() => {
      toast.classList.remove('opacity-100');
      toast.classList.add('opacity-0', 'pointer-events-none');
    }, 3200);
  }

  /**
   * Abrir y Cerrar Drawer
   */
  function openCart() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    document.body.classList.add('overflow-hidden');
  }

  function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  }

  /**
   * Generador de Enlace a WhatsApp Business (+57 301 779 6023)
   */
  function checkoutWhatsApp() {
    if (cart.length === 0) {
      showToast('Selecciona al menos un producto antes de ordenar.');
      return;
    }

    const zoneEl = document.getElementById('cartDeliveryZone');
    const dateEl = document.getElementById('cartOrderDate');
    const notesEl = document.getElementById('cartOrderNotes');

    const zone = zoneEl ? zoneEl.value : 'Barranquilla (Norte / Riomar)';
    const date = dateEl ? dateEl.value : 'Por coordinar con 48h de anticipación';
    const notes = notesEl && notesEl.value.trim() ? notesEl.value.trim() : 'Sin dedicatoria especial';

    const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

    let text = `¡Hola Ángela! Quiero hacer el siguiente pedido en *Bai Bai Bake*:\n\n`;
    text += `*CREACIONES SELECCIONADAS:*\n`;

    cart.forEach(item => {
      text += `• ${item.qty}x ${item.name} (${formatCOP(item.price * item.qty)})\n`;
    });

    text += `\n*RESUMEN DEL PEDIDO:*\n`;
    text += `• *Total Estimado:* ${formatCOP(subtotal)}\n`;
    text += `• *Zona de Entrega:* ${zone}\n`;
    text += `• *Fecha Deseada:* ${date}\n`;
    text += `• *Notas / Dedicatoria:* ${notes}\n\n`;
    text += `¿Me confirmas disponibilidad en la agenda de horneado para esa fecha? ¡Muchas gracias! ✨`;

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    window.open(url, '_blank');
  }

  /**
   * Inicialización de eventos
   */
  function init() {
    loadCart();
    renderUI();

    // Eventos del Drawer
    document.getElementById('openCartBtn')?.addEventListener('click', openCart);
    document.getElementById('closeCartBtn')?.addEventListener('click', closeCart);
    document.getElementById('cartDrawerBackdrop')?.addEventListener('click', closeCart);
    document.getElementById('cartCheckoutBtn')?.addEventListener('click', checkoutWhatsApp);

    // Tecla ESC para cerrar
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    });

    // Validación de fecha mínima (48h de anticipación)
    const cartDate = document.getElementById('cartOrderDate');
    if (cartDate) {
      const today = new Date();
      today.setDate(today.getDate() + 2);
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const minDate = `${yyyy}-${mm}-${dd}`;
      cartDate.min = minDate;
      cartDate.value = minDate;
    }
  }

  // Exportar a espacio global controlado
  window.BakeCart = {
    addItem: addItem,
    updateQty: updateQty,
    remove: removeItem,
    clear: clearCart,
    open: openCart,
    close: closeCart,
    checkout: checkoutWhatsApp,
    init: init
  };

  document.addEventListener('DOMContentLoaded', init);

})(window);
