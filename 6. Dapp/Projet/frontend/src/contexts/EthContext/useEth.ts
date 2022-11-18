import { useContext } from 'react'
import EthContext, { EthContextInterface } from './EthContext'

const useEth = (): EthContextInterface => useContext(EthContext)

export default useEth
