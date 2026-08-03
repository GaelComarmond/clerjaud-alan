"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PHONE_DISPLAY = "06 63 89 72 19";
const PHONE_LINK = "+33663897219";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a href="#accueil" className="header-brand" aria-label="Clerjaud Alan, accueil" onClick={close}>
          <Image
            src="/logo/clerjaud-alan-logo.png"
            alt="Clerjaud Alan — Serrurerie, vitrerie, plomberie, chauffage"
            width={1500}
            height={520}
            priority
          />
        </a>

        <nav className={`main-nav ${open ? "main-nav--open" : ""}`} aria-label="Navigation principale">
          <a href="#metiers" onClick={close}>Métiers</a>
          <a href="#realisations" onClick={close}>Interventions</a>
          <a href="#avis" onClick={close}>Avis</a>
          <a href="#zone" onClick={close}>Zone</a>
          <a href="#devis" onClick={close}>Devis</a>
          <a className="main-nav__mobile-call" href={`tel:${PHONE_LINK}`}>Appeler {PHONE_DISPLAY}</a>
        </nav>

        <div className="header-actions">
          <span className="availability"><i /> Disponible 24h/24</span>
          <a className="header-call" href={`tel:${PHONE_LINK}`} aria-label={`Appeler le ${PHONE_DISPLAY}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.6 10 8.2 8 9.8c1.3 2.8 3.4 4.9 6.2 6.2l1.6-2 4.6 2.8c.6.4.8 1.1.5 1.8l-.9 2.3c-.3.8-1.1 1.3-1.9 1.2C9.4 21.2 2.8 14.6 1.9 5.9c-.1-.8.4-1.6 1.2-1.9l2.3-.9c.7-.3 1.4 0 1.8.5Z"/></svg>
            <span>{PHONE_DISPLAY}</span>
          </a>
          <button className={`menu-button ${open ? "menu-button--open" : ""}`} type="button" aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
