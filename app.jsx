/* ============================================================================
   Pavlo´s Store — app shell: age gate, navegación por pestañas, estado del
   carrito (persistente), reloj en vivo (abierto/cerrado) y Tweaks.
   ============================================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cardStyle": "minimal",
  "goldTone": "oklch(84% 0.19 80.46)",
  "textures": true,
  "motion": true
}/*EDITMODE-END*/;

const GOLD_TONES = [
  "oklch(84% 0.19 80.46)", // Kinpaku (sistema)
  "oklch(88% 0.15 88)",    // Oro brillante
  "oklch(77% 0.13 82)",    // Oro profundo
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

/* ---- Navegación inferior ------------------------------------------------ */
function BottomNav({ tab, goNav, cartCount }) {
  const items = [
    { id: "inicio", label: "Inicio", icon: "home" },
    { id: "catalogo", label: "Catálogo", icon: "grid" },
    { id: "combos", label: "Combos", icon: "combo" },
    { id: "carrito", label: "Carrito", icon: "cart" },
    { id: "info", label: "Info", icon: "info" },
  ];
  return (
    <nav className="pv-nav">
      {items.map(it => (
        <button type="button" key={it.id} className={"pv-nav-btn" + (tab === it.id ? " is-active" : "")} onClick={() => goNav(it.id)}>
          <span className="pv-nav-ico">
            <Icon name={it.icon} size={23} />
            {it.id === "carrito" && cartCount > 0 && <span className="pv-nav-badge">{cartCount}</span>}
          </span>
          <span className="pv-nav-label">{it.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ---- Barra superior fija (logo + nombre en todas las pestañas) --------- */
function AppBar({ estado, goNav }) {
  const { CONFIG } = window.PAVLOS;
  return (
    <header className="pv-appbar">
      <button type="button" className="pv-appbar-brand" onClick={() => goNav("inicio")} aria-label="Inicio">
        <img src="assets/pavlos-logo.png" alt="" className="pv-appbar-logo" />
        <span className="pv-wordmark pv-appbar-name">Pavlo´s Store</span>
      </button>
      <div className="pv-appbar-right">
        <span className={"pv-appbar-status " + (estado.abierto ? "is-open" : "is-closed")}>
          <span className="pv-appbar-dot" />{estado.abierto ? "Abierto" : "Cerrado"}
        </span>
        <a className="pv-appbar-ig" href={CONFIG.instagramUrl} target="_blank" rel="noopener" aria-label="Instagram">
          <Icon name="instagram" size={20} />
        </a>
      </div>
    </header>
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
  React.useEffect(() => { if (mainRef.current) mainRef.current.scrollTop = 0; }, [tab]);

  const add = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
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

  const goNav = (id) => { if (id === "catalogo") setActiveCat(null); setTab(id); };
  const goCat = (catId) => { setActiveCat(catId); setTab("catalogo"); };

  // Tono de oro -> sobreescribe el acento del sistema + el oro de las botellas
  const rootStyle = {
    "--pv-gold": t.goldTone,
    "--ks-kinpaku": t.goldTone,
  };

  // Panel admin: solo accesible escribiendo la URL secreta (#…). Invisible para clientes.
  // Salta la verificación de edad y reemplaza toda la tienda mientras está activo.
  if (window.AdminApp && hash === window.PV_ADMIN_HASH) {
    return <window.AdminApp goldTone={t.goldTone} />;
  }

  if (!ageOk) {
    return <div className="pv-app" style={rootStyle}><AgeGate onYes={() => { localStorage.setItem("pv_age_ok", "1"); setAgeOk(true); }} /></div>;
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
      <AppBar estado={estado} goNav={goNav} />
      <main className="pv-main" ref={mainRef}>{screen}</main>

      {cartCount > 0 && tab !== "carrito" && (
        <button type="button" className="pv-cartbar" onClick={() => goNav("carrito")}>
          <span className="pv-cartbar-count">{cartCount}</span>
          <span className="pv-cartbar-mid">
            <span className="pv-cartbar-label">Ver carrito</span>
            <span className="pv-cartbar-total">{window.PAVLOS.pesos(cartTotal)}</span>
          </span>
          <span className="pv-cartbar-go"><Icon name="arrow" size={18} /></span>
        </button>
      )}

      <BottomNav tab={tab} goNav={goNav} cartCount={cartCount} />

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
