module CoinSwap::CoinSwap {
    use StarcoinFramework::Signer;
    use StarcoinFramework::Errors;
    use BasicCoin::BasicCoin;
    use CoinSwap::PoolToken;

    const ECOINSWAP_ADDRESS: u64 = 0;
    const EPOOL: u64 = 1;

    struct LiquidityPool<phantom CoinType1, phantom CoinType2> has key {
        coin1: u64,
        coin2: u64,
        share: u64,
    }

    public fun create_pool<CoinType1: drop, CoinType2: drop>(
        coinswap: &signer,
        requester: &signer,
        coin1: u64,
        coin2: u64,
        share: u64,
        witness1: CoinType1,
        witness2: CoinType2
    ) {
        // Create a pool at @CoinSwap.
        // TODO: If the balance is already published, this step should be skipped rather than abort.
        // TODO: Alternatively, `struct LiquidityPool` could be refactored to actually hold the coin (e.g., coin1: CoinType1).
        BasicCoin::publish_balance<CoinType1>(coinswap);
        BasicCoin::publish_balance<CoinType2>(coinswap);
        assert!(Signer::address_of(coinswap) == @CoinSwap, Errors::invalid_argument(ECOINSWAP_ADDRESS));
        assert!(!exists<LiquidityPool<CoinType1, CoinType2>>(Signer::address_of(coinswap)), Errors::already_published(EPOOL));
        move_to(coinswap, LiquidityPool<CoinType1, CoinType2>{coin1, coin2, share});

        // Transfer the initial liquidity of CoinType1 and CoinType2 to the pool under @CoinSwap.
        BasicCoin::transfer<CoinType1>(requester, Signer::address_of(coinswap), coin1, witness1);
        BasicCoin::transfer<CoinType2>(requester, Signer::address_of(coinswap), coin2, witness2);

        // Mint PoolToken and deposit it in the account of requester.
        PoolToken::setup_and_mint<CoinType1, CoinType2>(requester, share);
    }

    fun get_input_price(input_amount: u64, input_reserve: u64, output_reserve: u64): u64 {
        let input_amount_with_fee = input_amount * 997;
        let numerator = input_amount_with_fee * output_reserve;
        let denominator = (input_reserve * 1000) + input_amount_with_fee;
        numerator / denominator
    }

    public fun coin1_to_coin2_swap_input<CoinType1: drop, CoinType2: drop>(
        coinswap: &signer,
        requester: &signer,
        coin1: u64,
        witness1: CoinType1,
        witness2: CoinType2
    ) acquires LiquidityPool {
        assert!(Signer::address_of(coinswap) == @CoinSwap, Errors::invalid_argument(ECOINSWAP_ADDRESS));
        assert!(exists<LiquidityPool<CoinType1, CoinType2>>(Signer::address_of(coinswap)), Errors::not_published(EPOOL));
        let pool = borrow_global_mut<LiquidityPool<CoinType1, CoinType2>>(Signer::address_of(coinswap));
        let coin2 = get_input_price(coin1, pool.coin1, pool.coin2);
        pool.coin1 = pool.coin1 + coin1;
        pool.coin2 = pool.coin2 - coin2;

        BasicCoin::transfer<CoinType1>(requester, Signer::address_of(coinswap), coin1, witness1);
        BasicCoin::transfer<CoinType2>(coinswap, Signer::address_of(requester), coin2, witness2);
    }

    public fun add_liquidity<CoinType1: drop, CoinType2: drop>(
        account: &signer,
        coin1: u64,
        coin2: u64,
        witness1: CoinType1,
        witness2: CoinType2,
    ) acquires LiquidityPool {
        let pool = borrow_global_mut<LiquidityPool<CoinType1, CoinType2>>(@CoinSwap);

        let coin1_added = coin1;
        let share_minted = (coin1_added * pool.share) / pool.coin1;
        let coin2_added = (share_minted * pool.coin2) / pool.share;

        pool.coin1 = pool.coin1 + coin1_added;
        pool.coin2 = pool.coin2 + coin2_added;
        pool.share = pool.share + share_minted;

        BasicCoin::transfer<CoinType1>(account, @CoinSwap, coin1, witness1);
        BasicCoin::transfer<CoinType2>(account, @CoinSwap, coin2, witness2);
        PoolToken::mint<CoinType1, CoinType2>(Signer::address_of(account), share_minted)
    }

    public fun remove_liquidity<CoinType1: drop, CoinType2: drop>(
        coinswap: &signer,
        requester: &signer,
        share: u64,
        witness1: CoinType1,
        witness2: CoinType2,
    ) acquires LiquidityPool {
        let pool = borrow_global_mut<LiquidityPool<CoinType1, CoinType2>>(@CoinSwap);

        let coin1_removed = (pool.coin1 * share) / pool.share;
        let coin2_removed = (pool.coin2 * share) / pool.share;

        pool.coin1 = pool.coin1 - coin1_removed;
        pool.coin2 = pool.coin2 - coin2_removed;
        pool.share = pool.share - share;

        BasicCoin::transfer<CoinType1>(coinswap, Signer::address_of(requester), coin1_removed, witness1);
        BasicCoin::transfer<CoinType2>(coinswap, Signer::address_of(requester), coin2_removed, witness2);
        PoolToken::burn<CoinType1, CoinType2>(Signer::address_of(requester), share)
    }
}
