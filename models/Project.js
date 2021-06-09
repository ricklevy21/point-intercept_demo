//dependencies
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    project: {
        type: String,
        unique: true
      },
    transects: [
    {
        type: Schema.Types.ObjectId,
        ref: "Transect"
    }
    ]
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;