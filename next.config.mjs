const basePath = "/BPOS";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath,
  // Expose the base path to the client for plain <img> asset prefixing.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Send the domain root to the app entry (e.g. brain-powered-os.vercel.app → /BPOS).
  async redirects() {
    return [{ source: "/", destination: basePath, basePath: false, permanent: false }];
  },
};

export default nextConfig;
