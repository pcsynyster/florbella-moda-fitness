const CONFIG = {
  loja: "Florbella Moda Fitness",
  whatsapp: "5584987873011",
  instagram: "https://instagram.com/florbellamodafitness",
  endereco: "Av. Boa Sorte, 102 - Zona Norte, Natal/RN",
  timezone: "America/Fortaleza",
  parcelas: 10,
  horarios: {
    1: [["08:30", "12:00"], ["14:00", "18:00"]],
    2: [["08:30", "12:00"], ["14:00", "18:00"]],
    3: [["08:30", "12:00"], ["14:00", "18:00"]],
    4: [["08:30", "12:00"], ["14:00", "18:00"]],
    5: [["08:30", "12:00"], ["14:00", "18:00"]],
    6: [["09:00", "12:00"]]
  }
};

const PRODUCTS = [
  {
    id: "run",
    nome: "Conjunto Run Pink",
    ref: "FB-RUN",
    categoria: "conjuntos",
    rotulo: "Conjuntos",
    pix: 180.41,
    cartao: 189.90,
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Pink"],
    img: "assets/img/conjunto-run.jpg",
    hover: "assets/img/conjunto-run-costas.jpg",
    descricao: "Top e bermuda em poliamida Max de alta compressão. Modela o corpo com segurança, não marca e tem bolsos práticos, inclusive no top, para levar o celular na corrida ou no funcional."
  },
  {
    id: "canelado-listrado",
    nome: "Conjunto Canelado Premium Listrado",
    ref: "FB-CNL",
    categoria: "conjuntos",
    rotulo: "Conjuntos",
    pix: 151.91,
    cartao: 159.90,
    tamanhos: ["P/M", "G/GG"],
    cores: ["Azul", "Marinho", "Verde", "Preto", "Chocolate", "Rosê", "Vinho"],
    img: "assets/img/conjunto-canelado-listrado.jpg",
    descricao: "Set do momento: top e legging no canelado premium grosso, zero transparência e detalhes listrados que alongam a silhueta."
  },
  {
    id: "poliamida-bolsos",
    nome: "Conjunto Poliamida Canelado com Bolsos",
    ref: "FB-PCB",
    categoria: "conjuntos",
    rotulo: "Conjuntos",
    pix: 170.91,
    cartao: 179.90,
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Preto", "Cinza", "Pink", "Rosê"],
    img: "assets/img/conjunto-poliamida-bolsos.jpg",
    descricao: "Funcionalidade e conforto no mesmo look: poliamida canelada, top de alças cruzadas e legging com bolsos funcionais."
  },
  {
    id: "alta-compressao",
    nome: "Conjunto Alta Compressão Anatômico",
    ref: "FB-ACP",
    categoria: "conjuntos",
    rotulo: "Conjuntos",
    pix: 161.41,
    cartao: 169.90,
    tamanhos: ["M", "G"],
    cores: ["Lilás", "Amarelo", "Off-white", "Chocolate"],
    img: "assets/img/conjunto-alta-compressao.jpg",
    descricao: "Alta compressão, toque macio e modelagem anatômica que valoriza e sustenta no movimento. Bermuda com bolsos laterais."
  },
  {
    id: "macacao-costas",
    nome: "Macacão Costas com Detalhes Canelado",
    ref: "FB-MCD",
    categoria: "macacoes",
    rotulo: "Macacões",
    pix: 189.91,
    cartao: 199.90,
    tamanhos: ["P/M", "G/GG"],
    cores: ["Azul", "Cinza", "Terracota"],
    img: "assets/img/macacao-costas.jpg",
    descricao: "Macacão no poliamida canelado premium com alças cruzadas e detalhes nas costas. Uma peça só, look pronto."
  },
  {
    id: "macaquinho-canelado",
    nome: "Macaquinho Canelado Premium",
    ref: "FB-MQC",
    categoria: "macacoes",
    rotulo: "Macaquinhos",
    pix: 142.41,
    cartao: 149.90,
    tamanhos: ["P/M", "G/GG"],
    cores: ["Pink", "Preto", "Nude", "Chocolate"],
    img: "assets/img/macaquinho-canelado.jpg",
    descricao: "Macaquinho no poliamida canelado premium, decote arredondado e recorte que marca a cintura. Conforto do treino ao rolê."
  },
  {
    id: "funcional",
    nome: "Conjunto Funcional Short e Top",
    ref: "FB-FUN",
    categoria: "conjuntos",
    rotulo: "Conjuntos",
    de: 169.90,
    pix: 132.91,
    cartao: 139.90,
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Marinho e laranja"],
    img: "assets/img/conjunto-funcional.jpg",
    descricao: "Aquele conjunto funcional para usar na corrida e nos treinos da academia: top de alças finas e short soltinho com cós alto."
  }
];

