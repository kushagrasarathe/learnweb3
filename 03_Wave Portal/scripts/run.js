const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory(
    "WavePortal"
  );
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("Contract deployed to: ", waveContract.address);
};

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()

// 0x5FbDB2315678afecb367f032d93F642f64180aa3