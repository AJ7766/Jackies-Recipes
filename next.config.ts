const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  output: 'standalone',
  async headers() {
    return [
      { // Setting security headers
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          {
            key: "Content-Security-Policy",
            value:
              process.env.NODE_ENV === "development"
                ? [
                  "default-src 'self';",
                  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted-cdn.com https://www.googletagmanager.com https://va.vercel-scripts.com;",
                  "connect-src 'self' https://region1.google-analytics.com https://res.cloudinary.com;",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
                  "font-src 'self' https://fonts.gstatic.com;",
                  "img-src 'self' https: data:;",
                  "frame-ancestors 'self';",
                  "form-action 'self';",
                ].join(" ")
                : [
                  "default-src 'self';",
                  "script-src 'self' 'unsafe-inline' https://trusted-cdn.com https://www.googletagmanager.com https://vercel.live https://va.vercel-scripts.com;",
                  "connect-src 'self' https://region1.google-analytics.com https://res.cloudinary.com;",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
                  "font-src 'self' https://fonts.gstatic.com;",
                  "img-src 'self' https: data:;",
                  "frame-ancestors 'self';",
                  "form-action 'self';",
                ].join(" "),
          },
        ],
      },
      { // Setting cache headers for images
        source: "/:path*\\.(jpg|jpeg|png|webp|svg|gif|bmp|tiff|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-robots-tag',
            value: 'index, follow'
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
});
