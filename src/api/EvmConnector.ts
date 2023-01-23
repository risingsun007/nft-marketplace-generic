import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Wallet } from '../models'

import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { Web3Provider } from '@ethersproject/providers'
import { injectedConnector } from '../constants'

const connect = async (react3: Web3ReactContextInterface<Web3Provider>) : Promise<void> => {
  const { active, activate } = react3;
  if(!active) {
    await activate(injectedConnector);
  }
}

const disconnect = async (react3: Web3ReactContextInterface<Web3Provider>): Promise<void> => {
  const { active, activate } = react3;
  if(!active) {
    await activate(injectedConnector);
  }
}

const wallet: Wallet = {connect, disconnect};

export { wallet };

