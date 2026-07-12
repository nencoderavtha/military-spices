"use client";
import { useState, useEffect, useRef } from "react";

/* ============================================================
   CONFIG  —  edit before go-live
   ============================================================ */
const WA_PHONE = "919000000000"; // ← real WhatsApp business number (country code, no +)
const ORDER_URL = "https://order.themilitaryspices.com";

const CONTACT = {
  area: "Neredmet, Hyderabad",
  address: "Neredmet Main Road, Hyderabad, Telangana",
  phone: "+91 90000 00000",
  email: "hello@themilitaryspices.in",
  hours: "Mon–Sun · 11 AM – 11 PM",
  offerPct: "10%",
  mapUrl: "https://maps.google.com/?q=Neredmet+Main+Road+Hyderabad",
};

const GOOGLE = {
  url: "https://maps.app.goo.gl/t7s2535EqU4JjSnp7",
  rating: 4.6,
  count: "600+",
};

const waLink = (msg) => `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
const WA_URL = waLink("Hi! I'd like to place an order at The Military Spices 🍖");
const itemWA = (name) => waLink(`Hi! I'd like to order ${name} from The Military Spices 🍖`);
const TEL = `tel:${CONTACT.phone.replace(/\s/g, "")}`;

/* ============================================================
   DATA
   ============================================================ */
const NAV = [
  { href: "#specials", label: "Specials" },
  { href: "#menu", label: "Menu" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

const MARQUEE = [
  "Chicken Biryani", "Mutton Pepper Fry", "Country Chicken", "Fish Fry",
  "Egg Biryani", "Boneless Curry", "Military Mutton", "Parotta",
];

const MENU = [
  { name: "Military Chicken Biryani", tag: "bestseller", price: 180, unit: "plate", desc: "Bone-in country chicken, whole spices, fried onions — served with raita.", emoji: "🍛" },
  { name: "Mutton Pepper Fry", tag: "spicy", price: 260, unit: "½ kg", desc: "Slow-roasted with cracked pepper, garlic & curry leaves.", emoji: "🌶️" },
  { name: "Boneless Chicken Curry", price: 160, unit: "plate", desc: "Thick masala-forward gravy — best with parotta, rice or roti.", emoji: "🍗" },
  { name: "Spiced Chicken Sandwich", tag: "multi-cuisine", price: 110, unit: "double", desc: "Peppery shredded chicken, fresh veg & house military mayo.", emoji: "🥪" },
  { name: "Egg Biryani", price: 120, unit: "plate", desc: "Basmati layered with masala eggs, caramelised onions & saffron.", emoji: "🥚" },
  { name: "Fish Fry — Rohu", tag: "daily catch", price: 240, unit: "2 pcs", desc: "Marinated in turmeric, red chilli & ginger, flash-fried golden.", emoji: "🐟" },
];

const REVIEWS = [
  { name: "Rohan", loc: "Neredmet", quote: "The biryani is the real deal — bold, spicy and a proper portion. My weekend go-to now." },
  { name: "Aditi", loc: "Secunderabad", quote: "Mutton pepper fry tastes just like home-style military cooking. Fresh and full of flavour." },
  { name: "Sameer", loc: "Malkajgiri", quote: "Ordered on WhatsApp, arrived hot in no time. Authentic taste, honest pricing." },
  { name: "Meera", loc: "Tarnaka", quote: "Generous portions and rich, balanced spices. Best curries in the area, easily." },
  { name: "Karthik", loc: "AS Rao Nagar", quote: "Consistent quality every single time. Veg or non-veg, the flavours never miss." },
  { name: "Sneha", loc: "Sainikpuri", quote: "Love that I can just chat to order. Fresh, spicy, worth every rupee!" },
];

/* Google-review card data — quotes reused with a rating + relative time */
const GMETA = [
  { rating: 5, ago: "2 weeks ago" },
  { rating: 5, ago: "a month ago" },
  { rating: 4, ago: "3 days ago" },
  { rating: 5, ago: "a week ago" },
  { rating: 4, ago: "last month" },
  { rating: 5, ago: "5 days ago" },
];
const GREVIEWS = REVIEWS.map((r, i) => ({ ...r, ...GMETA[i % GMETA.length] }));

/* ============================================================
   ICONS
   ============================================================ */
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.126 1.527 5.857L0 24l6.335-1.525A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.002-1.371l-.359-.214-3.721.896.938-3.617-.234-.373A9.818 9.818 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
    </svg>
  );
}
const PhoneIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" />
  </svg>
);
const PinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);
const Star = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.02 6.09 20.13l1.13-6.57L2.45 8.9l6.6-.96z" />
  </svg>
);

