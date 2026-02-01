use anchor_lang::prelude::*;
pub mod instructions;
pub use instructions::*;

pub mod state;
pub use state::*;

declare_id!("3bzXt323AgCuL19Zad7UzWa8xVvPVAN4bFvr7YBH66ip");

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn make(ctx: Context<Make>, seed: u64, deposit: u64, receive: u64) -> Result<()> {
        ctx.accounts.init_escrow(seed, receive, &ctx.bumps)?;
        ctx.accounts.deposit(deposit)
    }
    pub fn take(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.vault_transfer()?;
        ctx.accounts.maker_transfer()?;
        ctx.accounts.close_vault()
    }
    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        ctx.accounts.process_refund()
    }
}
