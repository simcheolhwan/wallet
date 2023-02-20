import { program } from "commander"
import buildScripts from "./scripts"

const options = program.option("--watch").parse().opts()
const { watch } = options

const init = async () => {
  await buildScripts(watch)
}

init().catch(console.error)
