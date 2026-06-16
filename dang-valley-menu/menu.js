/* ===================================================
   Dang Valley — Menu Data & Rendering
   =================================================== */

// Each item: name, description, price (NPR), veg (true/false), spicy (optional)
const menuData = [
  {
    category: "Starters",
    items: [
      { name: "Chicken Momo (Steamed)", description: "Classic Nepali dumplings filled with minced chicken, served with tomato achar.", price: 220, veg: false },
      { name: "Veg Momo (Steamed)", description: "Dumplings filled with seasonal vegetables and paneer.", price: 190, veg: true },
      { name: "Chicken Sekuwa", description: "Smoky grilled chicken skewers marinated in Nepali spices.", price: 320, veg: false, spicy: true },
      { name: "Paneer Tikka", description: "Cottage cheese cubes marinated in yogurt and spices, grilled in tandoor.", price: 260, veg: true },
      { name: "Crispy Chilli Potato", description: "Fried potato tossed in a spicy chilli-garlic sauce.", price: 180, veg: true, spicy: true },
      { name: "Sweet Corn Soup", description: "Classic comfort soup with corn and a hint of pepper.", price: 160, veg: true },
      { name: "Chicken Hot & Sour Soup", description: "Tangy and spicy soup with shredded chicken.", price: 190, veg: false, spicy: true },
    ],
  },
  {
    category: "Main Course",
    items: [
      { name: "Dal Bhat Set", description: "Traditional Nepali thali — rice, lentil soup, seasonal vegetables, pickle & papad.", price: 350, veg: true },
      { name: "Chicken Sekuwa Thali", description: "Dal bhat set served with grilled chicken sekuwa.", price: 480, veg: false, spicy: true },
      { name: "Mutton Curry", description: "Slow-cooked mutton in a rich onion-tomato gravy.", price: 520, veg: false, spicy: true },
      { name: "Paneer Butter Masala", description: "Cottage cheese simmered in a creamy tomato-butter sauce.", price: 340, veg: true },
      { name: "Mixed Vegetable Curry", description: "Seasonal vegetables cooked in a light Himalayan-style curry.", price: 260, veg: true },
      { name: "Chicken Curry (Local Style)", description: "Free-range chicken cooked in traditional Dang valley spices.", price: 420, veg: false, spicy: true },
      { name: "Chicken Fried Rice", description: "Wok-tossed rice with chicken, egg, and vegetables.", price: 280, veg: false },
      { name: "Vegetable Chowmein", description: "Stir-fried noodles with garden vegetables.", price: 220, veg: true },
      { name: "Butter Naan", description: "Tandoor-baked flatbread brushed with butter.", price: 90, veg: true },
    ],
  },
  {
    category: "Beverages",
    items: [
      { name: "Masala Chiya", description: "Spiced Nepali milk tea.", price: 60, veg: true },
      { name: "Black Coffee", description: "Freshly brewed hot coffee.", price: 90, veg: true },
      { name: "Fresh Lime Soda", description: "Refreshing lime soda, sweet or salted.", price: 110, veg: true },
      { name: "Lassi", description: "Chilled sweet yogurt drink.", price: 130, veg: true },
      { name: "Seasonal Fruit Mocktail", description: "Blended fresh fruit mocktail, served chilled.", price: 180, veg: true },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Sel Roti with Honey", description: "Traditional Nepali rice-flour ring bread served with local honey.", price: 150, veg: true },
      { name: "Gulab Jamun", description: "Soft milk dumplings soaked in cardamom-rose syrup.", price: 140, veg: true },
      { name: "Kheer", description: "Creamy rice pudding garnished with nuts.", price: 160, veg: true },
    ],
  },
];

/* ---------- Helpers ---------- */

function slugify(text) {
  return text.toLowerCase().trim().replace(/\s+/g, "-");
}

function dietDot(isVeg) {
  return `<span class="diet-dot ${isVeg ? "veg" : "nonveg"}" title="${isVeg ? "Vegetarian" : "Non-Vegetarian"}"></span>`;
}

/* ---------- Rendering ---------- */

function renderCategoryNav() {
  const nav = document.getElementById("categoryNav");
  if (!nav) return;

  menuData.forEach((section, index) => {
    const link = document.createElement("a");
    link.className = "category-link" + (index === 0 ? " active" : "");
    link.textContent = section.category;
    link.href = `#${slugify(section.category)}`;
    nav.appendChild(link);
  });
}

function renderMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;
  container.innerHTML = "";

  menuData.forEach((section) => {
    const sectionEl = document.createElement("section");
    sectionEl.className = "menu-section";
    sectionEl.id = slugify(section.category);

    sectionEl.innerHTML = `
      <h2 class="menu-section-title">${section.category}</h2>
      <div class="menu-section-rule"></div>
      <div class="menu-grid"></div>
    `;

    const grid = sectionEl.querySelector(".menu-grid");

    section.items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "menu-item" + (item.spicy ? " spicy" : "");
      card.innerHTML = `
        <div class="menu-item-top">
          <span class="menu-item-name">${dietDot(item.veg)}${item.name}</span>
          <span class="menu-item-price">Rs. ${item.price}</span>
        </div>
        <p class="menu-item-desc">${item.description}</p>
      `;
      grid.appendChild(card);
    });

    container.appendChild(sectionEl);
  });
}

/* ---------- Scroll spy: highlight active nav link ---------- */

function initScrollSpy() {
  const sections = document.querySelectorAll(".menu-section");
  const navLinks = document.querySelectorAll(".category-link");
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Back to top button ---------- */

function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryNav();
  renderMenu();
  initScrollSpy();
  initBackToTop();
});
