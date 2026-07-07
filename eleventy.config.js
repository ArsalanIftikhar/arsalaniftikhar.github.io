const { readdirSync, statSync } = require("node:fs");
const path = require("node:path");

function listFiles(directory) {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...listFiles(absolutePath));
      continue;
    }

    if (entry.isFile()) {
      files.push(absolutePath.split(path.sep).join("/"));
    }
  }

  return files;
}

function addDirectoryPassthroughExcept(eleventyConfig, directory, excludedPaths) {
  const excluded = new Set(excludedPaths);

  if (!statSync(directory).isDirectory()) {
    throw new Error(`Expected passthrough directory: ${directory}`);
  }

  for (const file of listFiles(directory)) {
    if (!excluded.has(file)) {
      eleventyConfig.addPassthroughCopy(file);
    }
  }
}

module.exports = function (eleventyConfig) {
  // Transitional passthrough build: migrated routes are generated from src templates,
  // while non-migrated legacy files remain byte-identical copies.
  [
    "approach.html",
    "experience.html",
    "404.html",
    "robots.txt",
    "sitemap.xml",
  ].forEach((publicFile) => {
    eleventyConfig.addPassthroughCopy(publicFile);
  });

  ["assets", "insights"].forEach((publicDirectory) => {
    eleventyConfig.addPassthroughCopy(publicDirectory);
  });

  addDirectoryPassthroughExcept(eleventyConfig, "projects", [
    "projects/fabric-timecard-pipeline-case-study.html",
    "projects/fabric-modernisation-case-study.html",
  ]);

  eleventyConfig.addPassthroughCopy({
    "src/assets/css/portfolio.css": "assets/css/portfolio.css",
    "src/assets/js/theme.js": "assets/js/theme.js",
    "src/assets/js/navigation.js": "assets/js/navigation.js",
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: false,
    markdownTemplateEngine: false,
  };
};
