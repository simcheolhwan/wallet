import { mergeConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import nodeConfig from "./vite.config.node"

export default mergeConfig(nodeConfig, {
  plugins: [react()],
  envPrefix: "WALLET_",
})
