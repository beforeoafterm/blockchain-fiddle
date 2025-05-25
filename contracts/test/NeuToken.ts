import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('NeuToken (ERC20)', function () {
  let user1: any, user2: any, token: any

  beforeEach(async function () {
    ;[user1, user2] = await ethers.getSigners()
    const NeuToken = await ethers.getContractFactory('NeuToken')
    token = await NeuToken.deploy()
  })

  it('should have correct name and symbol', async function () {
    expect(await token.name()).to.equal('NeuToken')
    expect(await token.symbol()).to.equal('NEUT')
  })

  it('should mint tokens to an address', async function () {
    await token.mint(user1.address, 1000)
    expect(await token.balanceOf(user1.address)).to.equal(1000)
  })

  it('should allow transfers between accounts', async function () {
    await token.mint(user1.address, 1000)
    await token.connect(user1).transfer(user2.address, 400)
    expect(await token.balanceOf(user2.address)).to.equal(400)
    expect(await token.balanceOf(user1.address)).to.equal(600)
  })

  it('should emit Transfer event on mint and transfer', async function () {
    await expect(token.mint(user1.address, 500)).to.emit(token, 'Transfer')
    await token.mint(user1.address, 500)
    await expect(token.connect(user1).transfer(user2.address, 200)).to.emit(
      token,
      'Transfer'
    )
  })
})
