module.exports = {
    images: {
        remotePatterns: [
          {
            hostname: "res.cloudinary.com",
          },
        ],
      },
    async headers() {
        return [
            {
              source: '/(.*)\\.(jpg|jpeg|png|gif|webp|svg)',
              headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ];
    },
};
