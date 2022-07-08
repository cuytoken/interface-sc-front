**CHANGELOGS**
<u>0.0.97</u>

```js
PurchaseAssetController.on("PurchaseLand". …)
Chakra.on("PurchaseChakra", …)
PurchaseAssetController.on("PurchaseFoodChakra". …)
MisayWasi.on("PurchaseTicketFromMisayWasi", …)
MisayWasi.on("PurchaseMisayWasi", …)
QhatuWasi.on("PurchaseQhatuWasi", …)
PurchaseAssetController.on("PurchasePachaPass". …)
Wiracocha.on("MintWiracocha", ...)
Tatacuy.on("MintTatacuy", ...)
HatunWasi.on("MintHatunWasi", ...)
getComponentsInPacha
```

Smart Contract Order

```js
return [
  nftpContract,
  pacContract,
  tataCuyContract,
  wiracochaContract,
  chakraContract,
  hatunWasiContract,
  misayWasiContract,
  qhatuWasiContract,
];
```

```js
// Purhchase Asset Controller
export interface PurchaseLand {
  _account: string;
  uuid: number;
  landPrice: number;
  _location: number;
  poolRewardsAddress: string;
}

export interface PurchaseFoodChakra {
  chakraUuid: number;
  amountOfFood: number;
  availableFood: number;
  chakraOwner: string;
  pcuyReceived: number;
  pcuyTaxed: number;
  tax: number;
}
export interface PurchasePachaPass {
  account: string;
  pachaUuid: number;
  pachaPassUuid: number;
  price: number;
  pcuyReceived: number;
  pcuyTaxed: number;
}

// chakra
export interface PurchaseChakra {
  owner: string;
  chakraUuid: number;
  pachaUuid: number;
  chakraPrice: number;
  creationDate: number;
}

// misay wasi
export interface PurchaseTicketFromMisayWasi {
  account: string;
  misayWasiUuid: number;
  pachaUuid: number;
  ticketPrice: number;
  amountOfTickets: number;
}

export interface PurchaseMisayWasi {
  account: string;
  misayWasiUuid: number;
  pachaUuid: number;
  creationDate: number;
  misayWasiPrice: number;
}

// qhatu wasi
export interface PurchaseQhatuWasi {
  owner: string;
  qhatuWasiUuid: number;
  pachaUuid: number;
  qhatuWasiPrice: number;
  creationDate: number;
}

// wiracocha
export interface MintWiracocha {
  owner: string;
  wiracochaUuid: number;
  pachaUuid: number;
  creationDate: number;
}

// tatacuy
export interface MintTatacuy {
  owner: string;
  tatacuyUuid: number;
  pachaUuid: number;
  creationDate: number;
}

// hatun wasi
export interface MintHatunWasi {
  owner: string;
  hatunWasiUuid: number;
  pachaUuid: number;
  creationDate: number;
}
```

<u>0.0.83</u>
Pacha

- PachaInfo has another property listPachaPassOwners
- setPachaToPublic
- setPachaPrivacyAndDistribution
- getListOfPachaPasses
- getPachaPassWithUuid
- isPachaAlreadyTaken

Purchase asset controller

- purchasePachaPass

Nft Producer

- isGuineaPigAllowedInPacha
- mintPachaPassAsOwner

Misay Wasi

- getMisayWasiWithUuid,
- getMiswayWasiWithTicketUuid
- getListOfActiveMWRaffles
- getListOfMisayWasisReadyToRaffle,

<u>0.0.69</u>

- getPachacuyBalance
- nuevo parametro para 'startQhatuWasiCampaign': \_prizePerView

<u>0.0.52</u>

- Se cambio de "finishTatacuyCampaign(uint256 \_pachaUuid)" a "finishTatacuyCampaign(uint256 \_tatacuyUuid)"
- "getTatacuyInfoForAccount" solo necesita \_tatacuyUuid
- "signTatacuyTxAndVerify" no necesita "\_pachaOwner" ni "\_pachaUuid" pero sí "\_tatacuyUuid"
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
