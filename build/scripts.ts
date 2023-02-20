import type { InlineConfig } from "vite"
import { mergeConfig, build } from "vite"
import { box } from "./utils"
import baseConfig from "../vite.config"

const scripts = {
  background: "scripts/background.ts",
  content: "scripts/content.ts",
  page: "scripts/page.ts",
}

const buildScripts = async (watch: boolean) => {
  const config: InlineConfig = mergeConfig(baseConfig, {
    configFile: false,
    build: { watch: watch ? {} : null, emptyOutDir: !watch, minify: !watch },
  })

  const buildScript = async (name: string, entry: string) => {
    const filename = `${name}.js`
    const lib = { name, entry, formats: ["iife"], fileName: () => filename }

    box(filename)
    await build(mergeConfig(config, { build: { lib, emptyOutDir: false } }))
  }

  box("UI")
  await build(config)

  for (const [name, entry] of Object.entries(scripts)) {
    await buildScript(name, entry)
  }
}

export default buildScripts
