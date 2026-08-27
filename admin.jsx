/* ============================================================================
   Pavlo´s Store — PANEL ADMIN (solo dueño)
   Acceso: solo escribiendo la URL secreta (hash). Invisible para clientes.
   Login con usuario + contraseña. Los cambios se guardan al instante en el
   catálogo (window.PAVLOS.admin) y se reflejan en la tienda.

   ┌─ CAMBIA ESTO ──────────────────────────────────────────────────────────┐
   │  PV_ADMIN_HASH  → la "dirección secreta". Pones tudominio.com/#tu-clave │
   │  PV_ADMIN_USER  → tu usuario                                            │
   │  PV_ADMIN_PASS  → tu contraseña                                         │
   └────────────────────────────────────────────────────────────────────────┘
   ============================================================================ */

const PV_ADMIN_HASH = "#admin-pavlos";       // ← URL secreta:  …/Pavlo´s Store.html#admin-pavlos
const PV_ADMIN_USER = "pavlos";              // ← usuario
const PV_ADMIN_PASS = "Siralex220809.";      // ← contraseña
const PV_ADMIN_SESSION = "pv_admin_session";

const BOTTLES = [
  { value: "spirit", label: "Licor / Ron" },
  { value: "whiskey", label: "Whiskey" },
  { value: "wine", label: "Vino" },
  { value: "beer", label: "Cerveza" },
  { value: "can", label: "Lata" },
  { value: "mixer", label: "Mezclador" },
];

/* ---- Campos reutilizables ---------------------------------------------- */
function TextField({ label, value, onCommit, placeholder, full }) {
  const [v, setV] = React.useState(value ?? "");
  React.useEffect(() => setV(value ?? ""), [value]);
  return (
    <label className={"pa-field" + (full ? " is-full" : "")}>
      <span>{label}</span>
      <input type="text" value={v} placeholder={placeholder}
        onChange={(e) => setV(e.target.value)}
        onBlur={() => { if (v.trim() !== (value ?? "")) onCommit(v.trim()); }}
        onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }} />
    </label>
  );
}

function SelectField({ label, value, options, onCommit }) {
  return (
    <label className="pa-field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onCommit(e.target.value)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

function MoneyField({ label, value, onCommit, disabled, dim }) {
  return (
    <label className={"pa-field" + (dim ? " is-dim" : "")}>
      <span>{label}</span>
      <div className="pa-money">
        <i>$</i>
        <input type="number" inputMode="numeric" disabled={disabled} placeholder="—"
          defaultValue={value || ""} key={label + (value || 0)}
          onBlur={(e) => { const n = Math.max(0, Math.round(+e.target.value || 0)); onCommit(n); }} />
      </div>
    </label>
  );
}

function AdminToggle({ on, onChange, labelOn, labelOff, tone }) {
  return (
    <button type="button" className={"pa-tog pa-tog-" + (tone || "gold") + (on ? " is-on" : "")}
      onClick={() => onChange(!on)} aria-pressed={on}>
      <span className="pa-tog-track"><span className="pa-tog-knob" /></span>
      <span className="pa-tog-txt">{on ? labelOn : labelOff}</span>
    </button>
  );
}

function ItemsArea({ value, onCommit }) {
  const [v, setV] = React.useState((value || []).join("\n"));
  React.useEffect(() => setV((value || []).join("\n")), [value]);
  return (
    <textarea className="pa-textarea" rows={Math.max(3, v.split("\n").length)} value={v}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => onCommit(v.split("\n").map((s) => s.trim()).filter(Boolean))} />
  );
}

/* ---- Modal -------------------------------------------------------------- */
function AdminModal({ title, onClose, children }) {
  React.useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="pa-modal-wrap" onMouseDown={onClose}>
      <div className="pa-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="pa-modal-head">
          <h3>{title}</h3>
          <button type="button" className="pa-icon-btn" onClick={onClose} aria-label="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <div className="pa-modal-body">{children}</div>
      </div>
    </div>
  );
}

