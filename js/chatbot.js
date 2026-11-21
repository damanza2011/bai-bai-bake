/**
 * BAI BAI BAKE — CONCIERGE CHATBOT MODULE (chatbot.js)
 * Motor conversacional "BakeBot", NLP basado en intents, árbol de respuestas guiadas
 * y canalización directa a WhatsApp (+57 301 779 6023).
 * Estándar de ingeniería comercial SALMAN
 */

(function (window) {
  'use strict';

  const WHATSAPP_PHONE = '573017796023';

  // Matriz de Intents y Respuestas Contextuales
  const INTENTS = [
    {
      name: 'brownies',
      keywords: ['brownie', 'brownies', 'fudge', 'fudgy', 'melcochudo', 'chocolate', 'cacao', 'brookie', 'blondie'],
      response: '¡En <strong>Bai Bai Bake</strong> el brownie es devoción pura! Nuestra joya más aclamada es el <strong>Brownie Signature 70% Cacao Belga</strong> ($42.000 COP caja x4): denso, ultra melcochudo y con cristales de sal marina. Si prefieres contrastes, los <strong>Brookies</strong> (brownie + galleta choco-chip) son insuperables.',
      actionHtml: `<button onclick="BakeCart.addItem('brownie-signature-70')" class="mt-1 px-3 py-1.5 rounded-full bg-chocolate text-crema font-bold text-[10px] uppercase hover:bg-chocolate-soft transition-colors shadow-sm">Pedir Brownie Signature ($42k)</button>`
    },
    {
      name: 'tortas',
      keywords: ['torta', 'tortas', 'pastel', 'cumpleaños', 'cumple', 'boda', 'matrimonio', 'celebracion', 'evento', 'aniversario'],
      response: 'Horneamos tortas de autor exclusivas desde 10 hasta más de 80 porciones. La favorita para cumpleaños es la <strong>Choco-Velvet de Cacao Fino</strong> ($135.000 COP) y la <strong>Naked Cake de Frutos Rojos & Mascarpone</strong> ($145.000 COP). Ambas decoradas con detalles botánicos.',
      actionHtml: `<a href="#personalizados" onclick="BakeChat.close()" class="inline-block mt-1 px-3 py-1.5 rounded-full bg-dorado text-chocolate font-bold text-[10px] uppercase hover:bg-dorado-light transition-colors">Abrir Cotizador de Tortas</a>`
    },
    {
      name: 'entregas',
      keywords: ['entrega', 'entregas', 'domicilio', 'domicilios', 'barranquilla', 'puerto colombia', 'soledad', 'cobertura', 'envio', 'envios', 'tiempo', 'anticipacion'],
      response: 'Despachamos en <strong>Barranquilla</strong> (Norte, Riomar, Alto Prado, Villa Country), <strong>Puerto Colombia</strong>, <strong>Villa Campestre</strong> y <strong>Soledad</strong> mediante envíos climatizados. Requerimos mínimo <strong>24 a 48 horas de anticipación</strong> ya que horneamos cada pedido al día. También puedes retirar en taller sin costo.',
      actionHtml: ''
    },
    {
      name: 'precios',
      keywords: ['precio', 'precios', 'cuanto', 'cuánto', 'costo', 'vale', 'tarifa', 'menu', 'carta'],
      response: 'Nuestros precios son honestos e incluyen empaque de autor:<br>• Cajas de Brownies Signature / Brookies: desde $42.000 COP<br>• Galletas Gigantes Levain Style: $38.000 COP (x4)<br>• Tortas de Celebración: desde $135.000 COP<br>• Cofres de Regalo Surtidos: $89.000 COP.',
      actionHtml: `<a href="#vitrina" onclick="BakeChat.close()" class="inline-block mt-1 px-3 py-1.5 rounded-full bg-chocolate text-crema font-bold text-[10px] uppercase">Ver Catálogo Completo</a>`
    },
    {
      name: 'angela',
      keywords: ['angela', 'ángela', 'duque', 'dueña', 'repostera', 'hablar', 'persona', 'humano', 'whatsapp', 'telefono', 'celular'],
      response: '¡Con el mayor de los gustos! Puedes conversar directamente con Ángela Duque por WhatsApp para resolver pedidos personalizados o consultas urgentes.',
      actionHtml: `<a href="https://wa.me/${WHATSAPP_PHONE}?text=Hola%20Ángela,%20te%20escribo%20desde%20el%20asistente%20web%20de%20Bai%20Bai%20Bake." target="_blank" class="inline-flex items-center gap-1.5 mt-1 px-3.5 py-1.5 rounded-full bg-chocolate text-crema font-bold text-[10px] uppercase hover:bg-chocolate-soft transition-colors shadow-sm">Chatear con Ángela (+57 301 779 6023)</a>`
    },
    {
      name: 'conservacion',
      keywords: ['conservar', 'guardar', 'calentar', 'microondas', 'fresco', 'duran', 'duracion'],
      response: '¡Tip de Ángela! Guarda tus brownies en un recipiente hermético en lugar fresco y seco por hasta 5 días. Para devolverles la textura recién horneada, ponlos <strong>10 a 15 segundos en microondas</strong>: el centro quedará chocolatoso y fundente.',
      actionHtml: ''
    },
    {
      name: 'alergenos',
      keywords: ['alergia', 'alergeno', 'alérgenos', 'gluten', 'celiaco', 'celíaco', 'nuez', 'nueces', 'leche', 'lacteos'],
      response: 'Nuestra repostería utiliza 100% mantequilla de vaca, huevos frescos y harinas de trigo. Tenemos opciones con nueces pecanas y pistachos. Si tienes una condición especial, indícanoslo en las notas de tu pedido para extremar precauciones.',
      actionHtml: ''
    }
  ];

  let lastUserQuery = '';

  /**
   * Escape HTML para seguridad en el chat
   */
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  /**
   * Agregar Mensaje al Feed
   */
  function appendMessage(sender, text, actionHtml = '') {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    const div = document.createElement('div');
    if (sender === 'user') {
      div.className = 'flex justify-end';
      div.innerHTML = `
        <div class="bg-chocolate text-crema p-3 rounded-2xl rounded-tr-none max-w-[85%] text-xs shadow-warm-sm">
          <p>${escapeHTML(text)}</p>
        </div>
      `;
    } else {
      div.className = 'flex items-start gap-2';
      div.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-chocolate text-crema flex items-center justify-center font-bold text-[10px] shrink-0">
          BB
        </div>
        <div class="bg-crema p-3 rounded-2xl rounded-tl-none border border-chocolate/5 shadow-warm-sm text-chocolate space-y-2 max-w-[85%] text-xs">
          <p>${text}</p>
          ${actionHtml}
        </div>
      `;
    }

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  /**
   * Motor de Correspondencia de NLP por Intent
   */
  function processUserInput(rawText) {
    const text = rawText.toLowerCase().trim();
    lastUserQuery = rawText;

    // Buscar match de intents
    for (const intent of INTENTS) {
      const match = intent.keywords.some(keyword => text.includes(keyword));
      if (match) {
        appendMessage('bot', intent.response, intent.actionHtml);
        return;
      }
    }

    // Respuesta por defecto con fallback
    appendMessage(
      'bot',
      '¡Qué rica pregunta! Para darte el asesoramiento exacto o coordinar con la agenda de Ángela Duque hoy, ¿te gustaría que te conecte directamente por WhatsApp?',
      `<button onclick="BakeChat.transferToWhatsApp()" class="mt-1 px-3.5 py-1.5 rounded-full bg-chocolate text-crema font-bold text-[10px] uppercase hover:bg-chocolate-soft transition-colors shadow-sm">Hablar con Ángela (+57 301 779 6023)</button>`
    );
  }

  /**
   * Respuestas Rápidas (Quick Replies)
   */
  function handleQuickReply(type) {
    if (type === 'brownies') {
      appendMessage('user', '¿Cuáles son los brownies más recomendados y fudgy?');
      setTimeout(() => {
        const intent = INTENTS.find(i => i.name === 'brownies');
        appendMessage('bot', intent.response, intent.actionHtml);
      }, 350);
    } else if (type === 'torta') {
      appendMessage('user', 'Quiero cotizar una torta personalizada para un evento');
      setTimeout(() => {
        const intent = INTENTS.find(i => i.name === 'tortas');
        appendMessage('bot', intent.response, intent.actionHtml);
      }, 350);
    } else if (type === 'entregas') {
      appendMessage('user', '¿Tiempos de entrega y pedidos en Barranquilla?');
      setTimeout(() => {
        const intent = INTENTS.find(i => i.name === 'entregas');
        appendMessage('bot', intent.response, intent.actionHtml);
      }, 350);
    } else if (type === 'angela') {
      appendMessage('user', 'Deseo hablar directo con Ángela Duque');
      setTimeout(() => {
        const intent = INTENTS.find(i => i.name === 'angela');
        appendMessage('bot', intent.response, intent.actionHtml);
      }, 350);
    }
  }

  /**
   * Transferencia Directa a WhatsApp con el contexto
   */
  function transferToWhatsApp() {
    let text = `Hola Ángela, estoy en la página de Bai Bai Bake y deseo consultarte`;
    if (lastUserQuery) {
      text += ` sobre: "${lastUserQuery}"`;
    } else {
      text += ` sobre la disponibilidad de pedidos.`;
    }
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    window.open(url, '_blank');
  }

  /**
   * Manejo de Ventana de Chat
   */
  function toggleChat() {
    const chatWin = document.getElementById('conciergeChatWindow');
    const tooltip = document.getElementById('conciergeTooltip');
    if (!chatWin) return;

    const isHidden = chatWin.classList.contains('hidden');
    if (isHidden) {
      chatWin.classList.remove('hidden');
      if (tooltip) tooltip.classList.add('hidden');
      document.getElementById('chatInput')?.focus();
    } else {
      chatWin.classList.add('hidden');
      if (tooltip) tooltip.classList.remove('hidden');
    }
  }

  function openChat() {
    const chatWin = document.getElementById('conciergeChatWindow');
    const tooltip = document.getElementById('conciergeTooltip');
    if (!chatWin) return;
    chatWin.classList.remove('hidden');
    if (tooltip) tooltip.classList.add('hidden');
    document.getElementById('chatInput')?.focus();
  }

  function closeChat() {
    const chatWin = document.getElementById('conciergeChatWindow');
    const tooltip = document.getElementById('conciergeTooltip');
    if (!chatWin) return;
    chatWin.classList.add('hidden');
    if (tooltip) tooltip.classList.remove('hidden');
  }

  /**
   * Inicialización
   */
  function init() {
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (!query) return;

        appendMessage('user', query);
        input.value = '';

        setTimeout(() => {
          processUserInput(query);
        }, 400);
      });
    }

    // Tecla ESC cierra también el chat si está enfocado
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeChat();
      }
    });
  }

  // Exportar al espacio global
  window.BakeChat = {
    toggle: toggleChat,
    open: openChat,
    close: closeChat,
    handleQuickReply: handleQuickReply,
    transferToWhatsApp: transferToWhatsApp,
    init: init
  };

  document.addEventListener('DOMContentLoaded', init);

})(window);
