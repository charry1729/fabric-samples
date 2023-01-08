exports.get_id_data = async (req, res, next) => {
  if (!req.params) {
    res.status(404).json({
      message: 'Parameters are not suppied',
    });
  } else {
    console.log(req.params);

    const { Gateway, Wallets } = require('fabric-network');
    const FabricCAServices = require('fabric-ca-client');
    const path = require('path');
    const {
      buildCAClient,
      registerAndEnrollUser,
      enrollAdmin,
    } = require('./../../javascript/CAUtil.js');
    const {
      buildCCPOrg1,
      buildWallet,
    } = require('./../../javascript/AppUtil.js');

    const channelName = 'mychannel';
    const chaincodeName = 'notary';
    const mspOrg1 = 'Org1MSP';
    const walletPath = path.join(__dirname, '..', '..', 'wallet');
    //   const walletPath = path.join("./../../wallet/");
    // /home/chary/metric/fabric-samples/noderest/api/controllers/companycontroller.js
    // /home/chary/metric/fabric-samples/noderest/wallet
    //   const walletPath = "/home/chary/metric/fabric-samples/noderest/wallet";
    // const org1UserId = "admin";
    const org1UserId = 'appUser11';

    function prettyJSONString(inputString) {
      return JSON.stringify(JSON.parse(inputString), null, 2);
    }

    try {
       console.log("hereeeee1") ;    
      const ccp = buildCCPOrg1();
      const caClient = buildCAClient(FabricCAServices, ccp, 'ca_org1');
      const wallet = await buildWallet(Wallets, walletPath);
      await enrollAdmin(caClient, wallet, mspOrg1);
      console.log("hereeeee2");
      // in a real application this would be done only when a new user was required to be added
      // and would be part of an administrative flow
      await registerAndEnrollUser(
        caClient,
        wallet,
        mspOrg1,
        org1UserId,
        'org1.department1'
      );
      const gateway = new Gateway();

      await gateway.connect(ccp, {
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      });

      const network = await gateway.getNetwork(channelName);
      const contract = network.getContract(chaincodeName);

      result = await contract.evaluateTransaction('ReadAsset', req.params.id);

      console.log(`*** Result: ${prettyJSONString(result.toString())}`);
      res.status(200).json({
        message: 'Transaction has been submitted',
        data: JSON.parse(result.toString()),
      });

      gateway.disconnect();
    } catch (error) {
      console.error(`******** FAILED to run the application: ${error}`);

      res.status(500).json({
        message: error.toString(),
      });
    }
  }
};

exports.get_data = async (req, res, next) => {
  const { Gateway, Wallets } = require('fabric-network');
  const FabricCAServices = require('fabric-ca-client');
  const path = require('path');
  const {
    buildCAClient,
    registerAndEnrollUser,
    enrollAdmin,
  } = require('./../../javascript/CAUtil.js');
  const {
    buildCCPOrg1,
    buildWallet,
  } = require('./../../javascript/AppUtil.js');

  const channelName = 'mychannel';
  const chaincodeName = 'notary';
  const mspOrg1 = 'Org1MSP';
  const walletPath = path.join(__dirname, '..', '..', 'wallet');
  //   const walletPath = path.join("./../../wallet/");
  // /home/chary/metric/fabric-samples/noderest/api/controllers/companycontroller.js
  // /home/chary/metric/fabric-samples/noderest/wallet
  //   const walletPath = "/home/chary/metric/fabric-samples/noderest/wallet";
  // const org1UserId = "admin";
  const org1UserId = 'appUser11';

  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccp = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca_org1');
    const wallet = await buildWallet(Wallets, walletPath);
    await enrollAdmin(caClient, wallet, mspOrg1);

    // in a real application this would be done only when a new user was required to be added
    // and would be part of an administrative flow
    await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      org1UserId,
      'org1.department1'
    );
    const gateway = new Gateway();

    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
    });

    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    //   console.log(
    //     "\n--> Submit Transaction: createCompany, creates new asset arguments"
    //   );
    //   result = await contract.submitTransaction(
    //     "CreateCompany",
    //     "3",
    //     "CIN",
    //     "apple",
    //     "apple@email.com",
    //     "5555555555",
    //     "chary",
    //     "new"
    //   );
    //   console.log("*** Result: committed");
    //   if (`${result}` !== "") {
    //     console.log(`*** Result: ${prettyJSONString(result.toString())}`);
    //   }

    //   console.log(
    //     "\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID"
    //   );
    //   result = await contract.evaluateTransaction("ReadAsset", "1");
    //   console.log(`*** Result: ${prettyJSONString(result.toString())}`);

    console.log(
      '\n--> Evaluate Transaction: QueryAllCompanys, function returns all the current assets on the ledger'
    );
    let result = await contract.evaluateTransaction('QueryAssetHistory');
    console.log(`*** Result: ${prettyJSONString(result.toString())}`);
    res.status(200).json({
      message: 'Transaction has been submitted',
      data: JSON.parse(result.toString()),
    });

    gateway.disconnect();
  } catch (error) {
    console.error(`******** FAILED to run the application: ${error}`);

    res.status(500).json({
      message: error.toString(),
    });
  }
};