/* ---- Confirmar borrado -------------------------------------------------- */
function ConfirmDelete({ nombre, onCancel, onConfirm }) {
  return (
    <div className="pa-confirm">
      <span>¿Borrar “{nombre}”? No se puede deshacer.</span>
      <div className="pa-confirm-act">
        <button type="button" className="pa-btn-ghost" onClick={onCancel}>Cancelar</button>
        <button type="button" className="pa-btn-danger" onClick={onConfirm}>Borrar</button>
      </div>
    </div>
  );
}

/* ============================ LOGIN ===================================== */
function AdminLogin({ onOk }) {
  const [u, setU] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [err, setErr] = React.useState("");

  const submit = (e) => {
    e.preventDefault();
    if (u.trim() === PV_ADMIN_USER && pw === PV_ADMIN_PASS) {
      sessionStorage.setItem(PV_ADMIN_SESSION, "1");
      onOk();
    } else {
      setErr("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="pa-login">
      <form className="pa-login-card" onSubmit={submit}>
        <div className="pa-login-lock"><Icon name="lock" size={26} /></div>
        <div className="pa-login-word pv-wordmark">Pavlo´s Store</div>
        <h1 className="pa-login-title">Panel del dueño</h1>
        <p className="pa-login-sub">Zona privada. Ingresa para editar precios, promociones y combos.</p>

        <label className="pa-field is-full">
          <span>Usuario</span>
          <input type="text" autoFocus value={u} onChange={(e) => { setU(e.target.value); setErr(""); }} autoCapitalize="none" autoCorrect="off" />
        </label>
        <label className="pa-field is-full">
          <span>Contraseña</span>
          <div className="pa-pw">
            <input type={show ? "text" : "password"} value={pw} onChange={(e) => { setPw(e.target.value); setErr(""); }} />
            <button type="button" className="pa-pw-eye" onClick={() => setShow((s) => !s)} aria-label="Mostrar contraseña">
              <Icon name={show ? "eyeoff" : "user"} size={17} />
            </button>
          </div>
        </label>

        {err && <div className="pa-login-err">{err}</div>}
        <button type="submit" className="ks-button ks-button-primary pa-login-btn">Entrar</button>
        <a className="pa-login-back" href="#" onClick={() => { window.location.hash = ""; }}>← Volver a la tienda</a>
      </form>
    </div>
  );
}

/* ============================ PRODUCTO ================================== */
function ProductRow({ p, cats, onToast }) {
  const A = window.PAVLOS.admin;
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const commit = (patch) => { A.updateProducto(p.id, patch); onToast(); };
  const catName = (cats.find((c) => c.id === p.cat) || {}).nombre || p.cat;

  return (
    <div className={"pa-item" + (p.disponible === false ? " is-off" : "")}>
      <div className="pa-item-top">
        <div className="pa-item-id">
          <span className="pa-item-bottle">{p.img ? <img className="pa-item-img" src={p.img} alt="" /> : <BottlePlaceholder type={p.bottle} size={18} />}</span>
          <div>
            <div className="pa-item-name">{p.nombre}{p.tag && <span className="pa-tagchip">{p.tag}</span>}</div>
            <div className="pa-item-sub">{p.casa} · {p.variante} · <span className="pa-cat">{catName}</span></div>
          </div>
        </div>
        <button type="button" className="pa-icon-btn pa-del" onClick={() => setConfirm(true)} aria-label="Borrar"><Icon name="trash" size={17} /></button>
      </div>

      <div className="pa-fields">
        <MoneyField label="Precio" value={p.precio} onCommit={(n) => commit({ precio: n })} />
        <MoneyField label="Antes (tachado)" value={p.antes} disabled={!p.promo} dim={!p.promo}
          onCommit={(n) => commit({ antes: n > 0 ? n : undefined })} />
      </div>

      <div className="pa-toggles">
        <AdminToggle on={!!p.promo} labelOn="En promo" labelOff="Sin promo" tone="gold"
          onChange={(v) => commit(v
            ? { promo: true, antes: p.antes || Math.round(p.precio * 1.15 / 1000) * 1000 }
            : { promo: false, antes: undefined })} />
        <AdminToggle on={p.disponible !== false} labelOn="Disponible" labelOff="Agotado" tone="patina"
          onChange={(v) => commit({ disponible: v })} />
        <button type="button" className="pa-mini" onClick={() => setOpen((o) => !o)}>
          <Icon name="edit" size={14} /> {open ? "Menos" : "Detalles"}
        </button>
      </div>

      {open && (
        <div className="pa-detail">
          <TextField label="Nombre" value={p.nombre} onCommit={(v) => commit({ nombre: v })} />
          <TextField label="Casa / marca" value={p.casa} onCommit={(v) => commit({ casa: v })} />
          <TextField label="Variante" value={p.variante} onCommit={(v) => commit({ variante: v })} full />
          <SelectField label="Categoría" value={p.cat} options={cats.map((c) => ({ value: c.id, label: c.nombre }))} onCommit={(v) => commit({ cat: v })} />
          <TextField label="Imagen (ruta)" value={p.img || ""} placeholder="uploads/foto.png" onCommit={(v) => commit({ img: v || undefined })} full />
          <TextField label="Etiqueta" value={p.tag || ""} placeholder="Más vendido, Premium…" onCommit={(v) => commit({ tag: v || undefined })} />
        </div>
      )}

      {confirm && <ConfirmDelete nombre={p.nombre} onCancel={() => setConfirm(false)} onConfirm={() => { A.removeProducto(p.id); onToast(); }} />}
    </div>
  );
}

/* ============================ COMBO ===================================== */
function ComboRow({ c, onToast }) {
  const A = window.PAVLOS.admin;
  const { pesos } = window.PAVLOS;
  const [confirm, setConfirm] = React.useState(false);
  const commit = (patch) => { A.updateCombo(c.id, patch); onToast(); };
  const ahorro = c.antes ? c.antes - c.precio : 0;

  return (
    <div className="pa-item pa-combo-item">
      <div className="pa-item-top">
        <div className="pa-item-id">
          <span className="pa-combo-ico"><Icon name="combo" size={19} /></span>
          <div>
            <div className="pa-item-name">{c.nombre}{c.tag && <span className="pa-tagchip">{c.tag}</span>}</div>
            <div className="pa-item-sub">{(c.items || []).length} productos{ahorro > 0 ? " · ahorra " + pesos(ahorro) : ""}</div>
          </div>
        </div>
        <button type="button" className="pa-icon-btn pa-del" onClick={() => setConfirm(true)} aria-label="Borrar"><Icon name="trash" size={17} /></button>
      </div>

      <TextField label="Nombre" value={c.nombre} onCommit={(v) => commit({ nombre: v })} full />
      <TextField label="Descripción" value={c.desc || ""} onCommit={(v) => commit({ desc: v })} full />
      <label className="pa-field is-full">
        <span>Productos del combo (uno por línea)</span>
        <ItemsArea value={c.items} onCommit={(arr) => commit({ items: arr })} />
      </label>
      <div className="pa-fields">
        <MoneyField label="Precio" value={c.precio} onCommit={(n) => commit({ precio: n })} />
        <MoneyField label="Antes (tachado)" value={c.antes} onCommit={(n) => commit({ antes: n > 0 ? n : undefined })} />
      </div>
      <TextField label="Etiqueta" value={c.tag || ""} placeholder="El más pedido, Premium…" onCommit={(v) => commit({ tag: v || undefined })} />

      {confirm && <ConfirmDelete nombre={c.nombre} onCancel={() => setConfirm(false)} onConfirm={() => { A.removeCombo(c.id); onToast(); }} />}
    </div>
  );
}

/* ---- Alta de producto --------------------------------------------------- */
function AddProductModal({ cats, onClose, onToast }) {
  const A = window.PAVLOS.admin;
  const [f, setF] = React.useState({
    cat: (cats[0] || {}).id || "aguardiente", casa: "", nombre: "", variante: "",
    precio: "", img: "", tag: "", promo: false, antes: "", disponible: true,
  });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!f.nombre.trim()) return;
    const precio = Math.round(+f.precio || 0);
    const obj = {
      cat: f.cat, casa: f.casa.trim() || f.nombre.trim(), nombre: f.nombre.trim(),
      variante: f.variante.trim(), precio, img: f.img.trim() || undefined,
      tag: f.tag.trim() || undefined, disponible: f.disponible,
    };
    if (f.promo) { obj.promo = true; const a = Math.round(+f.antes || 0); if (a > precio) obj.antes = a; }
    A.addProducto(obj); onToast(); onClose();
  };

  return (
    <AdminModal title="Nuevo producto" onClose={onClose}>
      <form className="pa-form" onSubmit={submit}>
        <SelectField label="Categoría" value={f.cat} options={cats.map((c) => ({ value: c.id, label: c.nombre }))} onCommit={(v) => set("cat", v)} />
        <label className="pa-field is-full"><span>Nombre *</span><input type="text" autoFocus value={f.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ej: Aguardiente Amarillo" /></label>
        <div className="pa-grid2">
          <label className="pa-field"><span>Casa / marca</span><input type="text" value={f.casa} onChange={(e) => set("casa", e.target.value)} placeholder="Néctar, Bacardí…" /></label>
          <label className="pa-field"><span>Variante</span><input type="text" value={f.variante} onChange={(e) => set("variante", e.target.value)} placeholder="750 ml" /></label>
        </div>
        <label className="pa-field is-full"><span>Imagen (ruta)</span><input type="text" value={f.img} onChange={(e) => set("img", e.target.value)} placeholder="uploads/foto.png" /></label>
        <div className="pa-grid2">
          <label className="pa-field"><span>Precio *</span><div className="pa-money"><i>$</i><input type="number" inputMode="numeric" value={f.precio} onChange={(e) => set("precio", e.target.value)} /></div></label>
          <label className="pa-field"><span>Etiqueta</span><input type="text" value={f.tag} onChange={(e) => set("tag", e.target.value)} placeholder="Más vendido…" /></label>
        </div>
        <div className="pa-toggles pa-toggles-form">
          <AdminToggle on={f.promo} labelOn="En promo" labelOff="Sin promo" tone="gold" onChange={(v) => set("promo", v)} />
          <AdminToggle on={f.disponible} labelOn="Disponible" labelOff="Agotado" tone="patina" onChange={(v) => set("disponible", v)} />
        </div>
        {f.promo && <label className="pa-field is-full"><span>Precio antes (tachado)</span><div className="pa-money"><i>$</i><input type="number" inputMode="numeric" value={f.antes} onChange={(e) => set("antes", e.target.value)} /></div></label>}
        <div className="pa-form-foot">
          <button type="button" className="pa-btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="ks-button ks-button-primary">Agregar producto</button>
        </div>
      </form>
    </AdminModal>
  );
}

/* ---- Alta de combo ------------------------------------------------------ */
function AddComboModal({ onClose, onToast }) {
  const A = window.PAVLOS.admin;
  const [f, setF] = React.useState({ nombre: "", desc: "", items: "", precio: "", antes: "", tag: "" });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!f.nombre.trim()) return;
    const obj = {
      nombre: f.nombre.trim(), desc: f.desc.trim(),
      items: f.items.split("\n").map((s) => s.trim()).filter(Boolean),
      precio: Math.round(+f.precio || 0), tag: f.tag.trim() || undefined,
    };
    const a = Math.round(+f.antes || 0); if (a > obj.precio) obj.antes = a;
    A.addCombo(obj); onToast(); onClose();
  };

  return (
    <AdminModal title="Nuevo combo" onClose={onClose}>
      <form className="pa-form" onSubmit={submit}>
        <label className="pa-field is-full"><span>Nombre *</span><input type="text" autoFocus value={f.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ej: Combo Parranda" /></label>
        <label className="pa-field is-full"><span>Descripción</span><input type="text" value={f.desc} onChange={(e) => set("desc", e.target.value)} placeholder="Para arrancar la noche." /></label>
        <label className="pa-field is-full"><span>Productos (uno por línea)</span><textarea className="pa-textarea" rows={4} value={f.items} onChange={(e) => set("items", e.target.value)} placeholder={"Aguardiente Amarillo 750 ml\n2 gaseosas 1.5 L\nHielo 2 kg"} /></label>
        <div className="pa-grid2">
          <label className="pa-field"><span>Precio *</span><div className="pa-money"><i>$</i><input type="number" inputMode="numeric" value={f.precio} onChange={(e) => set("precio", e.target.value)} /></div></label>
          <label className="pa-field"><span>Antes (tachado)</span><div className="pa-money"><i>$</i><input type="number" inputMode="numeric" value={f.antes} onChange={(e) => set("antes", e.target.value)} /></div></label>
        </div>
        <label className="pa-field is-full"><span>Etiqueta</span><input type="text" value={f.tag} onChange={(e) => set("tag", e.target.value)} placeholder="El más pedido…" /></label>
        <div className="pa-form-foot">
          <button type="button" className="pa-btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="ks-button ks-button-primary">Agregar combo</button>
        </div>
      </form>
    </AdminModal>
  );
}

