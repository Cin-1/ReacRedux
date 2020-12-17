import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearNuevoProductoAction } from "../Actions/ProductosActions";
import { mostrarAlerta, ocultarAlertaAction } from "../Actions/alertaActions";

const NuevoProducto = ({ history }) => {
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  const dispatch = useDispatch();

  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim === "" || precio <= 0) {
      const alert = {
        mgs: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alert));
      return;
    }
    dispatch(ocultarAlertaAction());
    agregarProducto({
      nombre,
      precio,
    });
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.mgs}</p> : null}{" "}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre Producto"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  placeholder="Precio Producto"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                >
                  Agregar
                </button>
              </div>
            </form>
            {cargando ? <p>cargando....</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
