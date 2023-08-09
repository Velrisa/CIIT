import Trabajos from "../models/task.model.js";

export const getTrabajos = async (req, res) => {
  try{
    const trabajos = await Trabajos.find({
      usuario: req.user.id
    }).populate('usuario');
    res.json(trabajos);
  }
  catch (error){
    return res.status(500).json({ message: "Algo no funciona"});
  }
};

export const createTrabajo = async (req, res) => {
  try{
    const { nombre, descripcion, fecha } = req.body;
    const nuevoTrabajo = new Trabajos({
      nombre,
      descripcion,
      fecha,
      usuario: req.user.id
    });
    const tareaGuardada = await nuevoTrabajo.save();
    res.json(tareaGuardada);
    }
    catch (error){
      return res.status(500).json({ message: "Algo no funciona"});
    }
  };

  export const getTrabajo = async (req, res) => {
      try{
        const trabajo = await Trabajos.findById(req.params.id);
      if (!trabajo) return res.status(404).json({ message: "Trabajo no encontrado"});
      res.json(trabajo); 
    }
    catch (error){
      return res.status(404).json({ message: "Trabajo no encontrada"});
    }
  };

export const deleteTrabajo = async (req, res) => {
    try{
      const trabajo = await Trabajos.findByIdAndDelete(req.params.id);
    if (!trabajo) return res.status(404).json({ message: "Trabajo no encontrada" });
    return res.sendStatus(204);
  }
  catch (error){
    return res.status(404).json({ message: "Trabajo no encontrada" });
  }
};

export const updateTrabajo = async (req, res) => {
    try{
      const trabajo = await Trabajos.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if (!trabajo)
      return res.status(404).json({ message: "Trabajo no encontrada" });
      res.json(trabajo);
    }
      catch (error){
        return res.status(404).json({ message: "Trabajo no encontrada" });
      }
};
