/* ============================================================================
   Pavlo´s Store — tarjetas de producto (4 variantes) + tarjeta de combo
   Variantes: row (lista compacta) · tile (rejilla) · minimal (denso) · plinth
   La botella se muestra pequeña para optimizar espacio.
   ============================================================================ */

function Tag({ children, kind = "gold" }) {
  return <span className={"pv-tag pv-tag-" + kind}>{children}</span>;
}

// Foto del producto sobre pedestal lacado. Fallback a silueta si no hay imagen.
function ProductImg({ p, size, glow }) {
  if (p && p.img) {
    return (
      <div className={"pv-img" + (glow ? " is-glow" : "")} style={{ width: size, height: size }}>
        <img src={p.img} alt={p.nombre} loading="eager" decoding="async" fetchpriority="low"
          onLoad={e => e.currentTarget.classList.add("is-loaded")}
          onError={e => e.currentTarget.classList.add("is-loaded")} />
      </div>
    );
  }
  return <BottlePlaceholder type={p ? p.bottle : "spirit"} size={Math.round(size * 0.7)} glow={glow} />;
}

function PriceAdd({ p, qty, onAdd, onInc, onDec, block }) {
  const { pesos } = window.PAVLOS;
  if (p.disponible === false) {
    return <span className={"pv-soldout" + (block ? " pv-soldout-block" : "")}>Agotado</span>;
  }
  return qty > 0
    ? <Stepper qty={qty} onInc={onInc} onDec={onDec} size={block ? "md" : "sm"} />
    : (
      <button type="button" className={"pv-add" + (block ? " pv-add-block" : "")} onClick={onAdd}>
        <Icon name="plus" size={16} /> {block ? pesos(p.precio) : "Agregar"}
      </button>
    );
}

function ProductCard({ p, variant, qty, onAdd, onInc, onDec }) {
  const { pesos } = window.PAVLOS;
  const meta = [p.vol, p.abv].filter(Boolean).join(" · ");

  // ---- ROW: lista compacta, botella mini a la izquierda ------------------
  const soldout = p.disponible === false ? " is-soldout" : "";
  if (variant === "row") {
    return (
      <div className={"pv-card pv-card-row" + (p.estrella ? " is-star" : "") + soldout}>
        <div className="pv-row-bottle"><BottlePlaceholder type={p.bottle} size={30} /></div>
        <div className="pv-row-info">
          <div className="pv-row-name">
            {p.nombre}{p.tag && <Tag kind={p.estrella ? "gold" : "ghost"}>{p.tag}</Tag>}
          </div>
          <div className="pv-row-meta">{p.variante}{meta && <span className="pv-dot">·</span>}{meta}</div>
        </div>
        <div className="pv-row-buy">
          <ProdPrice p={p} />
          <PriceAdd p={p} qty={qty} onAdd={onAdd} onInc={onInc} onDec={onDec} />
        </div>
      </div>
    );
  }

  // ---- MINIMAL: denso, texto-protagonista, botellita inline --------------
  if (variant === "minimal") {
    return (
      <div className={"pv-card pv-card-min" + soldout}>
        <ProductImg p={p} size={40} />
        <div className="pv-min-info">
          <span className="pv-min-name">{p.nombre}</span>
          <span className="pv-min-meta">{p.variante}</span>
        </div>
        <ProdPrice p={p} />
        <PriceAdd p={p} qty={qty} onAdd={onAdd} onInc={onInc} onDec={onDec} />
      </div>
    );
  }

  // ---- PLINTH: lujo, botella sobre pedestal con halo de oro --------------
  if (variant === "plinth") {
    return (
      <div className={"pv-card pv-card-plinth" + (p.estrella ? " is-star" : "") + soldout}>
        {p.tag && <div className="pv-plinth-tag"><Tag kind={p.estrella ? "gold" : "ghost"}>{p.tag}</Tag></div>}
        <div className="pv-plinth-stage">
          <ProductImg p={p} size={118} glow />
          <div className="pv-plinth-disc" />
        </div>
        <div className="pv-plinth-name">{p.nombre}</div>
        <div className="pv-plinth-meta">{p.variante}</div>
        <div className="pv-plinth-foot">
          <ProdPrice p={p} />
          <PriceAdd p={p} qty={qty} onAdd={onAdd} onInc={onInc} onDec={onDec} />
        </div>
      </div>
    );
  }

  // ---- TILE (default): rejilla, botella mini arriba ----------------------
  return (
    <div className={"pv-card pv-card-tile" + (p.estrella ? " is-star" : "") + soldout}>
      {p.tag && <div className="pv-tile-tag"><Tag kind={p.estrella ? "gold" : "ghost"}>{p.tag}</Tag></div>}
      <div className="pv-tile-bottle"><ProductImg p={p} size={96} /></div>
      <div className="pv-tile-name">{p.nombre}</div>
      <div className="pv-tile-meta">{p.variante}{meta && <><span className="pv-dot">·</span>{meta}</>}</div>
      <div className="pv-tile-foot">
        <ProdPrice p={p} />
        <PriceAdd p={p} qty={qty} onAdd={onAdd} onInc={onInc} onDec={onDec} />
      </div>
    </div>
  );
}

