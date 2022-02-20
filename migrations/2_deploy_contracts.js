var SmartGenie = artifacts.require("./SmartGenie");

module.exports = function(deployer) {
  deployer.link(SmartGenie);
  deployer.deploy(SmartGenie, 10000);
};
