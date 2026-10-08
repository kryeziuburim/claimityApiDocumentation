// Minimal static server for the exported site (out/), mimicking GitHub Pages:
// directories serve their index.html and unknown paths get 404.html with status 404.
// Usage: node scripts/serve-static.mjs [dir=out] [port=4173]
import fs from "node:fs"
import http from "node:http"
import path from "node:path"

const root = path.resolve(process.argv[2] ?? "out")
const port = Number(process.argv[3] ?? 4173)

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
}

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0])
    let file = path.join(root, urlPath)
    if (!file.startsWith(root)) {
      res.writeHead(403).end()
      return
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html")
    if (!fs.existsSync(file)) {
      res.writeHead(404, { "content-type": TYPES[".html"] })
      fs.createReadStream(path.join(root, "404.html")).pipe(res)
      return
    }
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" })
    fs.createReadStream(file).pipe(res)
  })
  .listen(port, () => console.log(`Serving ${root} on http://localhost:${port}`))
