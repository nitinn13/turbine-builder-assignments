import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import dotenv from "dotenv";

dotenv.config();

const secretKey = JSON.parse(process.env.SECRET_KEY!);
const keypair = Keypair.fromSecretKey(new Uint8Array(secretKey));

const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("9MZbaaBWVubisECWJ4NuPCMYSuJuQodrTxeP9xBRw5w1");

const amount = 1_000_000_000n;

(async () => {
  try {
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );

    console.log("Your ATA:", ata.address.toBase58());

    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair,   
      amount
    );

    console.log("Mint tx:", mintTx);
  } catch (error) {
    console.error("Oops, something went wrong:", error);
  }
})();
