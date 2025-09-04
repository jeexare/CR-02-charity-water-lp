function resizeCollages() {
  const rows = document.querySelectorAll('.collage-hor');

  rows.forEach(row => {
    const imgs = Array.from(row.querySelectorAll('img'));

    // Skip if no images
    if (imgs.length === 0) return;

    const containerWidth = row.clientWidth;

    // Get natural sizes
    const sizes = imgs.map(img => ({
      width: img.naturalWidth,
      height: img.naturalHeight,
      aspect: img.naturalWidth / img.naturalHeight
    }));

    // Compute scaled widths if height = 200px
    const scaledWidths = sizes.map(s => s.aspect * 200);
    const totalWidth = scaledWidths.reduce((a, b) => a + b, 0);

    // Determine scale factor if total width > container
    const scaleFactor = containerWidth / totalWidth;

    imgs.forEach((img, i) => {
      img.style.width = (scaledWidths[i] * scaleFactor) + 'px';
      img.style.height = (200) + 'px';
    });
  });
}

// Wait for all images to load
function waitForImages(callback) {
  const imgs = document.querySelectorAll('.collage-hor img');
  let loadedCount = 0;
  const total = imgs.length;

  if (total === 0) return callback();

  imgs.forEach(img => {
    if (img.complete) {
      loadedCount++;
      if (loadedCount === total) callback();
    } else {
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === total) callback();
      };
    }
  });
}

// Initial resize after images load
waitForImages(resizeCollages);

// Resize on window resize
window.addEventListener('resize', resizeCollages);