const STORAGE_KEY = "florbella-sacola";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const installment = (v) => brl(v / CONFIG.parcelas);
const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
const variant = (i) => `Tam. ${i.size}${i.color ? ` · ${i.color}` : ""}`;

function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data.filter((i) => findProduct(i.id)) : [];
  } catch {
    return [];
  }
}

let cart = loadCart();

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {}
}

function priceHTML(p) {
  return `
    ${p.de ? `<del>De: ${brl(p.de)}</del>` : ""}
    <span class="price__pix">${brl(p.pix)}<small>no Pix</small></span>
    <span class="price__card">Ou ${CONFIG.parcelas}x de ${installment(p.cartao)} s/ juros</span>
  `;
}

function renderProducts() {
  $("#products").innerHTML = PRODUCTS.map((p, i) => {
    const off = p.de ? Math.round((1 - p.cartao / p.de) * 100) : 0;
    return `
      <article class="product" data-id="${p.id}" data-cat="${p.categoria}" style="animation-delay:${i * 80}ms" tabindex="0">
        <div class="product__media${p.hover ? " has-hover" : ""}">
          ${off ? `<span class="badge">-${off}%</span>` : `<span class="badge badge--new">Novo</span>`}
          <img src="${p.img}" alt="${p.nome}" loading="lazy">
          ${p.hover ? `<img class="product__hover" src="${p.hover}" alt="" loading="lazy">` : ""}
          <span class="product__quick">Escolher cor e tamanho</span>
        </div>
        <h3 class="product__name">${p.nome} <span class="product__ref">${p.ref}</span></h3>
        <div class="price">${priceHTML(p)}</div>
        <p class="product__colors">${p.cores.length} ${p.cores.length === 1 ? "cor" : "cores"}</p>
        <div class="product__sizes">${p.tamanhos.map((t) => `<span>${t}</span>`).join("")}</div>
      </article>
    `;
  }).join("") + `<p class="collection__note" style="grid-column:1/-1">Novidades toda semana na loja e no Instagram ✨</p>`;
}

function initFilters() {
  $("#filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
    const f = chip.dataset.filter;
    $$(".product").forEach((el) => {
      const show = f === "todos" || el.dataset.cat === f;
      el.classList.toggle("is-hidden", !show);
      if (show) {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
      }
    });
  });
}

