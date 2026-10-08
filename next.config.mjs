// If deploying to a project page: https://<user>.github.io/<repo>
// set basePath to '/<repo-name>' for production.
const basePath = ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // writes to /out on build
  images: { unoptimized: true },
  basePath, // <-- set if using project pages
  assetPrefix: basePath, // keeps asset URLs working
  trailingSlash: true, // avoids 404s on GH Pages
}

export default nextConfig
