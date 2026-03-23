module.exports = function (eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin"); // ← Decap CMS admin panel

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
