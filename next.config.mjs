/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["storage.googleapis.com"], // 허용할 이미지 호스트 추가
  },
};

export default nextConfig;
