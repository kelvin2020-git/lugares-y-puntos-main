import Swal from "sweetalert2";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { setError, removeError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
export const RegisterAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const handlehome = () => {
    navigate("/", {
      replace: true,
    });
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Nombre es requerido"));
      Swal.fire("Error", msgError, "error");
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("El email no es válido"));
      Swal.fire("Error", msgError, "error");
      return false;
    } else if (password !== password2) {
      dispatch(setError("las contraseñas deben de ser iguales"));
      Swal.fire("Error", msgError, "error");
      return false;
    } else if (password.length < 5) {
      dispatch(setError("la contraseña debe de contener mas de 5 caracteres"));
      Swal.fire("Error", msgError, "error");
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <nav
        className="flex items-center justify-between flex-wrap bg-neutral-300
         p-6"
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6"></div>
        <div className="block lg:hidden"></div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          <div>
            <button
              href="#"
              className=" text-sm px-3 py-1  border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white "
              onClick={handlehome}
            >
              Home
            </button>
          </div>
        </div>
        <div></div>
      </nav>

      <div className="flex items-center justify-end col-span-5 bg-stone-200">
        <div
          className="px-14 py-20 mr-4
    
     text-left bg-neutral-400 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center">
            Registrar Nueva Cuenta
          </h3>
          <form onSubmit={handleRegister}>
            <div className="mt-4">
              <div>
                <label className="block" type="text">
                  Nombre :
                </label>
                <input
                  type="text"
                  placeholder="ingrese su nombre"
                  name="name"
                  autoComplete="off"
                  value={name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                ></input>
              </div>
              <div>
                <label className="block" type="email">
                  Correo
                </label>
                <input
                  type="text"
                  placeholder="ingrese su correo"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                ></input>
              </div>
              <div className="mt-4">
                <label className="block">Contraseña</label>
                <input
                  type="password"
                  placeholder="ingrese su contraseña"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                ></input>
              </div>

              <div className="mt-4">
                <label className="block">Confirmar contraseña:</label>
                <input
                  type="password"
                  placeholder="Confirme su contraseña"
                  name="password2"
                  value={password2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                ></input>
              </div>
              <div className="flex items-baseline justify-center">
                <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  type="submit"
                >
                  Crear cuenta
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
