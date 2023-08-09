import mongoose from "mongoose";

const esquemaTrabajos = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    fecha: {
        type: Date,
      },
    usuario: {
      type: mongoose.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trabajos", esquemaTrabajos);