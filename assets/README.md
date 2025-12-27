# Assets Folder

Place the following files in this folder:

## Required Files

### 1. Resume PDF (PRIVATE - DO NOT COMMIT)
- **Filename**: `Sagar_Suryawanshi_Resume.pdf`
- **Description**: Your professional resume in PDF format
- **⚠️ IMPORTANT**: This file is excluded from Git via .gitignore to protect personal information
- **Usage**: The "Request Resume" button redirects visitors to the contact section
- **Note**: For local testing, place your resume here. It will NOT be pushed to GitHub.

### 2. Profile Photo (Optional)
- **Filename**: `profile.jpg` or `profile.png`
- **Recommended Size**: 400x400 pixels
- **Format**: JPEG or PNG
- **Note**: Currently using a placeholder icon. To add a photo, update the About section in `index.html`

## Adding a Profile Photo

To add your photo, replace the placeholder in `index.html`:

```html
<!-- Find this code in the About section -->
<div class="image-placeholder">
    <i class="bi bi-person-fill"></i>
</div>

<!-- Replace with -->
<img src="assets/profile.jpg" alt="Sagar B. Suryawanshi" class="profile-photo">
```

Then add this CSS to `style.css`:

```css
.profile-photo {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 2;
}
```

## Favicon (Optional)

Add a favicon for browser tabs:
1. Create a `favicon.ico` (32x32 pixels)
2. Add to the `<head>` section of `index.html`:

```html
<link rel="icon" type="image/x-icon" href="assets/favicon.ico">
```
