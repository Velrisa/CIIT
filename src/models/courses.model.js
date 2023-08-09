import mongoose from "mongoose";

const esquemaCursos = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
    },
    grupo: {
        type: String,
        required: true,
      },
    salonAsignado: {
        type: String,
        required: true,
      },
    profesorAsignado: {
      type: mongoose.Types.ObjectId,
      ref: "Usuario",
    },
    alumnosInscritos: {
      type: mongoose.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cursos", esquemaCursos);