const modal = {
  el: $("#productModal"),
  product: null,
  size: null,
  color: null,
  qty: 1,

  open(id) {
    const p = findProduct(id);
    if (!p) return;
    this.product = p;
    this.size = p.tamanhos.length === 1 ? p.tamanhos[0] : null;
    this.color = p.cores.length === 1 ? p.cores[0] : null;
    this.qty = 1;

    $("#modalImg").src = p.img;
    $("#modalImg").alt = p.nome;
    $("#modalCat").textContent = p.rotulo;
    $("#modalName").textContent = p.nome;
    $("#modalRef").textContent = `REF. ${p.ref}`;
    $("#modalPrice").innerHTML = priceHTML(p);
    $("#modalDesc").textContent = p.descricao;

    $("#colorName").textContent = this.color ? `· ${this.color}` : "";
    $("#colorHint").textContent = "";
    $("#modalColors").classList.remove("has-error");
    $("#modalColors").innerHTML = p.cores
      .map((c) => `<button type="button" data-color="${c}" class="${c === this.color ? "is-active" : ""}">${c}</button>`)
      .join("");

    $("#sizeHint").textContent = "";
    $("#modalSizes").classList.remove("has-error");
    $("#modalSizes").innerHTML = p.tamanhos
      .map((t) => `<button type="button" data-size="${t}" class="${t === this.size ? "is-active" : ""}">${t}</button>`)
      .join("");
    this.updateQty();

    this.el.classList.add("is-open");
    this.el.setAttribute("aria-hidden", "false");
    lockScroll(true);
  },

  close() {
    this.el.classList.remove("is-open");
    this.el.setAttribute("aria-hidden", "true");
    if (!$("#cart").classList.contains("is-open")) lockScroll(false);
  },

  updateQty() {
    $("#modalQty span").textContent = this.qty;
  },

  validate() {
    let ok = true;
    if (!this.color) {
      $("#colorHint").textContent = "Escolha uma cor";
      $("#modalColors").classList.add("has-error");
      ok = false;
    }
    if (!this.size) {
      $("#sizeHint").textContent = "Selecione um tamanho";
      $("#modalSizes").classList.add("has-error");
      ok = false;
    }
    return ok;
  },

  init() {
    $("#modalColors").addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      this.color = btn.dataset.color;
      $$("#modalColors button").forEach((b) => b.classList.toggle("is-active", b === btn));
      $("#colorName").textContent = `· ${this.color}`;
      $("#colorHint").textContent = "";
      $("#modalColors").classList.remove("has-error");
    });

    $("#modalSizes").addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      this.size = btn.dataset.size;
      $$("#modalSizes button").forEach((b) => b.classList.toggle("is-active", b === btn));
      $("#sizeHint").textContent = "";
      $("#modalSizes").classList.remove("has-error");
    });

    $("#modalQty").addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      this.qty = Math.min(20, Math.max(1, this.qty + Number(btn.dataset.step)));
      this.updateQty();
    });

    $("#addToCart").addEventListener("click", () => {
      if (!this.validate()) return;
      addToCart(this.product.id, this.size, this.color, this.qty);
      this.close();
      toast(`${this.product.nome} (${this.size} · ${this.color}) adicionado à sacola 🩷`);
    });

    $("#buyNow").addEventListener("click", () => {
      if (!this.validate()) return;
      const p = this.product;
      const text = [
        `Olá, ${CONFIG.loja}! 💖 Vi no site e quero pedir:`,
        "",
        `${p.nome} (Ref. ${p.ref})`,
        `Cor: ${this.color} | Tamanho: ${this.size} | Quantidade: ${this.qty}`,
        `Valor no Pix: ${brl(p.pix * this.qty)}`,
        `Ou no cartão: ${brl(p.cartao * this.qty)} em até ${CONFIG.parcelas}x de ${installment(p.cartao * this.qty)}`,
        "",
        "Pode confirmar a disponibilidade? ✨"
      ].join("\n");
      window.open(waLink(text), "_blank");
    });

    this.el.addEventListener("click", (e) => {
      if (e.target === this.el || e.target.closest("[data-close]")) this.close();
    });
  }
};

function addToCart(id, size, color, qty) {
  const item = cart.find((i) => i.id === id && i.size === size && i.color === color);
  if (item) item.qty = Math.min(20, item.qty + qty);
  else cart.push({ id, size, color, qty });
  saveCart();
  renderCart();
  const badge = $("#cartCount");
  badge.classList.add("is-bump");
  setTimeout(() => badge.classList.remove("is-bump"), 300);
}

function cartTotals() {
  return cart.reduce(
    (acc, i) => {
      const p = findProduct(i.id);
      acc.pix += p.pix * i.qty;
      acc.cartao += p.cartao * i.qty;
      acc.qtd += i.qty;
      return acc;
    },
    { pix: 0, cartao: 0, qtd: 0 }
  );
}