/* ---- Editor de reels/publicaciones de Instagram ------------------------ */
function ReelsEditor({ onToast }) {
  const { IG_POSTS, admin } = window.PAVLOS;
  const [urls, setUrls] = React.useState(() => (IG_POSTS || []).map((p) => p.url));
  const set = (i, v) => setUrls((a) => a.map((u, k) => (k === i ? v : u)));
  const add = () => setUrls((a) => [...a, ""]);
  const remove = (i) => setUrls((a) => a.filter((_, k) => k !== i));
  const save = () => { admin.setReels(urls.map((u) => u.trim()).filter(Boolean)); onToast(); };

  return (
    <div className="pa-settings">
      <div className="pa-note">
        <strong>Publicaciones destacadas</strong>
        <p>Pega el enlace de un reel o publicación de Instagram y se previsualiza sola en la tienda (Inicio). Copia el link desde Instagram → “Compartir” → “Copiar enlace”. Deja las que quieras mostrar.</p>
      </div>
      <div className="pa-settings-card">
        {urls.map((u, i) => (
          <div className="pa-settings-row" key={i}>
            <label className="pa-field is-full" style={{ margin: 0 }}>
              <span>Publicación {i + 1}</span>
              <input type="text" value={u} placeholder="https://www.instagram.com/reel/…"
                onChange={(e) => set(i, e.target.value)} autoCapitalize="none" autoCorrect="off" />
            </label>
            <button type="button" className="pa-icon-btn pa-del" onClick={() => remove(i)} aria-label="Quitar"><Icon name="trash" size={17} /></button>
          </div>
        ))}
        <div className="pa-settings-row">
          <button type="button" className="pa-btn-line" onClick={add}><Icon name="plus" size={16} /> Agregar publicación</button>
          <button type="button" className="ks-button ks-button-primary" onClick={save}>Guardar publicaciones</button>
        </div>
      </div>
    </div>
  );
}

