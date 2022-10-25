import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import {ethers} from "ethers"
import abi from '../src/utlis/WavePortal.json'

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      console.log("Make sure you have metamask installed!!!");
      return null;
    }
    console.log("Metamask is installed", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account", account);
      return account;
    } else {
      console.log("No authorized account found");
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0xc24cC5FD87f6f5Dd437678d401A3C6826A3759E1";
  const contractABI = abi.abi;

  // connect wallet
  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MeataMask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected to", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  };

  // wave function 
  const wave = async () => {
    try {
      const {ethereum} = window;
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

        let count = await wavePortalContract.getTotalWaves()
        console.log("Retrieved total wave count...", count.toNumber());

        // writing to blockchain
        const waveTxn = await wavePortalContract.wave()
        console.log("Mining...", waveTxn.hash)

        await waveTxn.wait()
        console.log("Mined - ", waveTxn.hash)

        count = await wavePortalContract.getTotalWaves()
        console.log("Retrieved total wave count...", count.toNumber());

      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (e) {
      console.log(e)
    }
  } 

  useEffect(() => {
    async function check() {
      const account = await findMetaMaskAccount();
      if (account !== null) {
        setCurrentAccount(account);
      }
    }
    check();
  }, []);

  return (
    <div className={styles.mainContainer}>
    <div className={styles.dataContainer}>
      <div className={styles.header}>
        👋 Hey there!
      </div>

      <div className={styles.bio}>
        I am Kushagra, I build and ship projects off localhost so that's pretty cool right? Connect your Ethereum wallet and wave at me!
      </div>

      <button className={styles.waveButton} onClick={wave}>
        Wave at Me
      </button>

      {/*
       * If there is no currentAccount render this button
       */}
      {!currentAccount && (
        <button className={styles.waveButton} onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  </div>
  );
}
