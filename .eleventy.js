const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const sitemap = require("eleventy-plugin-sitemap");

// ── Image shortcode ──
async function imageShortcode(src, alt, sizes = "100vw") {
  let metadata = await Image(src, {
    widths: [400, 800, 1200],
    formats: ["webp", "jpeg"],
    outputDir: "./public/images/",
    urlPath: "/images/",
  });
  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  });
}

module.exports = function(eleventyConfig) {

  // ── Plugins ──
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://blog.amoph.org",
    },
  });

  // ── Image shortcode ──
  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  // ── Reading time filter ──
  eleventyConfig.addFilter("readingTime", (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  });

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
