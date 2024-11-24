/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      unoptimized: true,
    },
   async headers() {
      return [
        {
          source: '/:all*(svg|jpg|png|webp)',
          locale: false,
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, must-revalidate',
            }
          ],
        },
      ]
    },
};

export default nextConfig;
