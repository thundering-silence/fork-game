
import { ETHAuth, Proof } from "@0xsequence/ethauth"
import styled from '@emotion/styled'
import { useEffect, useState } from "react"

const Button = styled.button`
    align-items: center;
    background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #FFFFFF;
    display: flex;
    // font-family: Phantomsans, sans-serif;
    font-size: 20px;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 3px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
    height: 3.2rem;

`
const InnerButton = styled.div`
    background-color: rgb(5, 6, 45);
    padding: 16px 24px;
    border-radius: 6px;
    width: 100%;
    height: 1rem;
    transition: 300ms;

    &:hover {
        background: none;
    }
`


const truncateAddress = (address) => {
    const match = address.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};


const SequenceConnect = ({ wallet }) => {
    const [address, setAddress] = useState('');

    const connect = (
        authorize = false,
        withSettings = false
    ) => async () => {
        const connectDetails = await wallet.connect({
            app: "The web3 Dungeon",
            authorize,
            // keepWalletOpened: true,
            ...(withSettings && {
                settings: {
                    theme: "black",
                    bannerUrl: `${window.location.origin}`,
                    includedPaymentProviders: ["wyre", "moonpay", "ramp"],
                    defaultFundingCurrency: "matic",
                    defaultPurchaseAmount: 10,
                },
            }),
        })
        // console.log("connectDetails", { connectDetails })

        if (authorize) {
            const ethAuth = new ETHAuth()

            if (connectDetails.proof) {
                const decodedProof = await ethAuth.decodeProof(
                    connectDetails.proof.proofString,
                    true
                )

                console.warn({ decodedProof })

                const isValid = await wallet.utils.isValidTypedDataSignature(
                    await wallet.getAddress(),
                    connectDetails.proof.typedData,
                    decodedProof.signature,
                    await wallet.getAuthChainId()
                )
                console.log("isValid?", isValid)
                if (!isValid) throw new Error("sig invalid")
            }
            setAddress(truncateAddress(connectDetails.session.accountAddress));
        }
    }
    return (
        <>
            {!!address ? <Button onClick={() => wallet.openWallet()}>
                <InnerButton>{address}</InnerButton>
            </Button> : <Button onClick={connect(true, true)}>
                <InnerButton>Connect with Sequence</InnerButton>
            </Button>
            }
        </>
    )
}

export default SequenceConnect
