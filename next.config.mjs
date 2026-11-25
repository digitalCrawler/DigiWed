/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // the dev server is reached from the LAN and through tunnels while testing on a phone
  allowedDevOrigins: [
    "192.168.1.60",
    "*.trycloudflare.com",
    "*.loca.lt",
    "*.ngrok-free.app",
  ],
};
export default nextConfig;