function renderCart() {
  const totals = cartTotals();
  const empty = cart.length === 0;

  $("#cartCount").textContent = totals.qtd;
  $("#cartHeadCount").textContent = totals.qtd ? `(${totals.qtd} ${totals.qtd === 1 ? "item" : "itens"})` : "";
  $("#cartEmpty").style.display = empty ? "block" : "none";
  $("#cartFoot").style.display = empty ? "none" : "block";
  $("#checkout").classList.toggle("is-visible", !empty);

  $("#cartList").innerHTML = cart.map((i, idx) => {
    const p = findProduct(i.id);
    return `
      <li class="cart-item">
        <img src="${p.img}" alt="${p.nome}">
        <div>
          <h5>${p.nome}</h5>
          <p class="cart-item__meta">${variant(i)} · Ref. ${p.ref}</p>
          <div class="qty" data-index="${idx}">
            <button type="button" data-step="-1" aria-label="Diminuir">−</button>
            <span>${i.qty}</span>
            <button type="button" data-step="1" aria-label="Aumentar">+</button>
          </div>
        </div>
        <div>
          <p class="cart-item__price">${brl(p.pix * i.qty)}</p>
          <button type="button" class="cart-item__remove" data-remove="${idx}">Remover</button>
        </div>
      </li>
    `;
  }).join("");

  $("#totalPix").textContent = brl(totals.pix);
  $("#totalCard").textContent = `${brl(totals.cartao)} em até ${CONFIG.parcelas}x de ${installment(totals.cartao)}`;
}

function initCart() {
  $("#cartList").addEventListener("click", (e) => {
    const remove = e.target.closest("[data-remove]");
    if (remove) {
      cart.splice(Number(remove.dataset.remove), 1);
      saveCart();
      renderCart();
      return;
    }
    const step = e.target.closest("[data-step]");
    if (step) {
      const item = cart[Number(step.closest(".qty").dataset.index)];
      item.qty += Number(step.dataset.step);
      if (item.qty < 1) cart = cart.filter((c) => c !== item);
      else item.qty = Math.min(20, item.qty);
      saveCart();
      renderCart();
    }
  });

  $$('input[name="entrega"]').forEach((r) =>
    r.addEventListener("change", () => {
      $("#addressField").classList.toggle("is-visible", r.value === "Entrega" && r.checked);
    })
  );

  $("#sendOrder").addEventListener("click", sendOrder);

  $("#cartOpen").addEventListener("click", openCart);
  $("#overlay").addEventListener("click", closeCart);
  $$("#cart [data-close]").forEach((b) => b.addEventListener("click", closeCart));
}

function sendOrder() {
  if (!cart.length) return;
  const form = $("#checkout");
  const nome = form.nome.value.trim();
  const pagamento = form.pagamento.value;
  const entrega = form.entrega.value;
  const endereco = form.endereco.value.trim();
  const obs = form.obs.value.trim();

  form.nome.closest(".field").classList.toggle("has-error", !nome);
  $("#addressField").classList.toggle("has-error", entrega === "Entrega" && !endereco);

  if (!nome) {
    form.nome.focus();
    toast("Informe seu nome para finalizar");
    return;
  }
  if (entrega === "Entrega" && !endereco) {
    form.endereco.focus();
    toast("Informe o endereço de entrega");
    return;
  }

  const totals = cartTotals();
  const linhas = cart.map((i, n) => {
    const p = findProduct(i.id);
    const valor = pagamento === "Pix" ? p.pix : p.cartao;
    return `${n + 1}. ${p.nome} (Ref. ${p.ref})\n   Cor: ${i.color} | Tamanho: ${i.size} | Qtd: ${i.qty} | ${brl(valor * i.qty)}`;
  });

  const total = pagamento === "Pix"
    ? `Total no Pix: ${brl(totals.pix)}`
    : `Total no cartão: ${brl(totals.cartao)} (até ${CONFIG.parcelas}x de ${installment(totals.cartao)} sem juros)`;

  const text = [
    `Olá, ${CONFIG.loja}! 💖 Quero finalizar meu pedido feito pelo site:`,
    "",
    ...linhas,
    "",
    total,
    "",
    `Nome: ${nome}`,
    `Pagamento: ${pagamento}`,
    `Recebimento: ${entrega}${entrega === "Entrega" ? ` - ${endereco}` : " (Zona Norte)"}`,
    obs ? `Observação: ${obs}` : "",
    "",
    "Aguardo a confirmação. Obrigada! 🩷"
  ].filter((l, idx, arr) => !(l === "" && arr[idx - 1] === "")).join("\n");

  window.open(waLink(text), "_blank");
}

function lockScroll(state) {
  document.body.classList.toggle("is-locked", state);
}

