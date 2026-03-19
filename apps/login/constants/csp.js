const allowedOrigins = process.env.SERVER_ACTION_ALLOWED_ORIGINS
  ? process.env.SERVER_ACTION_ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

const imgSrc = ["'self'", ...allowedOrigins].join(" ");

export const DEFAULT_CSP =
  `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src ${imgSrc}; frame-ancestors 'none'; object-src 'none'`;
