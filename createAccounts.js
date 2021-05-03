const algosdk = require('algosdk');
var acct = null;
acct = algosdk.generateAccount();

account1 = acct.addr;
var account1_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);

acct = algosdk.generateAccount();

account2 = acct.addr;
var account2_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);

acct = algosdk.generateAccount();

account3 = acct.addr;
var account3_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
console.log("Account 1 = \"" + account1_mnemonic + "\"");
console.log("Account 2 = \"" + account2_mnemonic + "\"");
console.log("Account 3 = \"" + account3_mnemonic + "\"");

const server = "https://testnet.algoexplorerapi.io";
const token = {
    'X-API-Key': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
}

const port = '';
// Instantiate the algod wrapper
let algodclient = new algosdk.Algodv2(token, server, port);

(async () => {
    let account_info = (await algodclient.accountInformation(recoveredAccount1.addr).do());
    account_info = (await algodclient.accountInformation(recoveredAccount2.addr).do());
    account_info = (await algodclient.accountInformation(recoveredAccount3.addr).do());
})().catch(e => {
    console.log(e);
});