/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "",
    DB_LOCAL_URI: "",
    NEXTAUTH_URL: "",
    NEXTAUTH_SECRET: "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
