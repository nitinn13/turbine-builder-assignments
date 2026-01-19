import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import dotenv from "dotenv";

dotenv.config();

const secretKey = JSON.parse(process.env.SECRET_KEY!);

const keypair = Keypair.fromSecretKey(
  new Uint8Array(secretKey)
);

const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    const mint = await createMint(
      connection,
      keypair,
      keypair.publicKey,
      null,
      9,
      Keypair.generate()
    );

    console.log("Mint created at:", mint.toBase58());
  } catch (error) {
    console.error("Oops, something went wrong:", error);
  }
})();
