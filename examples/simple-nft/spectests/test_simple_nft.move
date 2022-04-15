//# init -n test --public-keys SNFT=0x17fc40aa27bad102b323b506cd784057c3238bf876d5caf3bfa77f1bf8c638f8

//# faucet --addr SNFT --amount 10000000000000


//# run --signers SNFT
script {
    use SNFT::SimpleNFTScripts;

    fun main(sender: signer) {
        SimpleNFTScripts::initialize(sender);
    }
}

//# run --signers SNFT
script {
    use SNFT::SimpleNFTScripts;

    fun main(sender: signer) {
        SimpleNFTScripts::test_mint_with_image_data(sender);
    }
}

//# run --signers SNFT
script {
    use SNFT::SimpleNFTScripts;

    fun main(sender: signer) {
        SimpleNFTScripts::test_mint_with_image(sender);
    }
}