function openCart() {
  $("#cart").classList.add("is-open");
  $("#cart").setAttribute("aria-hidden", "false");
  $("#overlay").classList.add("is-visible");
  lockScroll(true);
}

function closeCart() {
  $("#cart").classList.remove("is-open");
  $("#cart").setAttribute("aria-hidden", "true");
  $("#overlay").classList.remove("is-visible");
  lockScroll(false);
}

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2600);
}

function storeNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CONFIG.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

function initStatus() {
  const el = $("#storeStatus");
  const toMin = (h) => {
    const [a, b] = h.split(":").map(Number);
    return a * 60 + b;
  };
  const label = (h) => h.replace(":00", "h").replace(":", "h");
  const dayNames = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

  function update() {
    const { day, minutes } = storeNow();
    const today = CONFIG.horarios[day] || [];
    const open = today.find(([a, b]) => minutes >= toMin(a) && minutes < toMin(b));

    if (open) {
      el.className = "status is-open";
      el.innerHTML = `<i></i>Aberto agora 🩷 <span>até as ${label(open[1])}</span>`;
      return;
    }

    let next = today.find(([a]) => toMin(a) > minutes);
    let when = next ? "hoje" : "";
    for (let i = 1; !next && i <= 7; i++) {
      const d = (day + i) % 7;
      if (CONFIG.horarios[d]) {
        next = CONFIG.horarios[d][0];
        when = i === 1 ? "amanhã" : dayNames[d];
      }
    }
    el.className = "status";
    el.innerHTML = `<i></i>Fechado agora <span>abrimos ${when} às ${label(next[0])} ✨</span>`;
  }

  update();
  setInterval(update, 60000);
}

function initLinks() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.loja + ", " + CONFIG.endereco)}`;
  $("#mapsLink").href = mapsUrl;
  $$("[data-maps]").forEach((a) => {
    a.href = mapsUrl;
    a.target = "_blank";
    a.rel = "noopener";
  });

  $$("[data-instagram]").forEach((a) => (a.href = CONFIG.instagram));

  const messages = {
    contato: `Olá, ${CONFIG.loja}! 🩷 Vim pelo site e gostaria de mais informações.`
  };
  $$("[data-wa]").forEach((a) => {
    a.href = waLink(messages[a.dataset.wa]);
    a.target = "_blank";
    a.rel = "noopener";
  });

  $$("[data-open]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      modal.open(a.dataset.open);
    })
  );
}

function initHeader() {
  const header = $("#header");
  const hero = $("#inicio");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > hero.offsetHeight - 80);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $("#menuToggle");
  const nav = $("#nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
  });
  $$("#nav a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
    })
  );
}

function initProductsEvents() {
  const grid = $("#products");
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".product");
    if (card) modal.open(card.dataset.id);
  });
  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".product");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      modal.open(card.dataset.id);
    }
  });
}

function initReveal() {
  const targets = $$(".section-head, .perk, .step, .editorial__content");
  targets.forEach((el) => el.classList.add("reveal"));
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    }),
    { threshold: 0.15 }
  );
  targets.forEach((el) => io.observe(el));
}

function initVideo() {
  const video = $("#heroVideo");
  const play = () => video.play().catch(() => {});
  play();
  document.addEventListener("visibilitychange", () => (document.hidden ? video.pause() : play()));
}

function initLookbook() {
  const video = $("#lookbookVideo");
  const btn = $("#soundToggle");
  if (!video) return;

  btn.addEventListener("click", () => {
    video.muted = !video.muted;
    btn.classList.toggle("is-on", !video.muted);
    btn.setAttribute("aria-label", video.muted ? "Ativar som" : "Desativar som");
    if (video.paused) video.play().catch(() => {});
  });

  if (!("IntersectionObserver" in window)) {
    video.play().catch(() => {});
    return;
  }
  new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
    { threshold: 0.35 }
  ).observe(video);
}

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (modal.el.classList.contains("is-open")) modal.close();
  else closeCart();
});

$("#year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
initFilters();
modal.init();
initCart();
initStatus();
initLinks();
initHeader();
initProductsEvents();
initReveal();
initVideo();
initLookbook();
