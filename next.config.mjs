/** @type {import('next').NextConfig} */
const repo = 'rosenfeld-productions-website';
const isProd = process.env.NODE_ENV === 'production';
export default {
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  trailingSlash: true,
  images: { unoptimized: true },
};