function GoogleG({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

/* precise (partial-capable) star bar */
function StarBar({ value, size = "1em" }) {
  const pct = `${(value / 5) * 100}%`;
  return (
    <span className="starbar" style={{ "--p": pct, fontSize: size }} aria-label={`${value} out of 5`}>
      <span className="sb-bg">★★★★★</span>
      <span className="sb-fg" style={{ width: pct }}>★★★★★</span>
    </span>
  );
}

/* Google review card with auto-rotating reviews + 3D flip */
function GoogleReviewCard() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0); // bump to retrigger flip + progress animations

  useEffect(() => {
    const id = setInterval(() => {
      setI((prev) => {
        let next = Math.floor(Math.random() * GREVIEWS.length);
        if (next === prev) next = (next + 1) % GREVIEWS.length;
        return next;
      });
      setN((v) => v + 1);
    }, 5400);
    return () => clearInterval(id);
  }, []);

  const r = GREVIEWS[i];

  return (
    <div className="gcard-wrap">
      <article className="gcard">
        <header className="gc-head">
          <span className="gc-glogo"><GoogleG size={26} /></span>
          <div className="gc-agg">
            <div className="gc-aggtop">
              <b>{GOOGLE.rating}</b>
              <StarBar value={GOOGLE.rating} size="1.05rem" />
            </div>
            <span className="gc-sub"><span className="gc-dot" /> GOOGLE · {GOOGLE.count} REVIEWS</span>
          </div>
        </header>

        <div className="gc-review" key={n} aria-live="polite">
          <StarBar value={r.rating} size="1.1rem" />
          <blockquote className="gc-quote">{r.quote}</blockquote>
          <div className="gc-by">{r.name} · {r.loc} · {r.ago}</div>
        </div>

        <div className="gc-prog" key={"p" + n}><i /></div>

        <a className="gc-cta" href={GOOGLE.url} target="_blank" rel="noopener noreferrer">
          Read on Google <span aria-hidden="true">↗</span>
        </a>
      </article>
    </div>
  );
}

/* ============================================================
   LOGO  — masked /logo.png, recolored solid (dark brown or cream)
   ============================================================ */
function Logo({ tone = "brown", className = "" }) {
  return (
    <span
      className={`logo-mark logo-${tone} ${className}`}
      role="img"
      aria-label="The Military Spices Restaurant"
    />
  );
}

/* ============================================================
   MENU DISH CARD — top-angle photo with graceful fallback.
   Drop a JPG at /public/menu/<slug>.jpg and it appears automatically.
   ============================================================ */
