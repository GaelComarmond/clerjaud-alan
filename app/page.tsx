import QuoteForm from "./components/QuoteForm";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const trades = [
  {
    number: "01",
    title: "Serrurerie",
    intro: "Ouverture, sécurisation, remplacement et réparation des accès.",
    services: [
      "Changement de combinaison ou de cylindres",
      "Ouverture de porte / bâtiment",
      "Serrures de fenêtres",
      "Installation de serrures et quincaillerie",
      "Coffre-fort : installation, ouverture ou réparation",
      "Réparations et serrures de portes de sécurité",
    ],
    icon: "key",
  },
  {
    number: "02",
    title: "Vitrerie & ouvertures",
    intro: "Remise en sécurité et intervention sur portes, fenêtres et vitrages.",
    services: [
      "Mise en sécurité de fenêtre",
      "Installation de fenêtre",
      "Pose de vitrage",
      "Installation de porte",
      "Réparation de fenêtre",
      "Réparation de porte",
    ],
    icon: "window",
  },
  {
    number: "03",
    title: "Plomberie",
    intro: "Recherche de fuite, dépannage sanitaire et remise en état des équipements.",
    services: [
      "Recherche de fuite",
      "Installation et réparation de WC",
      "Débouchage de canalisation",
      "Installation et réparation de chauffe-eau",
      "Installation et réparation de robinet",
      "Réparation de douche, tuyauterie et plomberie extérieure",
    ],
    icon: "tap",
  },
  {
    number: "04",
    title: "Chauffage",
    intro: "Entretien, installation et réparation du système de chauffage.",
    services: [
      "Entretien du système de chauffage",
      "Installation du système de chauffage",
      "Réparation du système de chauffage",
    ],
    icon: "heat",
  },
];

const galleryItems = [
  {
    number: "01",
    title: "Serrurerie & sécurisation",
    text: "Ouverture, remplacement de cylindres et remise en sécurité des accès.",
  },
  {
    number: "02",
    title: "Vitrerie & ouvertures",
    text: "Interventions sur vitrages, fenêtres, portes et fermetures.",
  },
  {
    number: "03",
    title: "Plomberie",
    text: "Recherche de fuite, dépannage sanitaire et remise en état.",
  },
  {
    number: "04",
    title: "Chauffage",
    text: "Entretien, installation et réparation des équipements de chauffage.",
  },
];

const serviceAreas = [
  { name: "Sucy-en-Brie", position: "one" },
  { name: "Saint-Maur-des-Fossés", position: "two" },
  { name: "Ormesson-sur-Marne", position: "three" },
  { name: "La Varenne-Saint-Hilaire", position: "four" },
  { name: "Chennevières-sur-Marne", position: "five" },
  { name: "Marolles-en-Brie", position: "six" },
  { name: "Santeny", position: "seven" },
  { name: "Champigny-sur-Marne", position: "eight" },
  { name: "Boissy-Saint-Léger", position: "nine" },
  { name: "La Queue-en-Brie", position: "ten" },
  { name: "Val-de-Marne", position: "eleven" },
];

const reviews = [
  {
    name: "Gohier Monique",
    text: "Très sérieux, très réactif, compétent, respectant les heures de rendez-vous, il intervient rapidement et avec savoir-faire. Qui plus est avec des tarifs très honnêtes ! Je recommande vivement Alan pour tous vos travaux de plomberie.",
    note: "Avis Google — février 2026",
  },
  {
    name: "Sophie Crespo",
    text: "Un grand merci à monsieur Clerjaud pour son professionnalisme, sa disponibilité et sa réactivité. Il m'a été d'un grand secours d'abord pour un problème de chatière puis de ballon d'eau chaude. Je le recommande vivement !",
    note: "Avis Google — avril 2026",
  },
  {
    name: "Gaëlle Beaupere",
    text: "Nous tenons à remercier Mr CLERJAUD pour sa réactivité et son professionnalisme. Intervention super rapide, détection de la fuite en moins de 15 minutes et de très bons conseils ! Nous ne pouvons que le recommander !",
    note: "Avis Google — janvier 2026",
  },
  {
    name: "Aurélien Del.",
    text: "Merci à Monsieur Clerjaud et son technicien. Bravo pour votre réactivité et l'organisation. Contact un vendredi soir pour une fuite sur le groupe de sécurité du chauffe-eau : le technicien est venu le lendemain matin en urgence. Très bon boulot et travail propre.",
    note: "Avis Google — août 2025",
  },
  {
    name: "Fraise",
    text: "Artisan professionnel et prestation de qualité. Alan a su me conseiller sur le meilleur rapport sécurité/prix pour le remplacement de mes cylindres de serrures. Travail rapide et de qualité. Réactif et aimable.",
    note: "Avis Google — juin 2023",
  },
  {
    name: "Marie-Agnes Gicquel",
    text: "Recommandé sur les réseaux sociaux de Sucy, je confirme ! Alan Clerjaud est un artisan sérieux qui intervient et travaille rapidement, le tout avec beaucoup de gentillesse.",
    note: "Avis Google — septembre 2025",
  },
];

