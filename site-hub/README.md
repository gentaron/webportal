# SITE COMMAND

A standalone landing page and portfolio directory added to the existing `webportal` repository without changing the original app.

## What it does

- Browse and filter 22 deployed-site URLs sourced from the repositories' GitHub homepage metadata (snapshot: 2026-11-12).
- Open each website or its repository.
- Ask a local Ollama model for portfolio management and consolidation suggestions, with no paid AI API needed.
- Runs as a static HTML file with no npm dependencies.

**Important:** GitHub homepage URLs are not uptime checks. This dashboard is not a repository write agent; it cannot change GitHub repositories or deploy sites automatically.

## Run locally

Open `site-hub/index.html` in a browser. For Ollama calls, serving the directory with a local HTTP server is preferable:

```bash
cd site-hub
python -m http.server 8080
```

Open http://localhost:8080.

## Optional local AI

Install [Ollama](https://ollama.com/), then run:

```bash
ollama pull qwen3:1.7b
ollama serve
```

Ollama may already be running after installation. Set `OLLAMA_ORIGINS` so the origin of this page is allowed (for example `http://localhost:8080`), restart Ollama, and use the UI. Only `localhost` or `127.0.0.1` targets are accepted in the page to avoid sending the portfolio to an untrusted third-party endpoint.

## Deploy for free

Deploy the `site-hub` folder as a static site (Netlify publish directory: `site-hub`, no build command; or GitHub Pages from a dedicated branch/folder). Static hosting may be free within provider limits. Local Ollama AI requires Ollama on the user's machine and browser-to-localhost access; it is not an always-on hosted AI service.

## Updating the catalog

Edit the `sites` array in `site-hub/index.html`: `[label, repo, homepage URL, category]`. Never insert GitHub tokens or API keys into static source.
