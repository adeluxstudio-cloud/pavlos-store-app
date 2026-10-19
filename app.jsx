/* ============================================================================
   Pavlo´s Store — E-Commerce Shell (Benchmark: Dislicores)
   Navegación completa, barra de anuncios, header profesional con búsqueda en vivo,
   barra de categorías, slide-over cart drawer, pie de página comercial y panel admin secreto.
   ============================================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cardStyle": "tile",
  "goldTone": "oklch(83% 0.09 78)",
  "textures": true,
  "motion": true
}/*EDITMODE-END*/;

const GOLD_TONES = [
  "oklch(83% 0.09 78)",    // Champagne Titanium (lujo contemporáneo)
  "oklch(86% 0.07 82)",    // Champagne Pálido
  "oklch(76% 0.11 75)",    // Ámbar Oro Profundo
];

/* ---- Age gate (+18) ----------------------------------------------------- */
function AgeGate({ onYes }) {
  return (
    <div className="pv-age">
      <div className="pv-age-grain" />
      <div className="pv-age-inner">
        <img className="pv-age-logo" src="assets/pavlos-logo.png" alt="" />
        <div className="pv-wordmark pv-age-word">Pavlo´s Store</div>
        <div className="pv-age-rule" />
        <h1 className="pv-age-q">¿Eres mayor de edad?</h1>
        <p className="pv-age-sub">Para entrar a la licorería debes ser mayor de 18 años. El consumo de alcohol es nocivo para la salud.</p>
        <div className="pv-age-actions">
          <button type="button" className="ks-button ks-button-primary pv-age-yes" onClick={onYes}>Sí, tengo 18 o más</button>
          <a className="pv-age-no" href="https://www.google.com">Soy menor</a>
        </div>
      </div>
    </div>
  );
}

