module.exports = function (eleventyConfig) {
  // Files that don't need processing — copied as-is into the built site.
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/uploads");

  // Every markdown file in src/notes/ becomes part of the "notes" collection.
  eleventyConfig.addCollection("notes", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/notes/*.md").sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date) : new Date(0);
      const dateB = b.data.date ? new Date(b.data.date) : new Date(0);
      return dateB - dateA; // newest first
    });
  });

  // Filter a list of notes down to one subject.
  eleventyConfig.addFilter("bySubject", (notes, subject) =>
    (notes || []).filter((n) => n.data.subject === subject)
  );

  // "2026-09-22" -> "Sep 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  });

  // "/uploads/my-file.pdf" -> "my-file.pdf"
  eleventyConfig.addFilter("fileName", (path) => {
    if (!path) return "";
    return path.split("/").pop();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
