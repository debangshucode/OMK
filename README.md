This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


omk/
├── app/
│   └── page.tsx                # Main home page
│
├── components/
│   ├── gridmotion.tsx          # Grid animation background
│   ├── herooverlay.tsx         # Overlay text section with rotating text
│   ├── rotatingtext.tsx        # Animated rotating text component
│   ├── splashcursor.tsx        # Cursor effect (only used in gridmotion)
│   ├── dock.tsx                # macOS-style interactive dock component
│   └── docknavbar.tsx          # Dock-based fixed top navbar
│
├── data/
│   └── index.ts                # Contains `customItems` used in the grid
│
├── public/                     # Static assets (images, favicon, etc.)
│
├── styles/
│   └── globals.css             # Global Tailwind styles
│
├── layout.tsx                  # Root layout with fonts and global structure
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js config
├── package.json                # Project metadata and dependencies
└── README.md                   # You're reading it 🙂