const slugify = (s) =>
  s.toLowerCase().replace(/[–—]/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function PlateIcon() {
  return (
    <svg viewBox="0 0 64 64" width="42" height="42" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="32" cy="32" r="19" />
      <circle cx="32" cy="32" r="11" opacity=".55" />
      <path d="M14 22 H8 M11 19 V25 M53 19 c3 2 3 7 0 9 M53 28 V45" opacity=".7" />
    </svg>
  );
}

function DishCard({ item }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = `/menu/${slugify(item.name)}.jpg`;
  return (
    <a href={itemWA(item.name)} target="_blank" rel="noopener noreferrer" className="dish reveal">
      <div className="dish-photo">
        <span className="dish-ph" aria-hidden="true"><PlateIcon /></span>
        {!failed && (
          <img
            src={src}
            alt={item.name}
            loading="lazy"
            className={`dish-img${loaded ? " is-loaded" : ""}`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
        {item.tag && <span className="dish-tag">{item.tag}</span>}
        <span className="dish-price">₹{item.price}<small>/{item.unit}</small></span>
      </div>
      <div className="dish-body">
        <h3 className="dish-name">{item.name}</h3>
        <p className="dish-desc">{item.desc}</p>
        <span className="dish-order"><WhatsAppIcon size={15} /> Order on WhatsApp</span>
      </div>
    </a>
  );
}

function ImagePlaceholder({ label, icon = "📷" }) {
  return (
    <div className="ph" role="img" aria-label={`${label} (image placeholder)`}>
      <span className="ph-ic">{icon}</span>
      <span className="ph-label">{label}</span>
      <span className="ph-hint">Add photo</span>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); } }),
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* scroll-scrubbed fullscreen video — maps scroll progress to video time */
  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    let duration = 0, target = 0, current = 0, raf = 0, primed = false, alive = true;

    const setDur = () => { duration = video.duration && isFinite(video.duration) ? video.duration : 10; };
    if (video.readyState >= 1) setDur();
    video.addEventListener("loadedmetadata", setDur);

    // iOS needs a gesture to allow frame seeking — prime once, then pause
    const prime = () => {
      if (primed) return; primed = true;
      const p = video.play();
      if (p && p.then) p.then(() => video.pause()).catch(() => {});
    };

    const compute = () => {
      const scrollable = track.offsetHeight - window.innerHeight;
      const passed = -track.getBoundingClientRect().top;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, passed / scrollable)) : 0;
      target = progress;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (hintRef.current) hintRef.current.style.opacity = progress > 0.03 ? "0" : "1";
    };

    const tick = () => {
      if (!alive) return;
      current += (target - current) * 0.16;                 // smooth lerp for buttery scrub
      if (Math.abs(target - current) < 0.0004) current = target;
      const dur = duration || 10;
      const t = Math.max(0, Math.min(current * dur, dur - 0.05)); // never seek to the very end (avoids 'ended' freeze)
      if (duration && Math.abs(video.currentTime - t) > 0.015) {
        try { video.currentTime = t; } catch (e) {}
      }
      raf = requestAnimationFrame(tick);
    };

    compute();
    raf = requestAnimationFrame(tick);
    const onScroll = () => { prime(); compute(); }; // prime on scroll too — wheel/keyboard scrolling never fires touch/pointer events
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    window.addEventListener("touchstart", prime, { passive: true });
    window.addEventListener("pointerdown", prime);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      window.removeEventListener("touchstart", prime);
      window.removeEventListener("pointerdown", prime);
      video.removeEventListener("loadedmetadata", setDur);
    };
  }, []);

  const closeAnd = () => setOpen(false);

  return (
    <>
      {/* ===== TOP STRIP ===== */}
      <div className="topstrip">
        <span>✦ Flat <b>{CONTACT.offerPct} off</b> on online orders · made fresh, delivered hot ✦</span>
      </div>

      {/* ===== NAV ===== */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <a href="#top" className="nav-logo" aria-label="The Military Spices — home" onClick={closeAnd}>
          <Logo tone="brown" />
        </a>
        <div className="nav-links">{NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</div>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="nav-order">
          <WhatsAppIcon size={16} /> Order
        </a>
        <button
          className={`hamburger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ===== MOBILE DRAWER ===== */}
      <div className={`drawer-scrim${open ? " show" : ""}`} onClick={closeAnd} aria-hidden={!open} />
      <aside className={`drawer${open ? " show" : ""}`} aria-hidden={!open}>
        <div className="drawer-top"><Logo tone="cream" className="drawer-logo" /></div>
        <nav className="drawer-links">
          {NAV.map((n, i) => (
            <a key={n.href} href={n.href} onClick={closeAnd} style={{ transitionDelay: `${0.05 + i * 0.06}s` }}>
              <span className="dl-num">0{i + 1}</span>{n.label}
            </a>
          ))}
        </nav>
        <div className="drawer-cta">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-wa" onClick={closeAnd}>
            <WhatsAppIcon size={18} /> Order on WhatsApp
          </a>
          <a href={TEL} className="btn btn-ghost" onClick={closeAnd}><PhoneIcon size={16} /> Call us</a>
        </div>
        <p className="drawer-foot">{CONTACT.hours}<br />{CONTACT.area}</p>
      </aside>

      {/* ===== HERO ===== */}
      <header className="hero" id="top">
        <span className="hero-spark s1" aria-hidden="true">✦</span>
        <span className="hero-spark s2" aria-hidden="true">✶</span>
        <div className="hero-inner wrap">
          <p className="hero-eyebrow fade" style={{ "--d": ".05s" }}>
            <span className="dot" /> Neredmet · Hyderabad · since the mess kitchen
          </p>

          <h1 className="hero-title">
            <span className="ht-l1 fade" style={{ "--d": ".12s" }}>Bold</span>
            <span className="ht-l2 fade" style={{ "--d": ".2s" }}>Military</span>
            <span className="ht-l3 fade" style={{ "--d": ".28s" }}>Flavours<span className="ht-amp">&amp;</span></span>
            <span className="ht-l4 fade" style={{ "--d": ".36s" }}>Fiery <em>Spices</em></span>
          </h1>

          <p className="hero-sub fade" style={{ "--d": ".44s" }}>
            Country-style biryanis, slow-roasted pepper fries and rich masala curries —
            cooked fresh every single day, the proper military way.
          </p>

          <div className="hero-actions fade" style={{ "--d": ".52s" }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
              <WhatsAppIcon size={20} /> Order Now
            </a>
            <a href="#menu" className="btn btn-ghost btn-lg">View Menu ↓</a>
          </div>

          <a href="#feast" className="hero-cue fade" style={{ "--d": ".62s" }} aria-label="Scroll to watch">
            <span className="hero-cue-mouse"><span /></span> scroll to plate it up
          </a>
        </div>
      </header>

      {/* ===== INTRO (above the video — does not overlay it) ===== */}
      <section className="feast-intro wrap" id="feast">
        <div className="sv-cap reveal">
          <span className="sv-kicker">Cooked fresh · served hot</span>
          <h2 className="sv-title">Straight from <em>the&nbsp;pot</em></h2>
        </div>
        <span className="sv-badge reveal"><b>{CONTACT.offerPct}</b><span>OFF</span></span>
      </section>

      {/* ===== SCROLL-SCRUBBED FULLSCREEN VIDEO ===== */}
      <section className="scrollvid" ref={trackRef}>
        <div className="scrollvid-pin">
          <video
            ref={videoRef}
            className="scrollvid-video"
            src="/biryani.mp4"
            poster="/biryani-poster.jpg"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <span className="sv-grad sv-top" aria-hidden="true" />
          <span className="sv-grad sv-bottom" aria-hidden="true" />
          <div className="sv-progress" aria-hidden="true"><i ref={barRef} /></div>
          <span className="sv-hint" ref={hintRef} aria-hidden="true"><i /> keep scrolling</span>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-band">
        <ul className="hero-stats wrap reveal">
          <li><b>4.8★</b><span>Rated by locals</span></li>
          <li><b>20+</b><span>Spices used</span></li>
          <li><b>11–11</b><span>Open daily</span></li>
        </ul>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="mq-item">{m}<i className="mq-dot">✦</i></span>
          ))}
        </div>
      </div>

      {/* ===== SPECIALS ===== */}
      <section className="specials" id="specials">
        <span className="spec-spark s1" aria-hidden="true">✦</span>
        <span className="spec-spark s2" aria-hidden="true">✶</span>
        <div className="wrap specials-inner">
          <div className="spec-copy reveal">
            <h2 className="spec-title">The Military<br />Spices <em>Specials</em></h2>
            <p className="spec-text">
              Experience bold and satisfying flavors at The Military Spices. From our signature{" "}
              <b>military-style curries</b> and aromatic <b>biryanis</b> to tasty{" "}
              <b>sandwiches and fast food favorites</b> — every dish is freshly prepared with rich
              spices and quality ingredients to deliver a powerful and memorable dining experience.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="spec-cta">
              <WhatsAppIcon size={18} /> Order Now
            </a>
          </div>
          <div className="spec-media reveal">
            <img
              src="/specials.png"
              alt="The Military Spices special — military-style chicken fry on a banana leaf platter with onion and lime"
              className="spec-img"
            />
          </div>
        </div>
      </section>

      {/* ===== MENU ===== */}
      <section className="sec wrap" id="menu">
        <div className="sec-head reveal">
          <span className="kicker">Straight from the mess kitchen</span>
          <h2 className="h2">The Menu</h2>
          <p className="sec-note"><span className="tap-dot" /> Tap any dish to order it on WhatsApp</p>
        </div>

        <div className="menu-grid">
          {MENU.map((item) => <DishCard key={item.name} item={item} />)}
        </div>
      </section>

      {/* ===== REVIEWS (Google card, auto-rotating) ===== */}
      <section className="reviews-sec" id="reviews">
        <div className="gcard-bg" aria-hidden="true" />
        <div className="wrap reviews-inner">
          <div className="sec-head reveal">
            <span className="kicker kicker-light">Kind words</span>
            <h2 className="h2 h2-light">What people say</h2>
          </div>
          <div className="reveal"><GoogleReviewCard /></div>
        </div>
      </section>

      {/* ===== VISIT / CONTACT ===== */}
      <section className="sec wrap" id="visit">
        <div className="sec-head reveal">
          <span className="kicker">Come hungry</span>
          <h2 className="h2">Visit &amp; order</h2>
        </div>
        <div className="visit-grid">
          <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer" className="visit-card reveal">
            <span className="vc-ic"><PinIcon /></span>
            <b>Location</b><span>{CONTACT.address}</span><i className="vc-link">Open in Maps →</i>
          </a>
          <a href={TEL} className="visit-card reveal">
            <span className="vc-ic"><PhoneIcon /></span>
            <b>Call to order</b><span>{CONTACT.phone}</span><i className="vc-link">Tap to call →</i>
          </a>
          <div className="visit-card reveal">
            <span className="vc-ic"><ClockIcon /></span>
            <b>Open hours</b><span>{CONTACT.hours}</span><i className="vc-link">Dine-in · Takeaway · Delivery</i>
          </div>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="visit-card visit-card-wa reveal">
            <span className="vc-ic"><WhatsAppIcon size={18} /></span>
            <b>WhatsApp</b><span>Order in one quick chat</span><i className="vc-link">Message us →</i>
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <Logo tone="cream" className="footer-logo" />
            <p>Bold flavours. Military-style taste. Cooked fresh in {CONTACT.area}.</p>
          </div>
          <nav className="footer-links">
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer">Order</a>
          </nav>
          <p className="footer-contact">
            <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer">{CONTACT.address}</a><br />
            <a href={TEL}>{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br />
            {CONTACT.hours}
          </p>
          <p className="footer-copy">© {new Date().getFullYear()} The Military Spices · Bold Flavours. Military Style Taste.</p>
        </div>
      </footer>

      {/* ===== STICKY MOBILE ACTION BAR ===== */}
      <div className="actionbar">
        <a href={TEL} className="ab-call"><PhoneIcon size={18} /> Call</a>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="ab-order">
          <WhatsAppIcon size={18} /> Order on WhatsApp
        </a>
      </div>
    </>
  );
}
