import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-intro">
          <Image src="/logo/logo.png" alt="Clerjaud Alan" width={1500} height={520} />
          <p>Un interlocuteur pour la serrurerie, la vitrerie, la plomberie et le chauffage.</p>
        </div>
        <div>
          <span className="footer-title">Contact</span>
          <a href="tel:+33663897219">06 63 89 72 19</a>
          <a href="mailto:alan-assistance@hotmail.fr">alan-assistance@hotmail.fr</a>
          <address>16 Av. Pierre Mendès-France<br />94880 Noiseau</address>
        </div>
        <div>
          <span className="footer-title">Disponibilité</span>
          <p>Ouvert 24h/24<br />7 jours sur 7</p>
        </div>
        <div>
          <span className="footer-title">Accès rapide</span>
          <a href="#metiers">Métiers</a>
          <a href="#avis">Avis clients</a>
          <a href="#devis">Demander un devis</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>Concept de site non officiel créé à titre de démonstration.</span>
        <span>© {new Date().getFullYear()} Clerjaud Alan</span>
      </div>
    </footer>
  );
}