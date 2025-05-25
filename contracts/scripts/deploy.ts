import { ethers } from 'hardhat'

async function main() {
  // Deploy NeuToken (ERC20)
  const NeuToken = await ethers.getContractFactory('NeuToken')
  const neuToken = await NeuToken.deploy()
  await neuToken.waitForDeployment()
  console.log(`NeuToken deployed to: ${await neuToken.getAddress()}`)

  // Deploy NeuNFT (ERC721)
  const NeuNFT = await ethers.getContractFactory('NeuNFT')
  const neuNFT = await NeuNFT.deploy()
  await neuNFT.waitForDeployment()
  console.log(`NeuNFT deployed to: ${await neuNFT.getAddress()}`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
