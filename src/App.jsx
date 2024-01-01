import "./App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import HomePage from "./Pages/HomePage";
import LoginSignUp from "./Pages/LoginSignUp";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  contractAddressProfile,
  contractAbiProfile,
} from "./Constants/Profile";
import {
  contractAddressAnnouncement,
  contractAbiAnnouncement,
} from "./Constants/Announcement";
import { contractAddressFIR, contractAbiFIR } from "./Constants/FIR";
import { contractAddressToken, contractAbiToken } from "./Constants/Token";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Civic-Shield",
  projectId: "9424e85ad744b3a8ba74d8301acb1c42",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contractAnnouncement, setContractAnnouncement] = useState(null);
  const [contractToken, setContractToken] = useState(null);
  const [contractFIR, setContractFIR] = useState(null);
  const [contractProfileManager, setContractProfileManager] = useState(null);

  async function loadBcData() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);

        const contractInstanceProfile = new ethers.Contract(
          contractAddressProfile,
          contractAbiProfile,
          signer
        );
        console.log(contractInstanceProfile);
        setContractProfileManager(contractInstanceProfile);

        const contractInstanceAnnouncement = new ethers.Contract(
          contractAddressAnnouncement,
          contractAbiAnnouncement,
          signer
        );
        console.log(contractInstanceAnnouncement);
        setContractAnnouncement(contractInstanceAnnouncement);

        const contractInstanceFIR = new ethers.Contract(
          contractAddressFIR,
          contractAbiFIR,
          signer
        );
        console.log(contractInstanceFIR);
        setContractFIR(contractInstanceFIR);

        const contractInstanceToken = new ethers.Contract(
          contractAddressToken,
          contractAbiToken,
          signer
        );
        console.log(contractInstanceToken);
        setContractToken(contractInstanceToken);

        const address = await signer.getAddress();
        console.log("Metamask Connected to " + address);
        setAccountAddress(address);
      } else {
        const provider = new ethers.providers.Web3Provider(publicProvider);
        const signer = provider.getSigner();
        setSigner(signer);
        const contractInstanceProfile = new ethers.Contract(
          contractAddressProfile,
          contractAbiProfile,
          signer
        );
        console.log(contractInstanceProfile);
        setContractProfileManager(contractInstanceProfile);

        const contractInstanceAnnouncement = new ethers.Contract(
          contractAddressAnnouncement,
          contractAbiAnnouncement,
          signer
        );
        console.log(contractInstanceAnnouncement);
        setContractAnnouncement(contractInstanceAnnouncement);

        const contractInstanceFIR = new ethers.Contract(
          contractAddressFIR,
          contractAbiFIR,
          signer
        );
        console.log(contractInstanceFIR);
        setContractFIR(contractInstanceFIR);

        const contractInstanceToken = new ethers.Contract(
          contractAddressToken,
          contractAbiToken,
          signer
        );
        console.log(contractInstanceToken);
        setContractToken(contractInstanceToken);
        const address = await signer.getAddress();
        console.log("Public Provider Connected to " + address);
        setAccountAddress(address);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    loadBcData();
  },[])

  return (
    <div className="App">
      <HomePage />
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <LoginSignUp contractProfileManager={contractProfileManager}/>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
