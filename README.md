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
## 📁 Project Structure
omk/
├── app/
│ └── page.tsx # Main home page
│
├── components/
│ ├── dock.tsx # macOS-style interactive dock
│ ├── docknavbar.tsx # Fixed top navbar using Dock
│ ├── gridmotion.tsx # Background with animated grid motion
│ ├── herooverlay.tsx # Hero section with animated overlay
│ ├── rotatingtext.tsx # Custom rotating text component
│ └── splashcursor.tsx # Cursor splash effect (used only in gridmotion)
│
├── data/
│ └── index.ts # Custom grid items data
│
├── public/ # Static assets like images, favicon, etc.
│
├── styles/
│ └── globals.css # Tailwind & global styles
│
├── layout.tsx # Root layout with fonts and structure
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json # TypeScript config
├── next.config.js # Next.js config
├── package.json # Dependencies and project info
└── README.md # Project documentation
