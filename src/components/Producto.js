import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

//redux
import { useDispatch } from "react-redux";
import { borrarProductoAction } from "../actions/productoActions";

const Producto = ({ productos }) => {
  const { nombre, precio, id } = productos;
  const dispatch = useDispatch();

  //confirmar si desea eliminar producto
  const confirmarEliminarProducto = (id) => {
    //preguntar usuario
    Swal.fire({
      title: "Estas seguro?",
      text: "Un producto que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        //pasar accion
        dispatch(borrarProductoAction(id));
      }
    });
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>${precio}</td>
      <td className="acciones">
        <Link to={`/productos/editar/${id}`} className="btn btn-primary mr-2">
          Editar
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
