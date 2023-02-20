import { customAlphabet } from "nanoid"
import { alphanumeric } from "nanoid-dictionary"

const getId = customAlphabet(alphanumeric, 10)

export default getId
