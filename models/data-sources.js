const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSourceSchema = new Schema({
    service: {
        type: String,
        require: true
    },
    metrics: {
        type: Array,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        require: true
    }
},
{timestamps: true}
);

const DataSource = mongoose.model('data-sources', dataSourceSchema);

module.exports = DataSource;