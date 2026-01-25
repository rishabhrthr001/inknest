export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word chars with -
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing -
};
