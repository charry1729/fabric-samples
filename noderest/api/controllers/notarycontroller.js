exports.load_data1 = async (req, res, next) => {
  const { Gateway, Wallets } = require('fabric-network');
  const FabricCAServices = require('fabric-ca-client');
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const fs = require('fs');
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
  const org1UserId = 'appUser11';
  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccpPath = path.resolve(
      './../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
    );
    console.log('ccpPath', ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, '..', '..', 'wallet');

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get('admin');
    if (!identity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log('Run the registerUser.js application before retrying');
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });
    console.log('herere5');

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    console.log('herere55');
    let transaction;

    // Submit the specified transaction.

    // result = await contract.submitTransaction(
    //   'CreateAsset',
    //   req.body.asset_id,
    //   req.body.sno,
    //   req.body.size,
    //   req.body.street,
    //   req.body.city,
    //   req.body.propertyNo,
    //   req.body.owner,
    //   req.body.status
    // );
    const asset_properties = {
      object_type: 'asset_properties',
      asset_id: req.body.asset_id,
      salt: Buffer.from(randomNumber.toString()).toString('hex'),
      sno: req.body.sno,
      size: req.body.size,
      street: req.body.street,
      city: req.body.city,
      propertyNo: req.body.propertyNo,
      owner: req.body.owner,
      status: req.body.status,
    };
    const asset_properties_string = JSON.stringify(asset_properties);

    console.log(`${asset_properties_string}`);
    transaction = contract.createTransaction('CreateAsset');
    //transaction.setEndorsingOrganizations(org1);
    transaction.setTransient({
      asset_properties: Buffer.from(asset_properties_string),
    });
    await transaction.submit(
      req.body.asset_id,
      `Asset ${req.body.asset_id} owned by org1 `
    );
    console.log(
      `*** Result: committed, asset ${req.body.asset_id} is owned by Org1`
    );

    // asset_id: salt: sno: size: street: city: propertyNo: owner: status: console.log(
    //   '*** Result: committed'
    // );

    console.log('Transaction has been submitted');
    res.status(200).json({
      message: 'Transaction has been submitted',
    });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).json({
      message: error.toString(),
    });
    // process.exit(1);
  }
};

exports.load_data2 = async (req, res, next) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

  const { Gateway, Wallets } = require('fabric-network');
  const FabricCAServices = require('fabric-ca-client');

  const fs = require('fs');
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
  const mspOrg2 = 'Org2MSP';
  const org2UserId = 'appUser22';
  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccpPath = path.resolve(
      './../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
    );
    console.log('ccpPath', ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, '..', '..', 'wallet','org2');

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    // const identity = await wallet.get('admin');
    // if (!identity) {
    //   console.log(
    //     'An identity for the user "admin" does not exist in the wallet'
    //   );
    //   console.log('Run the registerUser.js application before retrying');
    //   return;
    // }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org2UserId,
      discovery: { enabled: true, asLocalhost: true },
    });
    console.log('herere5');

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    console.log('herere55');
    let transaction;

    // Submit the specified transaction.

    // result = await contract.submitTransaction(
    //   'CreateAsset',
    //   req.body.asset_id,
    //   req.body.sno,
    //   req.body.size,
    //   req.body.street,
    //   req.body.city,
    //   req.body.propertyNo,
    //   req.body.owner,
    //   req.body.status
    // );
    const asset_properties = {
      object_type: 'asset_properties',
      asset_id: req.body.asset_id,
      salt: Buffer.from(randomNumber.toString()).toString('hex'),
      sno: req.body.sno,
      size: req.body.size,
      street: req.body.street,
      city: req.body.city,
      propertyNo: req.body.propertyNo,
      owner: req.body.owner,
      status: req.body.status,
    };
    const asset_properties_string = JSON.stringify(asset_properties);

    console.log(`${asset_properties_string}`);
    transaction = contract.createTransaction('CreateAsset');
    //transaction.setEndorsingOrganizations(org1);
    transaction.setTransient({
      asset_properties: Buffer.from(asset_properties_string),
    });
    await transaction.submit(
      req.body.asset_id,
      `Asset ${req.body.asset_id} owned by org2 `
    );
    console.log(
      `*** Result: committed, asset ${req.body.asset_id} is owned by Org2`
    );

    // asset_id: salt: sno: size: street: city: propertyNo: owner: status: console.log(
    //   '*** Result: committed'
    // );

    console.log('Transaction has been submitted');
    res.status(200).json({
      message: 'Transaction has been submitted',
    });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).json({
      message: error.toString(),
    });
    // process.exit(1);
  }
};

