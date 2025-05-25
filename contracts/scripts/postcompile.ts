// scripts/postcompile.ts
// Copies contract ABIs and typechain types to frontend and backend for local imports

import fs from 'fs'
import path from 'path'

// Source directories
const ABI_SRC = path.resolve(__dirname, '../artifacts/contracts')
const TYPECHAIN_SRC = path.resolve(__dirname, '../typechain-types')

// Destinations
const FRONTEND_ABI_DEST = path.resolve(__dirname, '../../frontend/src/abi')
const FRONTEND_TYPE_DEST = path.resolve(__dirname, '../../frontend/src/types')
const BACKEND_ABI_DEST = path.resolve(__dirname, '../../backend/src/abi')
const BACKEND_TYPE_DEST = path.resolve(__dirname, '../../backend/src/types')

function copyRecursiveSync(src: string, dest: string): void {
  if (!fs.existsSync(src)) {
    console.warn(`Source not found: ${src}`)
    return
  }
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
    console.log(`Created directory: ${dest}`)
  }
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry)
    const destPath = path.join(dest, entry)
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursiveSync(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
      console.log(`Copied: ${srcPath} -> ${destPath}`)
    }
  }
}

console.log('Copying ABIs and types to frontend and backend...')
copyRecursiveSync(ABI_SRC, FRONTEND_ABI_DEST)
copyRecursiveSync(TYPECHAIN_SRC, FRONTEND_TYPE_DEST)
copyRecursiveSync(ABI_SRC, BACKEND_ABI_DEST)
copyRecursiveSync(TYPECHAIN_SRC, BACKEND_TYPE_DEST)
console.log('Done.')
