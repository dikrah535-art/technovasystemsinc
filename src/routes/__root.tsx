export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Technova Systems - Intelligent Staffing Portal" },
      {
        name: "description",
        content:
          "A high-performance, modern staffing and IT services portal featuring a responsive bento-grid layout, fluid animations and integrated job management capabilities",
      },
      { name: "author", content: "Lovable" },
      {
        property: "og:title",
        content: "Technova Systems - Intelligent Staffing Portal",
      },
      {
        property: "og:description",
        content:
          "A high-performance, modern staffing and IT services portal featuring a responsive bento-grid layout, fluid animations and integrated job management capabilities",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      {
        name: "twitter:title",
        content: "Technova Systems - Intelligent Staffing Portal",
      },
      {
        name: "twitter:description",
        content:
          "A high-performance, modern staffing and IT services portal featuring a responsive bento-grid layout, fluid animations and integrated job management capabilities",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/jinY7P8ho6YgtIBuRGDjaTj3lfA3/social-images/social-1782169438392-3B703864-56FF-4726-B0F9-DA632D5E2318_(1).webp",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/jinY7P8ho6YgtIBuRGDjaTj3lfA3/social-images/social-1782169438392-3B703864-56FF-4726-B0F9-DA632D5E2318_(1).webp",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        rel: "shortcut icon",
        href: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        rel: "apple-touch-icon",
        href: "/favicon.ico",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
