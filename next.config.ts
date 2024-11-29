module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|ico|avif|heif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
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
};
