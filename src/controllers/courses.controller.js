import Cursos from "../models/courses.model.js";

export const getCursos = async (req, res) => {
  try{
    const cursos = await Cursos.find({
      profesorAsignado: req.user.id
    }).populate('profesorAsignado');;
    res.json(cursos);
  }
  catch (error){
    return res.status(500).json({ message: "Algo no funciona" });
  }
};

export const createCurso = async (req, res) => {
  try{
    const { nombre, codigo, grupo, salonAsignado  } = req.body;
    const nuevoCurso = new Cursos({
      nombre,
      codigo,
      grupo,
      salonAsignado,
      profesorAsignado: req.user.id,
      alumnosInscritos: req.user.id
    });
    const cursoGuardado = await nuevoCurso.save();
    res.json(cursoGuardado);
    }
    catch (error){
      return res.status(500).json({ message: "Algo no funciona" });
    }
  };

  export const getCurso = async (req, res) => {
      try{
        const curso = await Cursos.findById(req.params.id);
      if (!curso) return res.status(404).json({ message: "Curso no encontrado" });
      res.json(curso); 
    }
    catch (error){
      return res.status(404).json({ message: "Curso no encontrado" });
    }
  };

export const deleteCurso = async (req, res) => {
    try{
      const curso = await Cursos.findByIdAndDelete(req.params.id);
    if (!curso) return res.status(404).json({ message: "Curso no encontrado" });
    return res.sendStatus(204);
  }
  catch (error){
    return res.status(404).json({ message: "Curso no encontrado" });
  }
};

export const updateCurso = async (req, res) => {
    try{
      const curso = await Cursos.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if (!curso)
      return res.status(404).json({ message: "Curso no encontrado" });;
      res.json(curso);
    }
      catch (error){
        return res.status(404).json({ message: "Curso no encontrado" });
      }
};
