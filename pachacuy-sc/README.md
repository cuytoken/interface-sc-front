**CHANGELOGS**
<u>0.0.52</u>

- Se cambio de "finishTatacuyCampaign(uint256 \_pachaUuid)" a "finishTatacuyCampaign(uint256 \_tatacuyId)"
- "getTatacuyInfoForAccount" solo necesita \_tatacuyUuid
- "signTatacuyTxAndVerify" no necesita "\_pachaOwner" ni "\_pachaUuid" pero sí "\_tatacuyId"
- "startTatacuyCampaign" no lleva \_pachaUuid
- "finishTatacuyCampaign" solo necesita \_tatacuyUuid
- "getWiracochaInfoForAccount" solo necesita "\_wiracochaUuid"
- "signWiracochaTxAndReceivePcuy" no necesita "\_pachaOwner" pero sí "\_wiracochaUuid"
- cambio nombre de métodos "getWiracochaInfoForAccount" => "getWiracochaWithUuid"
- cambio nombre de métodos "getTatacuyInfoForAccount" => "getTatacuyWithUuid"
- una pacha puede tener multiples tatacuy
- cambio nombre de métodos "getAHatunWasi" => "getHatunWasiWithUuid"

<u>0.0.51</u>

- new methods
  - purchaseTicketFromMisayWasi
  - purchaseMisayWasi
  - purchaseQhatuWasi
  - getGuineaPigWithUuid
  - getListOfGuineaPigs
  - isPachaAlreadyTaken
  - getListOfPachas
  - getPachaWithUuid
  - startMisayWasiRaffle
  - startRaffleContest
  - getListOfMisayWasisReadyToRaffle
  - getListOfActiveMWRaffles
  - getMisayWasiWithUuid
  - getMiswayWasiWithTicketUuid
  - startQhatuWasiCampaign
  - getListOfQhatuWasi
  - getQhatuWasiWithUuid
- purchaseFoodFromChakra has additional field \_guineaPigUuid

<u>0.0.4</u>

- `race` was added to `IDataGuineaPig`
- `tokenBalance` was added to `IWalletInfo`
- `privacy` and `location` was added to `IPachaData`
