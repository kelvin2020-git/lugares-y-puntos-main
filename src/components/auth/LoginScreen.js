import { useNavigate, Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
export const LoginScreen = () => {
  const { loading } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handlehome = () => {
    navigate("/", {
      replace: true,
    });
  };
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
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
          className="px-14 py-20 mr-4 mb-28
    
     text-left bg-neutral-400 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center">Iniciar Sesión</h3>
          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <div>
                <label className="block">Correo</label>
                <input
                  type="text"
                  placeholder="ingrese su correo"
                  name="email"
                  value={email}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="mt-4">
                <label className="block">Contraseña</label>
                <input
                  type="password"
                  placeholder="ingrese su contraseña"
                  name="password"
                  value={password}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="flex items-baseline justify-center">
                <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </button>
              </div>

              <h4 className="mt-4 text-center">O inicia Sesión</h4>

              <div className="mt-4">
                <div className="grid grid-cols-1">
                  <div className="flex mt-2">
                    <span className="w-10 h-8 mt-1 ">
                      <p>
                        <img
                          className="ml-10 "
                          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          alt="google button"
                        />
                      </p>
                    </span>
                    <h2
                      className=" w-40   h-8 px-1 py-1 text-black-400  ml-10"
                      onClick={handleGoogleLogin}
                    >
                   
                      Sign in with google
                    </h2>
                  </div>
                  <Link to="/auth/register" className="link mt-1 ml-14">
                   
                    Crear nueva cuenta
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
