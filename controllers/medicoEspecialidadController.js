const MedicoEspecialidad = require('../models/medicoEspecialidad');

async function asignarEspecialidad(req, res) {
  const { id_medico, id_especialidad, matricula, fecha_matricula } = req.body;

  // Validación de los campos
  const errores = [];

  if (!id_medico || isNaN(id_medico)) {
    errores.push('El ID del médico es obligatorio y debe ser un número');
  }

  if (!id_especialidad || isNaN(id_especialidad)) {
    errores.push('El ID de la especialidad es obligatorio y debe ser un número');
  }

  if (!matricula || matricula.trim() === '') {
    errores.push('La matrícula es obligatoria');
  }

  if (!fecha_matricula || isNaN(Date.parse(fecha_matricula))) {
    errores.push('La fecha de matrícula no es válida');
  }

  // Si hay errores, devolverlos a la vista
  if (errores.length > 0) {
    return res.render('asignar-especialidad', { errores });
  }

  // Sanitización de los datos
  const matriculaSanitizada = matricula.trim();
  const fechaMatriculaSanitizada = new Date(fecha_matricula);

  try {
    await MedicoEspecialidad.create(id_medico, id_especialidad, matriculaSanitizada, fechaMatriculaSanitizada);
    res.redirect('/medicos');
  } catch (error) {
    res.status(500).send('Error al asignar la especialidad');
  }
}

module.exports = { asignarEspecialidad };
