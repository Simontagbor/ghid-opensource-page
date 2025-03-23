function initAvatarScript() {
    console.log("SVG loaded, now running script...");

    // Check if the avatars are now available
    let heroImage = document.querySelectorAll("#herosquare1 image");
    console.log("Avatar elements in #herosquare1:", heroImage);

    if (heroImage.length === 0) {
        console.log("No images found. Something is still off.");
    } else {
        console.log("Avatars found, proceeding with logic...");
        // Run your avatar update logic here...
    }
}