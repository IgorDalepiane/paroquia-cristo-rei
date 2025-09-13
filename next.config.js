/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configurações específicas para Cloudflare Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
}

module.exports = nextConfig
