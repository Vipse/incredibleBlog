const config = {
  loadLocaleFrom: (lang, ns) =>
    import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default),
  locales: ["en", "es"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
  },
};

module.exports = config;
