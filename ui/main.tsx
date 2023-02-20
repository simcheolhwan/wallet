import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import type { MantineThemeOverride } from "@mantine/core"
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import Background from "./Background"

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
})

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  globalStyles: () => ({ body: { minWidth: 360, minHeight: 600 } }),
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Background>
          <Suspense>
            <App />
          </Suspense>
        </Background>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
)
