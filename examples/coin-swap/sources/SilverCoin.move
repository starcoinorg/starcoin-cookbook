module SilverCoin::SilverCoin {
    use StarcoinFramework::Signer;
    use BasicCoin::BasicCoin;

    struct SilverCoin has drop {}

    public fun setup_and_mint(account: &signer, amount: u64) {
        BasicCoin::publish_balance<SilverCoin>(account);
        BasicCoin::mint<SilverCoin>(Signer::address_of(account), amount, SilverCoin {});
    }

    public fun transfer(from: &signer, to: address, amount: u64) {
        BasicCoin::transfer<SilverCoin>(from, to, amount, SilverCoin {});
    }
}
