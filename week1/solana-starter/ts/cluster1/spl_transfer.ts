import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import dotenv from "dotenv";

dotenv.config();

const secretKey = JSON.parse(process.env.SECRET_KEY!);

const keypair = Keypair.fromSecretKey(
    new Uint8Array(secretKey)
);

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("9MZbaaBWVubisECWJ4NuPCMYSuJuQodrTxeP9xBRw5w1");

const to = new PublicKey("7ECQhNSYfCWQoSHVvE9WaZ3Z9XiXceEhgHbYXpcGwh1X");
const amount = 1_000_000_000n;


(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        // Get the token account of the toWallet address, and if it does not exist, create it

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );


        // Transfer the new token to the "toTokenAccount" we just created
        
        const tx = await transfer(
            connection,
            keypair,                    // payer
            fromTokenAccount.address,   // source
            toTokenAccount.address,     // destination
            keypair,                    // owner (signer)
            amount
        );
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();