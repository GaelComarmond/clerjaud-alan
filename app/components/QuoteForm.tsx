"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type QuoteData = {
  services: string[];
  urgency: string;
  propertyType: string;
  details: string;
  address: string;
  postcode: string;
  preferredDate: string;
  preferredTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
  companyWebsite: string;
};

const serviceGroups = [
  {
    label: "Serrurerie",
    items: [
      "Changement de combinaison ou de cylindres",
      "Ouverture de porte / bâtiment",
      "Serrures de fenêtres",
      "Installation de serrurerie",
      "Installation de serrures et quincaillerie de porte",
      "Coffre-fort : installation, ouverture ou réparation",
      "Réparation générale de serrurerie",
      "Serrures de portes de sécurité",
    ],
  },
  {
    label: "Vitrerie & ouvertures",
    items: [
      "Mise en sécurité de fenêtre",
      "Installation de fenêtre",
      "Pose de vitrage",
      "Installation de porte",
      "Réparation de fenêtre",
      "Réparation de porte",
    ],
  },
  {
    label: "Plomberie",
    items: [
      "Recherche de fuite",
      "Installation de WC",
      "Débouchage de canalisation",
      "Installation de chauffe-eau",
      "Installation de robinet",
      "Réparation de chauffe-eau",
      "Réparation de douche",
      "Réparation de plomberie extérieure",
      "Réparation de robinet",
      "Réparation de WC",
      "Réparation de tuyauterie",
    ],
  },
  {
    label: "Chauffage",
    items: [
      "Entretien du système de chauffage",
      "Installation du système de chauffage",
      "Réparation du système de chauffage",
    ],
  },
];

const allServices = serviceGroups.flatMap((group) => group.items);
const MAX_PHOTOS = 5;
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_TOTAL_SIZE = 20 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const initialData: QuoteData = {
  services: [], urgency: "", propertyType: "", details: "", address: "", postcode: "",
  preferredDate: "", preferredTime: "", firstName: "", lastName: "", email: "", phone: "",
  consent: false, companyWebsite: "",
};

function CheckIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7" /></svg>;
}

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>(initialData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const totalSize = useMemo(() => photos.reduce((sum, file) => sum + file.size, 0), [photos]);
  const steps = ["Intervention", "Contexte", "Rendez-vous", "Coordonnées"];

  function update<K extends keyof QuoteData>(key: K, value: QuoteData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function toggleService(service: string) {
    setData((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
    setError("");
  }

  function validateCurrentStep() {
    if (step === 0) {
      if (!data.services.length) return "Sélectionnez au moins une intervention.";
      if (!data.urgency) return "Indiquez le niveau d’urgence.";
    }
    if (step === 1 && !data.propertyType) return "Indiquez le type de lieu concerné.";
    if (step === 2) {
      if (!data.address.trim()) return "Indiquez l’adresse de l’intervention.";
      if (!data.postcode.trim()) return "Indiquez le code postal.";
      if (!data.preferredDate) return "Choisissez une date souhaitée.";
      if (!data.preferredTime) return "Choisissez un créneau souhaité.";
    }
    return "";
  }

  function next() {
    const message = validateCurrentStep();
    if (message) return setError(message);
    setStep((current) => Math.min(current + 1, steps.length - 1));
    setError("");
  }

  function previous() {
    setStep((current) => Math.max(current - 1, 0));
    setError("");
  }

  function handlePhotos(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files || []);
    const nextPhotos = [...photos];

    for (const file of selected) {
      if (nextPhotos.length >= MAX_PHOTOS) {
        setError(`Vous pouvez joindre au maximum ${MAX_PHOTOS} photos.`);
        break;
      }
      if (!allowedTypes.has(file.type)) {
        setError(`${file.name} n'est pas au format JPG, PNG ou WebP.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} dépasse la limite de 4 Mo.`);
        continue;
      }
      if (nextPhotos.reduce((sum, item) => sum + item.size, 0) + file.size > MAX_TOTAL_SIZE) {
        setError("La taille totale des photos dépasse 20 Mo.");
        break;
      }
      nextPhotos.push(file);
    }

    setPhotos(nextPhotos);
    event.target.value = "";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!data.firstName.trim() || !data.lastName.trim() || !data.email.trim() || !data.phone.trim()) {
      return setError("Renseignez votre nom, votre e-mail et votre téléphone.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return setError("L’adresse e-mail indiquée n’est pas valide.");
    }
    if (!data.consent) {
      return setError("Vous devez accepter la transmission de ces informations.");
    }

    setSubmitting(true);
    setError("");
    const form = new FormData();
    data.services.forEach((service) => form.append("services", service));
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "services" && key !== "consent") form.append(key, String(value));
    });
    photos.forEach((photo) => form.append("photos", photo));

    try {
      const response = await fetch("/api/quote", { method: "POST", body: form });
      const result = (await response.json()) as { ok?: boolean; message?: string; confirmationSent?: boolean };
      if (!response.ok || !result.ok) throw new Error(result.message || "La demande n’a pas pu être envoyée.");
      setConfirmationSent(Boolean(result.confirmationSent));
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "La demande n’a pas pu être envoyée.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="quote-success" role="status">
        <span className="quote-success__icon"><CheckIcon /></span>
        <span className="eyebrow">Demande transmise</span>
        <h3>Merci, votre demande est partie.</h3>
        <p>
          Les informations et les photos ont été envoyées à Clerjaud Alan.
          {confirmationSent ? " Un e-mail récapitulatif vous a également été adressé." : " La confirmation par e-mail n’a pas pu être envoyée, mais la demande a bien été reçue."}
        </p>
        <a className="button button--dark" href="tel:+33663897219">Appeler le 06 63 89 72 19</a>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={submit} noValidate>
      <div className="quote-form__progress" aria-label={`Étape ${step + 1} sur ${steps.length}`}>
        {steps.map((label, index) => (
          <button key={label} type="button" className={index === step ? "active" : index < step ? "done" : ""} onClick={() => index <= step && setStep(index)}>
            <span>{index < step ? <CheckIcon /> : String(index + 1).padStart(2, "0")}</span>
            <small>{label}</small>
          </button>
        ))}
      </div>

      <div className="quote-form__panel">
        <div className="quote-form__heading">
          <span className="eyebrow">Étape {step + 1} / {steps.length}</span>
          <h3>{step === 0 ? "De quoi avez-vous besoin ?" : step === 1 ? "Précisez la situation" : step === 2 ? "Où et quand intervenir ?" : "Comment vous recontacter ?"}</h3>
        </div>

        {step === 0 && (
          <div className="quote-step">
            <div className="service-picker">
              {serviceGroups.map((group) => (
                <fieldset key={group.label}>
                  <legend>{group.label}</legend>
                  <div className="service-picker__items">
                    {group.items.map((service) => (
                      <button key={service} type="button" className={data.services.includes(service) ? "selected" : ""} onClick={() => toggleService(service)}>
                        <span>{data.services.includes(service) ? <CheckIcon /> : "+"}</span>{service}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
            <div className="field-block">
              <label>Niveau d’urgence *</label>
              <div className="choice-row">
                {["Urgence immédiate", "Sous 24–48 h", "Cette semaine", "Projet à planifier"].map((item) => (
                  <button type="button" key={item} className={data.urgency === item ? "selected" : ""} onClick={() => update("urgency", item)}>{item}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="quote-step">
            <div className="field-block">
              <label>Type de lieu *</label>
              <div className="choice-grid">
                {["Appartement", "Maison", "Commerce", "Immeuble / copropriété", "Bureau", "Autre"].map((item) => (
                  <button type="button" key={item} className={data.propertyType === item ? "selected" : ""} onClick={() => update("propertyType", item)}>{data.propertyType === item && <CheckIcon />}{item}</button>
                ))}
              </div>
            </div>
            <label className="text-field text-field--large">
              <span>Décrivez le problème ou le projet</span>
              <textarea value={data.details} onChange={(e) => update("details", e.target.value)} placeholder="Ex. porte claquée, chauffe-eau qui fuit, vitre cassée, chauffage en panne…" rows={7} />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="quote-step">
            <div className="two-columns">
              <label className="text-field"><span>Adresse *</span><input value={data.address} onChange={(e) => update("address", e.target.value)} autoComplete="street-address" placeholder="Numéro et rue" /></label>
              <label className="text-field"><span>Code postal *</span><input value={data.postcode} onChange={(e) => update("postcode", e.target.value)} inputMode="numeric" autoComplete="postal-code" placeholder="94880" /></label>
            </div>
            <label className="text-field"><span>Date souhaitée *</span><input type="date" value={data.preferredDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => update("preferredDate", e.target.value)} /></label>
            <div className="field-block">
              <label>Créneau souhaité *</label>
              <div className="choice-row">
                {["Dès que possible", "Matin", "Après-midi", "Soirée"].map((item) => (
                  <button type="button" key={item} className={data.preferredTime === item ? "selected" : ""} onClick={() => update("preferredTime", item)}>{item}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="quote-step">
            <div className="two-columns">
              <label className="text-field"><span>Prénom *</span><input value={data.firstName} onChange={(e) => update("firstName", e.target.value)} autoComplete="given-name" /></label>
              <label className="text-field"><span>Nom *</span><input value={data.lastName} onChange={(e) => update("lastName", e.target.value)} autoComplete="family-name" /></label>
              <label className="text-field"><span>E-mail *</span><input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" /></label>
              <label className="text-field"><span>Téléphone *</span><input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" /></label>
            </div>
            <div className="upload-field">
              <div>
                <strong>Photos utiles</strong>
                <span>Jusqu’à 5 images JPG, PNG ou WebP — 4 Mo chacune.</span>
              </div>
              <label className="upload-button">
                Ajouter des photos
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handlePhotos} disabled={photos.length >= MAX_PHOTOS} />
              </label>
              {photos.length > 0 && (
                <ul>{photos.map((photo, index) => <li key={`${photo.name}-${index}`}><span>{photo.name}</span><button type="button" onClick={() => setPhotos((current) => current.filter((_, i) => i !== index))}>Retirer</button></li>)}</ul>
              )}
              <small>{photos.length}/{MAX_PHOTOS} photo(s) — {(totalSize / 1024 / 1024).toFixed(1)} Mo</small>
            </div>
            <label className="consent-field">
              <input type="checkbox" checked={data.consent} onChange={(e) => update("consent", e.target.checked)} />
              <span>J’accepte que ces informations soient utilisées uniquement pour traiter ma demande de devis.</span>
            </label>
            <label className="honeypot" aria-hidden="true">Site de l’entreprise<input tabIndex={-1} autoComplete="off" value={data.companyWebsite} onChange={(e) => update("companyWebsite", e.target.value)} /></label>
          </div>
        )}

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="quote-form__actions">
          {step > 0 ? <button className="button button--ghost" type="button" onClick={previous}>Retour</button> : <span />}
          {step < steps.length - 1 ? <button className="button button--gold" type="button" onClick={next}>Continuer</button> : <button className="button button--gold" type="submit" disabled={submitting}>{submitting ? "Envoi en cours…" : "Envoyer la demande"}</button>}
        </div>
      </div>
      <input type="hidden" value={allServices.join(",")} readOnly aria-hidden="true" />
    </form>
  );
}
