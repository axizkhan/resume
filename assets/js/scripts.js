/*

This script dynamically loads CSS and JS assets from a Vite manifest file and appends them to the document head.

The manifest file is expected to have the following structure:
{
  "index.html": {
    "file": "assets/index-CLkpor4F.js",
    "name": "index",
    "src": "index.html",
    "isEntry": true,
    "css": [
      "assets/index-BucN6E0V.css"
    ]
  }
}

Usage:
1. Add a `data-vite-manifest` attribute to an HTML element with the URL of the manifest file.
2. Add a `data-vite-name` attribute to specify the entry name to load.

Example:
<div data-vite-manifest="/path/to/manifest.json" data-vite-name="index"></div>

When the page loads, the script will fetch the manifest, find the specified entry, and append the corresponding CSS and JS files to the document head.

*/

function loadViteAssets(manifestUrl, name) {
  // Validate input parameters
  if (!manifestUrl) {
    throw new Error("Manifest URL is required");
  }
  if (typeof manifestUrl !== "string") {
    throw new Error("Manifest URL must be a string");
  }
  if (!name) {
    throw new Error("Name is required");
  }
  if (typeof name !== "string") {
    throw new Error("Name must be a string");
  }

  // Validate URL format
  try {
    new URL(manifestUrl);
  } catch {
    throw new Error("Invalid URL format for manifestUrl");
  }

  // Fetch the manifest file
  fetch(manifestUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch manifest: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((manifest) => {
      // Find the entry with the specified name
      const entry = Object.values(manifest).find((item) => item.name === name);
      if (!entry) {
        throw new Error(`Entry with name "${name}" not found in manifest`);
      }

      const appendedElements = []; // Track appended elements for cleanup

      try {
        // Resolve the base URL of the manifest
        const manifestBaseUrl = new URL("../", manifestUrl).href;

        // Append CSS files to the document head
        if (entry.css && Array.isArray(entry.css)) {
          entry.css.forEach((cssFile) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = new URL(cssFile, manifestBaseUrl).href; // Resolve relative path
            document.head.appendChild(link);
            appendedElements.push(link);
          });
        }

        // Append the JS file to the document head
        if (entry.file) {
          const script = document.createElement("script");
          script.type = "module";
          script.src = new URL(entry.file, manifestBaseUrl).href; // Resolve relative path
          document.head.appendChild(script);
          appendedElements.push(script);
        }
      } catch (error) {
        // Cleanup appended elements in case of an error
        appendedElements.forEach((el) => el.remove());
        throw error;
      }
    })
    .catch((error) => {
      // Log errors to the console
      console.error("Error loading Vite assets:", error);
    });
}

// Automatically load Vite assets for elements with the `data-vite-manifest` attribute
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-vite-manifest]");
  elements.forEach((element) => {
    const manifestUrl = element.getAttribute("data-vite-manifest");
    const name = element.getAttribute("data-vite-name");

    // Validate attributes and load assets
    if (manifestUrl && name) {
      loadViteAssets(manifestUrl, name);
    } else {
      console.error("Missing data-vite-manifest or data-vite-name attribute");
    }
  });
});
