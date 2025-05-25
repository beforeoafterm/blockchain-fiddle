import path from 'path'

// Dynamically import the ABIs from the generated ABI directory
// Use require for JSON imports (Node.js/TypeScript)
const neuTokenArtifact = require(path.resolve(
  __dirname,
  '../abi/NeuToken.sol/NeuToken.json'
))
const neuNftArtifact = require(path.resolve(
  __dirname,
  '../abi/NeuNFT.sol/NeuNFT.json'
))

export const NEU_TOKEN_ABI = neuTokenArtifact.abi
export const NEU_NFT_ABI = neuNftArtifact.abi
