import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const onLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const result = await login(email, password);

    if (result.ok) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, {
        replace: true,
      });
    } else {
      setErrorMsg(result.errorMessage || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <hr />
        
        <form onSubmit={onLogin}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

