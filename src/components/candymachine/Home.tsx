import { useEffect, useMemo, useState, useCallback } from 'react'
import * as anchor from '@project-serum/anchor'

import { PublicKey, Transaction } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { GatewayProvider } from '@civic/solana-gateway-react'

import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  CANDY_MACHINE_PROGRAM,
  getCandyMachineState,
  mintOneToken,
} from 'src/components/candymachine/candy-machine'
import { MintButton } from 'src/components/candymachine/MintButton'
import { sendTransaction } from 'src/components/candymachine/connection'
import 'src/components/candymachine/Home.css'

export interface HomeProps {
  candyMachineId?: anchor.web3.PublicKey
  connection: anchor.web3.Connection
  txTimeout: number
  rpcHost: string
}

const Home = (props: HomeProps) => {
  const [isUserMinting, setIsUserMinting] = useState(false)
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>()
  const [isActive, setIsActive] = useState(false)
  const [itemsRemaining, setItemsRemaining] = useState<number>()

  const rpcUrl = props.rpcHost
  const wallet = useWallet()

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet
  }, [wallet])

  const refreshCandyMachineState = useCallback(async () => {
    if (!anchorWallet) {
      return
    }

    if (props.candyMachineId) {
      try {
        const cndy = await getCandyMachineState(
          anchorWallet,
          props.candyMachineId,
          props.connection
        )
        setIsActive(
          cndy.state.goLiveDate?.toNumber() < new Date().getTime() / 1000
        )

        // amount to stop the mint?
        if (cndy?.state.endSettings?.endSettingType.amount) {
          let limit = Math.min(
            cndy.state.endSettings.number.toNumber(),
            cndy.state.itemsAvailable
          )
          if (cndy.state.itemsRedeemed < limit) {
            setItemsRemaining(limit - cndy.state.itemsRedeemed)
          } else {
            setItemsRemaining(0)
            cndy.state.isSoldOut = true
          }
        } else {
          setItemsRemaining(cndy.state.itemsRemaining)
        }

        setCandyMachine(cndy)
      } catch (e) {
        console.log('There was a problem fetching Candy Machine state')
        console.log(e)
      }
    }
  }, [anchorWallet, props.candyMachineId, props.connection])

  const onMint = async (
    beforeTransactions: Transaction[] = [],
    afterTransactions: Transaction[] = []
  ) => {
    try {
      setIsUserMinting(true)
      document.getElementById('#identity')?.click()
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        let mintOne = await mintOneToken(
          candyMachine,
          wallet.publicKey,
          beforeTransactions,
          afterTransactions
        )

        const mintTxId = mintOne[0]

        let status: any = { err: true }
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            props.txTimeout,
            props.connection,
            true
          )
        }

        if (status && !status.err) {
          // manual update since the refresh might not detect
          // the change immediately
          let remaining = itemsRemaining! - 1
          setItemsRemaining(remaining)
          setIsActive(remaining > 0)
          candyMachine.state.isSoldOut = remaining === 0
          console.log({
            message: 'Congratulations! Mint succeeded!',
            severity: 'success',
          })
        } else {
          console.log({
            message: 'Mint failed! Please try again!',
            severity: 'error',
          })
        }
      }
    } catch (error: any) {
      let message = error.msg || 'Minting failed! Please try again!'
      if (!error.msg) {
        if (!error.message) {
          message = 'Transaction Timeout! Please try again.'
        } else if (error.message.indexOf('0x137')) {
          console.log(error)
          message = `SOLD OUT!`
        } else if (error.message.indexOf('0x135')) {
          message = `Insufficient funds to mint. Please fund your wallet.`
        }
      } else {
        if (error.code === 311) {
          console.log(error)
          message = `SOLD OUT!`
          window.location.reload()
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`
        }
      }

      console.log({
        message,
        severity: 'error',
      })
      // updates the candy machine state to reflect the lastest
      // information on chain
      refreshCandyMachineState()
    } finally {
      setIsUserMinting(false)
    }
  }

  useEffect(() => {
    refreshCandyMachineState()
  }, [
    anchorWallet,
    props.candyMachineId,
    props.connection,
    refreshCandyMachineState,
  ])

  console.log({
    isActive,
    gateKeeper: candyMachine?.state.gatekeeper,
    pubKey: wallet.publicKey,
    signFn: wallet.signTransaction,
  })

  return (
    <>
      {!wallet.connected ? (
        <WalletMultiButton />
      ) : (
        <>
          {isActive &&
            candyMachine?.state.gatekeeper &&
            wallet.publicKey &&
            wallet.signTransaction && (
              <GatewayProvider
                wallet={{
                  publicKey:
                    wallet.publicKey || new PublicKey(CANDY_MACHINE_PROGRAM),
                  //@ts-ignore
                  signTransaction: wallet.signTransaction,
                }}
                gatekeeperNetwork={
                  candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                }
                clusterUrl={rpcUrl}
                handleTransaction={async (transaction: Transaction) => {
                  setIsUserMinting(true)
                  const userMustSign = transaction.signatures.find((sig) =>
                    sig.publicKey.equals(wallet.publicKey!)
                  )
                  console.log('userMustSign', !!userMustSign)
                  if (userMustSign) {
                    console.log({
                      message: 'Please sign one-time Civic Pass issuance',
                      severity: 'info',
                    })
                    try {
                      transaction = await wallet.signTransaction!(transaction)
                    } catch (e) {
                      console.log({
                        message: 'User cancelled signing',
                        severity: 'error',
                      })
                      // setTimeout(() => window.location.reload(), 2000);
                      setIsUserMinting(false)
                      throw e
                    }
                  } else {
                    console.log({
                      message: 'Refreshing Civic Pass',
                      severity: 'info',
                    })
                  }
                  try {
                    await sendTransaction(
                      props.connection,
                      wallet,
                      transaction,
                      [],
                      true,
                      'confirmed'
                    )
                    console.log({
                      message: 'Please sign minting',
                      severity: 'info',
                    })
                  } catch (e) {
                    console.log({
                      message:
                        'Solana dropped the transaction, please try again',
                      severity: 'warning',
                    })
                    console.error(e)
                    // setTimeout(() => window.location.reload(), 2000);
                    setIsUserMinting(false)
                    throw e
                  }
                  await onMint()
                }}
                broadcastTransaction={false}
                options={{ autoShowModal: false }}
              >
                <MintButton
                  candyMachine={candyMachine}
                  isMinting={isUserMinting}
                  setIsMinting={(val) => setIsUserMinting(val)}
                  onMint={onMint}
                  isActive={isActive}
                />
              </GatewayProvider>
            )}
          {candyMachine && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'nowrap',
              }}
            >
              <p>{`${itemsRemaining} left`}</p>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Home
