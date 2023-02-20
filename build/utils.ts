import boxen from "boxen"

export const box = (message: string) => {
  console.log(boxen(message, { borderColor: "blue", padding: { top: 0, bottom: 0, left: 1, right: 1 } }))
}
