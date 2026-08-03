# Installation — Clerjaud Alan

Ce dossier contient le projet complet. La méthode la plus simple consiste à utiliser directement ce dossier après extraction du ZIP.

## 1. Installation locale

```bash
unzip clerjaud-alan-complete.zip
cd clerjaud-alan-demo
npm install
cp .env.local.example .env.local
```

Ouvrez ensuite `.env.local` et renseignez les variables décrites ci-dessous.

```bash
npm run dev
```

Ouvrez ensuite `http://localhost:3000`.

## 2. Variables d’environnement

```env
RESEND_API_KEY="re_your_real_resend_api_key"
QUOTE_FROM_EMAIL="Clerjaud Alan <devis@your-verified-domain.fr>"
QUOTE_TO_EMAIL="the-business-inbox@example.com"
NEXT_PUBLIC_SITE_URL="https://your-final-domain.fr"
```

- `RESEND_API_KEY` : clé privée Resend. Ne la publiez jamais dans GitHub.
- `QUOTE_FROM_EMAIL` : adresse expéditrice dont le domaine a été vérifié dans Resend.
- `QUOTE_TO_EMAIL` : boîte professionnelle qui reçoit les demandes et les photographies.
- `NEXT_PUBLIC_SITE_URL` : URL finale du site sans barre oblique à la fin.

## 3. Tester le système de devis

1. Lancez le site avec `npm run dev`.
2. Ouvrez la section **Demande de devis**.
3. Sélectionnez un ou plusieurs services.
4. Vérifiez que chaque étape bloque les champs obligatoires manquants.
5. Ajoutez une photographie JPG, PNG ou WebP de moins de 4 Mo.
6. Envoyez une demande avec une adresse e-mail à laquelle vous avez accès.
7. Vérifiez l’arrivée de la notification dans `QUOTE_TO_EMAIL`.
8. Vérifiez que les photographies arrivent en pièces jointes.
9. Vérifiez l’arrivée de la confirmation dans la boîte du client.
10. Contrôlez les dossiers spam et promotions si nécessaire.

Le formulaire accepte au maximum 5 photographies, 4 Mo par fichier et 20 Mo au total.

## 4. Vérifications avant déploiement

```bash
npm run typecheck
npm run lint
npm run build
```

Ne déployez pas si l’une de ces commandes signale une erreur liée au projet.

## 5. Créer un nouveau dépôt GitHub

Créez d’abord un dépôt vide nommé par exemple `clerjaud-alan-demo`, sans README automatique.

Dans le terminal :

```bash
cd clerjaud-alan-demo
rm -rf .git
git init
git add .
git commit -m "Initial Clerjaud Alan website"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/clerjaud-alan-demo.git
git push -u origin main
```

Remplacez `VOTRE-COMPTE` par votre identifiant GitHub.

## 6. Déployer sur Vercel

1. Connectez-vous à Vercel.
2. Cliquez sur **Add New > Project**.
3. Importez le dépôt `clerjaud-alan-demo`.
4. Laissez le framework détecté sur **Next.js**.
5. Ajoutez dans **Environment Variables** :
   - `RESEND_API_KEY`
   - `QUOTE_FROM_EMAIL`
   - `QUOTE_TO_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
6. Déployez.
7. Une fois l’URL obtenue, corrigez `NEXT_PUBLIC_SITE_URL` si nécessaire puis redéployez.
8. Testez à nouveau le formulaire complet sur le site public.

## 7. Vérifier le workflow en production

Après le déploiement :

- envoyez une demande réelle de test ;
- vérifiez la notification entreprise ;
- vérifiez la confirmation client ;
- vérifiez les pièces jointes ;
- testez les liens d’appel sur mobile ;
- contrôlez le rendu du logo et des photographies ;
- ouvrez `/robots.txt` et `/sitemap.xml` ;
- vérifiez que l’URL canonique correspond au domaine final.

## 8. Méthode alternative : repartir manuellement du projet Eric

Cette méthode est plus longue et n’est pas recommandée puisque le ZIP fourni contient déjà le projet complet.

1. Dupliquez le dossier du projet Eric.
2. Supprimez `.git`, `.next` et `node_modules` dans la copie.
3. Remplacez les dossiers `app` et `public` par ceux du projet Clerjaud Alan.
4. Remplacez `package.json`, `.env.local.example` et les fichiers de configuration.
5. Exécutez `npm install`.
6. Vérifiez qu’aucune référence à l’ancienne entreprise ne reste dans le code.
7. Lancez les commandes de typecheck, lint et build.

L’extraction et l’utilisation directe du projet complet restent la méthode la plus simple et la moins risquée.

## 9. Informations à confirmer avant mise en ligne définitive

- adresse e-mail professionnelle recevant les demandes ;
- domaine d’envoi vérifié dans Resend ;
- domaine final du site ;
- lien officiel vers le profil Google ;
- lien officiel vers la page Pages Jaunes ;
- périmètre exact d’intervention au-delà de Noiseau et Sucy-en-Brie.
