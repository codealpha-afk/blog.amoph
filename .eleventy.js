const { DateTime } = require("luxon");
module.exports = function(eleventyConfig) {
  // ── Copy static assets as-is ──
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // ── Date filter ──
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMMM yyyy");
  });

  // ── Slice filter for sidebar ──
  eleventyConfig.addFilter("slice", (array, start, end) => {
    return array.slice(start, end);
  });

  // ── Collections: all posts sorted newest first ──
  eleventyConfig.addCollection("posts", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
    posts.forEach((post, index) => {
      post.data.prevPost = posts[index + 1] || null;
      post.data.nextPost = posts[index - 1] || null;
    });
    return posts;
  });

  return {
    dir: {
      input:    "src",
      output:   "public",
      includes: "_includes",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
