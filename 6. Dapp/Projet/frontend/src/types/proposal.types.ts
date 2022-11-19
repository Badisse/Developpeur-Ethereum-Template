import { BigNumber } from "ethers"

export interface IProposal {
  description: string
  voteCount: BigNumber
}