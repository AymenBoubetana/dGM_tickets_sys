import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: "moyen",
      enum: ["eleve", "moyen", "normal", "faible"],
    },
    stage: {
      type: String,
      default: "a faire",
      enum: ["a faire", "en cours", "traite","incomplet"],
    },
    activities: [
      {
        type: {
          type: String,
          default: "Affecte",
          enum: [
            "Affecte",
            "commence",
            "En Cours",
            "Bug",
            "Traite",
            "commente",
          ],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],

    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],
    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;