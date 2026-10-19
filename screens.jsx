/* ============================================================================
   Pavlo´s Store — pantallas: Inicio · Catálogo · Combos · Info
   (El Carrito/checkout vive en checkout.jsx)
   ============================================================================ */

/* ---- Estado abierto/cerrado (pill) ------------------------------------- */
function OpenPill({ estado }) {
  const { minsToHora } = window.PAVLOS;
  if (estado.abierto) {
    return (
      <span className="pv-status is-open">
        <span className="pv-status-dot" />Abierto ahora
        <span className="pv-status-sub">cierra {minsToHora(estado.cierra)}</span>
      </span>
    );
  }
  return (
    <span className="pv-status is-closed">
      <span className="pv-status-dot" />Cerrado
      {estado.abre != null && <span className="pv-status-sub">abre {minsToHora(estado.abre)}</span>}
    </span>
  );
}

/* ---- Banner Hero Promocional Dinámico ---------------------------------- */
function PromoHeroBanner({ banners, goNav, goCat }) {
  const [curr, setCurr] = React.useState(0);
  if (!banners || !banners.length) return null;

  React.useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => {
      setCurr(c => (c + 1) % banners.length);
    }, 5000);
    return () => clearInterval(t);
  }, [banners.length]);

  const b = banners[curr] || banners[0];

  const handleAction = () => {
    if (b.action === "combos") {
      goNav("combos");
    } else if (b.action && b.action !== "catalogo") {
      goNav("catalogo");
      if (goCat) goCat(b.action);
    } else {
      goNav("catalogo");
    }
  };

  return (
    <div className="pv-banner-carousel" style={{ padding: "0 14px", margin: "16px 0 6px" }}>
      <div className="pv-banner-card" onClick={handleAction} style={{ cursor: "pointer" }}>
        <div className="pv-banner-badge">
          <span>{b.tag}</span>
          {b.badge && <span className="pv-banner-pill">{b.badge}</span>}
        </div>
        <h3 className="pv-banner-title">{b.titulo}</h3>
        <p className="pv-banner-sub">{b.sub}</p>
        <div className="pv-banner-action">
          <span>{b.cta || "Pedir ahora"}</span>
          <Icon name="arrow" size={14} />
        </div>
      </div>
      {banners.length > 1 && (
        <div className="pv-banner-dots">
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              className={"pv-banner-dot" + (i === curr ? " is-active" : "")}
              onClick={(e) => { e.stopPropagation(); setCurr(i); }}
              aria-label={`Banner ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Hero Slider (Dislicores Benchmark) -------------------------------- */
function HeroSlider({ goNav, goCat }) {
  const [curr, setCurr] = React.useState(0);
  const slides = [
    {
      id: "s1",
      tag: "DOMICILIOS EXPRESS · 20-30 MIN",
      titulo: "El Trago de la Noche Frío en tu Puerta",
      sub: "Aguardiente Amarillo, Antioqueño, Ron Medellín y whiskies al mejor precio en Santo Tomás y Palmar.",
      cta: "Pedir Aguardiente",
      action: () => { goNav("catalogo"); goCat("aguardiente"); },
      img: "uploads/lote_imagenes_procesado_1784310337875/aguardiente-amarillo-750.webp"
    },
    {
      id: "s2",
      tag: "AHORRO GARANTIZADO · HASTA 20% OFF",
      titulo: "Combos Rumberos Listos para la Fiesta",
      sub: "Botella + Hielo + Mezcladores en un solo precio. Destapa y celebra sin enredos.",
      cta: "Ver Combos Rumberos",
      action: () => goNav("combos"),
      img: "uploads/lote_imagenes_procesado_1784310337875/combo-ron-noche.webp"
    },
    {
      id: "s3",
      tag: "100% FRÍO · CERVEZAS Y SNACKS",
      titulo: "Coronitas, Águila, Heineken y Mecatos",
      sub: "Licores y pasabocas a la temperatura ideal para no parar la rumba.",
      cta: "Pedir Cervezas",
      action: () => { goNav("catalogo"); goCat("cerveza"); },
      img: "uploads/lote_imagenes_procesado_1784310337875/corona-botella-330.webp"
    }
  ];

  const [isPaused, setIsPaused] = React.useState(false);
  const touchStartRef = React.useRef(0);
  const touchDeltaRef = React.useRef(0);

  const prev = React.useCallback(() => {
    setCurr(c => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const next = React.useCallback(() => {
    setCurr(c => (c + 1) % slides.length);
  }, [slides.length]);

  React.useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next, isPaused]);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
    touchDeltaRef.current = 0;
  };

  const handleTouchMove = (e) => {
    touchDeltaRef.current = e.touches[0].clientX - touchStartRef.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaRef.current > 45) {
      prev();
    } else if (touchDeltaRef.current < -45) {
      next();
    }
    touchStartRef.current = 0;
    touchDeltaRef.current = 0;
  };

  return (
    <div
      className="pv-hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="pv-slide-track"
        style={{ transform: `translate3d(-${curr * 100}%, 0, 0)` }}
      >
        {slides.map((s, idx) => {
          const isActive = idx === curr;
          return (
            <div
              key={s.id}
              className={"pv-slide" + (isActive ? " is-active" : "")}
              aria-hidden={!isActive}
            >
              <div className="pv-slide-content">
                <div className="pv-slide-tag">{s.tag}</div>
                <h2 className="pv-slide-title">{s.titulo}</h2>
                <p className="pv-slide-sub">{s.sub}</p>
                <button type="button" className="pv-slide-cta" onClick={s.action}>
                  <span>{s.cta}</span>
                  <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="pv-slide-media">
                <img src={s.img} alt={s.titulo} loading={idx === 0 ? "eager" : "lazy"} decoding="async" />
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="pv-slider-nav pv-slider-prev"
        onClick={prev}
        aria-label="Slide anterior"
      >
        <Icon name="chevronLeft" size={20} />
      </button>

      <button
        type="button"
        className="pv-slider-nav pv-slider-next"
        onClick={next}
        aria-label="Slide siguiente"
      >
        <Icon name="chevron" size={20} />
      </button>

      <div className="pv-slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={"pv-slider-dot" + (i === curr ? " is-active" : "")}
            onClick={() => setCurr(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---- Quick Category Shortcuts Grid (Dislicores Benchmark) --------------- */
function QuickCategoryGrid({ goNav, goCat }) {
  const cats = [
    { id: "aguardiente", label: "Aguardiente", img: "uploads/lote_imagenes_procesado_1784310337875/aguardiente-amarillo-750.webp" },
    { id: "ron", label: "Ron", img: "uploads/lote_imagenes_procesado_1784310337875/ron-medellin-750.webp" },
    { id: "whiskey", label: "Whiskey", img: "uploads/lote_imagenes_procesado_1784310337875/buchanans-12-750.webp" },
    { id: "cerveza", label: "Cervezas", img: "uploads/lote_imagenes_procesado_1784310337875/corona-botella-330.webp" },
    { id: "tequila", label: "Tequila", img: "uploads/lote_imagenes_procesado_1784310337875/tequila-don-julio-blanco-700.webp" },
    { id: "aperitivos", label: "Cócteles", img: "uploads/lote_imagenes_procesado_1784310337875/margarita.webp" },
    { id: "combos", label: "Combos", img: "uploads/lote_imagenes_procesado_1784310337875/ron-medellin-extra-anejo-5-anos-750.webp", isCombo: true },
    { id: "vapes", label: "Vapes", img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-banana.webp" },
    { id: "mecato", label: "Snacks", img: "uploads/lote_imagenes_procesado_1784310337875/natuchips-verde.webp" },
  ];

  return (
    <div className="pv-quick-grid">
      {cats.map(c => (
        <div
          key={c.id}
          className="pv-quick-card"
          onClick={() => {
            if (c.isCombo) {
              goNav("combos");
            } else {
              goNav("catalogo");
              goCat(c.id);
            }
          }}>
          <div className="pv-quick-card-icon">
            <img src={c.img} alt={c.label} className="pv-quick-card-img" loading="lazy" decoding="async" />
          </div>
          <span className="pv-quick-card-title">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ============================ INICIO (DISLICORES STYLE) ================== */
function HomeScreen({ estado, cart, add, inc, dec, cardStyle, goNav, goCat }) {
  const { PRODUCTOS, COMBOS, CATEGORIAS, CONFIG, IG_POSTS, getPromos, pesos } = window.PAVLOS;
  const promos = getPromos();

  // Los más vendidos / favoritos
  const masVendidos = React.useMemo(() => {
    return PRODUCTOS.filter(p => p.tag === "Más vendido" || p.estrella || ["aguardiente-amarillo-750", "ron-medellin-750", "buchanans-12-750", "old-parr-12-750", "aguila-negra", "corona-botella-330", "coca-cola"].includes(p.id)).slice(0, 8);
  }, [PRODUCTOS]);

  return (
    <div className="pv-screen">
      {/* Hero Banner Slider Comercial */}
      <HeroSlider goNav={goNav} goCat={goCat} />

      {/* Categorías Destacadas (Dislicores Quick Rail) */}
      <QuickCategoryGrid goNav={goNav} goCat={goCat} />

      {/* Promociones Destacadas */}
      {promos.length > 0 && (
        <section className="pv-block" style={{ borderRadius: "20px", marginBottom: "28px" }}>
          <div className="pv-block-head">
            <h2 className="pv-block-title">Promociones del Fin de Semana</h2>
            <button type="button" className="pv-link" onClick={() => goNav("combos")}>
              Ver todos los combos <Icon name="chevron" size={14} />
            </button>
          </div>
          <div className="pv-promo-rail">
            {promos.map(it => (
              <PromoCard key={it.id} item={it} qty={cart[it.id] || 0}
                onAdd={() => add(it.id)} onInc={() => inc(it.id)} onDec={() => dec(it.id)} />
            ))}
          </div>
        </section>
      )}

      {/* Los Más Vendidos en Santo Tomás & Palmar */}
      <section className="pv-block" style={{ borderRadius: "20px", marginBottom: "28px" }}>
        <div className="pv-block-head">
          <h2 className="pv-block-title">Los Más Pedidos en Santo Tomás & Palmar</h2>
          <button type="button" className="pv-link" onClick={() => goNav("catalogo")}>
            Ver todo el catálogo <Icon name="chevron" size={14} />
          </button>
        </div>
        <div className="pv-products is-grid cs-tile">
          {masVendidos.map(p => (
            <ProductCard key={p.id} p={p} variant="tile" qty={cart[p.id] || 0}
              onAdd={() => add(p.id)} onInc={() => inc(p.id)} onDec={() => dec(p.id)} />
          ))}
        </div>
      </section>

      {/* Combos Rumberos */}
      <section className="pv-block" style={{ borderRadius: "20px", marginBottom: "28px" }}>
        <div className="pv-block-head">
          <h2 className="pv-block-title">Combos Rumberos Listos para Tomar</h2>
          <button type="button" className="pv-link" onClick={() => goNav("combos")}>
            Todos los combos <Icon name="chevron" size={14} />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
          {COMBOS.slice(0, 2).map((c, i) => (
            <ComboCard key={c.id} c={c} featured={i === 0} qty={cart[c.id] || 0}
              onAdd={() => add(c.id)} onInc={() => inc(c.id)} onDec={() => dec(c.id)} />
          ))}
        </div>
      </section>

      {/* Tira de Garantía y Servicio al Cliente */}
      <section className="pv-block pv-info-strip" style={{ borderRadius: "20px", marginBottom: "28px" }}>
        <div className="pv-info-grid">
          <button type="button" className="pv-info-chip" onClick={() => goNav("info")}>
            <span className="pv-info-tag">Horario Nocturno</span>
            <strong>Abiertos hasta las 3:00 a.m.</strong>
            <span>Viernes, Sábados, Domingos y Festivos</span>
          </button>
          <button type="button" className="pv-info-chip" onClick={() => goNav("info")}>
            <span className="pv-info-tag">Sedes Físicas</span>
            <strong>3 Sedes en el Atlántico</strong>
            <span>Santo Tomás y Palmar de Varela</span>
          </button>
          <button type="button" className="pv-info-chip" onClick={() => goNav("info")}>
            <span className="pv-info-tag">Pagos Fáciles</span>
            <strong>Contra entrega y Transferencia</strong>
            <span>Nequi · Daviplata · Bancolombia</span>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================ CATÁLOGO =================================== */
function CatalogScreen({ cart, add, inc, dec, cardStyle, activeCat, setActiveCat }) {
  const { PRODUCTOS, CATEGORIAS } = window.PAVLOS;
  const [q, setQ] = React.useState("");
  const [filterMode, setFilterMode] = React.useState("all"); // 'all' | 'promo' | 'stock'

  const term = q.trim().toLowerCase();
  const filtered = PRODUCTOS.filter(p => {
    if (term && !(p.nombre + " " + (p.variante || "") + " " + (p.casa || "")).toLowerCase().includes(term)) return false;
    if (filterMode === "promo" && !p.promo) return false;
    if (filterMode === "stock" && p.disponible === false) return false;
    return true;
  });

  const cats = CATEGORIAS.filter(c => activeCat ? c.id === activeCat : true)
    .map(c => ({ ...c, items: filtered.filter(p => p.cat === c.id) }))
    .filter(c => c.items.length);

  const gridLayout = cardStyle === "tile" || cardStyle === "plinth";

  return (
    <div className="pv-screen">
      <div className="pv-sticky-top">
        <div className="pv-search">
          <Icon name="search" size={18} />
          <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar whiskey, aguardiente, cerveza, vape…" />
          {q && <button type="button" className="pv-search-clear" onClick={() => setQ("")} aria-label="Limpiar"><Icon name="close" size={16} /></button>}
        </div>

        {/* Barra de Filtros rápidos y contador */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 14px 6px", gap: "8px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              className={"pv-quick-chip" + (filterMode === "all" ? " is-active" : "")}
              style={{ padding: "4px 10px", fontSize: "0.74rem" }}
              onClick={() => setFilterMode("all")}>
              Todos
            </button>
            <button
              type="button"
              className={"pv-quick-chip" + (filterMode === "promo" ? " is-active" : "")}
              style={{ padding: "4px 10px", fontSize: "0.74rem" }}
              onClick={() => setFilterMode("promo")}>
              En promoción
            </button>
            <button
              type="button"
              className={"pv-quick-chip" + (filterMode === "stock" ? " is-active" : "")}
              style={{ padding: "4px 10px", fontSize: "0.74rem" }}
              onClick={() => setFilterMode("stock")}>
              Disponibles
            </button>
          </div>
          <span className="pv-count-badge">{filtered.length} {filtered.length === 1 ? "producto" : "productos"}</span>
        </div>

        <div className="pv-chips">
          <button type="button" className={"pv-chip" + (!activeCat ? " is-active" : "")} onClick={() => setActiveCat(null)}>
            Todo
          </button>
          {CATEGORIAS.map(c => (
            <button type="button" key={c.id} className={"pv-chip" + (activeCat === c.id ? " is-active" : "")} onClick={() => setActiveCat(c.id)}>
              {c.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="pv-catalog-body">
        {cats.length === 0 && (
          <div className="ks-empty pv-empty">
            <Icon name="search" size={30} />
            <strong>Nada por aquí</strong>
            <p>No encontramos "{q}". Prueba otra búsqueda o elimina los filtros.</p>
            {(q || filterMode !== "all" || activeCat) && (
              <button
                type="button"
                className="ks-button ks-button-secondary"
                style={{ marginTop: 12 }}
                onClick={() => { setQ(""); setFilterMode("all"); setActiveCat(null); }}>
                Restablecer filtros
              </button>
            )}
          </div>
        )}
        {cats.map(c => {
          // agrupar por casa de licor, alfabéticamente
          const casas = {};
          c.items.forEach(p => { (casas[p.casa] = casas[p.casa] || []).push(p); });
          const casaNames = Object.keys(casas).sort((a, b) => a.localeCompare(b, "es"));
          return (
            <section key={c.id} className="pv-cat-section">
              <h2 className="pv-cat-title">
                <span>{c.nombre}</span>
                <span>{c.items.length}</span>
              </h2>
              {casaNames.map(casa => (
                <div key={casa} className="pv-casa">
                  <h3 className="pv-casa-title"><span className="pv-casa-mark" />{casa}</h3>
                  <div className={"pv-products " + (gridLayout ? "is-grid" : "is-list") + " cs-" + cardStyle}>
                    {casas[casa].map(p => (
                      <ProductCard key={p.id} p={p} variant={cardStyle} qty={cart[p.id] || 0}
                        onAdd={() => add(p.id)} onInc={() => inc(p.id)} onDec={() => dec(p.id)} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ============================ COMBOS ===================================== */
function CombosScreen({ cart, add, inc, dec }) {
  const { COMBOS } = window.PAVLOS;
  return (
    <div className="pv-screen">
      <div className="pv-page-head">
        <span className="pv-eyebrow">Combos & Promociones</span>
        <h1 className="pv-page-title">Combos armados</h1>
        <p className="pv-page-sub">Listos para la parranda. Botella, mezcladores y hielo en un solo precio.</p>
      </div>
      <div className="pv-combo-list">
        {COMBOS.map((c, i) => (
          <ComboCard key={c.id} c={c} featured={i === 0} qty={cart[c.id] || 0}
            onAdd={() => add(c.id)} onInc={() => inc(c.id)} onDec={() => dec(c.id)} />
        ))}
      </div>
    </div>
  );
}

/* ============================ INFO ====================================== */
function InfoScreen({ estado }) {
  const { CONFIG, minsToHora } = window.PAVLOS;
  return (
    <div className="pv-screen">
      <div className="pv-page-head">
        <span className="pv-eyebrow">Información oficial</span>
        <h1 className="pv-page-title">Sucursales e info</h1>
        <div className="pv-page-status"><OpenPill estado={estado} /></div>
      </div>

      <section className="pv-block">
        <h2 className="pv-block-title">Sucursales</h2>
        <div className="pv-suc-list">
          {CONFIG.sucursales.map((s, idx) => (
            <div key={s.id} className={"pv-suc" + (s.principal ? " is-main" : "")}>
              <div className="pv-suc-num">{String(idx + 1).padStart(2, "0")}</div>
              <div>
                <div className="pv-suc-city">{s.ciudad}{s.principal && <span className="pv-suc-badge">Sede Principal</span>}</div>
                <div className="pv-suc-dir">{s.dir}</div>
                {s.nota && <div className="pv-suc-note">{s.nota}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pv-block">
        <h2 className="pv-block-title">Horarios</h2>
        <div className="pv-hours">
          {CONFIG.horarios.map((h, i) => (
            <div key={i} className="pv-hour-row"><span>{h.dias}</span><span>{h.rango}</span></div>
          ))}
          <div className="pv-hour-note">Domicilios activos durante todo el horario de atención.</div>
        </div>
      </section>

      <section className="pv-block">
        <h2 className="pv-block-title">Domicilios y pagos</h2>
        <div className="pv-pay-grid">
          <div className="pv-pay-cost">
            <span className="pv-pay-cost-label">Costo de domicilio</span>
            <span className="pv-price pv-price-lg">{window.PAVLOS.pesos(CONFIG.domicilio)}</span>
            <span className="pv-pay-zones">Zonas: {CONFIG.zonas.join(" · ")}</span>
          </div>
          <div className="pv-pay-methods">
            <span className="pv-pay-label">Métodos de pago</span>
            <div className="pv-pay-chips">{CONFIG.pagos.map(m => <span key={m} className="pv-pay-chip">{m}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="pv-block">
        <h2 className="pv-block-title">Contacto</h2>
        <div className="pv-contact">
          <a className="pv-contact-row" href={"https://wa.me/" + CONFIG.whatsapp} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={22} /><div><strong>WhatsApp / pedidos</strong><span>{CONFIG.whatsappDisplay}</span></div><Icon name="chevron" size={16} />
          </a>
          <a className="pv-contact-row" href={CONFIG.instagramUrl} target="_blank" rel="noopener">
            <Icon name="instagram" size={22} /><div><strong>Instagram</strong><span>@{CONFIG.instagram}</span></div><Icon name="chevron" size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { OpenPill, HomeScreen, CatalogScreen, CombosScreen, InfoScreen });
