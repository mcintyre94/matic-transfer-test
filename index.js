import ethers from "ethers";

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
  console.error("Wallet private key missing")
  process.exit(1)
}

const wallet = new ethers.Wallet(
  // Wallet private key. NEVER CHECK THE KEY IN. ALWAYS USE ENVIRONMENT VARIABLES.
  process.env.WALLET_PRIVATE_KEY,
  // We use Polygon Mumbai network
  ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
);

const transaction = {
  to: '0x22f542CD394FBA213DF8D1f6c46f454b74E05503',
  value: ethers.utils.parseEther("0.1"),
}

console.log("Sending 0.1 MATIC...")
const response = await wallet.sendTransaction(transaction)
console.log(response);

console.log("Waiting for complete")
const receipt = await response.wait()
console.log("Complete!")
console.log(receipt)