```javascript
var {
  getContract,
  getAllGameInformation,
  getInformationByRank,
} = require("pachacuy-info");
```

```typescript
import { Contract } from "ethers";
/**
 * @dev This function inits the library and connects to the blockchain
 * @return Gives back the contract PachacuyInformation
 */
export declare function getContract(): Contract;
interface InformationBasedOnRank {
  maxSamiPoints: number;
  boxes: number;
  affectation: number;
}
interface IGameInformation {
  infoArrayBasedOnRank: InformationBasedOnRank[];
  amountOfBoxesPerPachaPerDay: number;
  amountOfMinimumSamiPoints: number;
  amountOfMaximumSamiPoints: number;
}
export declare function getAllGameInformation(): Promise<IGameInformation>;
export declare function getInformationByRank(
  _rank: number
): Promise<InformationBasedOnRank>;
export {};
```

**CHANGELOGS**
