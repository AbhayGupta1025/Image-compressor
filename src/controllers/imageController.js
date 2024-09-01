const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');
const Request = require('../models/requestModel');
const { processImages } = require('../services/imageServices');


const importCsvData = async () => {

}

function groupUrls(data) {
    const urls = [];
    return data.map(entry => {
        // Split the entry by commas
        const regex = '^https?:\/\/'
       // const url =



        return splitEntry;
    });
}
const readCsvFile = (importCsvFilePath) => {
    let products = [];
    fs.readFile(importCsvFilePath, 'utf8', (err, data) => {

        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Parse the CSV data
        const lines = data.split('\n');

        // Split each line by comma to get an array of values
        const result = lines.map((line,idx) => line.split(','));
        products = result.map((line) => groupUrls(line))
        console.log(products)
    });
}
const uploadCSV = async (req, res) => {
    const requestId = uuidv4();

    const importCsvFilePath= req?.file?.path;
    if(!importCsvFilePath) {
        throw Error("Please select the file");
    }
    const products = readCsvFile(importCsvFilePath)
    const newRequest = new Request({
        requestId,
        products
    });
    await newRequest.save();
    res.status(202).json({ requestId });
    // new Promise((resolve) => {
    //     (async () => {
    //         try {
    //             const importCsvDataResponse = await importCsvData(importCsvFilePath)
    //         } catch (err) {
    //
    //         }
    //     })();
    // }).then(() => console.log())
   //------------------------------------------------------------
    //
    // fs.createReadStream(req.file.path)
    //     .pipe(csv())
    //     .on('data', (row,idx) => {
    //         if (idx > 0)
    //         products.push({
    //             serialNumber: row['S. No.'],
    //             productName: row['Product Name'],
    //             inputImageUrls: row['Input Image Urls'].split(','),
    //             outputImageUrls: []
    //         });
    //     })
    //     .on('end', async () => {
    //         const newRequest = new Request({
    //             requestId,
    //             products
    //         });
    //         await newRequest.save();
    //
    //         processImages(requestId, products);
    //
    //         res.status(202).json({ requestId });
    //     });
};

const checkStatus = async (req, res) => {
    const { requestId } = req.params;
    const request = await Request.findOne({ requestId });

    if (!request) {
        return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ status: request.status, products: request.products });
};

module.exports = { uploadCSV, checkStatus };
