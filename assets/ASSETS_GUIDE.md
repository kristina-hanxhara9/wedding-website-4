# Assets Guide - Wedding Website

This guide explains where to place your images and videos.

## Folder Structure

```
assets/
├── images/
│   ├── couple/          # Your couple photos
│   ├── venue/           # Venue and location photos
│   ├── details/         # Ceremony, reception, party photos
│   └── (root files)     # Main images used in the website
└── video/
    └── wedding-hero.mp4 # Hero section background video
```

## Required Images

### Main Images (place in `assets/images/`)

| Filename | Description | Recommended Size | Used In |
|----------|-------------|------------------|---------|
| `couple-1.jpg` | Large couple photo | 1400x900px | Story section (left) |
| `couple-2.jpg` | Medium couple photo | 800x1000px | Story section (right) |
| `couple-3.jpg` | Portrait couple photo | 600x800px | Story content |
| `ceremony.jpg` | Church/ceremony venue | 800x600px | Details section |
| `reception.jpg` | Reception venue | 800x600px | Details section |
| `party.jpg` | Party/celebration | 800x600px | Details section |
| `venue.jpg` | Full venue exterior | 1920x1080px | Location section |
| `venue-aerial.jpg` | Aerial/drone view for interactive map | 1920x1080px | Interactive map section |
| `hotel-room.jpg` | Accommodation | 800x600px | Accommodation section |
| `hero-fallback.jpg` | Fallback if no video | 1920x1080px | Hero section |

### Hero Video (place in `assets/video/`)

| Filename | Description | Specs |
|----------|-------------|-------|
| `wedding-hero.mp4` | Background video for hero | 1920x1080px, 10-30 sec, looped |

**Video suggestions:**
- Drone footage of venue
- Couple walking together
- Nature/romantic scenes
- Keep it subtle (will have overlay)

## Image Tips

1. **Optimize your images** - Use tools like TinyPNG to compress
2. **Use consistent aspect ratios** - Helps with layout
3. **High quality but web-optimized** - Balance quality vs file size
4. **JPG for photos** - PNG for graphics with transparency

## Interactive Map Markers

The markers on `venue-aerial.jpg` can be repositioned in `index.html`:

```html
style="top: 30%; left: 20%;"  <!-- Adjust percentages -->
```

- `top: X%` - Distance from top (0% = top, 100% = bottom)
- `left: X%` - Distance from left (0% = left, 100% = right)

## Replacing Placeholder Images

1. Add your real image to `assets/images/`
2. Name it exactly as listed above, OR
3. Update the `src` path in `index.html`
