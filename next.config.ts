module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)\\.(jpg|jpeg|png|webp|svg)',
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
