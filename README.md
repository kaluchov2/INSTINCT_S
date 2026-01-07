# ka'an - Elite Outdoor Bootcamps

A bold, athletic landing page for ka'an - outdoor fitness bootcamps that connect athletes with nature.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom athletic color theme
- **Fully Responsive** design (mobile to desktop)
- **5 Main Sections:**
  1. Hero Section with video placeholder
  2. Who Are We - Mission and values
  3. Experiences - 4 bootcamp offerings
  4. Calendar & Reservations (UI only, no backend)
  5. FAQ Section with accordion

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Utilities**: date-fns
- **Form Handling**: React Hook Form (setup ready)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
INSTINCT_S/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── WhoAreWeSection.tsx
│   │   ├── ExperiencesSection.tsx
│   │   ├── CalendarSection.tsx
│   │   └── FooterSection.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── Calendar.tsx
│   │   ├── ReservationForm.tsx
│   │   └── VideoPlaceholder.tsx
│   └── layout/             # Layout components
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Content constants
├── types/
│   └── index.ts            # TypeScript types
└── public/
    ├── images/
    └── videos/
```

## Color Palette

The design uses a bold, athletic color scheme:

- **Primary**: Orange (#FF6B35)
- **Accent**: Red (#E63946)
- **Trust**: Blue (#1E90FF)
- **Navy**: (#0A2463)
- **Nature**: Green (#06D6A0)
- **Energy**: Yellow (#FFD23F)

## Customization

### Adding Real Images

Replace the gradient placeholders by adding images to:
- `public/images/hero/` - Hero section background
- `public/images/experiences/` - Bootcamp experience images

Then update the image paths in `lib/constants.ts`.

### Updating Content

All content is centralized in `lib/constants.ts`:
- `EXPERIENCES` - Bootcamp offerings
- `FAQ_ITEMS` - FAQ questions and answers
- `CONTACT_INFO` - Contact details
- `NAV_LINKS` - Navigation menu items

## Future Enhancements

- Image carousel for experiences
- Video player integration
- Form submission logic
- Backend API integration for reservations
- Smooth scroll animations
- CMS integration
- Testimonials section
- Blog

## License

Private project for ka'an.

## Contact

For questions or support:
- Email: info@kaan.com
- Phone: +1 (555) 123-4567
