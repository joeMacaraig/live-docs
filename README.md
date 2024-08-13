# Live Docs

A Collaborative Editor Application

## 💻 Tech Stack
Next.JS, Tailwindcss, Shadcn/ui, Clerk, Sentry, LiveBlocks, Deploy with Vercel

# Next.JS
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Styling 

### Shadcn/ui

Create project
Start by creating a new Next.js project using create-next-app:

``` bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

Run the CLI
Run the shadcn-ui init command to setup your project:

``` bash
npx shadcn-ui@latest init
```
Configure components.json
You will be asked a few questions to configure components.json:
```
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Do you want to use CSS variables for colors? › no / yes
```

Fonts
I use Inter as the default font. Inter is not required. You can replace it with any other font.

Here's how I configure Inter for Next.js:

1. Import the font in the root layout:

``` javascript
import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        ...
      </body>
    </html>
  )
}
```
2. Configure theme.extend.fontFamily in tailwind.config.js

``` javascript
const { fontFamily } = require("tailwindcss/defaultTheme")
 
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
}
```

App structure
Here's how I structure my Next.js apps. You can use this as a reference:

```
.
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ui
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── main-nav.tsx
│   ├── page-header.tsx
│   └── ...
├── lib
│   └── utils.ts
├── styles
│   └── globals.css
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

I place the UI components in the components/ui folder.
The rest of the components such as <PageHeader /> and <MainNav /> are placed in the components folder.
The lib folder contains all the utility functions. I have a utils.ts where I define the cn helper.
The styles folder contains the global CSS.
That's it
You can now start adding components to your project.

``` bash
npx shadcn-ui@latest add button
```

The command above will add the Button component to your project. You can then import it like this:

``` javascript
import { Button } from "@/components/ui/button"
 
export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
