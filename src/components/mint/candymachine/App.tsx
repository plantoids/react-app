import Home from './Home'
import * as anchor from '@project-serum/anchor'

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!
    )

    return candyMachineId
  } catch (e) {
    console.log('Failed to construct CandyMachineId', e)
    return undefined
  }
}

const candyMachineId = getCandyMachineId()
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet')
)

const txTimeoutInMilliseconds = 30000

const App = () => {
  return (
    <Home
      candyMachineId={candyMachineId}
      connection={connection}
      txTimeout={txTimeoutInMilliseconds}
      rpcHost={rpcHost}
    />
  )
}

export default App
