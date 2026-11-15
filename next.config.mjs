/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  // Static export cannot run the image optimiser. Pre-size photos in public/products.
  images: { unoptimized: true },
};

export default nextConfig;
