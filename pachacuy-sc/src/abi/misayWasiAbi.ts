export default[
  "event PurchaseMisayWasi(address account, uint256 misayWasiUuid, uint256 pachaUuid, uint256 creationDate, uint256 misayWasiPrice, uint256 balanceConsumer)",
  "event PurchaseTicketFromMisayWasi(address account, uint256 misayWasiUuid, uint256 pachaUuid, uint256 ticketPrice, uint256 amountOfTickets)",
  "event RaffleContestFinished(address winner, uint256 misayWasiUuid, uint256 rafflePrize, uint256 raffleTax, uint256 ticketUuid)",
  "function getHistoricWinners(uint256 _misayWasiUuid) view returns (tuple(address owner, uint256 ticketUuid, uint256 misayWasiUuid, uint256 pachaUuid, address winner, uint256 netPrize, uint256 feePrize)[])",
  "function getListOfActiveMWRaffles() view returns (tuple(address owner, uint256 misayWasiUuid, uint256 pachaUuid, uint256 creationDate, uint256 ticketPrice, uint256 ticketUuid, uint256 misayWasiPrice, uint256 rafflePrize, uint256 numberTicketsPurchased, uint256 campaignStartDate, uint256 campaignEndDate, bool isCampaignActive, bool hasMisayWasi, address[] listOfParticipants)[] listOfMisayWasis)",
  "function getListOfMisayWasisReadyToRaffle() view returns (uint256[] _listOfRafflesToStart)",
  "function getMisayWasiWithUuid(uint256 _misayWasiUuid) view returns (tuple(address owner, uint256 misayWasiUuid, uint256 pachaUuid, uint256 creationDate, uint256 ticketPrice, uint256 ticketUuid, uint256 misayWasiPrice, uint256 rafflePrize, uint256 numberTicketsPurchased, uint256 campaignStartDate, uint256 campaignEndDate, bool isCampaignActive, bool hasMisayWasi, address[] listOfParticipants))",
  "function getMiswayWasiWithTicketUuid(uint256 _ticketUuid) view returns (tuple(address owner, uint256 misayWasiUuid, uint256 pachaUuid, uint256 creationDate, uint256 ticketPrice, uint256 ticketUuid, uint256 misayWasiPrice, uint256 rafflePrize, uint256 numberTicketsPurchased, uint256 campaignStartDate, uint256 campaignEndDate, bool isCampaignActive, bool hasMisayWasi, address[] listOfParticipants))",
  "function startMisayWasiRaffle(uint256 _misayWasiUuid, uint256 _rafflePrize, uint256 _ticketPrice, uint256 _campaignEndDate)",
  "function startRaffleContest(uint256[] _misayWasiUuids)"
]