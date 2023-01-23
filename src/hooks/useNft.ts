import { useContext } from 'react';

import NftContext from '../context/NftContext';

export default function useNft() {
  const context = useContext(NftContext);
  console.log(JSON.stringify(context))
  if (typeof context === 'undefined') {
    throw new Error('useNft must be used within a NftProvider');
  }

  return context;
}