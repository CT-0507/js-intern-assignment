const mongoose = require('mongoose')

const shoeSchema = new mongoose.Schema(
    {
        // _id: { type: mongoose.Types.ObjectId, require: true },
        id: {
            type: Number,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require:true,
        },
        description: {
            type: String,
            require: false,
        },
        price: {
            type: Number,
            require: true,
        },
        color: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Shoe', shoeSchema)