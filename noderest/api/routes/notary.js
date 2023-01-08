const express = require('express');

const router = express.Router();

const read_file = require('../controllers/notarycontroller');

// router.get('/all', read_file.get_data); // readAllCompany

router.get('/org1/:id', read_file.get_id1_data); //readnotary
router.get('/org2/:id', read_file.get_id2_data); //readnotary
router.get('/private/:id', read_file.get_pid_data); //readnotary
// router.get('/private/:id', read_file.get_pid_data); //readnotary
// router.delete('/:id', read_file.delete_id_data); // deletenotary
// // router.post('/', read_file.load_data5);
router.post('/org1/create', read_file.load_data1); // updatenotarycert
router.post('/org1/transfer', read_file.transfer1_data); // updatenotarycert
router.post('/org2/create', read_file.load_data2); // updatenotarypartner
router.post('/org2/verify', read_file.verify_data); // updatenotarypartner
router.post('/org2/transfer', read_file.transfer2_data); // updatenotarycert

// router.get('/partner/:id', read_file.get_part_data); // readnotarybyPartner

module.exports = router;
