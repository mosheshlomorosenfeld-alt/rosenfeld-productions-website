# Rosenfeld Productions Website

Official static website for Moshe Rosenfeld / Rosenfeld Productions.

## Sections
- Artist landing page
- Music streaming links
- Music production services
- Recording & vocal services
- Artist development / creative direction
- Bio
- Bandsintown live-show link
- Instagram + TikTok
- Social/follower statistics
- Booking/contact CTA

## Publishing
The repository includes a GitHub Pages Actions workflow at `.github/workflows/pages.yml` that deploys the `main` branch.

After GitHub Pages is enabled for the repository, pushes to `main` automatically publish the site.

## Personalization
The hero/profile image currently uses the connected GitHub profile image as a reliable live fallback. Replace the two image URLs in `index.html` with a dedicated artist photo whenever you want the site to use the professional portrait instead.

Streaming links intentionally open searches for `MosheRosenfeld` so they don't accidentally send visitors to the wrong artist profile until exact verified artist URLs are available.
