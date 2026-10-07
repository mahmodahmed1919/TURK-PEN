/*
  عدّل بيانات الشركة والمنتجات من هذا الملف فقط.
  رقم واتساب: اكتب الرقم بمفتاح الدولة بدون + أو مسافات، مثال مصر: 201001234567
  صور المنتجات: ضع الصور داخل مجلد images واكتب مسارها مثل images/handle-1.jpg
*/
const SITE = {
  name: "TURK-PEN",
  subtitle: "للمقابض والمفصلات والإكسسوارات التركيه عاليه الجوده",
  whatsapp: "201036773647", // غيّر الرقم إلى رقمك
  currency: "ج.م"
};

const PRODUCTS = [
  { name: "مقبض فاخر أسود", category: "مقابض", description: "تصميم أنيق وتشطيب أسود يناسب الاستخدامات العصرية.", image: "images/handle-black.jpg" },
  { name: "مقبض جرار دفن أسود", category: "مقابض", description: "مقبض عملي للأبواب الجرارة بتصميم مدمج.", image: "images/flush-handle.jpg" },
  { name: "مقبض إشارة فينوس", category: "مقابض", description: "اختيار مناسب لمشروعات الأثاث والتجهيزات.", image: "images/venus-handle.jpg" },
  { name: "مفصلة صلب مكسية بلاستيك GEVISS", category: "مفصلات", description: "مفصلة عملية للاستخدام في أعمال النجارة.", image: "images/geviss-hinge.jpg" },
  { name: "مفصلات تركي", category: "مفصلات", description: "أضف وصف المنتج والمقاسات والتفاصيل هنا.", image: "" },
  { name: "إكسسوارات أثاث", category: "إكسسوارات", description: "أضف وصف المنتج والمقاسات والتفاصيل هنا.", image: "" },
  { name: "مقبض مودرن", category: "مقابض", description: "أضف وصف المنتج والمقاسات والتفاصيل هنا.", image: "" },
  { name: "مستلزمات تركيب", category: "إكسسوارات", description: "أضف وصف المنتج والمقاسات والتفاصيل هنا.", image: "" }
];

const grid = document.getElementById("product-grid");
const search = document.getElementById("search");
const category = document.getElementById("category");
const whatsappUrl = (message = "مرحبًا، أريد الاستفسار عن منتجاتكم") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

document.getElementById("site-name").textContent = SITE.name;
document.getElementById("footer-name").textContent = SITE.name;
document.querySelector(".brand small").textContent = SITE.subtitle;
document.title = `${SITE.name} | كتالوج المنتجات`;
document.getElementById("year").textContent = new Date().getFullYear();
["top-whatsapp", "bottom-whatsapp", "floating-whatsapp"].forEach(id => {
  document.getElementById(id).href = whatsappUrl();
});

[...new Set(PRODUCTS.map(p => p.category))].forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  category.appendChild(option);
});

function renderProducts() {
  const query = search.value.trim().toLowerCase();
  const selected = category.value;
  const filtered = PRODUCTS.filter(p =>
    (selected === "all" || p.category === selected) &&
    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query)
  );
  document.getElementById("result-count").textContent = `${filtered.length} منتج`;
  grid.innerHTML = "";
  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state">لا توجد منتجات مطابقة لبحثك. جرّب كلمة أخرى.</div>';
    return;
  }
  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    const image = product.image
      ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;placeholder&quot;><b>◇</b><span>أضف صورة المنتج</span></div>'">`
      : '<div class="placeholder"><b>◇</b><span>أضف صورة المنتج</span></div>';
    card.innerHTML = `
      <div class="product-image">${image}</div>
      <div class="product-info">
        <span class="category-tag">${escapeHtml(product.category)}</span>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <div class="product-actions">
          <a href="${whatsappUrl(`مرحبًا، أريد الاستفسار عن: ${product.name}`)}" target="_blank" rel="noopener">استفسر عن المنتج</a>
          <span>↙</span>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
search.addEventListener("input", renderProducts);
category.addEventListener("change", renderProducts);
renderProducts();
