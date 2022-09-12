# People Domains frontend

Frontend for .ppl domain service powered by the [Punk Domains protocol](https://punk.domains).

## Quickstart

```bash
npm install
npm run dev
```

## .env (important!)

Create a .env file and enter the following in it:

```bash
VITE_ALCHEMY_ARBITRUM_KEY=key-from-alchemy
```

If you don't create the .env file with that variable, the web app will not properly function on your localhost. The variable is also needed in the production environment (name it `ALCHEMY_ARBITRUM_KEY` there).

## tokens.json

Add the correct tokens (for the Send Tokens page).

## Branches & deployment

- **Important:** Never commit directly to the `main` branch.
- Development is done on the `develop` branch (or temporary branches which then merge with the `develop` branch).
- Deployment: When you want to make deployment to the production server, merge `develop` into the `main` branch. A CI/CD system on GitHub (GitHub Actions) will automatically build and deploy the new code to GitHub Pages.