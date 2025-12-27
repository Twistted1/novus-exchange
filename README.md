## Development Notes

### Fast Refresh and HMR Logs
- During local development, React Fast Refresh and Webpack HMR may cancel in-flight requests when a component tree re-renders or the dev server rebuilds.
- You can see `net::ERR_ABORTED` for the current route (e.g., `/?ide_webview_request_time=...&_rsc=...`) or for `/_next/static/webpack/*.hot-update.json`. These are transient and expected.
- If the errors persist after a save, restart the dev server. Ensure only one instance is running.

### Production Rewrites
- The project uses a catch-all rewrite in `vercel.json` for app routing.
- Internal Next.js assets are explicitly exempted to avoid interfering with static files and image optimization.

### AI API Keys
- Missing AI credentials do not cause HMR aborts but will put `/api/ask-novus` in demo mode.
- See `.env.local` for the available configuration options.

