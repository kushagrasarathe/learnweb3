const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract address:", waveContract.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  /**
   * Get contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    `Contract balance: `,
    hre.ethers.utils.formatEther(contractBalance)
  );

  /**
   * Let's send a few waves!
   */
  let waveTxn = await waveContract.wave("Here's a message for you :)");
  await waveTxn.wait();

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    `Contract balance: `,
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getTotalWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

// 0x5FbDB2315678afecb367f032d93F642f64180aa3
