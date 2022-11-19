import { ethers } from "ethers";

interface IExtensionForProvider {
  on: (event: string, callback: (...params: any) => void) => void;
  removeListener: (event: string, callback: (...params: any) => void) => void;
}

type EthersProvider = ethers.providers.ExternalProvider & IExtensionForProvider;

export interface IEthWindow extends Window {
  ethereum: EthersProvider
}