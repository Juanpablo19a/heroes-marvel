import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { HeroCard } from "../components/HeroCard";
import { useForm } from "../hooks/useForm";
import { getHeroesbyName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);
  const heroes = getHeroesbyName(q);

  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // if (searchText.trim().length === 0) return;
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1 className="text-center mb-5 animate__animated animate__fadeInDown">
        Buscar Héroes 🔎
      </h1>

      <div className="row align-items-start">
        {/* Columna de búsqueda */}
        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 animate__animated animate__fadeInLeft">
            <div className="card-body">
              <h5 className="card-title">Formulario de Búsqueda</h5>
              <hr />
              <form onSubmit={onSearchSubmit}>
                <input
                  type="text"
                  placeholder="Ej: Batman, Flash..."
                  className="form-control"
                  name="searchText"
                  autoComplete="off"
                  value={searchText}
                  onChange={onInputChange}
                />
                <button className="btn btn-primary w-100 mt-3">Buscar</button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna de resultados */}
        <div className="col-md-8 animate__animated animate__fadeIn">
          <h5>Resultados</h5>
          <hr />

          {showSearch && (
            <div className="alert alert-info animate__animated animate__fadeIn">
              Escribe el nombre de un héroe para comenzar.
            </div>
          )}

          {showError && (
            <div className="alert alert-danger animate__animated animate__headShake">
              No se encontró ningún héroe con el nombre <b>{q}</b>.
            </div>
          )}

          <div className="d-flex flex-wrap gap-3">
            {heroes.map((hero) => (
              <HeroCard key={hero.id} {...hero} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
