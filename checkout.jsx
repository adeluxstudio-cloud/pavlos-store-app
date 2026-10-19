/* ============================================================================
   Pavlo´s Store — Carrito + checkout + armado del mensaje de WhatsApp
   El pedido se envía formateado: combos agrupados (con su contenido) y
   productos sueltos aparte, para que los vendedores no se enreden.
   ============================================================================ */

function buildWhatsAppMessage({ combos, productos, subtotal, entrega, sucursal, direccion, form, domicilio }) {
  const { pesos, CONFIG } = window.PAVLOS;
  const L = [];
  L.push("*PEDIDO — Pavlo´s Store*");
  L.push("--------------------------------");

  if (combos.length) {
    L.push("*COMBOS:*");
    combos.forEach(it => {
      L.push("• " + it.nombre + " x" + it.qty + " — " + pesos(it.precio * it.qty));
      if (it.items) L.push("   _(" + it.items.join(", ") + ")_");
    });
    L.push("");
  }
  if (productos.length) {
    L.push("*PRODUCTOS:*");
    productos.forEach(it => {
      L.push("• " + it.nombre + (it.variante ? " " + it.variante : "") + " x" + it.qty + " — " + pesos(it.precio * it.qty));
    });
    L.push("");
  }

  L.push("Subtotal: " + pesos(subtotal));
  if (entrega === "domicilio") L.push("Domicilio: " + pesos(domicilio));
  L.push("*TOTAL: " + pesos(subtotal + (entrega === "domicilio" ? domicilio : 0)) + "*");
  L.push("--------------------------------");

  L.push("*DATOS DE ENTREGA:*");
  L.push("Nombre: " + form.nombre);
  L.push("Teléfono: " + form.tel);
  if (entrega === "domicilio") {
    L.push("Modalidad: Domicilio — " + direccion);
  } else {
    const s = CONFIG.sucursales.find(x => String(x.id) === String(sucursal));
    L.push("Modalidad: Recoger en sucursal — " + (s ? s.ciudad + " (" + s.dir + ")" : "sucursal"));
  }
  L.push("Método de pago: " + form.pago);
  if (form.notas) L.push("Notas: " + form.notas);

  return L.join("\n");
}

