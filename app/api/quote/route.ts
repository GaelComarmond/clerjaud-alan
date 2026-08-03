import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_TOTAL_SIZE = 20 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function field(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(date);
}

function row(label: string, value: string) {
  return `<tr>
    <td style="width:180px;padding:13px 16px;border-bottom:1px solid #dfe6ef;color:#54657b;font-size:13px;font-weight:700;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:13px 16px;border-bottom:1px solid #dfe6ef;color:#071832;font-size:14px;line-height:1.55;vertical-align:top">${escapeHtml(value || "Non renseigné")}</td>
  </tr>`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.QUOTE_FROM_EMAIL;
    const businessEmail = process.env.QUOTE_TO_EMAIL;

    if (!apiKey || !fromEmail || !businessEmail) {
      console.error("Missing Resend environment variables.");
      return NextResponse.json(
        { ok: false, message: "Le système d’envoi n’est pas encore configuré. Veuillez appeler directement." },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    if (field(formData, "companyWebsite")) {
      return NextResponse.json({ ok: true, confirmationSent: true });
    }

    const services = formData
      .getAll("services")
      .filter((value): value is string => typeof value === "string")
      .map((value) => value.trim())
      .filter(Boolean);

    const urgency = field(formData, "urgency");
    const propertyType = field(formData, "propertyType");
    const details = field(formData, "details");
    const address = field(formData, "address");
    const postcode = field(formData, "postcode");
    const preferredDate = field(formData, "preferredDate");
    const preferredTime = field(formData, "preferredTime");
    const firstName = field(formData, "firstName");
    const lastName = field(formData, "lastName");
    const email = field(formData, "email").toLowerCase();
    const phone = field(formData, "phone");

    if (
      services.length === 0 || !urgency || !propertyType || !address || !postcode ||
      !preferredDate || !preferredTime || !firstName || !lastName || !email || !phone
    ) {
      return NextResponse.json(
        { ok: false, message: "Certaines informations obligatoires sont manquantes dans la demande." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: "L’adresse e-mail indiquée n’est pas valide." }, { status: 400 });
    }

    const photoEntries = formData
      .getAll("photos")
      .filter((value): value is File => value instanceof File && value.size > 0);

    if (photoEntries.length > MAX_PHOTOS) {
      return NextResponse.json({ ok: false, message: `Vous pouvez joindre au maximum ${MAX_PHOTOS} photographies.` }, { status: 400 });
    }

    let totalPhotoSize = 0;
    for (const photo of photoEntries) {
      if (!ALLOWED_FILE_TYPES.has(photo.type)) {
        return NextResponse.json({ ok: false, message: "Une photographie utilise un format non autorisé. Utilisez JPG, PNG ou WebP." }, { status: 400 });
      }
      if (photo.size > MAX_FILE_SIZE) {
        return NextResponse.json({ ok: false, message: `${photo.name} dépasse la limite de 4 Mo.` }, { status: 400 });
      }
      totalPhotoSize += photo.size;
    }
    if (totalPhotoSize > MAX_TOTAL_SIZE) {
      return NextResponse.json({ ok: false, message: "La taille totale des photographies est trop importante." }, { status: 400 });
    }

    const attachments = await Promise.all(
      photoEntries.map(async (photo, index) => {
        const extension = photo.type === "image/png" ? "png" : photo.type === "image/webp" ? "webp" : "jpg";
        const safeName = photo.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60);
        return {
          content: Buffer.from(await photo.arrayBuffer()),
          filename: `${index + 1}-${safeName || "photo"}.${extension}`,
        };
      }),
    );

    const fullName = `${firstName} ${lastName}`.trim();
    const servicesText = services.join(", ");
    const formattedDate = formatDate(preferredDate);

    const businessHtml = `<!doctype html><html lang="fr"><body style="margin:0;background:#edf1f6;font-family:Arial,Helvetica,sans-serif">
      <div style="padding:30px 12px"><div style="max-width:720px;margin:0 auto;overflow:hidden;border-radius:20px;background:#fff;box-shadow:0 18px 50px rgba(7,24,50,.12)">
        <div style="padding:30px;background:#071832;color:#fff;border-bottom:6px solid #f0b82f">
          <div style="color:#f0b82f;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase">Nouvelle demande de devis</div>
          <h1 style="margin:12px 0 0;font-size:30px;line-height:1.15">${escapeHtml(services[0])}</h1>
          <p style="margin:12px 0 0;color:#cbd6e6;font-size:15px;line-height:1.6">Demande envoyée par ${escapeHtml(fullName)} depuis le site Clerjaud Alan.</p>
        </div>
        <div style="padding:28px">
          <div style="margin-bottom:24px;padding:18px;border-left:5px solid #f0b82f;background:#fff8e8"><strong style="display:block;color:#071832;font-size:15px">Délai souhaité</strong><span style="display:block;margin-top:6px;color:#54657b;font-size:14px">${escapeHtml(urgency)}</span></div>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="overflow:hidden;border:1px solid #dfe6ef;border-radius:12px;border-collapse:separate;border-spacing:0">
            ${row("Client", fullName)}${row("Téléphone", phone)}${row("Adresse e-mail", email)}${row("Services", servicesText)}${row("Type de lieu", propertyType)}${row("Adresse", `${address}, ${postcode}`)}${row("Date souhaitée", formattedDate)}${row("Créneau", preferredTime)}${row("Photos jointes", String(photoEntries.length))}
          </table>
          <div style="margin-top:24px;padding:20px;border-radius:12px;background:#f2f5f9"><strong style="display:block;margin-bottom:10px;color:#071832;font-size:14px">Description complémentaire</strong><p style="margin:0;color:#54657b;font-size:14px;line-height:1.7;white-space:pre-line">${escapeHtml(details || "Aucune précision complémentaire.")}</p></div>
          <div style="margin-top:26px;text-align:center"><a href="tel:${escapeHtml(phone)}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#f0b82f;color:#071832;font-size:14px;font-weight:800;text-decoration:none">Appeler ${escapeHtml(firstName)}</a></div>
        </div>
      </div></div>
    </body></html>`;

    const resend = new Resend(apiKey);
    const businessResult = await resend.emails.send({
      from: fromEmail,
      to: businessEmail,
      replyTo: email,
      subject: `[Devis ${urgency}] ${services[0]} — ${fullName}`,
      html: businessHtml,
      attachments: attachments.length ? attachments : undefined,
      tags: [{ name: "source", value: "clerjaud_website_quote" }],
    });

    if (businessResult.error) {
      console.error("Resend business email error:", businessResult.error);
      return NextResponse.json({ ok: false, message: "La demande n’a pas pu être transmise. Veuillez appeler directement." }, { status: 500 });
    }

    const customerHtml = `<!doctype html><html lang="fr"><body style="margin:0;background:#edf1f6;font-family:Arial,Helvetica,sans-serif">
      <div style="padding:30px 12px"><div style="max-width:640px;margin:0 auto;overflow:hidden;border-radius:20px;background:#fff">
        <div style="padding:28px;background:#071832;color:#fff;border-bottom:6px solid #f0b82f"><div style="color:#f0b82f;font-size:12px;font-weight:800;letter-spacing:.15em;text-transform:uppercase">Clerjaud Alan</div><h1 style="margin:12px 0 0;font-size:28px;line-height:1.2">Votre demande a bien été reçue.</h1></div>
        <div style="padding:28px"><p style="margin:0;color:#465970;font-size:15px;line-height:1.75">Bonjour ${escapeHtml(firstName)},</p>
          <p style="margin:18px 0 0;color:#465970;font-size:15px;line-height:1.75">Nous avons bien reçu votre demande concernant : <strong>${escapeHtml(servicesText)}</strong>. Les informations et photographies transmises permettront d’examiner votre besoin avant de vous recontacter.</p>
          <div style="margin-top:24px;padding:20px;border-left:5px solid #f0b82f;background:#fff8e8"><strong style="display:block;color:#071832;font-size:14px">Rendez-vous souhaité</strong><span style="display:block;margin-top:7px;color:#54657b;font-size:14px;line-height:1.6">${escapeHtml(formattedDate)} — ${escapeHtml(preferredTime)}</span></div>
          <p style="margin:24px 0 0;color:#465970;font-size:15px;line-height:1.75">Pour un contact direct, vous pouvez appeler le <strong>06 63 89 72 19</strong>.</p>
          <p style="margin:28px 0 0;color:#7b8796;font-size:13px;line-height:1.6">Clerjaud Alan — Serrurerie, vitrerie, plomberie et chauffage<br>16 Avenue Pierre Mendès-France, 94880 Noiseau</p>
        </div>
      </div></div>
    </body></html>`;

    const customerResult = await resend.emails.send({
      from: fromEmail,
      to: email,
      replyTo: businessEmail,
      subject: "Clerjaud Alan — confirmation de votre demande",
      html: customerHtml,
      tags: [{ name: "source", value: "clerjaud_quote_confirmation" }],
    });

    if (customerResult.error) {
      console.error("Resend customer email error:", customerResult.error);
      return NextResponse.json({ ok: true, confirmationSent: false });
    }

    return NextResponse.json({ ok: true, confirmationSent: true });
  } catch (error) {
    console.error("Quote route unexpected error:", error);
    return NextResponse.json({ ok: false, message: "Une erreur inattendue est survenue. Veuillez appeler directement." }, { status: 500 });
  }
}