/* ---- Tarjeta de combo --------------------------------------------------- */
function ComboCard({ c, qty, onAdd, onInc, onDec, featured }) {
  const { pesos } = window.PAVLOS;
  const ahorro = c.antes ? c.antes - c.precio : 0;
  return (
    <div className={"pv-combo" + (featured ? " is-featured" : "")}>
      <div className="pv-combo-head">
        <div className="pv-combo-titles">
          {c.tag && <span className="pv-combo-tag">{c.tag}</span>}
          <h3 className="pv-combo-name">{c.nombre}</h3>
          <p className="pv-combo-desc">{c.desc}</p>
        </div>
        {ahorro > 0 && <div className="pv-combo-save">Ahorras<br /><strong>{pesos(ahorro)}</strong></div>}
      </div>
      <ul className="pv-combo-items">
        {c.items.map((it, i) => (
          <li key={i}><Icon name="check" size={15} />{it}</li>
        ))}
      </ul>
      <div className="pv-combo-foot">
        <div className="pv-combo-price">
          <span className="pv-price pv-price-lg">{pesos(c.precio)}</span>
          {c.antes && <span className="pv-was">{pesos(c.antes)}</span>}
        </div>
        {qty > 0
          ? <Stepper qty={qty} onInc={onInc} onDec={onDec} />
          : <button type="button" className="pv-add pv-add-block" onClick={onAdd}><Icon name="plus" size={16} /> Agregar combo</button>}
      </div>
    </div>
  );
}

/* ---- Precio con "antes" (tachado) -------------------------------------- */
function ProdPrice({ p }) {
  const { pesos } = window.PAVLOS;
  return (
    <span className="pv-price">{pesos(p.precio)}{p.antes ? <span className="pv-was">{pesos(p.antes)}</span> : null}</span>
  );
}

/* ---- Tarjeta de promo (carrusel horizontal de Inicio) ------------------ */
function PromoCard({ item, qty, onAdd, onInc, onDec }) {
  const { pesos } = window.PAVLOS;
  const pct = item.antes ? Math.round((1 - item.precio / item.antes) * 100) : 0;
  return (
    <div className="pv-promo">
      {pct > 0 && <div className="pv-promo-rib">-{pct}%</div>}
      <div className="pv-promo-art">
        {item.kind === "prod"
          ? <ProductImg p={item} size={86} />
          : <span className="pv-promo-combo"><Icon name="combo" size={34} /></span>}
      </div>
      <div className="pv-promo-name">{item.nombre}</div>
      <div className="pv-promo-sub">{item.sub}</div>
      <div className="pv-promo-prices">
        <span className="pv-price">{pesos(item.precio)}</span>
        {item.antes && <span className="pv-was">{pesos(item.antes)}</span>}
      </div>
      {qty > 0
        ? <Stepper qty={qty} size="sm" onInc={onInc} onDec={onDec} />
        : <button type="button" className="pv-add pv-add-block pv-promo-add" onClick={onAdd}><Icon name="plus" size={15} /> Agregar</button>}
    </div>
  );
}

/* ---- Publicación de Instagram: embed oficial (reel/post real) ---------- */
let __igScriptPromise = null;
function loadIgScript() {
  if (window.instgrm) return Promise.resolve();
  if (__igScriptPromise) return __igScriptPromise;
  __igScriptPromise = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = resolve;
    s.onerror = resolve;
    document.body.appendChild(s);
  });
  return __igScriptPromise;
}

function IgPost({ post }) {
  const ref = React.useRef(null);
  const permalink = String(post.url || "").split("?")[0];
  React.useEffect(() => {
    let alive = true;
    loadIgScript().then(() => {
      if (alive && window.instgrm && ref.current) window.instgrm.Embeds.process(ref.current);
    });
    return () => { alive = false; };
  }, [permalink]);
  if (!permalink) return null;
  return (
    <div className="pv-ig-embed" ref={ref}>
      <blockquote className="instagram-media" data-instgrm-permalink={permalink} data-instgrm-version="14"
        style={{ background: "#0a0908", border: 0, margin: 0, padding: 0, width: "100%" }}>
        <a href={permalink} target="_blank" rel="noopener">Ver publicación en Instagram</a>
      </blockquote>
    </div>
  );
}

Object.assign(window, { Tag, ProductImg, PriceAdd, ProductCard, ComboCard, ProdPrice, PromoCard, IgPost });
