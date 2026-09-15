# quarto-blog

Hosted on [Netlify](https://app.netlify.com/sites/ruiz-serra/deploys). Deployed automatically from GitHub.

Simply commit and push to the main branch.

View Analytics on [Google Analytics](https://analytics.google.com/analytics/web/#/p431077283/reports/intelligenthome).

## Deployment instructions

```bash
# Render pages
quarto render
# Commit and push to GitHub
git add --all
git commit -m 'Update site'
git push
# Netlify takes care of the site deployment
```

## Serving documents (PDFs, etc.)

Anything placed in `documents/` is served at `https://jaime.rs/documents/<filename>`.

```bash
cp ~/path/to/some_document.pdf documents/
quarto render   # copies documents/ into _site/documents/
git add --all
git commit -m 'Add some_document.pdf'
git push
```

How it works: `documents/**` is listed under `project.resources` in `_quarto.yml`, so
`quarto render` copies it verbatim into `_site/` without trying to render it. Netlify
publishes `_site/`, which is committed to this repo, so the files must be rendered
locally and committed — pushing `documents/` alone is not enough.

Caveats:

* Files are stored twice in git (`documents/` and `_site/documents/`), so the repo grows
  at 2x the file size.
* GitHub warns above 50MB per file and rejects above 100MB. Host anything larger
  elsewhere (arXiv, Zenodo) and link to it.
* Avoid spaces in filenames — they need percent-encoding in the URL.

## Notes

* DNS is handled by AWS Route53 via the AWS Console (e.g. to add CNAME, TXT records for subdomains)