import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ["clothes", "accessories", "makeup", "kitchenitems", "homeessential", "electronics"]
    },
    image: {
        data: { type: String, required: true }, // Change type to String
        contentType: { type: String, required: true },
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
