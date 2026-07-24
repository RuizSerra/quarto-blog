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

## Notes

* DNS is handled by AWS Route53 via the AWS Console (e.g. to add CNAME, TXT records for subdomains)