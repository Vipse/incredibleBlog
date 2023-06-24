const nextTranslate = require("next-translate-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts/1",
        permanent: true,
      },
      {
        source: "/posts",
        destination: "/posts/1",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};

const plugins = [nextTranslate];

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);
