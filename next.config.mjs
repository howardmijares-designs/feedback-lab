/** @type {import('next').NextConfig} */
// GitHub Pages serves the site under /<repo-name>/ — basePath is set by the
// deploy workflow via NEXT_PUBLIC_BASE_PATH. Local dev runs without it.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
