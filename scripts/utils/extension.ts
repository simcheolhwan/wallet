export const openExtension = async (route = "") => {
  const extension = chrome.runtime.getURL("index.html")
  const url = route ? [extension, route].join("#") : extension
  await chrome.tabs.create({ url })
}
