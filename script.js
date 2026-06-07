// burger menu
const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

// products
const dresses = [
  { id: 1, title: "Royal Wedding Dress", price: 450, rating: 5, image: "../images/dress1.jpg" },
  { id: 2, title: "Elegant Evening Dress", price: 250, rating: 4, image: "../images/dress2.jpg" },
  { id: 3, title: "Luxury Gold Dress", price: 350, rating: 5, image: "../images/dress3.jpg" }
];

let allProducts = [...dresses];

// loader & error
const loader = document.createElement("div");
loader.innerText = "იტვირთება...";
document.body.appendChild(loader);

const errorBox = document.createElement("div");
errorBox.style.display = "none";
document.body.appendChild(errorBox);

// container
const container = document.querySelector(".dresses__grid");

// render products
function renderProducts(products) {
  if (!container) return;

  container.innerHTML = "";

  products.forEach(d => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${d.image}" alt="">
      <h3>${d.title}</h3>
      <p>₾ ${d.price}</p>
      <p>⭐ ${d.rating}</p>
    `;

    container.appendChild(card);
  });
}

// filter function (search)
function filterProducts(products, query) {
  if (!query || query.trim() === "") return products;

  const lowerQuery = query.trim().toLowerCase();

  return products.filter(p =>
    p.title.toLowerCase().includes(lowerQuery)
  );
}

// sort function
function sortProducts(products, sortKey) {
  const sorted = [...products];

  if (!sortKey || sortKey === "") return sorted;

  if (sortKey === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortKey === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortKey === "rating-desc") {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (sortKey === "alphabet") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sorted;
}

// MAIN FUNCTION (fixes everything)
function updateUI() {
  const searchValue = search ? search.value : "";
  const sortValue = sort ? sort.value : "";

  const filtered = filterProducts(allProducts, searchValue);
  const sorted = sortProducts(filtered, sortValue);

  renderProducts(sorted);
}

// loader
function loadData() {
  try {
    loader.style.display = "block";

    setTimeout(() => {
      updateUI();
      loader.style.display = "none";
    }, 600);

  } catch (err) {
    loader.style.display = "none";
    errorBox.innerText = "დაფიქსირდა შეცდომა";
    errorBox.style.display = "block";
  }
}

// search
const search = document.querySelector("#search");

if (search) {
  search.addEventListener("input", updateUI);
}

// sort
const sort = document.querySelector("#sort");

if (sort) {
  sort.addEventListener("change", updateUI);
}

// accordion
document.querySelectorAll(".accordion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector(".icon");

    content.classList.toggle("active");

    if (icon) {
      icon.textContent = content.classList.contains("active") ? "−" : "+";
    }
  });
});

// form validation
const form = document.querySelector(".contact__form form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector("textarea");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const nameValid = /^[A-ZА-Яა-ჰ]/.test(name);
    const emailValid = email.includes("@") && email.includes(".");
    const messageValid = message.length > 0;

    let errorBox = document.querySelector("#form-error");

    if (!errorBox) {
      errorBox = document.createElement("div");
      errorBox.id = "form-error";
      document.body.appendChild(errorBox);
    }

    if (!nameValid) {
      errorBox.innerText = "სახელი უნდა იწყებოდეს დიდი ასოთი!";
      errorBox.style.display = "block";
      return;
    }

    if (!emailValid) {
      errorBox.innerText = "შეიყვანეთ სწორი მეილი (@ და . აუცილებელია)";
      errorBox.style.display = "block";
      return;
    }

    if (!messageValid) {
      errorBox.innerText = "შეტყობინება არ შეიძლება იყოს ცარიელი";
      errorBox.style.display = "block";
      return;
    }

    alert("შეტყობინება წარმატებით გაიგზავნა");
    form.reset();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const btnDesktop = document.getElementById("theme-toggle");
  const btnMobile = document.getElementById("theme-toggle-mobile");

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    if (btnDesktop) btnDesktop.textContent = isDark ? "☀️" : "🌙";
    if (btnMobile) btnMobile.textContent = isDark ? "☀️" : "🌙";
  }

  if (btnDesktop) btnDesktop.addEventListener("click", toggleTheme);
  if (btnMobile) btnMobile.addEventListener("click", toggleTheme);

  loadData();
});