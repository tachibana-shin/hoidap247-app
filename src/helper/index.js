import { http } from "@/plugins/http"

export function updateData(object, path, value) {
  path = path.split("/")

  path.slice(0, path.length - 1).forEach(item => {
    object = object[item]
  })
  object[path[path.length - 1]] = value
}
export async function getLinkerInContents(newVal) {
  const div = document.createElement("div")
  div.innerHTML = newVal

  const a = div.querySelector("a")

  if (a) {
    const url = a.getAttribute("href")
    try {
      const { data } = await http.get("/utilities/og-meta", {
        params: {
          url
        }
      })
      return data
    } catch (e) {
      return null
    }
  } else {
    return null
  }
};