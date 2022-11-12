import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import {ethers} from "ethers";
import abi from "../src/utlis/WavePortal.json";

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
  const [allWaves, setAllWaves] = useState([]);
  const [msg, setMsg] = useState("");

  const contractAddress = "0x3ecb62cfF8A622208bD7a29a61BE386Ce1Ce4d9a";
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
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        // writing to blockchain
        const waveTxn = await wavePortalContract.wave(msg, {
          gasLimit: 300000,
        });
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined - ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();

        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        /*
         * Store our data in React State
         */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function checkIfWalletIsConnected() {
      const account = await findMetaMaskAccount();
      if (account !== null) {
        setCurrentAccount(account);
        getAllWaves();
      }
    }
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAllWaves((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dataContainer}>
        <div className={styles.header}>👋 Hey there!</div>

        <div className={styles.bio}>
          I am Kushagra, I build and ship projects off localhost so that&apos;s
          pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <input
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          value={msg}
          placeholder="Enter a message here :)"
          className={styles.input}
        />

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

        {allWaves.map((wave, index) => {
          return (
            <div
              key={index}
              className={styles.waves}
            >
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