exports.verify_data = async (req, res, next) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

  const { Gateway, Wallets } = require('fabric-network');
  const FabricCAServices = require('fabric-ca-client');

  const fs = require('fs');
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
  const mspOrg2 = 'Org2MSP';
  const org2UserId = 'appUser22';
  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccpPath = path.resolve(
      './../test-network/organizations/peerOrganizations/org2.example.com/connection-org2.json'
    );
    console.log('ccpPath', ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, '..', '..', 'wallet','org2');

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    // const identity = await wallet.get('admin');
    // if (!identity) {
    //   console.log(
    //     'An identity for the user "admin" does not exist in the wallet'
    //   );
    //   console.log('Run the registerUser.js application before retrying');
    //   return;
    // }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org2UserId,
      discovery: { enabled: true, asLocalhost: true },
    });
    console.log('herere5');

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    console.log('herere55');
    let transaction;

    // Submit the specified transaction.

    // result = await contract.submitTransaction(
    //   'CreateAsset',
    //   req.body.asset_id,
    //   req.body.sno,
    //   req.body.size,
    //   req.body.street,
    //   req.body.city,
    //   req.body.propertyNo,
    //   req.body.owner,
    //   req.body.status
    // );
    const asset_properties = {
      object_type: 'asset_properties',
      asset_id: req.body.asset_id,
      salt: req.body.salt, //Buffer.from(randomNumber.toString()).toString('hex'),
      sno: req.body.sno,
      size: req.body.size,
      street: req.body.street,
      city: req.body.city,
      propertyNo: req.body.propertyNo,
      owner: req.body.owner,
      status: req.body.status,
    };
    const asset_properties_string = JSON.stringify(asset_properties);

    console.log(`${asset_properties_string}`);
    transaction = contract.createTransaction('VerifyAssetProperties');
    // transaction.setEndorsingOrganizations(org1);
    transaction.setTransient({
      asset_properties: Buffer.from(asset_properties_string),
    });
    console.log('camererer');
    const verifyResultBuffer = await transaction.evaluate(req.body.asset_id);
    if (verifyResultBuffer) {
      const verifyResult = Boolean(verifyResultBuffer.toString());
      if (verifyResult) {
        console.log(
          `*** Successfully VerifyAssetProperties, private information about asset ${req.body.asset_id} has been verified by Org2`
        );
      } else {
        console.log(
          `*** Failed: VerifyAssetProperties, private information about asset ${req.body.asset_id} has not been verified by Org2`
        );
      }
    } else {
      console.log(
        `*** Failed: VerifyAssetProperties, private information about asset ${req.body.asset_id} has not been verified by Org2`
      );
    }
    // await transaction.submit(
    //   req.body.asset_id,
    //   `Asset ${req.body.asset_id} owned by org2 `
    // );
    // console.log(
    //   `*** Result: committed, asset ${req.body.asset_id} is owned by Org2`
    // );

    // asset_id: salt: sno: size: street: city: propertyNo: owner: status: console.log(
    //   '*** Result: committed'
    // );

    console.log('Transaction has been submitted');
    res.status(200).json({
      message: 'Transaction has been submitted',
    });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).json({
      message: error.toString(),
    });
    // process.exit(1);
  }
};

