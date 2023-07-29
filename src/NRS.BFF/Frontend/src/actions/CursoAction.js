import HttpCliente from "../services/HttpCliente";

export const guardarCurso = async (curso, imagen) => {
  const endPointCurso = "/cursos";
  const endPointImagen = "/documento";
  const promiseCurso = HttpCliente.post(endPointCurso, curso);
  const promiseImagen = HttpCliente.post(endPointImagen, imagen);

  const responseArray = await Promise.all([promiseCurso, promiseImagen]);
  return responseArray;
};
