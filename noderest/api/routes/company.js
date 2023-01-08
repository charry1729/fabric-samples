const express = require("express");

const router = express.Router();

//const mongoose = require('mongoose');

//const Contract = require('../model/contracts');
const read_file = require("../controllers/companycontroller");

// router.get('/', read_file.get_data);
// router.get('/:ID', read_file.get_id_data);
// router.get('/crop/:ID', read_file.get_crop_data);
router.get("/all", read_file.get_data); // readAllCompany
router.get("/history/:id", read_file.get_history_data); // getHistoryForCompany
router.post("/", read_file.load_data5); // createCompany

router.get("/:id", read_file.get_id_data); //readCompany
router.delete("/:id", read_file.delete_id_data); // deleteCompany
// router.post('/', read_file.load_data5);
router.post("/cert", read_file.update_cert_data); // updateCompanycert
router.post("/partner", read_file.update_part_data); // updateCompanypartner

router.get("/partner/:id", read_file.get_part_data); // readCompanybyPartner




// readCompany

// readCompanybyPartner

// updateCompanycert
// updateCompanypartner

// queryCompany
// getHistoryForCompany
// deleteCompany

// router.post('/farm', read_file.farm_data);
// router.post('/crop', read_file.crop_data);

module.exports = router;
