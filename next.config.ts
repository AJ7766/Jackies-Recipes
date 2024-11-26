module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
    async headers() {
      return [
        {
          source: '/images/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
  };
  