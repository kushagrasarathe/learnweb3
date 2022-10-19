const MoodContractAddress = "0xBEc66a04bF5c35F0086b6F8f793A3bcaD0EC2656";
const MoodContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_mood",
                "type": "string"
            }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
let MoodContract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
            MoodContractAddress,
            MoodContractABI,
            signer
        );
    });
});

async function getMood() {
    const getMoodPromise = MoodContract.getMood()
    const Mood = await getMoodPromise;
    console.log(Mood);
}

async function setMood() {
    const mood = document.getElementById("mood").value;
    const setMoodPromise = MoodContract.setMood(mood)
    await setMoodPromise
}