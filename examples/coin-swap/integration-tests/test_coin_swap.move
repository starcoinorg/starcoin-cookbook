//# init -n test

//# faucet --addr Dummy

//# faucet --addr alice

//# publish
module Dummy::DummyModule {}

//# run 0x1::Account::accept_token --signers alice  --type-args 0x1::DummyToken::DummyToken

//# view --address alice --resource 0x1::Account::Account

//# view --address StarcoinFramework --resource 0x1::Config::Config<0x1::VMConfig::VMConfig>

