import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const allowed = new Map([['/','index.html'],['/index.html','index.html'],['/app.js','app.js'],['/styles.css','styles.css']]);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
http.createServer(async (request,response) => {
  const file = allowed.get(new URL(request.url,'http://localhost').pathname);
  if (!file) {response.writeHead(404);response.end('Not found');return;}
  try {response.writeHead(200,{'Content-Type':types[path.extname(file)]});response.end(await fs.readFile(path.join(root,file)));}
  catch {response.writeHead(500);response.end('Could not read the application file');}
}).listen(5500,'0.0.0.0',()=>console.log('Open port 5500 in Codespaces, or http://localhost:5500 locally. Keep the forwarded port private.'));
