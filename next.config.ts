module.exports = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 30,
    },
  },
  async headers() {
    return [
      {
        source: '/:path*\\.(jpg|jpeg|png|webp|svg|gif|bmp|tiff|ico)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  
}
