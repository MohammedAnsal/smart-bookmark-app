// import type { Metadata } from "next";
// import "./globals.css";
// import { Toaster } from "sonner";

// export const metadata: Metadata = {
//   title: "Smart Bookmark — Save smarter. Access faster.",
//   description:
//     "A simple, private, real-time bookmark manager built for speed and focus. Save your links and access them anywhere.",
//   keywords: [
//     "bookmark manager",
//     "link organizer",
//     "save links",
//     "real-time sync",
//   ],
//   openGraph: {
//     title: "Smart Bookmark",
//     description: "Save your links. Access them anywhere.",
//     type: "website",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body suppressHydrationWarning>
//         <Toaster
//           position="top-right"
//           theme="light"
//           toastOptions={{
//             classNames: {
//               toast: "smart-bookmark-toast",
//               success: "smart-bookmark-toast-success",
//               error: "smart-bookmark-toast-error",
//             },
//             duration: 4000,
//           }}
//         />
//         {children}
//       </body>
//     </html>
//   );
// }

// import type { Metadata } from "next";
// import "./globals.css";
// import { Toaster } from "sonner";

// export const metadata: Metadata = {
//   title: "Smart Bookmark — Save smarter. Access faster.",
//   description:
//     "A simple, private, real-time bookmark manager built for speed and focus.",
//   keywords: [
//     "bookmark manager",
//     "link organizer",
//     "save links",
//     "real-time sync",
//   ],
//   openGraph: {
//     title: "Smart Bookmark",
//     description: "Save your links. Access them anywhere.",
//     type: "website",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body suppressHydrationWarning>
//         <Toaster
//           position="bottom-right"
//           gap={8}
//           toastOptions={{
//             duration: 3500,
//             style: {
//               fontFamily: "'DM Sans', sans-serif",
//               fontSize: 13,
//               fontWeight: 500,
//               borderRadius: 14,
//               padding: "12px 16px",
//             },
//           }}
//         />
//         {children}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Smart Bookmark — Save smarter. Access faster.",
  description:
    "A simple, private, real-time bookmark manager built for speed and focus.",
  keywords: [
    "bookmark manager",
    "link organizer",
    "save links",
    "real-time sync",
  ],
  openGraph: {
    title: "Smart Bookmark",
    description: "Save your links. Access them anywhere.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Toaster
          position="bottom-right"
          gap={8}
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13.5,
              fontWeight: 500,
              borderRadius: 14,
              padding: "11px 16px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}