const axios = require('axios');
const sharp = require('sharp');
const Request = require('../models/requestModel');
const { sendWebhook } = require('./webhookService');

const processImages = async (requestId, products) => {
    for (let product of products) {
        for (let url of product.inputImageUrls) {
            try {
                const imageBuffer = await axios.get(url, { responseType: 'arraybuffer' });
                const processedBuffer = await sharp(imageBuffer.data)
                    .jpeg({ quality: 50 })
                    .toBuffer();

                // Example output URL (normally, you'd upload this buffer to a storage service)
                const outputUrl = `https://output-url/${uuidv4()}.jpg`;
                product.outputImageUrls.push(outputUrl);

            } catch (error) {
                console.error(`Error processing image ${url}`, error);
            }
        }
    }

    // Update the database to mark the request as completed
    await Request.updateOne({ requestId }, { products, status: 'completed' });

    // Trigger the webhook after processing is complete
    await sendWebhook(requestId);
};

module.exports = { processImages };
