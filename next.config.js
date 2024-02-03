/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [ // Enclose the domain in an array
      {
        protocol: 'https', // Specify the protocol
        hostname: 'utfs.io', // Use 'allowedHosts' instead of 'domains'
      },
    ],
  },
};

module.exports = nextConfig;
