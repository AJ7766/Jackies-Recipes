module.exports = {
  async headers() {
    return [
      {
        source: '/:path*\\.(jpg|jpeg|png|webp|svg|gif|bmp|tiff|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
};
