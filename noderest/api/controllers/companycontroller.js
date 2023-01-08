exports.load_data5 = async (req, res, next) => {
  const { Gateway, Wallets } = require("fabric-network");
  const FabricCAServices = require("fabric-ca-client");

  const fs = require("fs");
  const path = require("path");
  const {
    buildCAClient,
    registerAndEnrollUser,
    enrollAdmin,
  } = require("./../../javascript/CAUtil.js");
  const {
    buildCCPOrg1,
    buildWallet,
  } = require("./../../javascript/AppUtil.js");

  const channelName = "mychannel";
  const chaincodeName = "metricnew";
  const mspOrg1 = "Org1MSP";
  const org1UserId = "appUser1";
  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccpPath = path.resolve(
      "./../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json"
    );
    console.log("ccpPath", ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, "..", "..", "wallet");

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get("admin");
    if (!identity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });
    console.log("herere5");

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    console.log("herere55");

    // Submit the specified transaction.

    result = await contract.submitTransaction(
      "createCompany",
      req.body.Sno,
      req.body.Cin,
      req.body.Name,
      req.body.Email,
      req.body.Phone,
      req.body.PointOfContact,
      req.body.Status
    );
    console.log("*** Result: committed");

    console.log("Transaction has been submitted");
    res.status(200).json({
      message: "Transaction has been submitted",
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

exports.get_data = async (req, res, next) => {
  const { Gateway, Wallets } = require("fabric-network");
  const FabricCAServices = require("fabric-ca-client");
  const path = require("path");
  const {
    buildCAClient,
    registerAndEnrollUser,
    enrollAdmin,
  } = require("./../../javascript/CAUtil.js");
  const {
    buildCCPOrg1,
    buildWallet,
  } = require("./../../javascript/AppUtil.js");

  const channelName = "mychannel";
  const chaincodeName = "metricnew";
  const mspOrg1 = "Org1MSP";
  const walletPath = path.join(__dirname, "..", "..", "wallet");
  //   const walletPath = path.join("./../../wallet/");
  // /home/chary/metric/fabric-samples/noderest/api/controllers/companycontroller.js
  // /home/chary/metric/fabric-samples/noderest/wallet
  //   const walletPath = "/home/chary/metric/fabric-samples/noderest/wallet";
  // const org1UserId = "admin";
  const org1UserId = "appUser1";

  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccp = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp, "ca_org1");
    const wallet = await buildWallet(Wallets, walletPath);
    await enrollAdmin(caClient, wallet, mspOrg1);

    // in a real application this would be done only when a new user was required to be added
    // and would be part of an administrative flow
    await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      org1UserId,
      "org1.department1"
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
    //     "\n--> Evaluate Transaction: QueryCompany, function returns an asset with a given assetID"
    //   );
    //   result = await contract.evaluateTransaction("QueryCompany", "1");
    //   console.log(`*** Result: ${prettyJSONString(result.toString())}`);

    console.log(
      "\n--> Evaluate Transaction: QueryAllCompanys, function returns all the current assets on the ledger"
    );
    let result = await contract.evaluateTransaction("readAllCompany");
    console.log(`*** Result: ${prettyJSONString(result.toString())}`);
    res.status(200).json({
      message: "Transaction has been submitted",
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

exports.get_history_data = async (req, res, next) => {
  if (!req.params) {
    res.status(404).json({
      message: "Parameters are not suppied",
    });
  } else {
    console.log(req.params);

    const { Gateway, Wallets } = require("fabric-network");
    const FabricCAServices = require("fabric-ca-client");
    const path = require("path");
    const {
      buildCAClient,
      registerAndEnrollUser,
      enrollAdmin,
    } = require("./../../javascript/CAUtil.js");
    const {
      buildCCPOrg1,
      buildWallet,
    } = require("./../../javascript/AppUtil.js");

    const channelName = "mychannel";
    const chaincodeName = "metricnew";
    const mspOrg1 = "Org1MSP";
    const walletPath = path.join(__dirname, "..", "..", "wallet");
    //   const walletPath = path.join("./../../wallet/");
    // /home/chary/metric/fabric-samples/noderest/api/controllers/companycontroller.js
    // /home/chary/metric/fabric-samples/noderest/wallet
    //   const walletPath = "/home/chary/metric/fabric-samples/noderest/wallet";
    // const org1UserId = "admin";
    const org1UserId = "appUser1";

    function prettyJSONString(inputString) {
      return JSON.stringify(JSON.parse(inputString), null, 2);
    }

    try {
      const ccp = buildCCPOrg1();
      const caClient = buildCAClient(FabricCAServices, ccp, "ca_org1");
      const wallet = await buildWallet(Wallets, walletPath);
      await enrollAdmin(caClient, wallet, mspOrg1);

      // in a real application this would be done only when a new user was required to be added
      // and would be part of an administrative flow
      await registerAndEnrollUser(
        caClient,
        wallet,
        mspOrg1,
        org1UserId,
        "org1.department1"
      );
      const gateway = new Gateway();

      await gateway.connect(ccp, {
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      });

      const network = await gateway.getNetwork(channelName);
      const contract = network.getContract(chaincodeName);

      result = await contract.evaluateTransaction(
        "getHistoryForCompany",
        req.params.id
      );

      console.log(`*** Result: ${prettyJSONString(result.toString())}`);
      res.status(200).json({
        message: "Transaction has been submitted",
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

exports.delete_id_data = async (req, res, next) => {
  if (!req.params) {
    res.status(404).json({
      message: "Parameters are not suppied",
    });
  } else {
    console.log(req.params);

    const { Gateway, Wallets } = require("fabric-network");
    const FabricCAServices = require("fabric-ca-client");
    const path = require("path");
    const {
      buildCAClient,
      registerAndEnrollUser,
      enrollAdmin,
    } = require("./../../javascript/CAUtil.js");
    const {
      buildCCPOrg1,
      buildWallet,
    } = require("./../../javascript/AppUtil.js");

    const channelName = "mychannel";
    const chaincodeName = "metricnew";
    const mspOrg1 = "Org1MSP";
    const walletPath = path.join(__dirname, "..", "..", "wallet");
    //   const walletPath = path.join("./../../wallet/");
    // /home/chary/metric/fabric-samples/noderest/api/controllers/companycontroller.js
    // /home/chary/metric/fabric-samples/noderest/wallet
    //   const walletPath = "/home/chary/metric/fabric-samples/noderest/wallet";
    // const org1UserId = "admin";
    const org1UserId = "appUser1";

    function prettyJSONString(inputString) {
      return JSON.stringify(JSON.parse(inputString), null, 2);
    }

    try {
      const ccp = buildCCPOrg1();
      const caClient = buildCAClient(FabricCAServices, ccp, "ca_org1");
      const wallet = await buildWallet(Wallets, walletPath);
      await enrollAdmin(caClient, wallet, mspOrg1);

      // in a real application this would be done only when a new user was required to be added
      // and would be part of an administrative flow
      await registerAndEnrollUser(
        caClient,
        wallet,
        mspOrg1,
        org1UserId,
        "org1.department1"
      );
      const gateway = new Gateway();

      await gateway.connect(ccp, {
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      });

      const network = await gateway.getNetwork(channelName);
      const contract = network.getContract(chaincodeName);

      result = await contract.submitTransaction("deleteCompany", req.params.id);
      console.log("result", result.toString());
      // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
      res.status(200).json({
        message: "Transaction has been submitted",
        // data: JSON.parse(result.toString()),
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

exports.get_id_data = async (req, res, next) => {
  if (!req.params) {
    res.status(404).json({
      message: "Parameters are not suppied",
    });
  } else {
    console.log(req.params);

    const { Gateway, Wallets } = require("fabric-network");
    const FabricCAServices = require("fabric-ca-client");
    const path = require("path");
    const {
      buildCAClient,
      registerAndEnrollUser,
      enrollAdmin,
    } = require("./../../javascript/CAUtil.js");
    const {
      buildCCPOrg1,
      buildWallet,
    } = require("./../../javascript/AppUtil.js");

    const channelName = "mychannel";
    const chaincodeName = "metricnew";
    const mspOrg1 = "Org1MSP";
    const walletPath = path.join(__dirname, "..", "..", "wallet");
    //   const walletPath = path.join("./../../wallet/");
    // /home/chary/metric/fabric-samples/noderest/api/controllers/companycontroller.js
    // /home/chary/metric/fabric-samples/noderest/wallet
    //   const walletPath = "/home/chary/metric/fabric-samples/noderest/wallet";
    // const org1UserId = "admin";
    const org1UserId = "appUser1";

    function prettyJSONString(inputString) {
      return JSON.stringify(JSON.parse(inputString), null, 2);
    }

    try {
      const ccp = buildCCPOrg1();
      const caClient = buildCAClient(FabricCAServices, ccp, "ca_org1");
      const wallet = await buildWallet(Wallets, walletPath);
      await enrollAdmin(caClient, wallet, mspOrg1);

      // in a real application this would be done only when a new user was required to be added
      // and would be part of an administrative flow
      await registerAndEnrollUser(
        caClient,
        wallet,
        mspOrg1,
        org1UserId,
        "org1.department1"
      );
      const gateway = new Gateway();

      await gateway.connect(ccp, {
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      });

      const network = await gateway.getNetwork(channelName);
      const contract = network.getContract(chaincodeName);

      result = await contract.evaluateTransaction(
        "queryCompany",
        req.params.id
      );

      console.log(`*** Result: ${prettyJSONString(result.toString())}`);
      res.status(200).json({
        message: "Transaction has been submitted",
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

exports.update_cert_data = async (req, res, next) => {
  const { Gateway, Wallets } = require("fabric-network");
  const FabricCAServices = require("fabric-ca-client");

  const fs = require("fs");
  const path = require("path");
  const {
    buildCAClient,
    registerAndEnrollUser,
    enrollAdmin,
  } = require("./../../javascript/CAUtil.js");
  const {
    buildCCPOrg1,
    buildWallet,
  } = require("./../../javascript/AppUtil.js");

  const channelName = "mychannel";
  const chaincodeName = "metricnew";
  const mspOrg1 = "Org1MSP";
  const org1UserId = "appUser1";
  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccpPath = path.resolve(
      "./../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json"
    );
    console.log("ccpPath", ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, "..", "..", "wallet");

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get("admin");
    if (!identity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });
    console.log("herere5");

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    console.log("herere55");

    // Submit the specified transaction.

    result = await contract.submitTransaction(
      "updateCompanycert",
      req.body.Sno,
      req.body.CertName,
      req.body.CertDate,
      req.body.CertArea,
      req.body.CertNo,
      req.body.CertDocURL,
      req.body.Privacy,
      req.body.Status
    );
    console.log("*** Result: committed");

    console.log("Transaction has been submitted");
    res.status(200).json({
      message: "Transaction has been submitted",
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

exports.update_part_data = async (req, res, next) => {
  const { Gateway, Wallets } = require("fabric-network");
  const FabricCAServices = require("fabric-ca-client");

  const fs = require("fs");
  const path = require("path");
  const {
    buildCAClient,
    registerAndEnrollUser,
    enrollAdmin,
  } = require("./../../javascript/CAUtil.js");
  const {
    buildCCPOrg1,
    buildWallet,
  } = require("./../../javascript/AppUtil.js");

  const channelName = "mychannel";
  const chaincodeName = "metricnew";
  const mspOrg1 = "Org1MSP";
  const org1UserId = "appUser1";
  function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }

  try {
    const ccpPath = path.resolve(
      "./../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json"
    );
    console.log("ccpPath", ccpPath);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // const walletPath = path.join(process.cwd(), "wallet");
    // const walletPath = "./../wallet";
    const walletPath = path.join(__dirname, "..", "..", "wallet");

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get("admin");
    if (!identity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });
    console.log("herere5");

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    console.log("herere55");

    // Submit the specified transaction.

    result = await contract.submitTransaction(
      "updateCompanypartner",
      req.body.Sno,
      req.body.Sno1
    );
    console.log("*** Result: committed");

    console.log("Transaction has been submitted");
    res.status(200).json({
      message: "Transaction has been submitted",
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

exports.get_part_data = async (req, res, next) => {
  if (!req.params) {
    res.status(404).json({
      message: "Parameters are not suppied",
    });
  } else {
    console.log(req.params);

    const { Gateway, Wallets } = require("fabric-network");
    const FabricCAServices = require("fabric-ca-client");
    const path = require("path");
    const {
      buildCAClient,
      registerAndEnrollUser,
      enrollAdmin,
    } = require("./../../javascript/CAUtil.js");
    const {
      buildCCPOrg1,
      buildWallet,
    } = require("./../../javascript/AppUtil.js");

    const channelName = "mychannel";
    const chaincodeName = "metricnew";
    const mspOrg1 = "Org1MSP";
    const walletPath = path.join(__dirname, "..", "..", "wallet");
    //   const walletPath = path.join("./../../wallet/");
    // /home/chary/metric/fabric-samples/noderest/api/controllers/companycontroller.js
    // /home/chary/metric/fabric-samples/noderest/wallet
    //   const walletPath = "/home/chary/metric/fabric-samples/noderest/wallet";
    // const org1UserId = "admin";
    const org1UserId = "appUser1";

    function prettyJSONString(inputString) {
      return JSON.stringify(JSON.parse(inputString), null, 2);
    }

    try {
      const ccp = buildCCPOrg1();
      const caClient = buildCAClient(FabricCAServices, ccp, "ca_org1");
      const wallet = await buildWallet(Wallets, walletPath);
      await enrollAdmin(caClient, wallet, mspOrg1);

      // in a real application this would be done only when a new user was required to be added
      // and would be part of an administrative flow
      await registerAndEnrollUser(
        caClient,
        wallet,
        mspOrg1,
        org1UserId,
        "org1.department1"
      );
      const gateway = new Gateway();

      await gateway.connect(ccp, {
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      });

      const network = await gateway.getNetwork(channelName);
      const contract = network.getContract(chaincodeName);

      result = await contract.evaluateTransaction(
        "readCompanybyPartner",
        req.params.id
      );

      console.log(`*** Result: ${prettyJSONString(result.toString())}`);
      res.status(200).json({
        message: "Transaction has been submitted",
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
