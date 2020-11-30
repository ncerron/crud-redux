import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//actions de redux
import { crearNuevoProductoAction } from "../actions/productoActions";

import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProducto = ({ history }) => {
  //como el state no se va a usar en otros componentes, se usa el useSate
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  //utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  //acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  console.log(cargando);

  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);
  //dispatch ejecuta la funcion crearNuevoProductoAction
  //ejecuta funciones del action
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  //cuando el usuario haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    //validar formulario
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }

    //si no hay errorres
    dispatch(ocultarAlertaAction());
    //crear el nuevo producto
    agregarProducto({
      nombre,
      precio,
    });

    //redireccionar home
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                ></input>

                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                ></input>
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                >
                  Agregar
                </button>
              </div>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 ">Hubo un error</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
