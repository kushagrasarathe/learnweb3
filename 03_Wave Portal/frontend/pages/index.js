import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

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

      <button className={styles.waveButton} onClick={null}>
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
