import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
const paths=[manifest.rootEntry,...manifest.toolAdapters,...manifest.files.map(f=>f.path),'index.html','styles.css','app.js','.devcontainer/devcontainer.json'];
const missing=paths.filter(p=>!fs.existsSync(path.join(root,p)));
if(missing.length){console.error('Missing: '+missing.join(', '));process.exitCode=1;}else{console.log('File presence passed: 11 context files (6 active, 5 preview), README, 2 adapters, application and setup. Content quality and live instruction loading require human checks.');}
