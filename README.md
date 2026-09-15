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
* **Anyone with the URL can read them.** See below.

### Keeping documents out of search engines

`netlify.toml` sets `X-Robots-Tag: noindex, nofollow, noarchive` on `/documents/*`.
Google, Bing et al. honour this for PDFs, which is what matters here — a PDF has no
`<head>`, so a `noindex` meta tag is not an option.

Deliberately *not* done: a `Disallow: /documents/` line in `robots.txt`. Two reasons:

1. `robots.txt` blocks *crawling*, not *indexing*. A disallowed URL that is linked from
   anywhere else can still show up in results as a bare URL — and because the crawler is
   forbidden from fetching it, it never sees the `noindex` header. The two mechanisms
   work against each other; the header alone is stronger.
2. `robots.txt` is public. Listing a path there advertises that the path exists.

Quarto's `sitemap.xml` only contains rendered pages, so documents are never listed there.

Verify after a deploy:

```bash
curl -sI https://jaime.rs/documents/some_document.pdf | grep -i x-robots-tag
```

Note that noindex is a request that well-behaved crawlers honour. It is not access
control, and it does nothing about scrapers or anyone who has the link.

### Password protection

Netlify supports Basic Auth scoped to a path, via `netlify.toml`:

```toml
[[headers]]
  for = "/documents/*"
  [headers.values]
    Basic-Auth = "username:password"
```

Two caveats before relying on this:

* As of the current docs this is a **Pro plan** feature (~$19/user/month). Accounts
  created before 2025-09-04 were grandfathered into having it for free, and this site
  predates that — so it may well work as-is. Test on a deploy preview before assuming.
* The credentials sit in plaintext in this repo, which is public. At minimum this means
  a throwaway password, never a reused one.

For anything genuinely confidential, do not put it on a public static host. Use a
service with real access control (Drive, Dropbox, S3 pre-signed URLs).

## Notes

* DNS is handled by AWS Route53 via the AWS Console (e.g. to add CNAME, TXT records for subdomains)