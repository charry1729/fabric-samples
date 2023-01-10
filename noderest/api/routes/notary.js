const express = require('express');

const router = express.Router();

const read_file = require('../controllers/notarycontroller');

/**
 * @swagger
 * components:
 *   schemas:
 *     NewAsset:
 *       type: object
 *       properties:
 *         asset_id:
 *           type: string
 *           description: asset's name.
 *           example: asset-23
 *         sno:
 *           type: integer
 *           description: The serial number.
 *           example: 1208
 *         size:
 *           type: integer
 *           description: The Asset Land size in sqft
 *           example: 1400
 *         street:
 *           type: string
 *           description: The Asset's street name.
 *           example: 10D Street
 *         city:
 *           type: string
 *           description: The Asset's city.
 *           example: London
 *         propertyNo:
 *           type: integer
 *           description: The Asset's propertyNo.
 *           example: 12
 *         owner:
 *           type: string
 *           description: The Asset's Owner name.
 *           example: Leanne Graham
 *         status:
 *           type: string
 *           description: The Asset's Status - New , Sold.
 *           example: New
 *     Asset:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The Asset ID.
 *               example: asset-23
 *         - $ref: '#/components/schemas/NewAsset'
 */
/**
 * @swagger
 * /notary/org1/:id:
 *   get:
 *     summary: Retrieve an org1 asset.
 *     description: Retrieve assets. Can be used to populate a list of assets when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: asset ID to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific asset.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The asset-ID.
 *                       example: asset-23
 *       500:
 *         description: Some server error
 *       404:
 *         description: The asset was not found
 */
router.get('/org1/:id', read_file.get_id1_data); //readnotary

/**
 * @swagger
 * /notary/org2/:id:
 *   get:
 *     summary: Retrieve an org2 asset.
 *     description: Retrieve assets. Can be used to populate a list of assets when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: asset ID to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific asset.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The asset-ID.
 *                       example: asset-22
 *
 *       500:
 *         description: Some server error
 *       404:
 *         description: The asset was not found
 */
router.get('/org2/:id', read_file.get_id2_data); //readnotary

/**
 * @swagger
 * /notary/private/:id:
 *   get:
 *     summary: Retrieve an private data for asset.
 *     description: Retrieve assets. Can be used to populate a list of assets when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: asset ID to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific asset.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The asset-ID.
 *                       example: asset-22
 *       500:
 *         description: Some server error
 *       404:
 *         description: The asset was not found
 */
router.get('/private/:id', read_file.get_pid_data); //readnotary

/**
 * @swagger
 * /notary/org1/create:
 *   post:
 *     summary: Create a org1 Asset.
 *     parameters:
 *       - in: path
 *         name: Asset Details
 *         required: true
 *         description: Asset Details to add.
 *         schema:
 *           $ref: '#/components/schemas/Asset'
 *     responses:
 *       200:
 *         description: A private data read asset success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asset'
 *       500:
 *         description: Some private data read asset server error
 *       404:
 *         description: The asset was not found
 */
router.post('/org1/create', read_file.load_data1); // updatenotarycert

/**
 * @swagger
 * /notary/org1/transfer:
 *   post:
 *     summary: Transfer a org1 Asset.
 *     parameters:
 *       - in: path
 *         name: Asset Details
 *         required: true
 *         description: Asset Details to add.
 *         schema:
 *           $ref: '#/components/schemas/Asset'
 *     responses:
 *       200:
 *         description: A transfer asset success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asset'
 *       500:
 *         description: Some server error
 *       404:
 *         description: The asset was not transferred
 */
router.post('/org1/transfer', read_file.transfer1_data); // updatenotarycert

/**
 * @swagger
 * /notary/org2/transfer:
 *   post:
 *     summary: Create a org2 Asset.
 *     parameters:
 *       - in: path
 *         name: Asset Details
 *         required: true
 *         description: Asset Details to add.
 *         schema:
 *           $ref: '#/components/schemas/Asset'
 *     responses:
 *       200:
 *         description: A create asset success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asset'
 *       500:
 *         description: Some server error
 *       404:
 *         description: The asset was not created
 */
router.post('/org2/create', read_file.load_data2); // updatenotarypartner

/**
 * @swagger
 * /notary/org2/verify:
 *   post:
 *     summary: verify a Asset.
 *     parameters:
 *       - in: path
 *         name: Asset Details
 *         required: true
 *         description: Asset Details to verify.
 *         schema:
 *           $ref: '#/components/schemas/Asset'
 *     responses:
 *       200:
 *         description: A verify asset success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asset'
 *       500:
 *         description: Some server error
 *       404:
 *         description: The asset was not verify
 */
router.post('/org2/verify', read_file.verify_data); // updatenotarypartner

/**
 * @swagger
 * /notary/org2/transfer:
 *   post:
 *     summary: Transfer a org2 Asset.
 *     parameters:
 *       - in: path
 *         name: Asset Details
 *         required: true
 *         description: Asset Details to add.
 *         schema:
 *           $ref: '#/components/schemas/Asset'
 *     responses:
 *       200:
 *         description: A transfer asset success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asset'
 *       500:
 *         description: Some server error
 *       404:
 *         description: The asset was not transferred
 */
router.post('/org2/transfer', read_file.transfer2_data); // updatenotarycert

// router.get('/partner/:id', read_file.get_part_data); // readnotarybyPartner

module.exports = router;
