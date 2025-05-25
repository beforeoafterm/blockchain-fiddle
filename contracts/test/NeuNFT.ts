import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('NeuNFT (ERC721)', function () {
  let user1: any, user2: any, nft: any

  beforeEach(async function () {
    ;[user1, user2] = await ethers.getSigners()
    const NeuNFT = await ethers.getContractFactory('NeuNFT')
    nft = await NeuNFT.deploy()
  })

  it('should have correct name and symbol', async function () {
    expect(await nft.name()).to.equal('NeuNFT')
    expect(await nft.symbol()).to.equal('NEUFT')
  })

  it('should mint a new NFT to a user', async function () {
    const tx = await nft.mint(user1.address)
    const receipt = await tx.wait()
    // Debug: log all events
    // console.log(receipt.events);
    const transferEvent = receipt.logs?.find(
      (e: any) => e.fragment?.name === 'Transfer'
    )
    const tokenId = transferEvent?.args?.tokenId
    if (tokenId == null) throw new Error('Transfer event or tokenId not found')
    expect(await nft.ownerOf(tokenId)).to.equal(user1.address)
  })

  it('should allow transfer of NFT between users', async function () {
    const tx = await nft.mint(user1.address)
    const receipt = await tx.wait()
    const transferEvent = receipt.logs?.find(
      (e: any) => e.fragment?.name === 'Transfer'
    )
    const tokenId = transferEvent?.args?.tokenId
    if (tokenId == null) throw new Error('Transfer event or tokenId not found')
    await nft
      .connect(user1)
      ['safeTransferFrom(address,address,uint256)'](
        user1.address,
        user2.address,
        tokenId
      )
    expect(await nft.ownerOf(tokenId)).to.equal(user2.address)
  })

  it('should emit Transfer event on mint and transfer', async function () {
    await expect(nft.mint(user1.address)).to.emit(nft, 'Transfer')
    const tx = await nft.mint(user1.address)
    const receipt = await tx.wait()
    const transferEvent = receipt.logs?.find(
      (e: any) => e.fragment?.name === 'Transfer'
    )
    const tokenId = transferEvent?.args?.tokenId
    if (tokenId == null) throw new Error('Transfer event or tokenId not found')
    await expect(
      nft
        .connect(user1)
        ['safeTransferFrom(address,address,uint256)'](
          user1.address,
          user2.address,
          tokenId
        )
    ).to.emit(nft, 'Transfer')
  })
})
