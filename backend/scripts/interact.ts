async function main() {
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const easymilestones = await ethers.getContractAt("EasyMilestones", address);
  const [
    { address: firstAddr },
    { address: secondAddr },
  ] = await ethers.getSigners();
  easymilestones
    .create_transaction(20300n, [
      
    ])
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
