const axios = require('axios');
const Request = require('../models/requestModel');

const sendWebhook = async (requestId) => {
    const request = await Request.findOne({ requestId });

    if (!request) {
        throw new Error('Request not found');
    }

    const webhookUrl = 'https://example.com/webhook-endpoint'; // Replace with your actual webhook URL

    try {
        await axios.post(webhookUrl, {
            requestId: request.requestId,
            status: request.status,
            products: request.products,
        });

        console.log(`Webhook sent successfully for requestId: ${requestId}`);
    } catch (error) {
        console.error(`Failed to send webhook for requestId: ${requestId}`, error);
    }
};

module.exports = { sendWebhook };
