import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import type { MantineThemeOverride } from "@mantine/core"
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BackgroundProvider, importBackground } from "./background"
import App from "./App"

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
})

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  globalStyles: () => ({ body: { minWidth: 360, minHeight: 600 } }),
}

importBackground().then((background) => {
  createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BackgroundProvider value={background}>
            <App />
          </BackgroundProvider>
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  )
})
