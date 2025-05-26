// This file exports the ABIs for NeuToken and NeuNFT contracts for use in the frontend.
// These should be updated after each contract change or redeployment.

import NeuToken from '../abi/NeuToken.sol/NeuToken.json'
import NeuNFT from '../abi/NeuNFT.sol/NeuNFT.json'

export const NEU_TOKEN_ABI = NeuToken.abi
export const NEU_NFT_ABI = NeuNFT.abi
