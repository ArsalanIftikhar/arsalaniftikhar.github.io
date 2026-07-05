module.exports = function (eleventyConfig) {
  // Temporary Phase 1 passthrough build: current root files remain the public source.
  // Later migration phases will replace these copies incrementally with src templates.
  [
    "index.html",
    "projects.html",
    "approach.html",
    "experience.html",
    "404.html",
    "robots.txt",
    "sitemap.xml",
  ].forEach((publicFile) => {
    eleventyConfig.addPassthroughCopy(publicFile);
  });

  ["assets", "projects", "insights"].forEach((publicDirectory) => {
    eleventyConfig.addPassthroughCopy(publicDirectory);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    templateFormats: [],
    htmlTemplateEngine: false,
    markdownTemplateEngine: false,
  };
};
