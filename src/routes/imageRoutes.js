const express = require('express');
const { uploadCSV, checkStatus } = require('../controllers/imageController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadCSV);
router.get('/status/:requestId', checkStatus);

module.exports = router;
