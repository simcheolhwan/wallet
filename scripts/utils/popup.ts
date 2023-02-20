let windows: number[] = []

export const openPopup = async () => {
  const {
    top = 0,
    left = 0,
    width = 0,
  } = await new Promise<chrome.windows.Window>((resolve) => {
    chrome.windows.getLastFocused(resolve)
  })

  const data: chrome.windows.CreateData = {
    top: top,
    left: left + (width - 360),
    width: 360,
    height: 600,
    type: "popup",
    url: chrome.runtime.getURL("index.html"),
  }

  const window = await new Promise<chrome.windows.Window | undefined>((resolve) => {
    chrome.windows.create(data, resolve)
  })

  if (window?.id) windows.push(window.id)
}

export const closePopup = async () => {
  for (const id of windows) await chrome.windows.remove(id)

  windows = []
}
