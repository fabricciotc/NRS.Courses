import HttpCliente from "../services/HttpCliente";

export const guardarCurso = async (curso, imagen) => {
  const endPointCurso = "/cursos";
  const promiseCurso = HttpCliente.post(endPointCurso, curso);
  if (imagen) {
    const endPointImagen = "/documento";
    const promiseImagen = HttpCliente.post(endPointImagen, imagen);
    return await Promise.all([promiseCurso, promiseImagen]);
  } else {
    return await Promise.all(promiseCurso);
  }
};

export const paginacionCurso = (paginador) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post();
  });
};
