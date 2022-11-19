import { BigNumber } from "ethers"

export interface IVoter {
  isRegistered: boolean
  hasVoted: boolean
  votedProposalId: BigNumber
}