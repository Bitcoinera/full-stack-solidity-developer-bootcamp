const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../hardhat-deploy-helper")

module.exports.default = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    await deploy("FundMe", {
        constract: "FundMe",
        from: deployer,
        log: true,
        args: [ethUsdPriceFeedAddress],
    })
    log("FundMe deployed!")
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
