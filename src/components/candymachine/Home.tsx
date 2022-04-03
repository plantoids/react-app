import { useEffect, useMemo, useState, useCallback } from 'react'
import * as anchor from '@project-serum/anchor'

import styled from 'styled-components'
import { PublicKey, Transaction } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  CANDY_MACHINE_PROGRAM,
  getCandyMachineState,
  mintOneToken,
} from './candy-machine'
import { AlertState, toDate, formatNumber, getAtaForMint } from './utils'
// import { MintCountdown } from './MintCountdown'
import { MintButton } from './MintButton'
import { GatewayProvider } from '@civic/solana-gateway-react'
import { sendTransaction } from './connection'

const MintContainer = styled.div`` // add your owns styles here

export interface HomeProps {
  candyMachineId?: anchor.web3.PublicKey
  connection: anchor.web3.Connection
  txTimeout: number
  rpcHost: string
}

const Home = (props: HomeProps) => {
  const [isUserMinting, setIsUserMinting] = useState(false)
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>()
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  })
  const [isActive, setIsActive] = useState(false)
  const [endDate, setEndDate] = useState<Date>()
  const [itemsRemaining, setItemsRemaining] = useState<number>()
  const [isWhitelistUser, setIsWhitelistUser] = useState(false)
  const [isPresale, setIsPresale] = useState(false)
  const [discountPrice, setDiscountPrice] = useState<anchor.BN>()

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
        let active =
          cndy?.state.goLiveDate?.toNumber() < new Date().getTime() / 1000
        let presale = false
        // whitelist mint?
        if (cndy?.state.whitelistMintSettings) {
          // is it a presale mint?
          if (
            cndy.state.whitelistMintSettings.presale &&
            (!cndy.state.goLiveDate ||
              cndy.state.goLiveDate.toNumber() > new Date().getTime() / 1000)
          ) {
            presale = true
          }
          // is there a discount?
          if (cndy.state.whitelistMintSettings.discountPrice) {
            setDiscountPrice(cndy.state.whitelistMintSettings.discountPrice)
          } else {
            setDiscountPrice(undefined)
            // when presale=false and discountPrice=null, mint is restricted
            // to whitelist users only
            if (!cndy.state.whitelistMintSettings.presale) {
              cndy.state.isWhitelistOnly = true
            }
          }
          // retrieves the whitelist token
          const mint = new anchor.web3.PublicKey(
            cndy.state.whitelistMintSettings.mint
          )
          const token = (await getAtaForMint(mint, anchorWallet.publicKey))[0]

          try {
            const balance = await props.connection.getTokenAccountBalance(token)
            let valid = parseInt(balance.value.amount) > 0
            // only whitelist the user if the balance > 0
            setIsWhitelistUser(valid)
            active = (presale && valid) || active
          } catch (e) {
            setIsWhitelistUser(false)
            // no whitelist user, no mint
            if (cndy.state.isWhitelistOnly) {
              active = false
            }
            console.log('There was a problem fetching whitelist token balance')
            console.log(e)
          }
        }
        // datetime to stop the mint?
        if (cndy?.state.endSettings?.endSettingType.date) {
          setEndDate(toDate(cndy.state.endSettings.number))
          if (
            cndy.state.endSettings.number.toNumber() <
            new Date().getTime() / 1000
          ) {
            active = false
          }
        }
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

        if (cndy.state.isSoldOut) {
          active = false
        }

        setIsActive((cndy.state.isActive = active))
        setIsPresale((cndy.state.isPresale = presale))
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
          setIsActive((candyMachine.state.isActive = remaining > 0))
          candyMachine.state.isSoldOut = remaining === 0
          setAlertState({
            open: true,
            message: 'Congratulations! Mint succeeded!',
            severity: 'success',
          })
        } else {
          setAlertState({
            open: true,
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

      setAlertState({
        open: true,
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

  const toggleMintButton = () => {
    let active = !isActive || isPresale

    if (active) {
      if (candyMachine!.state.isWhitelistOnly && !isWhitelistUser) {
        active = false
      }
      if (endDate && Date.now() >= endDate.getTime()) {
        active = false
      }
    }

    if (
      isPresale &&
      candyMachine!.state.goLiveDate &&
      candyMachine!.state.goLiveDate.toNumber() <= new Date().getTime() / 1000
    ) {
      setIsPresale((candyMachine!.state.isPresale = false))
    }

    setIsActive((candyMachine!.state.isActive = active))
  }

  useEffect(() => {
    refreshCandyMachineState()
  }, [
    anchorWallet,
    props.candyMachineId,
    props.connection,
    refreshCandyMachineState,
  ])

  return (
    <div style={{ marginTop: 100 }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            padding: 24,
            paddingBottom: 10,
            backgroundColor: '#151A1F',
            borderRadius: 6,
          }}
        >
          {!wallet.connected ? (
            <p>You must connect dat wallet bruh</p>
          ) : (
            <>
              {candyMachine && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'nowrap',
                  }}
                >
                  <div>
                    <p>Remaining: {`${itemsRemaining}`}</p>
                    <p>
                      {isWhitelistUser && discountPrice
                        ? 'Discount Price'
                        : 'Price'}
                      :
                      {isWhitelistUser && discountPrice
                        ? `◎ ${formatNumber.asNumber(discountPrice)}`
                        : `◎ ${formatNumber.asNumber(
                            candyMachine.state.price
                          )}`}
                    </p>
                    <div>
                      {isActive && endDate && Date.now() < endDate.getTime() ? (
                        <>
                          {/* <MintCountdown
                          key="endSettings"
                          date={getCountdownDate(candyMachine)}
                          style={{ justifyContent: 'flex-end' }}
                          status="COMPLETED"
                          onComplete={toggleMintButton}
                        /> */}
                          <span>TO END OF MINT</span>
                        </>
                      ) : (
                        <>
                          {/* <MintCountdown
                          key="goLive"
                          date={getCountdownDate(candyMachine)}
                          style={{ justifyContent: 'flex-end' }}
                          status={
                            candyMachine?.state?.isSoldOut ||
                            (endDate && Date.now() > endDate.getTime())
                              ? 'COMPLETED'
                              : isPresale
                              ? 'PRESALE'
                              : 'LIVE'
                          }
                          onComplete={toggleMintButton}
                        /> */}
                          {isPresale &&
                            candyMachine.state.goLiveDate &&
                            candyMachine.state.goLiveDate.toNumber() >
                              new Date().getTime() / 1000 && (
                              <span>UNTIL PUBLIC MINT</span>
                            )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <MintContainer>
                {candyMachine?.state.isActive &&
                candyMachine?.state.gatekeeper &&
                wallet.publicKey &&
                wallet.signTransaction ? (
                  <GatewayProvider
                    wallet={{
                      publicKey:
                        wallet.publicKey ||
                        new PublicKey(CANDY_MACHINE_PROGRAM),
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
                      if (userMustSign) {
                        setAlertState({
                          open: true,
                          message: 'Please sign one-time Civic Pass issuance',
                          severity: 'info',
                        })
                        try {
                          transaction = await wallet.signTransaction!(
                            transaction
                          )
                        } catch (e) {
                          setAlertState({
                            open: true,
                            message: 'User cancelled signing',
                            severity: 'error',
                          })
                          // setTimeout(() => window.location.reload(), 2000);
                          setIsUserMinting(false)
                          throw e
                        }
                      } else {
                        setAlertState({
                          open: true,
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
                        setAlertState({
                          open: true,
                          message: 'Please sign minting',
                          severity: 'info',
                        })
                      } catch (e) {
                        setAlertState({
                          open: true,
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
                      isActive={isActive || (isPresale && isWhitelistUser)}
                    />
                  </GatewayProvider>
                ) : (
                  <MintButton
                    candyMachine={candyMachine}
                    isMinting={isUserMinting}
                    setIsMinting={(val) => setIsUserMinting(val)}
                    onMint={onMint}
                    isActive={isActive || (isPresale && isWhitelistUser)}
                  />
                )}
              </MintContainer>
            </>
          )}
          <span>Powered by METAPLEX</span>
        </div>
      </div>
      {alertState.open && <div>{alertState.message}</div>}
    </div>
  )
}

const getCountdownDate = (
  candyMachine: CandyMachineAccount
): Date | undefined => {
  if (
    candyMachine.state.isActive &&
    candyMachine.state.endSettings?.endSettingType.date
  ) {
    return toDate(candyMachine.state.endSettings.number)
  }

  return toDate(
    candyMachine.state.goLiveDate
      ? candyMachine.state.goLiveDate
      : candyMachine.state.isPresale
      ? new anchor.BN(new Date().getTime() / 1000)
      : undefined
  )
}

export default Home