exports.transfer1_data = async (req, res, next) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

  const { Gateway, Wallets } = require('fabric-network');
  const FabricCAServices = require('fabric-ca-client');

  const fs = require('fs');
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
  const mspOrg2 = 'Org1MSP';
  const org1UserId = 'appUser11';
  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccpPath = path.resolve(
      './../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
    );
    console.log('ccpPath', ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, '..', '..', 'wallet');

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    // const identity = await wallet.get('admin');
    // if (!identity) {
    //   console.log(
    //     'An identity for the user "admin" does not exist in the wallet'
    //   );
    //   console.log('Run the registerUser.js application before retrying');
    //   return;
    // }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });
    console.log('herere5');

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    console.log('herere55');
    let transaction;

    // Submit the specified transaction.

    // result = await contract.submitTransaction(
    //   'CreateAsset',
    //   req.body.asset_id,
    //   req.body.sno,
    //   req.body.size,
    //   req.body.street,
    //   req.body.city,
    //   req.body.propertyNo,
    //   req.body.owner,
    //   req.body.status
    // );
    const asset_properties = {
      object_type: 'asset_properties',
      asset_id: req.body.asset_id,
      salt: Buffer.from(randomNumber.toString()).toString('hex'),
      sno: req.body.sno,
      size: req.body.size,
      street: req.body.street,
      city: req.body.city,
      propertyNo: req.body.propertyNo,
      owner: req.body.owner,
      status: req.body.status,
    };
    const asset_properties_string = JSON.stringify(asset_properties);

    console.log(`${asset_properties_string}`);
    transaction = contract.createTransaction('TransferAsset');
    transaction.setEndorsingOrganizations(org1, org2);
    transaction.setTransient({
      asset_properties: Buffer.from(asset_properties_string),
    });

    await transaction.submit(req.body.asset_id, org1);
    console.log(
      `${RED}*** FAILED: committed, TransferAsset - Org2 now owns the asset ${req.body.asset_id}${RESET}`
    );

    // asset_id: salt: sno: size: street: city: propertyNo: owner: status: console.log(
    //   '*** Result: committed'
    // );

    console.log('Transaction has been submitted');
    res.status(200).json({
      message: 'Transaction has been submitted',
    });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).json({
      message: error.toString(),
    });
    // process.exit(1);
  }
};

exports.transfer2_data = async (req, res, next) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

  const { Gateway, Wallets } = require('fabric-network');
  const FabricCAServices = require('fabric-ca-client');

  const fs = require('fs');
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
  const mspOrg2 = 'Org2MSP';
  const org2UserId = 'appUser22';
  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccpPath = path.resolve(
      './../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
    );
    console.log('ccpPath', ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, '..', '..', 'wallet');

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    // const identity = await wallet.get('admin');
    // if (!identity) {
    //   console.log(
    //     'An identity for the user "admin" does not exist in the wallet'
    //   );
    //   console.log('Run the registerUser.js application before retrying');
    //   return;
    // }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org2UserId,
      discovery: { enabled: true, asLocalhost: true },
    });
    console.log('herere5');

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    console.log('herere55');
    let transaction;

    // Submit the specified transaction.

    // result = await contract.submitTransaction(
    //   'CreateAsset',
    //   req.body.asset_id,
    //   req.body.sno,
    //   req.body.size,
    //   req.body.street,
    //   req.body.city,
    //   req.body.propertyNo,
    //   req.body.owner,
    //   req.body.status
    // );
    const asset_properties = {
      object_type: 'asset_properties',
      asset_id: req.body.asset_id,
      salt: Buffer.from(randomNumber.toString()).toString('hex'),
      sno: req.body.sno,
      size: req.body.size,
      street: req.body.street,
      city: req.body.city,
      propertyNo: req.body.propertyNo,
      owner: req.body.owner,
      status: req.body.status,
    };
    const asset_properties_string = JSON.stringify(asset_properties);

    console.log(`${asset_properties_string}`);
    transaction = contract.createTransaction('TransferAsset');
    transaction.setEndorsingOrganizations(org1, org2);
    transaction.setTransient({
      asset_properties: Buffer.from(asset_properties_string),
    });

    await transaction.submit(req.body.asset_id, org2);
    console.log(
      `${RED}*** FAILED: committed, TransferAsset - Org2 now owns the asset ${req.body.asset_id}${RESET}`
    );

    // asset_id: salt: sno: size: street: city: propertyNo: owner: status: console.log(
    //   '*** Result: committed'
    // );

    console.log('Transaction has been submitted');
    res.status(200).json({
      message: 'Transaction has been submitted',
    });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).json({
      message: error.toString(),
    });
    // process.exit(1);
  }
};

