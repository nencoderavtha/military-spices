"use client";
import { useState, useEffect } from "react";

/* ============================================================
   CONFIG — update phone number before go-live
   ============================================================ */
const WA_PHONE = "919876543210"; // replace with actual WhatsApp number
const WA_GREETING = encodeURIComponent(
  "Hi! I'd like to place an order at The Military Spices 🍖"
);
const WA_URL = `https://wa.me/${WA_PHONE}?text=${WA_GREETING}`;

const itemWAMsg = (name) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
    `Hi! I'd like to order ${name} from The Military Spices 🍖`
  )}`;

/* ============================================================
   DATA
   ============================================================ */
const MENU = [
  {
    id: "biryani",
    name: "Military Chicken Biryani",
    badge: "Bestseller",
    desc: "Fragrant long-grain rice slow-cooked with whole spices, bone-in country chicken, and fried onions. Served with raita.",
    price: 180,
    unit: "Full Plate",
    emoji: "🍗",
  },
  {
    id: "mutton-fry",
    name: "Mutton Pepper Fry",
    badge: "Spicy Hit",
    desc: "Tender mutton pieces slow-roasted with freshly cracked pepper, garlic, curry leaves and coconut oil.",
    price: 260,
    unit: "Half Kg",
    emoji: "🥩",
  },
  {
    id: "boneless-curry",
    name: "Boneless Chicken Curry",
    badge: "Fan Favourite",
    desc: "Thick, masala-forward gravy with boneless chicken — best paired with parotta or rice.",
    price: 160,
    unit: "Full Plate",
    emoji: "🍛",
  },
  {
    id: "prawn",
    name: "Prawn Masala",
    badge: "Fresh Catch",
    desc: "Juicy prawns cooked in a tangy tomato-onion masala with coastal spices and a squeeze of lime.",
    price: 320,
    unit: "Half Kg",
    emoji: "🦐",
  },
  {
    id: "egg-biryani",
    name: "Egg Biryani",
    badge: "Quick Pick",
    desc: "Fluffy basmati layered with masala-coated boiled eggs, caramelised onions and saffron water.",
    price: 120,
    unit: "Full Plate",
    emoji: "🥚",
  },
  {
    id: "fish-fry",
    name: "Fish Fry (Rohu)",
    badge: "Daily Catch",
    desc: "Thick Rohu slices marinated in turmeric, red chilli and ginger, flash-fried until golden.",
    price: 240,
    unit: "2 Pieces",
    emoji: "🐟",
  },
];

const FEATURES = [
  { icon: "🔥", title: "Military Style", desc: "Cooked in bulk iron vessels — the authentic way" },
  { icon: "🌶️", title: "Real Spices", desc: "Freshly ground masalas, no packaged shortcuts" },
  { icon: "⚡", title: "Fast Delivery", desc: "Hot food at your door in 30–45 minutes" },
  { icon: "💬", title: "WhatsApp Order", desc: "Chat directly — no app, no login needed" },
];

const TESTIMONIALS = [
  {
    initials: "RK",
    name: "Ravi Kumar",
    loc: "Hyderabad",
    quote:
      "The Mutton Pepper Fry is unreal. Tastes exactly like what my nana used to cook — bold, spicy, pure flavour. No shortcuts.",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    loc: "Secunderabad",
    quote:
      "Ordered biryani on WhatsApp and it arrived in 35 minutes. Still hot, rice perfectly cooked. Will order every week!",
  },
  {
    initials: "AM",
    name: "Arjun Mehta",
    loc: "HITEC City",
    quote:
      "Best Prawn Masala in the city. The gravy is thick, the prawns are fresh, and the price is honest. Nothing else compares.",
  },
];

const NAV = [
  { href: "#menu", label: "Menu" },
  { href: "#why-us", label: "Why Us" },
  { href: "#order", label: "Order" },
];

/* ============================================================
   ICONS
   ============================================================ */
function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.126 1.527 5.857L0 24l6.335-1.525A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.002-1.371l-.359-.214-3.721.896.938-3.617-.234-.373A9.818 9.818 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
    </svg>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ====== NAVBAR ====== */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">
          <span className="nav-logo-main">The Military Spices</span>
          <span className="nav-logo-sub">Hyderabadi Non-Veg · Hyderabad</span>
        </div>

        <div className="nav-links">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </div>

        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="nav-order-btn">
          <WhatsAppIcon size={16} />
          Order Now
        </a>

        <button className="hamburger" aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="hero-bg-gradient" />
        <div className="hero-inner">
          {/* Copy */}
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Now Open · Free Delivery Above ₹299
            </div>

            <h1 className="hero-title">
              <span className="outline">Bold</span>{" "}
              <em>Flavour.</em>
              <br />
              Real{" "}
              <span className="outline">Spice.</span>
            </h1>

            <p className="hero-sub">
              Military-style cooking from Hyderabad's finest non-veg kitchen.
              Bone-in biryanis, pepper mutton, fresh-catch fish — cooked the old
              way and delivered straight to your door.
            </p>

            <div className="hero-ctas">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <WhatsAppIcon size={22} />
                Order on WhatsApp
              </a>
              <a href="#menu" className="btn-menu">
                See Full Menu →
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <span className="hero-stat-val">500+</span>
                <span className="hero-stat-lbl">Daily Orders</span>
              </div>
              <div>
                <span className="hero-stat-val">4.8★</span>
                <span className="hero-stat-lbl">Customer Rating</span>
              </div>
              <div>
                <span className="hero-stat-val">30 min</span>
                <span className="hero-stat-lbl">Avg Delivery</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hero-visual">
            <div className="hero-plate-ring">
              {/* Plate placeholder — replace src with actual food photo */}
              <div
                className="hero-plate-img"
                style={{
                  background: "linear-gradient(135deg, #3d2c10 0%, #5a3a15 30%, #2c1a08 70%, #1a0e04 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "7rem",
                }}
                aria-label="Military Chicken Biryani"
              >
                🍛
              </div>
            </div>

            <div className="hero-offer-badge">
              <span className="pct">30%</span>
              <span className="off">OFF</span>
            </div>

            <div className="hero-tag-float">
              <span className="hero-tag-icon">🌶️</span>
              <span>Military-Style Cooking</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== MARQUEE ====== */}
      <div className="menu-strip">
        <div className="menu-strip-track">
          {/* duplicate for seamless loop */}
          {[...Array(2)].flatMap((_, ri) =>
            ["Chicken Biryani", "Mutton Fry", "Prawn Masala", "Fish Fry", "Egg Biryani", "Boneless Curry"].map(
              (item) => (
                <span className="menu-strip-item" key={`${ri}-${item}`}>
                  {item} <span className="menu-strip-sep">✦</span>
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* ====== MENU ====== */}
      <section className="section" id="menu">
        <div className="reveal">
          <span className="section-tag">Our Specialties</span>
          <h2 className="section-title">
            The <em>Military</em> Menu
          </h2>
          <p className="section-intro">
            Each dish is cooked fresh daily in large iron vessels over open flame — the only way
            to get that deep, layered flavour no gas-stove kitchen can replicate.
          </p>
        </div>

        <div className="menu-grid">
          {MENU.map((item, i) => (
            <article
              className="menu-card reveal"
              key={item.id}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="menu-card-img-wrap">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4.5rem",
                    background: "linear-gradient(135deg, #2a1a08, #3d2510)",
                  }}
                  aria-label={item.name}
                >
                  {item.emoji}
                </div>
                <span className="menu-card-badge">{item.badge}</span>
              </div>

              <div className="menu-card-body">
                <h3 className="menu-card-name">{item.name}</h3>
                <p className="menu-card-desc">{item.desc}</p>
                <div className="menu-card-footer">
                  <span className="menu-card-price">
                    ₹{item.price}
                    <span className="unit"> / {item.unit}</span>
                  </span>
                  <a
                    href={itemWAMsg(item.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-order-item"
                  >
                    <WhatsAppIcon size={14} />
                    Order
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ====== WHY US ====== */}
      <div className="features-section" id="why-us">
        <div className="features-inner">
          <div className="reveal">
            <span className="section-tag">Why Military Spices</span>
            <h2 className="section-title">
              No Shortcuts. <em>Only Flavour.</em>
            </h2>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div
                className="feature-card reveal"
                key={f.title}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="feature-icon">{f.icon}</span>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== ORDER CTA ====== */}
      <section className="order-cta-section" id="order">
        <div className="order-cta-inner reveal">
          <span className="order-cta-eyebrow">Ready to eat?</span>
          <h2 className="order-cta-title">
            One Chat. <em>Hot Food.</em>
          </h2>
          <p className="order-cta-sub">
            Our WhatsApp bot takes your order in seconds — pick your dishes, confirm, and
            we'll have it cooking. No app. No account. Just a WhatsApp message.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa-big">
            <WhatsAppIcon size={26} />
            Start Your Order
          </a>
          <p className="order-cta-note">Available 10 AM – 10 PM · Free delivery above ₹299</p>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="testimonials-section">
        <div className="reveal">
          <span className="section-tag">What Customers Say</span>
          <h2 className="section-title">
            Loved by <em>Real People</em>
          </h2>
        </div>

        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              className="testi-card reveal"
              key={t.name}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">"{t.quote}"</p>
              <div className="testi-author">
                <span className="testi-avatar">{t.initials}</span>
                <div>
                  <span className="testi-name">{t.name}</span>
                  <span className="testi-loc">Verified Customer · {t.loc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-main">The Military Spices</span>
            <span className="logo-sub">Hyderabadi Non-Veg</span>
            <p>
              Authentic military-style cooking from Hyderabad. Bold spices, honest portions,
              iron-vessel flavour — straight to your door.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#menu">Our Menu</a></li>
              <li><a href="#why-us">Why Us</a></li>
              <li><a href="#order">Order Now</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Reach Us</h4>
            <p>
              📍 Hyderabad, Telangana<br /><br />
              📞 +91 98765 43210<br /><br />
              🕙 10 AM – 10 PM Daily
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 The Military Spices. All rights reserved.</p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="footer-wa-link">
            <WhatsAppIcon size={16} />
            Order on WhatsApp
          </a>
        </div>
      </footer>

      {/* ====== FLOATING WA BUTTON ====== */}
      <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Order on WhatsApp">
        <WhatsAppIcon size={30} />
      </a>
    </>
  );
}
