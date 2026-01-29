# Wedding Invitation Website - Kristina & Andi

A beautiful, elegant wedding invitation website inspired by the MOOSER Hotel design aesthetic. Features smooth scroll animations, parallax effects, and modern typography.

## Features

- **Hero Section** with video background support
- **Parallax scrolling** effects throughout
- **Smooth reveal animations** on scroll
- **Responsive design** for all devices
- **RSVP form** with validation
- **Countdown timer** to wedding day
- **Timeline** of wedding events
- **Location section** with map link

## Project Structure

```
wedding-three/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # JavaScript animations
├── assets/
│   ├── images/         # Wedding photos
│   │   ├── couple-1.jpg
│   │   ├── couple-2.jpg
│   │   ├── couple-3.jpg
│   │   ├── ceremony.jpg
│   │   ├── reception.jpg
│   │   ├── party.jpg
│   │   ├── venue.jpg
│   │   ├── hotel-room.jpg
│   │   └── hero-fallback.jpg
│   └── video/
│       └── wedding-hero.mp4    # Hero background video
└── README.md
```

## Required Assets

### Images (Recommended sizes)
1. **couple-1.jpg** - Large couple photo (1400x900px)
2. **couple-2.jpg** - Medium couple photo (800x1000px)
3. **couple-3.jpg** - Portrait couple photo (600x800px)
4. **ceremony.jpg** - Church/ceremony venue (800x600px)
5. **reception.jpg** - Reception venue (800x600px)
6. **party.jpg** - Party/dancing photo (800x600px)
7. **venue.jpg** - Full venue exterior (1920x1080px)
8. **hotel-room.jpg** - Hotel accommodation (800x600px)
9. **hero-fallback.jpg** - Fallback for video (1920x1080px)

### Video
- **wedding-hero.mp4** - Background video for hero section
  - Recommended: 1920x1080px, 10-30 seconds, looped
  - Suggestions: drone footage, couple walking, nature scenes

## Customization

### Colors
Edit the CSS variables in `css/styles.css`:

```css
:root {
    --color-primary: #5C4A3D;      /* Main brown */
    --color-primary-light: #7D6B5D;
    --color-primary-dark: #3D3028;
    --color-cream: #F5F0EB;        /* Background */
    --color-gold: #C9A86C;         /* Accent */
}
```

### Wedding Details
Edit `index.html` to change:
- Names (search for "Kristina" and "Andi")
- Wedding date (search for "15 Qershor 2025")
- Location details
- Timeline events
- Contact information

### Countdown Date
Edit `js/main.js` line ~150:
```javascript
const weddingDate = new Date('June 15, 2025 14:00:00').getTime();
```

## Language

The website is in Albanian. Key terms:
- "Dasma" = Wedding
- "Konfirmo Pjesëmarrjen" = RSVP
- "Detajet" = Details
- "Vendi" = Location
- "Historia Jonë" = Our Story

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Features Breakdown

### Scroll Effects
- Parallax movement on hero section
- Reveal animations for text and images
- Staggered timeline entries
- Horizontal text movement

### Animations
- Smooth page load
- Image zoom on hover
- Button hover effects
- Form input animations
- Countdown number transitions

## Getting Started

1. Add your images to `assets/images/`
2. Add hero video to `assets/video/`
3. Edit names and dates in `index.html`
4. Open `index.html` in a browser

For the best experience, serve the files through a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server package)
npx http-server
```

Then visit `http://localhost:8000`

## Credits

Design inspired by [MOOSER Hotel](https://www.mooserhotel.at)

---

Made with love for Kristina & Andi's special day
