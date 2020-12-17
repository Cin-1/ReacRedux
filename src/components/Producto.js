import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from "../Actions/ProductosActions";
import Swal from "sweetalert2";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();
  const history = useHistory();
  const confirmarEliminar = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un producto que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        dispatch(borrarProductoAction(id));
      }
    });
  };
  const redireccion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`productos/editar/${producto.id}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">${precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccion(producto)}
        >
          Editar
        </button>{" "}
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