/* ---- Aviso "Guardado" --------------------------------------------------- */
function SavedToast({ trigger }) {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    if (!trigger) return;
    setVis(true);
    const id = setTimeout(() => setVis(false), 1300);
    return () => clearTimeout(id);
  }, [trigger]);
  return <div className={"pa-toast" + (vis ? " is-vis" : "")}><Icon name="check" size={15} /> Guardado</div>;
}

/* ============================ PANEL ===================================== */
function AdminPanel({ onLogout }) {
  const { PRODUCTOS, COMBOS, CATEGORIAS, admin, pesos } = window.PAVLOS;
  const [tab, setTab] = React.useState("productos");
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("all");
  const [vista, setVista] = React.useState("todos"); // todos | promo | agotados
  const [adding, setAdding] = React.useState(false);
  const [toast, setToast] = React.useState(0);
  const [resetConfirm, setResetConfirm] = React.useState(false);
  const fileRef = React.useRef(null);
  const fireToast = () => setToast(Date.now());

  const term = q.trim().toLowerCase();
  const prods = PRODUCTOS.filter((p) => {
    if (cat !== "all" && p.cat !== cat) return false;
    if (vista === "promo" && !p.promo) return false;
    if (vista === "agotados" && p.disponible !== false) return false;
    if (term && !(p.nombre + " " + p.casa + " " + p.variante).toLowerCase().includes(term)) return false;
    return true;
  });

  const enPromo = PRODUCTOS.filter((p) => p.promo).length;
  const agotados = PRODUCTOS.filter((p) => p.disponible === false).length;

  const exit = () => { window.location.hash = ""; };

  const backup = () => {
    const blob = new Blob([admin.exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "pavlos-catalogo-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const onImport = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => { try { admin.importJSON(r.result); fireToast(); } catch (err) { alert("Archivo no válido."); } };
    r.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="pa-panel">
      <header className="pa-head">
        <div className="pa-head-l">
          <img src="assets/pavlos-logo.png" alt="" className="pa-head-logo" />
          <div>
            <div className="pa-head-word pv-wordmark">Pavlo´s Store</div>
            <div className="pa-head-role"><Icon name="lock" size={12} /> Panel del dueño</div>
          </div>
        </div>
        <div className="pa-head-r">
          <button type="button" className="pa-head-btn" onClick={exit}><Icon name="arrow" size={15} /> Ver tienda</button>
          <button type="button" className="pa-head-btn is-out" onClick={onLogout}>Salir</button>
        </div>
      </header>

      <div className="pa-tabs">
        <button type="button" className={"pa-tab" + (tab === "productos" ? " is-active" : "")} onClick={() => setTab("productos")}>
          <Icon name="box" size={16} /> Productos <span>{PRODUCTOS.length}</span>
        </button>
        <button type="button" className={"pa-tab" + (tab === "combos" ? " is-active" : "")} onClick={() => setTab("combos")}>
          <Icon name="combo" size={16} /> Combos <span>{COMBOS.length}</span>
        </button>
        <button type="button" className={"pa-tab" + (tab === "instagram" ? " is-active" : "")} onClick={() => setTab("instagram")}>
          <Icon name="instagram" size={15} /> Instagram
        </button>
        <button type="button" className={"pa-tab" + (tab === "ajustes" ? " is-active" : "")} onClick={() => setTab("ajustes")}>
          <Icon name="refresh" size={15} /> Datos
        </button>
      </div>

      <div className="pa-body">
        {tab === "productos" && (
          <>
            <div className="pa-toolbar">
              <div className="pa-search">
                <Icon name="search" size={17} />
                <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar producto…" />
                {q && <button type="button" onClick={() => setQ("")} aria-label="Limpiar"><Icon name="close" size={15} /></button>}
              </div>
              <button type="button" className="ks-button ks-button-primary pa-add-btn" onClick={() => setAdding(true)}>
                <Icon name="plus" size={16} /> Producto
              </button>
            </div>
            <div className="pa-filters">
              <select className="pa-catsel" value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="all">Todas las categorías</option>
                {CATEGORIAS.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
              <div className="pa-segs">
                <button type="button" className={"pa-seg" + (vista === "todos" ? " is-on" : "")} onClick={() => setVista("todos")}>Todos</button>
                <button type="button" className={"pa-seg" + (vista === "promo" ? " is-on" : "")} onClick={() => setVista("promo")}>En promo <i>{enPromo}</i></button>
                <button type="button" className={"pa-seg" + (vista === "agotados" ? " is-on" : "")} onClick={() => setVista("agotados")}>Agotados <i>{agotados}</i></button>
              </div>
            </div>

            {prods.length === 0
              ? <div className="pa-empty"><Icon name="search" size={26} /><p>Nada que mostrar con este filtro.</p></div>
              : <div className="pa-list">{prods.map((p) => <ProductRow key={p.id} p={p} cats={CATEGORIAS} onToast={fireToast} />)}</div>}
          </>
        )}

        {tab === "combos" && (
          <>
            <div className="pa-toolbar">
              <p className="pa-toolbar-note">Los combos con “antes” aparecen en Promociones.</p>
              <button type="button" className="ks-button ks-button-primary pa-add-btn" onClick={() => setAdding(true)}>
                <Icon name="plus" size={16} /> Combo
              </button>
            </div>
            {COMBOS.length === 0
              ? <div className="pa-empty"><Icon name="combo" size={26} /><p>Sin combos. Crea el primero.</p></div>
              : <div className="pa-list">{COMBOS.map((c) => <ComboRow key={c.id} c={c} onToast={fireToast} />)}</div>}
          </>
        )}

        {tab === "instagram" && <ReelsEditor onToast={fireToast} />}

        {tab === "ajustes" && (
          <div className="pa-settings">
            <div className="pa-note">
              <strong>¿Dónde se guardan los cambios?</strong>
              <p>Por ahora se guardan en este navegador (este equipo). Sirve para ti y para la vista previa. Cuando publiques la página de verdad, se conecta una base de datos en la nube para que los cambios se vean en vivo para todos los clientes, sin tocar el código.</p>
            </div>

            <div className="pa-settings-card">
              <div className="pa-settings-row">
                <div><strong>Copia de seguridad</strong><span>Descarga todo tu catálogo en un archivo.</span></div>
                <button type="button" className="pa-btn-line" onClick={backup}><Icon name="download" size={16} /> Descargar</button>
              </div>
              <div className="pa-settings-row">
                <div><strong>Restaurar copia</strong><span>Carga un archivo de copia anterior.</span></div>
                <button type="button" className="pa-btn-line" onClick={() => fileRef.current && fileRef.current.click()}><Icon name="upload" size={16} /> Cargar</button>
                <input ref={fileRef} type="file" accept="application/json,.json" style={{ display: "none" }} onChange={onImport} />
              </div>
              <div className="pa-settings-row">
                <div><strong>Restablecer todo</strong><span>Vuelve al catálogo original. Borra tus cambios.</span></div>
                {resetConfirm
                  ? <div className="pa-confirm-act">
                      <button type="button" className="pa-btn-ghost" onClick={() => setResetConfirm(false)}>No</button>
                      <button type="button" className="pa-btn-danger" onClick={() => { admin.reset(); setResetConfirm(false); fireToast(); }}>Sí, borrar</button>
                    </div>
                  : <button type="button" className="pa-btn-line is-danger" onClick={() => setResetConfirm(true)}><Icon name="refresh" size={16} /> Restablecer</button>}
              </div>
            </div>

            <div className="pa-settings-card">
              <div className="pa-settings-row">
                <div><strong>Tu acceso secreto</strong><span className="pa-mono">…/#admin-pavlos</span></div>
              </div>
              <p className="pa-settings-help">Esta dirección y tu usuario/contraseña se cambian en el archivo <span className="pa-mono">admin.jsx</span> (arriba del todo). No la compartas.</p>
            </div>
          </div>
        )}
      </div>

      {adding && tab === "productos" && <AddProductModal cats={CATEGORIAS} onClose={() => setAdding(false)} onToast={fireToast} />}
      {adding && tab === "combos" && <AddComboModal onClose={() => setAdding(false)} onToast={fireToast} />}
      <SavedToast trigger={toast} />
    </div>
  );
}

/* ============================ APP ROOT ================================== */
function AdminApp({ goldTone }) {
  const [authed, setAuthed] = React.useState(() => sessionStorage.getItem(PV_ADMIN_SESSION) === "1");
  const style = { "--pv-gold": goldTone || "var(--ks-kinpaku)", "--ks-kinpaku": goldTone || "var(--ks-kinpaku)" };
  return (
    <div className="pa-root" style={style}>
      {authed
        ? <AdminPanel onLogout={() => { sessionStorage.removeItem(PV_ADMIN_SESSION); setAuthed(false); }} />
        : <AdminLogin onOk={() => setAuthed(true)} />}
    </div>
  );
}

Object.assign(window, { AdminApp, PV_ADMIN_HASH });
