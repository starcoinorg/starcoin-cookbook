//# init -n test

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


