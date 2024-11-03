/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // webpack: (config) => {
  //   // Object.assign()을 사용하여 새 객체를 만듭니다.
  //   const newConfig = {
  //     ...config,
  //     resolve: {
  //       ...config.resolve,
  //       alias: { ...config.resolve.alias, canvas: false },
  //     },
  //   };

  //   return newConfig;
  // },
};

export default nextConfig;