exports.get_pid_data = async (req, res, next) => {
  if (!req.params) {
    res.status(404).json({
      message: 'Parameters are not suppied',
    });
  } else {
    console.log(req.params);
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    const { Gateway, Wallets } = require('fabric-network');
    const FabricCAServices = require('fabric-ca-client');
  const fs = require('fs');

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
    const mspOrg1 = 'Org2MSP';
    const walletPath = path.join(__dirname, '..', '..', 'wallet','org2');
    //   const walletPath = path.join("./../../wallet/");
    // /home/chary/metric/fabric-samples/noderest/api/controllers/companycontroller.js
    // /home/chary/metric/fabric-samples/noderest/wallet
    //   const walletPath = "/home/chary/metric/fabric-samples/noderest/wallet";
    // const org1UserId = "admin";
    const org2UserId = 'appUser22';

    function prettyJSONString(inputString) {
      return JSON.stringify(JSON.parse(inputString), null, 2);
    }

    try {
     // const ccp = buildCCPOrg1();
     // console.log('1  : ');
     // const caClient = buildCAClient(FabricCAServices, ccp, 'ca_org1');

      //const wallet = await buildWallet(Wallets, walletPath);
      //await enrollAdmin(caClient, wallet, mspOrg1);

      // in a real application this would be done only when a new user was required to be added
      // and would be part of an administrative flow
      //await registerAndEnrollUser(
      //  caClient,
//        wallet,
  //      mspOrg1,
    //    org1UserId,
      //  'org1.department1'
//      );
    const ccpPath = path.resolve(
      './../test-network/organizations/peerOrganizations/org2.example.com/connection-org2.json'
    );
    console.log('ccpPath', ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, '..', '..', 'wallet','org2');

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

      const gateway = new Gateway();

      await gateway.connect(ccp, {
        wallet,
        identity: org2UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      });

      const network = await gateway.getNetwork(channelName);
      const contract = network.getContract(chaincodeName);

      result = await contract.evaluateTransaction(
        'GetAssetPrivateProperties',
        req.params.id
      );

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

exports.get_id1_data = async (req, res, next) => {
  if (!req.params) {
    res.status(404).json({
      message: 'Parameters are not suppied',
    });
  } else {
    console.log(req.params);
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    const { Gateway, Wallets } = require('fabric-network');
    const FabricCAServices = require('fabric-ca-client');
    const path = require('path');
   const fs = require('fs');
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
   //   const ccp = buildCCPOrg1();
      console.log('1  : ');
   //   const caClient = buildCAClient(FabricCAServices, ccp, 'ca_org1');
    //  console.log('2  : ');

    //  const wallet = await buildWallet(Wallets, walletPath);
    //  console.log('3  : ');

      //await enrollAdmin(caClient, wallet, mspOrg1);
      //console.log('4  : ');

      // in a real application this would be done only when a new user was required to be added
      // and would be part of an administrative flow
    //  await registerAndEnrollUser(
    //    caClient,
    //    wallet,
    //    mspOrg1,
    //    org1UserId,
    //    'org1.department1'
    //  );


  const ccpPath = path.resolve(
      './../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
    );
    console.log('ccpPath', ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, '..', '..', 'wallet');

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);
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

exports.get_id2_data = async (req, res, next) => {
  if (!req.params) {
    res.status(404).json({
      message: 'Parameters are not suppied',
    });
  } else {
    console.log(req.params);
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    const { Gateway, Wallets } = require('fabric-network');
    const FabricCAServices = require('fabric-ca-client');
    const path = require('path');
    const fs = require('fs')
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
    const mspOrg1 = 'Org2MSP';
    const walletPath = path.join(__dirname, '..', '..', 'wallet');
    //   const walletPath = path.join("./../../wallet/");
    // /home/chary/metric/fabric-samples/noderest/api/controllers/companycontroller.js
    // /home/chary/metric/fabric-samples/noderest/wallet
    //   const walletPath = "/home/chary/metric/fabric-samples/noderest/wallet";
    // const org1UserId = "admin";
    const org2UserId = 'appUser22';

    function prettyJSONString(inputString) {
      return JSON.stringify(JSON.parse(inputString), null, 2);
    }

    try {
//      const ccp = buildCCPOrg1();
      console.log('1  : ');
  //    const caClient = buildCAClient(FabricCAServices, ccp, 'ca_org1');

    //  const wallet = await buildWallet(Wallets, walletPath);
      //await enrollAdmin(caClient, wallet, mspOrg1);

      // in a real application this would be done only when a new user was required to be added
      // and would be part of an administrative flow
//      await registerAndEnrollUser(
  //      caClient,
    //    wallet,
      //  mspOrg1,
      //  org2UserId,
      //  'org1.department1'
//      );
  const ccpPath = path.resolve(
      './../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
    );
    console.log('ccpPath', ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, '..', '..', 'wallet','org2');

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);
      const gateway = new Gateway();

      await gateway.connect(ccp, {
        wallet,
        identity: org2UserId,
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

