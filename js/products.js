/**
 * BAI BAI BAKE — DATA & PRODUCTS MODULE (products.js)
 * Catálogo tipado, filtros por tags sensoriales y modal de vista rápida.
 * Estándar de ingeniería comercial SALMAN
 */

(function (window) {
  'use strict';

  // Catálogo Sensorial de Creaciones
  const CATALOG = [
    {
      id: 'brownie-signature-70',
      name: 'Brownie Signature Fudgy 70% Cacao',
      category: 'brownies',
      tag: '70% Cacao Belga · Fudgy',
      price: 42000,
      formattedPrice: '$42.000 COP',
      portions: 'Caja x4 porciones generosas',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'La creación insignia de Ángela Duque: centro denso y chocolatoso, costra craquelada y cristales de sal marina.',
      tastingNotes: 'Textura ultracremosa que se deshace en paladar, balance entre amargor noble del chocolate y acento salino.',
      allergens: 'Lácteos de vaca, Huevos frescos, Harina de trigo (Gluten).'
    },
    {
      id: 'brookie-mantequilla-avellanada',
      name: 'Brookies de Mantequilla Avellanada & Sal',
      category: 'brownies',
      tag: 'Doble Capa Brownie + Cookie',
      price: 46000,
      formattedPrice: '$46.000 COP',
      portions: 'Caja x4 unidades mixtas',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'La perfecta armonía: base húmeda de brownie fundida con galleta con chips de chocolate semidulce.',
      tastingNotes: 'Notas a toffee, mantequilla tostada (beurre noisette) y crujiente exterior.',
      allergens: 'Lácteos, Huevos, Harina de trigo (Gluten).'
    },
    {
      id: 'blondie-arequipe-pecanas',
      name: 'Blondie de Arequipe Artesanal & Nuez Pecana',
      category: 'brownies',
      tag: 'Sin Cacao · Dulce de Leche',
      price: 44000,
      formattedPrice: '$44.000 COP',
      portions: 'Caja x4 porciones',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Masa dorada con azúcar morena y vainilla natural, vetas de arequipe espeso y trozos crocantes de nuez pecana.',
      tastingNotes: 'Caramelo tostado, mantecoso y notas amaderadas de pecana fresca.',
      allergens: 'Lácteos, Huevos, Frutos Secos (Pecanas), Trigo/Gluten.'
    },
    {
      id: 'torta-celebracion-velvet',
      name: 'Torta Celebración Choco-Velvet de Autor',
      category: 'tortas',
      tag: 'Firma de Ángela Duque',
      price: 135000,
      formattedPrice: '$135.000 COP',
      portions: '10 a 12 porciones',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Bizcocho húmedo de cacao fino de aroma, capas de ganache montada al 60% y buttercream sedoso.',
      tastingNotes: 'Intensidad equilibrada, bizcocho con humedad prolongada y decoración botánica.',
      allergens: 'Lácteos, Huevos, Harina de trigo (Gluten).'
    },
    {
      id: 'torta-naked-frutos-rojos',
      name: 'Naked Cake de Frutos Rojos & Mascarpone',
      category: 'tortas',
      tag: 'Sin Conservantes · Frescura Pura',
      price: 145000,
      formattedPrice: '$145.000 COP',
      portions: '12 a 15 porciones',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Capas rústicas de vainilla de Papantla humedecidas con reducción de frambuesas silvestres y mascarpone.',
      tastingNotes: 'Acidez refrescante de frutos rojos contrastada con la untuosidad del queso italiano.',
      allergens: 'Lácteos, Huevos, Harina de trigo (Gluten).'
    },
    {
      id: 'cookies-levain-style',
      name: 'Galletas Gigantes Centro Meloso (Levain Style)',
      category: 'galletas',
      tag: 'Centro Fundente · Choco Chips',
      price: 38000,
      formattedPrice: '$38.000 COP',
      portions: 'Caja x4 galletas gigantes (120g c/u)',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Dorado crujiente en los bordes y un corazón fundente rebosante de chocolate y nueces tostadas.',
      tastingNotes: 'Golosidad pura inspirada en las bakeries de Manhattan. Servir tibias.',
      allergens: 'Lácteos, Huevos, Harina de trigo (Gluten), Nueces.'
    },
    {
      id: 'bites-brownie-mesa',
      name: 'Bites Melcochudos de Brownie para Eventos',
      category: 'galletas',
      tag: 'Mesa de Postres · 20 Bocadillos',
      price: 65000,
      formattedPrice: '$65.000 COP',
      portions: 'Caja x20 mini cubos individuales',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Bocados de brownie denso con toppings variados: pistacho tostado, sal marina, arequipe y nibs de cacao.',
      tastingNotes: 'El bocado dulce idóneo para complementar copas de champaña o café de especialidad.',
      allergens: 'Lácteos, Huevos, Harina de trigo (Gluten), Frutos Secos.'
    },
    {
      id: 'caja-regalo-placer',
      name: 'Cofre de Regalo "El Placer de Compartir"',
      category: 'cajas',
      tag: 'Empaque de Lujo con Lazo',
      price: 89000,
      formattedPrice: '$89.000 COP',
      portions: 'Surtido selecto x10 delicias',
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Caja rígida con lazo de lino y tarjeta caligrafiada. Incluye 4 brownies signature, 2 brookies y 4 cookies.',
      tastingNotes: 'La degustación definitiva para aniversarios, agradecimientos o cumpleaños.',
      allergens: 'Lácteos, Huevos, Harina de trigo (Gluten), Frutos Secos.'
    }
  ];

  let activeCategory = 'all';

  /**
   * Obtener productos
   */
  function getAllProducts() {
    return CATALOG;
  }

  function getProductById(id) {
    return CATALOG.find(item => item.id === id) || null;
  }

  /**
   * Renderizar la vitrina
   */
  function renderProducts(targetContainerId = 'productsCatalog') {
    const container = document.getElementById(targetContainerId);
    if (!container) return;

    const filtered = activeCategory === 'all'
      ? CATALOG
      : CATALOG.filter(item => item.category === activeCategory);

    container.innerHTML = filtered.map(prod => `
      <article class="product-card bg-crema rounded-3xl overflow-hidden border border-chocolate/10 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col group" id="card-${prod.id}">
        
        <!-- Contenedor Imagen -->
        <div class="relative overflow-hidden aspect-[4/3] bg-mantequilla cursor-pointer" onclick="BakeProducts.openQuickView('${prod.id}')">
          <img src="${prod.image}" 
               alt="${prod.name}" 
               class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
               loading="lazy">
          
          <!-- Tag Sensorial -->
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-crema/95 backdrop-blur-sm text-[10px] font-bold text-chocolate uppercase tracking-wider shadow-sm">
            ${prod.tag}
          </span>

          <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-chocolate/85 text-crema text-[10px] font-medium">
            ${prod.portions}
          </span>
        </div>

        <!-- Cuerpo de Tarjeta -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 class="font-serif text-lg sm:text-xl font-semibold text-chocolate group-hover:text-dorado transition-colors leading-snug cursor-pointer" onclick="BakeProducts.openQuickView('${prod.id}')">
              ${prod.name}
            </h3>
            <p class="text-xs text-chocolate-muted mt-2 line-clamp-2 leading-relaxed">
              ${prod.shortDesc}
            </p>
          </div>

          <div class="pt-3 border-t border-chocolate/10 flex items-center justify-between gap-2">
            <div>
              <span class="text-[10px] uppercase font-bold text-chocolate-muted tracking-wider block">Inversión</span>
              <span class="font-serif text-lg font-bold text-chocolate">${prod.formattedPrice}</span>
            </div>

            <div class="flex items-center gap-1.5">
              <button onclick="BakeProducts.openQuickView('${prod.id}')" 
                      class="p-2 rounded-full bg-mantequilla/70 hover:bg-mantequilla text-chocolate transition-colors text-xs" 
                      title="Ver notas de cata y alérgenos"
                      aria-label="Ver detalles de ${prod.name}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>

              <button onclick="BakeCart.addItem('${prod.id}')" 
                      class="px-3.5 py-2 rounded-full bg-chocolate hover:bg-chocolate-soft text-crema text-xs uppercase font-semibold tracking-wider transition-all duration-200 shadow-sm flex items-center gap-1 active:scale-95">
                <svg class="w-3.5 h-3.5 text-dorado" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                <span>Pedir</span>
              </button>
            </div>
          </div>

        </div>

      </article>
    `).join('');
  }

  /**
   * Modal de Vista Rápida
   */
  function openQuickView(productId) {
    const prod = getProductById(productId);
    if (!prod) return;

    const modalContent = document.getElementById('productDetailContent');
    const modalEl = document.getElementById('productDetailModal');
    if (!modalContent || !modalEl) return;

    modalContent.innerHTML = `
      <div class="space-y-4">
        <div class="rounded-2xl overflow-hidden shadow-warm bg-mantequilla">
          <img src="${prod.image}" alt="${prod.name}" class="w-full h-56 sm:h-64 object-cover">
        </div>
        <div>
          <span class="text-[11px] font-bold uppercase tracking-widest text-dorado">${prod.tag}</span>
          <h3 class="font-serif text-2xl font-semibold text-chocolate mt-0.5">${prod.name}</h3>
          <span class="font-serif text-xl font-bold text-chocolate block mt-1">${prod.formattedPrice}</span>
        </div>

        <p class="text-xs sm:text-sm text-chocolate-muted leading-relaxed">${prod.shortDesc}</p>

        <div class="bg-mantequilla/40 p-3.5 rounded-xl border border-chocolate/5 text-xs space-y-1">
          <p><strong>Notas de cata:</strong> ${prod.tastingNotes}</p>
          <p><strong>Porciones estimadas:</strong> ${prod.portions}</p>
          <p><strong>Alérgenos:</strong> ${prod.allergens}</p>
        </div>

        <button onclick="BakeCart.addItem('${prod.id}'); BakeProducts.closeQuickView();" 
                class="w-full py-3.5 rounded-full bg-chocolate text-crema text-xs uppercase font-bold tracking-wider hover:bg-chocolate-soft transition-all shadow-warm">
          Agregar a mi Pedido
        </button>
      </div>
    `;

    modalEl.classList.remove('opacity-0', 'pointer-events-none');
  }

  function closeQuickView() {
    const modalEl = document.getElementById('productDetailModal');
    if (modalEl) {
      modalEl.classList.add('opacity-0', 'pointer-events-none');
    }
  }

  /**
   * Filtrar categoría
   */
  function setCategory(category) {
    activeCategory = category;
    renderProducts();

    // Actualizar estados visuales de los botones
    const pills = document.querySelectorAll('.cat-pill');
    pills.forEach(pill => {
      const cat = pill.getAttribute('data-category');
      if (cat === category) {
        pill.classList.add('bg-chocolate', 'text-crema', 'shadow-sm');
        pill.classList.remove('bg-mantequilla', 'text-chocolate');
      } else {
        pill.classList.remove('bg-chocolate', 'text-crema', 'shadow-sm');
        pill.classList.add('bg-mantequilla', 'text-chocolate');
      }
    });
  }

  // Inicialización de Eventos de la Vitrina
  function init() {
    renderProducts();

    const pills = document.querySelectorAll('.cat-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-category');
        setCategory(cat);
      });
    });

    const modalEl = document.getElementById('productDetailModal');
    if (modalEl) {
      modalEl.addEventListener('click', (e) => {
        if (e.target.id === 'productDetailModal') {
          closeQuickView();
        }
      });
    }
  }

  // Exportar a espacio global controlado
  window.BakeProducts = {
    getAll: getAllProducts,
    getById: getProductById,
    render: renderProducts,
    setCategory: setCategory,
    openQuickView: openQuickView,
    closeQuickView: closeQuickView,
    init: init
  };

  document.addEventListener('DOMContentLoaded', init);

})(window);
