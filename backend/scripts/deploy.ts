export async function main() {
	const [owner] = await ethers.getSigners();
	const EasyMilestones = await ethers.getContractFactory(
		"EasyMilestones",
		owner,
	);
	const easymilestones = await EasyMilestones.deploy();
	await easymilestones.waitForDeployment();
	console.log(
		"EasyMilestones deployed to address: ",
		await easymilestones.getAddress(),
	);
	console.log("By this homie: ", owner.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