function CartScreen({ cart, add, inc, dec, removeAll, clearCart, goNav }) {
  const { PRODUCTOS, COMBOS, CONFIG, pesos } = window.PAVLOS;

  // Resolver líneas del carrito (ignora ids que ya no existen)
  const lines = Object.keys(cart).filter(id => cart[id] > 0).map(id => {
    const combo = COMBOS.find(c => c.id === id);
    if (combo) return { kind: "combo", id, qty: cart[id], ...combo };
    const p = PRODUCTOS.find(x => x.id === id);
    return p ? { kind: "prod", id, qty: cart[id], ...p } : null;
  }).filter(Boolean);
  const combos = lines.filter(l => l.kind === "combo");
  const productos = lines.filter(l => l.kind === "prod");
  const subtotal = lines.reduce((s, l) => s + l.precio * l.qty, 0);

  const [entrega, setEntrega] = React.useState("domicilio");
  const [sucursal, setSucursal] = React.useState(String(CONFIG.sucursales[0].id));
  const [direccion, setDireccion] = React.useState("");
  const [form, setForm] = React.useState({ nombre: "", tel: "", pago: CONFIG.pagos[0], notas: "" });
  const [touched, setTouched] = React.useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const total = subtotal + (entrega === "domicilio" ? CONFIG.domicilio : 0);
  const errs = {
    nombre: !form.nombre.trim(),
    tel: form.tel.replace(/\D/g, "").length < 7,
    direccion: entrega === "domicilio" && !direccion.trim(),
  };
  const valid = !errs.nombre && !errs.tel && !errs.direccion && lines.length > 0;

  function enviar() {
    setTouched(true);
    if (!valid) return;
    const msg = buildWhatsAppMessage({ combos, productos, subtotal, entrega, sucursal, direccion, form, domicilio: CONFIG.domicilio });
    const url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  }

  if (lines.length === 0) {
    return (
      <div className="pv-screen">
        <div className="pv-page-head"><h1 className="pv-page-title">Tu carrito</h1></div>
        <div className="ks-empty pv-empty">
          <Icon name="cart" size={32} />
          <strong>Todavía está vacío</strong>
          <p>Arma tu pedido desde el catálogo o los combos.</p>
          <button type="button" className="ks-button ks-button-primary" onClick={() => goNav("catalogo")} style={{ marginTop: 8 }}>Ir al catálogo</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pv-screen pv-cart">
      <div className="pv-page-head pv-cart-head">
        <h1 className="pv-page-title">Tu pedido</h1>
        <button type="button" className="pv-link" onClick={clearCart}><Icon name="trash" size={15} /> Vaciar</button>
      </div>

      {combos.length > 0 && (
        <section className="pv-block">
          <h2 className="pv-cart-group">Combos</h2>
          <div className="pv-cart-lines">
            {combos.map(l => (
              <div key={l.id} className="pv-line is-combo">
                <div className="pv-line-main">
                  <div className="pv-line-name">{l.nombre}</div>
                  <div className="pv-line-sub">{l.items.join(" · ")}</div>
                </div>
                <div className="pv-line-right">
                  <span className="pv-price">{pesos(l.precio * l.qty)}</span>
                  <Stepper qty={l.qty} size="sm" onInc={() => inc(l.id)} onDec={() => dec(l.id)} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {productos.length > 0 && (
        <section className="pv-block">
          <h2 className="pv-cart-group">Productos</h2>
          <div className="pv-cart-lines">
            {productos.map(l => (
              <div key={l.id} className="pv-line">
                <div className="pv-line-bottle"><ProductImg p={l} size={36} /></div>
                <div className="pv-line-main">
                  <div className="pv-line-name">{l.nombre}</div>
                  <div className="pv-line-sub">{l.variante}</div>
                </div>
                <div className="pv-line-right">
                  <span className="pv-price">{pesos(l.precio * l.qty)}</span>
                  <Stepper qty={l.qty} size="sm" onInc={() => inc(l.id)} onDec={() => dec(l.id)} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Datos de entrega */}
      <section className="pv-block">
        <h2 className="pv-cart-group">Modalidad de entrega</h2>
        <div className="pv-seg">
          <button type="button" className={entrega === "domicilio" ? "is-active" : ""} onClick={() => setEntrega("domicilio")}>Domicilio a la puerta</button>
          <button type="button" className={entrega === "recoger" ? "is-active" : ""} onClick={() => setEntrega("recoger")}>Recoger en sucursal</button>
        </div>

        <div className="pv-form">
          <label className="pv-field">
            <span>Nombre</span>
            <input type="text" value={form.nombre} onChange={e => set("nombre", e.target.value)} placeholder="¿A nombre de quién?" className={touched && errs.nombre ? "is-err" : ""} />
          </label>
          <label className="pv-field">
            <span>Teléfono</span>
            <input type="tel" inputMode="tel" value={form.tel} onChange={e => set("tel", e.target.value)} placeholder="300 000 0000" className={touched && errs.tel ? "is-err" : ""} />
          </label>

          {entrega === "domicilio" ? (
            <label className="pv-field">
              <span>Dirección</span>
              <textarea rows="2" value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Calle, número, barrio, punto de referencia" className={touched && errs.direccion ? "is-err" : ""} />
            </label>
          ) : (
            <label className="pv-field">
              <span>Sucursal para recoger</span>
              <select className="pv-select" value={sucursal} onChange={e => setSucursal(e.target.value)}>
                {CONFIG.sucursales.map(s => <option key={s.id} value={s.id}>{s.ciudad} — {s.dir}</option>)}
              </select>
            </label>
          )}

          <label className="pv-field">
            <span>Método de pago</span>
            <select className="pv-select" value={form.pago} onChange={e => set("pago", e.target.value)}>
              {CONFIG.pagos.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </label>
          <label className="pv-field">
            <span>Notas <em>(opcional)</em></span>
            <textarea rows="2" value={form.notas} onChange={e => set("notas", e.target.value)} placeholder="Ej: bien frío, timbre dañado, llamar al llegar" />
          </label>
        </div>
      </section>

      {/* Resumen */}
      <section className="pv-block pv-summary">
        <div className="pv-sum-row"><span>Subtotal</span><span>{pesos(subtotal)}</span></div>
        {entrega === "domicilio" && <div className="pv-sum-row"><span>Domicilio</span><span>{pesos(CONFIG.domicilio)}</span></div>}
        <div className="pv-sum-row pv-sum-total"><span>Total</span><span>{pesos(total)}</span></div>
      </section>

      {touched && !valid && <p className="pv-form-hint">Completa nombre, teléfono{entrega === "domicilio" ? " y dirección" : ""} para enviar.</p>}

      <button type="button" className="pv-send" onClick={enviar} aria-disabled={!valid}>
        <Icon name="whatsapp" size={22} /> Enviar pedido por WhatsApp
      </button>
      <p className="pv-send-note">Se abre WhatsApp con tu pedido ya escrito. Solo das enviar.</p>
    </div>
  );
}

function CartDrawer({ isOpen, onClose, cart, add, inc, dec, clearCart }) {
  if (!isOpen) return null;
  const { PRODUCTOS, COMBOS, CONFIG, pesos } = window.PAVLOS;

  const lines = Object.keys(cart).filter(id => cart[id] > 0).map(id => {
    const combo = COMBOS.find(c => c.id === id);
    if (combo) return { kind: "combo", id, qty: cart[id], ...combo };
    const p = PRODUCTOS.find(x => x.id === id);
    return p ? { kind: "prod", id, qty: cart[id], ...p } : null;
  }).filter(Boolean);

  const combos = lines.filter(l => l.kind === "combo");
  const productos = lines.filter(l => l.kind === "prod");
  const subtotal = lines.reduce((s, l) => s + l.precio * l.qty, 0);

  const [entrega, setEntrega] = React.useState("domicilio");
  const [sucursal, setSucursal] = React.useState(String(CONFIG.sucursales[0].id));
  const [direccion, setDireccion] = React.useState("");
  const [form, setForm] = React.useState({ nombre: "", tel: "", pago: CONFIG.pagos[0], notas: "" });
  const [touched, setTouched] = React.useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const total = subtotal + (entrega === "domicilio" ? CONFIG.domicilio : 0);
  const errs = {
    nombre: !form.nombre.trim(),
    tel: form.tel.replace(/\D/g, "").length < 7,
    direccion: entrega === "domicilio" && !direccion.trim(),
  };
  const valid = !errs.nombre && !errs.tel && !errs.direccion && lines.length > 0;

  function enviar() {
    setTouched(true);
    if (!valid) return;
    const msg = buildWhatsAppMessage({ combos, productos, subtotal, entrega, sucursal, direccion, form, domicilio: CONFIG.domicilio });
    const url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  }

  return (
    <>
      <div className="pv-cart-backdrop" onClick={onClose} />
      <div className="pv-cart-drawer">
        <div className="pv-drawer-header">
          <h2 className="pv-drawer-title">
            <Icon name="cart" size={22} />
            <span>Tu Carrito</span>
            <span className="pv-count-badge">{lines.reduce((s, l) => s + l.qty, 0)}</span>
          </h2>
          <button type="button" className="pv-drawer-close" onClick={onClose} aria-label="Cerrar">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="pv-drawer-free-bar">
          {subtotal >= 120000 ? (
            <span>¡Tienes <strong>domicilio GRATIS</strong> en Santo Tomás y Palmar!</span>
          ) : (
            <span>Agrega <strong>{pesos(Math.max(0, 120000 - subtotal))}</strong> más para envío gratis</span>
          )}
        </div>

        <div className="pv-drawer-body">
          {lines.length === 0 ? (
            <div className="ks-empty pv-empty" style={{ margin: "auto 0", padding: "40px 10px", textAlign: "center" }}>
              <Icon name="cart" size={38} />
              <strong style={{ display: "block", marginTop: 12, fontSize: "1.1rem" }}>Tu carrito está vacío</strong>
              <p style={{ color: "var(--ks-text-muted)", fontSize: "0.88rem", margin: "6px 0 16px" }}>Agrega licores o combos para armar tu pedido.</p>
              <button type="button" className="ks-button ks-button-primary" onClick={onClose}>
                Explorar catálogo
              </button>
            </div>
          ) : (
            <>
              <div className="pv-drawer-items-list">
                {lines.map(l => (
                  <div key={l.id} className="pv-drawer-item">
                    <div className="pv-drawer-item-img">
                      {l.img ? <img src={l.img} alt={l.nombre} loading="lazy" decoding="async" /> : <BottlePlaceholder type={l.bottle || "spirit"} size={32} />}
                    </div>
                    <div className="pv-drawer-item-details">
                      <div className="pv-drawer-item-name">{l.nombre}</div>
                      <div className="pv-drawer-item-meta">{l.variante || (l.kind === "combo" ? "Combo rumbero" : "")}</div>
                      <div className="pv-drawer-item-price">{pesos(l.precio * l.qty)}</div>
                    </div>
                    <Stepper qty={l.qty} size="sm" onInc={() => inc(l.id)} onDec={() => dec(l.id)} />
                  </div>
                ))}
              </div>

              {/* Formulario de Checkout Rápido */}
              <div className="pv-drawer-form" style={{ marginTop: 16 }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                  <button
                    type="button"
                    className={"pv-quick-chip" + (entrega === "domicilio" ? " is-active" : "")}
                    style={{ flex: 1, justifyContent: "center" }}
                    onClick={() => setEntrega("domicilio")}>
                    Domicilio ({pesos(CONFIG.domicilio)})
                  </button>
                  <button
                    type="button"
                    className={"pv-quick-chip" + (entrega === "recoger" ? " is-active" : "")}
                    style={{ flex: 1, justifyContent: "center" }}
                    onClick={() => setEntrega("recoger")}>
                    Recoger en sede
                  </button>
                </div>

                <div className="pv-form" style={{ gap: "10px" }}>
                  <label className="pv-field">
                    <span>Nombre completo</span>
                    <input type="text" value={form.nombre} onChange={e => set("nombre", e.target.value)} placeholder="¿A nombre de quién?" className={touched && errs.nombre ? "is-err" : ""} />
                  </label>
                  <label className="pv-field">
                    <span>Teléfono celular (WhatsApp)</span>
                    <input type="tel" inputMode="tel" value={form.tel} onChange={e => set("tel", e.target.value)} placeholder="300 000 0000" className={touched && errs.tel ? "is-err" : ""} />
                  </label>
                  {entrega === "domicilio" ? (
                    <label className="pv-field">
                      <span>Dirección y barrio</span>
                      <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Calle, carrera, barrio, punto de referencia" className={touched && errs.direccion ? "is-err" : ""} />
                    </label>
                  ) : (
                    <label className="pv-field">
                      <span>Sucursal para recoger</span>
                      <select className="pv-select" value={sucursal} onChange={e => setSucursal(e.target.value)}>
                        {CONFIG.sucursales.map(s => <option key={s.id} value={s.id}>{s.ciudad} — {s.dir}</option>)}
                      </select>
                    </label>
                  )}
                  <label className="pv-field">
                    <span>Método de pago</span>
                    <select className="pv-select" value={form.pago} onChange={e => set("pago", e.target.value)}>
                      {CONFIG.pagos.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </label>
                  <label className="pv-field">
                    <span>Notas <em>(opcional)</em></span>
                    <input type="text" value={form.notas} onChange={e => set("notas", e.target.value)} placeholder="Ej: bien frío, pagar con billete de $50k" />
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="pv-drawer-footer">
            <div className="pv-drawer-row">
              <span>Subtotal</span>
              <span>{pesos(subtotal)}</span>
            </div>
            {entrega === "domicilio" && (
              <div className="pv-drawer-row">
                <span>Domicilio</span>
                <span>{pesos(CONFIG.domicilio)}</span>
              </div>
            )}
            <div className="pv-drawer-row pv-drawer-total">
              <span>Total a pagar</span>
              <span>{pesos(total)}</span>
            </div>

            {touched && !valid && (
              <p className="pv-form-hint" style={{ margin: "8px 0 0", color: "var(--ks-vermilion)", fontSize: "0.78rem" }}>
                Completa nombre, teléfono{entrega === "domicilio" ? " y dirección" : ""}.
              </p>
            )}

            <button type="button" className="pv-drawer-checkout-btn" onClick={enviar}>
              <Icon name="whatsapp" size={22} />
              <span>Pedir por WhatsApp ({pesos(total)})</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

Object.assign(window, { buildWhatsAppMessage, CartScreen, CartDrawer });
