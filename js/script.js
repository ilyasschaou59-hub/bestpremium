const WHATSAPP_NUMBER = '447577310143';

const pricingPlans = [
  {
    deviceCount: 1,
    durations: [
      { label: '1 Month', price: 20 },
      { label: '3 Months', price: 35 },
      { label: '6 Months', price: 45 },
      { label: '12 Months', price: 65 }
    ]
  },
  {
    deviceCount: 2,
    durations: [
      { label: '1 Month', price: 36 },
      { label: '3 Months', price: 63 },
      { label: '6 Months', price: 81 },
      { label: '12 Months', price: 118 }
    ]
  },
  {
    deviceCount: 3,
    durations: [
      { label: '1 Month', price: 51 },
      { label: '3 Months', price: 90 },
      { label: '6 Months', price: 115 },
      { label: '12 Months', price: 165 }
    ]
  },
  {
    deviceCount: 4,
    durations: [
      { label: '1 Month', price: 64 },
      { label: '3 Months', price: 112 },
      { label: '6 Months', price: 144 },
      { label: '12 Months', price: 208 }
    ]
  }
];

function buildWhatsAppUrl(deviceCount, duration, price) {
  const deviceLabel = deviceCount === 1 ? '1 Device' : `${deviceCount} Devices`;
  const message = `Hello, I would like to subscribe to the ${duration.toLowerCase()} ${deviceLabel} plan for €${price}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function bindWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp-plan]').forEach((button) => {
    const deviceCount = Number(button.dataset.deviceCount);
    const duration = button.dataset.duration;
    const price = Number(button.dataset.price);

    if (deviceCount && duration && price) {
      button.href = buildWhatsAppUrl(deviceCount, duration, price);
    }
  });

  const contactButton = document.querySelector('[data-whatsapp-contact]');
  if (contactButton) {
    const contactMessage = 'Hello, I would like more information about PremiumIPTV.';
    contactButton.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.site-nav a');

  bindWhatsAppLinks();

  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('menu-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item').forEach((faqItem) => {
        faqItem.classList.remove('is-open');
        const faqButton = faqItem.querySelector('.faq-question');
        if (faqButton) faqButton.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
});
