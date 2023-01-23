import { InjectedConnector } from '@web3-react/injected-connector'

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1,
    3,
    4,
    5,
    10,
    42,
    31337,
    42161
  ]
})

export {injectedConnector}

