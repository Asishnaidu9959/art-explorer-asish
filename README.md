# Art Explorer — ITE5425

Next.js App Router project using The Metropolitan Museum of Art public collection API.

## Features
- Home, browse, advanced search, about, and dynamic artwork detail pages
- React Hook Form validation and title-only search
- Image-first results with **Load More Artworks** (six new cards per batch)
- Loading, error, empty-result and unavailable-image handling
- Responsive CSS layout

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Production check
```bash
npm run build
npm run start
```

## API and images
Uses https://metmuseum.github.io/ . Search requests `hasImages=true`, then checks individual artwork records for real image URLs. The museum may still omit or block images; missing images cannot be manufactured. To protect API performance, detail requests are made three at a time, and Load More examines at most 30 candidate records per click. The search caps candidates at 360 records.

## Deployment
Push this folder (without node_modules or .next) to GitHub and import the repository into Vercel. Record your actual GitHub and Vercel URLs in your assignment submission.
