import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

const withPWA = withPWAInit({
  aggressiveFrontEndNavCaching: true,
  cacheOnFrontEndNav: true,
  dest: "public",
  register: true,
  reloadOnOnline: true,
  scope: "/",
  disable: process.env.NODE_ENV === "development",
  swcMinify: true,
  fallbacks: {
    document: "/_offline",
  },
  skipWaiting: true,
});

export default withPWA(nextConfig);
