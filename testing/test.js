var sc = require("pachacuy-sc");

async function main() {
  console.log(await sc.getBurningTimeGuineaPig());
  console.log(await sc.getGuinePigData());
  console.log(await sc.getGuineaPigsPerWallet());
  console.log(await sc.getNextFeedingTimeGuineaPig());
  console.log(await sc.getPachaData());
  console.log(await sc.getPachaPassData());
  console.log(await sc.getWalletData());
}

main()
  .then()
  .catch((e) => console.log(e));
