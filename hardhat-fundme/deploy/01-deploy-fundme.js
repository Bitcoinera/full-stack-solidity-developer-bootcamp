require("dotenv").config()
const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../hardhat-deploy-helper")
const { verify } = require("../utils/verify")

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

    const fundMe = await deploy("FundMe", {
        constract: "FundMe",
        from: deployer,
        log: true,
        args: [ethUsdPriceFeedAddress],
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}!`)
    log("----------------------------------------------------")

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_APIKEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
        log("Contract was successfully verified!")
    }
}

module.exports.tags = ["all", "fundme"]
