const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestId: { type: String, required: true },
    status: { type: String, default: 'pending' },
    products: [
        {
            serialNumber: Number,
            productName: String,
            inputImageUrls: [String],
            outputImageUrls: [String]
        }
    ]
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