function TradeIcon({ type }: { type: string }) {
  if (type === "key") {
    return <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="19" cy="25" r="11"/><path d="M29 31 51 53m-8-8 6-6m-13-1 6-6"/></svg>;
  }
  if (type === "window") {
    return <svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="8" width="44" height="48" rx="3"/><path d="M32 8v48M10 31h44M42 41l6 6"/></svg>;
  }
  if (type === "tap") {
    return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 30h34c6 0 10 4 10 10v5M27 30V17h15M35 17V9m-8 8h16M21 45h29"/><path d="M52 47c0 5-4 9-9 9"/></svg>;
  }
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6c7 9 12 15 12 24a12 12 0 0 1-24 0c0-6 3-11 8-17-1 8 2 12 6 14-1-7 0-14-2-21Z"/><path d="M21 50h22"/></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>;
}

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["Locksmith", "Plumber"],
    name: "Clerjaud Alan",
    telephone: "+33663897219",
    address: {
      "@type": "PostalAddress",
      streetAddress: "16 Avenue Pierre Mendès-France",
      postalCode: "94880",
      addressLocality: "Noiseau",
      addressCountry: "FR",
    },
    openingHours: "Mo-Su 00:00-23:59",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "53" },
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="accueil">
          <div className="hero__grid shell">
            <div className="hero__content">
              <div className="hero__kicker"><span>Noiseau · Val-de-Marne</span><span>Ouvert 24h/24</span></div>
              <h1>
                Un seul artisan.<br />
                <em>Quatre métiers.</em>
              </h1>
              <p className="hero__lead">
                Serrurerie, vitrerie, plomberie et chauffage : Clerjaud Alan intervient pour les urgences, les réparations et les installations à Noiseau et autour.
              </p>
              <div className="hero__actions">
                <a className="button button--gold" href="#devis">Décrire mon besoin <ArrowIcon /></a>
                <a className="button button--light" href="tel:+33663897219">06 63 89 72 19</a>
              </div>
              <div className="hero__proof">
                <div><strong>4,9/5</strong><span>53 avis Google</span></div>
                <div><strong>4,9/5</strong><span>383 avis Infobel</span></div>
                <div><strong>5/5</strong><span>169+ avis Pages Jaunes</span></div>
                <div><strong>24/7</strong><span>Disponibilité affichée</span></div>
              </div>
            </div>

            <div className="hero__visual" aria-label="Clerjaud Alan">
              <div className="hero__brand-card">
                <img className="hero__brand-logo" src="/logo/logo.png" alt="Clerjaud Alan" />
                <div className="hero__brand-mark" aria-hidden="true">
                  <img src="/logo/mark.png" alt="" />
                </div>
                <div className="hero__brand-lines">
                  <span>Serrurerie</span>
                  <span>Vitrerie</span>
                  <span>Plomberie</span>
                  <span>Chauffage</span>
                </div>
              </div>
              <div className="hero__rail"><span>Urgence</span><strong>24h/24</strong><span>7j/7</span></div>
            </div>
          </div>
        </section>

        <section className="trade-overview" id="metiers">
          <div className="shell section-heading">
            <span className="eyebrow">Les métiers</span>
            <h2>Le bon réflexe,<br />quel que soit le problème.</h2>
          </div>

          <div className="shell trades-grid">
            {trades.map((trade) => (
              <article className="trade-card" key={trade.title}>
                <div className="trade-card__top">
                  <span>{trade.number}</span>
                  <TradeIcon type={trade.icon} />
                </div>
                <h3>{trade.title}</h3>
                <p>{trade.intro}</p>
                <ul>{trade.services.map((service) => <li key={service}>{service}</li>)}</ul>
                <a href="#devis">Demander une intervention <ArrowIcon /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section" id="realisations">
          <div className="shell gallery-heading">
            <span className="eyebrow">Interventions</span>
            <h2>Quatre métiers.<br />Un même niveau d’exigence.</h2>
          </div>
          <div className="gallery-track shell" aria-label="Aperçu des interventions">
            {galleryItems.map((item) => (
              <article className="gallery-card" key={item.title}>
                <div className="gallery-card__visual" aria-hidden="true">
                  <span>{item.number}</span>
                </div>
                <div className="gallery-card__copy">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="processus">
          <div className="shell process-copy process-copy--centered">
            <span className="eyebrow">Le déroulement</span>
            <h2>Comment se déroule<br />une intervention&nbsp;?</h2>
            <ol>
              <li><span>01</span><div><strong>Vous expliquez la situation</strong><p>Choisissez le métier, le niveau d’urgence et joignez les photos utiles.</p></div></li>
              <li><span>02</span><div><strong>La demande est précisée</strong><p>L’adresse, le type de lieu et le créneau souhaité sont regroupés dans une seule demande.</p></div></li>
              <li><span>03</span><div><strong>Vous êtes recontacté</strong><p>Vos coordonnées et les informations nécessaires sont transmises pour organiser la suite.</p></div></li>
            </ol>
            <a className="text-link" href="#devis">Commencer la demande <ArrowIcon /></a>
          </div>
        </section>

        <section className="reviews-section" id="avis">
          <div className="shell section-heading section-heading--split">
            <div><span className="eyebrow">Avis clients</span><h2>Ce qui revient<br />dans les témoignages.</h2></div>
            <p>Réactivité, sérieux, disponibilité, travail propre, conseils et tarifs jugés honnêtes.</p>
          </div>
          <div className="reviews-track shell">
            {reviews.map((review, index) => (
              <article className="review-card" key={review.name}>
                <div className="review-card__head"><span>{String(index + 1).padStart(2, "0")}</span><div className="stars">★★★★★</div></div>
                <blockquote>“{review.text}”</blockquote>
                <footer><strong>{review.name}</strong><span>{review.note}</span></footer>
              </article>
            ))}
          </div>
        </section>

        <section className="zone-section" id="zone">
          <div className="shell zone-grid">
            <div className="zone-map" aria-label="Zone d’intervention autour de Noiseau">
              <span className="zone-map__ring zone-map__ring--1" />
              <span className="zone-map__ring zone-map__ring--2" />
              <span className="zone-map__ring zone-map__ring--3" />
              <span className="zone-map__pin">Noiseau</span>
              {serviceAreas.map((area) => (
                <span
                  className={`zone-map__city zone-map__city--${area.position}`}
                  key={area.name}
                >
                  {area.name}
                </span>
              ))}
            </div>
            <div className="zone-copy">
              <span className="eyebrow">Zone d’intervention</span>
              <h2>Basés à Noiseau,<br />nous intervenons autour.</h2>
              <p>
                Nous sommes basés à Noiseau et intervenons à Sucy-en-Brie, Saint-Maur-des-Fossés,
                Ormesson-sur-Marne, La Varenne-Saint-Hilaire, Chennevières-sur-Marne,
                Marolles-en-Brie, Santeny, Champigny-sur-Marne, Boissy-Saint-Léger et La Queue-en-Brie.
              </p>
              <address>16 Av. Pierre Mendès-France<br />94880 Noiseau</address>
              <a className="button button--dark" href="https://www.google.com/maps/search/?api=1&query=16%20Avenue%20Pierre%20Mend%C3%A8s-France%2094880%20Noiseau" target="_blank" rel="noreferrer">Voir l’adresse</a>
            </div>
          </div>
        </section>

        <section className="quote-section" id="devis">
          <div className="shell quote-intro">
            <div><span className="eyebrow">Demande de devis</span><h2>Expliquez le problème<br />avant l’appel.</h2></div>
          </div>
          <div className="shell"><QuoteForm /></div>
        </section>

        <section className="final-cta">
          <div className="shell final-cta__inner">
            <div><span>Besoin d’un contact direct ?</span><h2>06 63 89 72 19</h2></div>
            <a href="tel:+33663897219">Appeler maintenant <ArrowIcon /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </>
  );
}