/* ---- Barra Superior de Anuncios (Dislicores TopBar) --------------------- */
function TopAnnouncementBar() {
  const { CONFIG } = window.PAVLOS;
  return (
    <div className="pv-topbar">
      <div className="pv-container pv-topbar-inner">
        <div className="pv-topbar-left">
          <span className="pv-pulse-dot" />
          <span>Domicilios en Santo Tomás y Palmar de Varela · Entregas en 20-30 min</span>
        </div>
        <div className="pv-topbar-right">
          <span>Licores 100% legales y estampillados</span>
          <a href={"https://wa.me/" + CONFIG.whatsapp} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={14} /> Pedidos directos: {CONFIG.whatsappDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---- Header E-Commerce (Dislicores Standard) ---------------------------- */
function ECommerceHeader({ estado, goNav, goCat, cartCount, cartTotal, onOpenCart, onSearchSelect }) {
  const { CONFIG, PRODUCTOS, pesos } = window.PAVLOS;
  const [q, setQ] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const searchRef = React.useRef(null);

  const term = q.trim().toLowerCase();
  const searchResults = React.useMemo(() => {
    if (!term || term.length < 2) return [];
    return PRODUCTOS.filter(p => (p.nombre + " " + (p.variante || "") + " " + (p.casa || "")).toLowerCase().includes(term)).slice(0, 6);
  }, [term, PRODUCTOS]);

  // Click outside listener for search autocomplete
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (p, autoAdd = false) => {
    setQ("");
    setIsFocused(false);
    if (onSearchSelect) onSearchSelect(p, autoAdd);
  };

  return (
    <header className="pv-header">
      <div className="pv-container pv-header-inner">
        {/* Brand / Logo */}
        <button type="button" className="pv-header-brand" onClick={() => goNav("inicio")} aria-label="Inicio">
          <img src="assets/pavlos-logo.png" alt="Pavlo's Store" className="pv-header-logo" />
          <div className="pv-header-titles">
            <span className="pv-wordmark pv-header-title">Pavlo´s Store</span>
            <span className="pv-header-subtitle">Licores & Market Express</span>
          </div>
        </button>

        {/* Barra de búsqueda central con autocomplete */}
        <div className="pv-header-search" ref={searchRef}>
          <div className="pv-search-box">
            <Icon name="search" size={18} />
            <input
              type="text"
              value={q}
              onChange={e => { setQ(e.target.value); setIsFocused(true); }}
              onFocus={() => setIsFocused(true)}
              placeholder="¿Qué licor o antojo buscas? (Whisky, Ron, Cerveza...)"
            />
            {q && (
              <button type="button" className="pv-search-clear" onClick={() => setQ("")} aria-label="Limpiar">
                <Icon name="close" size={16} />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isFocused && searchResults.length > 0 && (
            <div className="pv-search-dropdown">
              <div className="pv-search-dropdown-head">Resultados sugeridos ({searchResults.length})</div>
              {searchResults.map(p => (
                <div key={p.id} className="pv-search-item" onClick={() => handleSelect(p)}>
                  <div className="pv-search-item-thumb">
                    {p.img ? <img src={p.img} alt={p.nombre} /> : <BottlePlaceholder type={p.bottle || "spirit"} size={28} />}
                  </div>
                  <div className="pv-search-item-info">
                    <div className="pv-search-item-title">{p.nombre}</div>
                    <div className="pv-search-item-sub">{p.variante || p.casa}</div>
                  </div>
                  <div className="pv-search-item-price">{pesos(p.precio)}</div>
                  <button
                    type="button"
                    className="pv-add"
                    style={{ minHeight: "32px", padding: "0 10px", fontSize: "0.76rem" }}
                    onClick={(e) => { e.stopPropagation(); handleSelect(p, true); }}>
                    + Agregar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Acciones derecha */}
        <div className="pv-header-actions">
          <div className="pv-header-zone">
            <Icon name="pin" size={16} />
            <span>Santo Tomás · Palmar</span>
          </div>

          <a className="pv-header-wa" href={"https://wa.me/" + CONFIG.whatsapp} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={18} />
            <span>Pedir por WhatsApp</span>
          </a>

          <button type="button" className="pv-header-cart" onClick={onOpenCart} aria-label="Ver carrito">
            <Icon name="cart" size={20} />
            <span>{cartTotal > 0 ? pesos(cartTotal) : "Carrito"}</span>
            {cartCount > 0 && <span className="pv-header-cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---- Barra de Navegación de Categorías (Dislicores Mega Sub-Bar) -------- */
function CategoryNavBar({ tab, activeCat, goNav, goCat }) {
  const { CATEGORIAS } = window.PAVLOS;
  return (
    <nav className="pv-cat-bar">
      <div className="pv-container pv-cat-bar-inner">
        <button
          type="button"
          className={"pv-cat-nav-btn" + (tab === "inicio" && !activeCat ? " is-active" : "")}
          onClick={() => { goNav("inicio"); goCat(null); }}>
          Inicio
        </button>
        <button
          type="button"
          className={"pv-cat-nav-btn" + (tab === "catalogo" && !activeCat ? " is-active" : "")}
          onClick={() => { goNav("catalogo"); goCat(null); }}>
          Todo el Catálogo
        </button>
        {CATEGORIAS.map(c => (
          <button
            key={c.id}
            type="button"
            className={"pv-cat-nav-btn" + (tab === "catalogo" && activeCat === c.id ? " is-active" : "")}
            onClick={() => { goNav("catalogo"); goCat(c.id); }}>
            {c.nombre}
          </button>
        ))}
        <button
          type="button"
          className={"pv-cat-nav-btn" + (tab === "combos" ? " is-active" : "")}
          onClick={() => goNav("combos")}>
          Combos Rumberos
        </button>
        <button
          type="button"
          className={"pv-cat-nav-btn" + (tab === "info" ? " is-active" : "")}
          onClick={() => goNav("info")}>
          Sedes & Horarios
        </button>
      </div>
    </nav>
  );
}

/* ---- Footer Comercial de 4 Columnas (Dislicores Standard) --------------- */
function ECommerceFooter({ goNav, goCat }) {
  const { CONFIG } = window.PAVLOS;
  return (
    <footer className="pv-footer">
      <div className="pv-container">
        <div className="pv-footer-grid">
          {/* Columna 1: Marca y Advertencia Legal */}
          <div className="pv-footer-col">
            <div className="pv-footer-brand">
              <img src="assets/pavlos-logo.png" alt="Pavlo's Store" className="pv-footer-logo" />
              <div>
                <strong className="pv-wordmark" style={{ fontSize: "1.2rem" }}>Pavlo´s Store</strong>
                <span style={{ display: "block", fontSize: "0.72rem", color: "var(--pv-gold)" }}>LICORERÍA & MARKET PREMIUM</span>
              </div>
            </div>
            <p className="pv-footer-text">
              La licorería con domicilios express más rápida de Santo Tomás y Palmar de Varela. Licores 100% legales, fríos y garantizados.
            </p>
            <div className="pv-footer-warning">
              <strong>LEY 124 DE 1994:</strong> Prohíbase el expendio de bebidas embriagantes a menores de edad. El exceso de alcohol es perjudicial para la salud.
            </div>
          </div>

          {/* Columna 2: Categorías Rápidas */}
          <div className="pv-footer-col">
            <h4 className="pv-footer-heading">Categorías</h4>
            <ul className="pv-footer-links">
              <li><button type="button" onClick={() => { goNav("catalogo"); goCat("aguardiente"); }}>Aguardiente</button></li>
              <li><button type="button" onClick={() => { goNav("catalogo"); goCat("ron"); }}>Ron</button></li>
              <li><button type="button" onClick={() => { goNav("catalogo"); goCat("whiskey"); }}>Whiskey</button></li>
              <li><button type="button" onClick={() => { goNav("catalogo"); goCat("cerveza"); }}>Cervezas</button></li>
              <li><button type="button" onClick={() => { goNav("catalogo"); goCat("tequila"); }}>Tequilas</button></li>
              <li><button type="button" onClick={() => goNav("combos")}>Combos Rumberos</button></li>
              <li><button type="button" onClick={() => { goNav("catalogo"); goCat("vapes"); }}>Vapes & Pods</button></li>
              <li><button type="button" onClick={() => { goNav("catalogo"); goCat("mecato"); }}>Snacks & Mecato</button></li>
            </ul>
          </div>

          {/* Columna 3: Sedes & Horarios */}
          <div className="pv-footer-col">
            <h4 className="pv-footer-heading">Puntos de Atención</h4>
            <ul className="pv-footer-links">
              {CONFIG.sucursales.map(s => (
                <li key={s.id}>
                  <strong style={{ color: "var(--ks-champagne)" }}>{s.ciudad}</strong>
                  <span style={{ display: "block", fontSize: "0.76rem" }}>{s.dir}</span>
                </li>
              ))}
              <li style={{ marginTop: "8px" }}>
                <strong style={{ color: "var(--pv-gold)" }}>Horario de Atención:</strong>
                <span style={{ display: "block", fontSize: "0.76rem" }}>Lun - Jue: 1:00 p.m. - 1:00 a.m.</span>
                <span style={{ display: "block", fontSize: "0.76rem" }}>Vie - Dom y Festivos: hasta las 3:00 a.m.</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Pagos & Contacto */}
          <div className="pv-footer-col">
            <h4 className="pv-footer-heading">Pedidos & Ayuda</h4>
            <p style={{ fontSize: "0.84rem", margin: "0 0 12px" }}>
              ¿Necesitas un trago especial o tienes una fiesta grande? Escríbenos directamente:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href={"https://wa.me/" + CONFIG.whatsapp} target="_blank" rel="noopener" className="ks-button ks-button-primary" style={{ minHeight: "44px", fontSize: "0.86rem" }}>
                <Icon name="whatsapp" size={18} /> WhatsApp: {CONFIG.whatsappDisplay}
              </a>
              <a href={CONFIG.instagramUrl} target="_blank" rel="noopener" className="ks-button ks-button-secondary" style={{ minHeight: "44px", fontSize: "0.86rem" }}>
                <Icon name="instagram" size={18} /> @{CONFIG.instagram}
              </a>
            </div>
            <div style={{ marginTop: "16px", fontSize: "0.76rem", color: "var(--ks-text-muted)" }}>
              Métodos aceptados: <strong>Nequi, Daviplata, Bancolombia, Efectivo contra entrega</strong>.
            </div>
          </div>
        </div>

        {/* Barra de Copyright y Acceso Admin */}
        <div className="pv-footer-bottom">
          <span>© {new Date().getFullYear()} Pavlo´s Store. Todos los derechos reservados. Santo Tomás, Atlántico, Colombia.</span>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a href="#admin-pavlos" style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none", fontSize: "0.72rem" }}>
              Acceso Administrativo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- Botón Flotante de WhatsApp ----------------------------------------- */
function FloatingWhatsAppButton() {
  const { CONFIG } = window.PAVLOS;
  return (
    <a
      className="pv-floating-wa"
      href={"https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent("¡Hola Pavlo's Store! Quiero hacer un pedido.")}
      target="_blank"
      rel="noopener"
      aria-label="Pedir por WhatsApp">
      <Icon name="whatsapp" size={32} />
    </a>
  );
}

/* ---- App ---------------------------------------------------------------- */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Ruta por hash (para el panel admin secreto) + re-render cuando el dueño edita
  const [hash, setHash] = React.useState(() => window.location.hash);
  const [, bump] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    const unsub = window.PAVLOS.admin.subscribe(bump);
    return () => { window.removeEventListener("hashchange", onHash); unsub(); };
  }, []);

  const [ageOk, setAgeOk] = React.useState(() => localStorage.getItem("pv_age_ok") === "1");
  const [tab, setTab] = React.useState("inicio");
  const [activeCat, setActiveCat] = React.useState(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("pv_cart") || "{}"); } catch (e) { return {}; }
  });
  const [estado, setEstado] = React.useState(() => window.PAVLOS.estadoApertura());
  const mainRef = React.useRef(null);

  // Reloj en vivo para abierto/cerrado
  React.useEffect(() => {
    const id = setInterval(() => setEstado(window.PAVLOS.estadoApertura()), 30000);
    return () => clearInterval(id);
  }, []);

  // Persistir carrito
  React.useEffect(() => { localStorage.setItem("pv_cart", JSON.stringify(cart)); }, [cart]);

  // Subir al inicio al cambiar de pestaña
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  const add = (id) => {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setCartOpen(true);
  };
  const inc = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id) => setCart(c => {
    const n = (c[id] || 0) - 1; const next = { ...c };
    if (n <= 0) delete next[id]; else next[id] = n;
    return next;
  });
  const clearCart = () => setCart({});
  const cartCount = Object.values(cart).reduce((s, n) => s + n, 0);

  // Total en vivo del carrito (productos + combos)
  const cartTotal = React.useMemo(() => {
    const { PRODUCTOS, COMBOS } = window.PAVLOS;
    return Object.keys(cart).reduce((sum, id) => {
      const q = cart[id]; if (!q) return sum;
      const item = PRODUCTOS.find(p => p.id === id) || COMBOS.find(c => c.id === id);
      return item ? sum + item.precio * q : sum;
    }, 0);
  }, [cart]);

  const goNav = (id) => {
    if (id === "catalogo") setActiveCat(null);
    setTab(id);
  };
  const goCat = (catId) => {
    setActiveCat(catId);
    setTab("catalogo");
  };

  const handleSearchSelect = (p, autoAdd = false) => {
    if (autoAdd) {
      add(p.id);
    } else {
      setActiveCat(p.cat);
      setTab("catalogo");
    }
  };

  // Tono de oro -> sobreescribe el acento del sistema + el oro de las botellas
  const rootStyle = {
    "--pv-gold": t.goldTone,
    "--ks-kinpaku": t.goldTone,
  };

  // Panel admin: solo accesible escribiendo la URL secreta (#admin-pavlos).
  if (window.AdminApp && hash === window.PV_ADMIN_HASH) {
    return <window.AdminApp goldTone={t.goldTone} />;
  }

  if (!ageOk) {
    return (
      <div className="pv-app" style={rootStyle}>
        <AgeGate onYes={() => { localStorage.setItem("pv_age_ok", "1"); setAgeOk(true); }} />
      </div>
    );
  }

  let screen;
  if (tab === "inicio") screen = <HomeScreen estado={estado} cart={cart} add={add} inc={inc} dec={dec} cardStyle={t.cardStyle} goNav={goNav} goCat={goCat} />;
  else if (tab === "catalogo") screen = <CatalogScreen cart={cart} add={add} inc={inc} dec={dec} cardStyle={t.cardStyle} activeCat={activeCat} setActiveCat={setActiveCat} />;
  else if (tab === "combos") screen = <CombosScreen cart={cart} add={add} inc={inc} dec={dec} />;
  else if (tab === "carrito") screen = <CartScreen cart={cart} add={add} inc={inc} dec={dec} clearCart={clearCart} goNav={goNav} />;
  else if (tab === "info") screen = <InfoScreen estado={estado} />;

  return (
    <div className={"pv-app" + (t.textures ? " has-tex" : "") + (t.motion ? " has-motion" : "")} style={rootStyle}>
      <div className="pv-backdrop" aria-hidden="true">
        {t.textures && <div className="pv-grain" />}
        <div className="pv-ambient"><span /><span /><span /><span /><span /><span /></div>
      </div>

      {/* Barra superior de anuncios */}
      <TopAnnouncementBar />

      {/* Header E-Commerce principal con buscador en vivo */}
      <ECommerceHeader
        estado={estado}
        goNav={goNav}
        goCat={goCat}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartOpen(true)}
        onSearchSelect={handleSearchSelect}
      />

      {/* Barra de navegación de categorías horizontal */}
      <CategoryNavBar
        tab={tab}
        activeCat={activeCat}
        goNav={goNav}
        goCat={goCat}
      />

      {/* Contenedor principal responsive */}
      <main className="pv-main" ref={mainRef}>
        <div className="pv-container">
          {screen}
        </div>
      </main>

      {/* Footer comercial de 4 columnas */}
      <ECommerceFooter goNav={goNav} goCat={goCat} />

      {/* Slide-Over Cart Drawer */}
      {window.CartDrawer && (
        <window.CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          add={add}
          inc={inc}
          dec={dec}
          clearCart={clearCart}
        />
      )}

      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsAppButton />

      <TweaksPanel>
        <TweakSection label="Tarjeta de producto" />
        <TweakRadio label="Estilo" value={t.cardStyle}
          options={[
            { value: "tile", label: "Rejilla" },
            { value: "row", label: "Lista" },
            { value: "minimal", label: "Denso" },
            { value: "plinth", label: "Pedestal" },
          ]}
          onChange={(v) => setTweak("cardStyle", v)} />
        <TweakSection label="Apariencia" />
        <TweakColor label="Tono de oro" value={t.goldTone} options={GOLD_TONES} onChange={(v) => setTweak("goldTone", v)} />
        <TweakToggle label="Texturas (oro / laca)" value={t.textures} onChange={(v) => setTweak("textures", v)} />
        <TweakToggle label="Fondo en movimiento" value={t.motion} onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
