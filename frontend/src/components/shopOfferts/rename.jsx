import Navbar from "../navbar";

const apiUrl = import.meta.env.VITE_API_URL || "/api";

export default () => {
  const buyItem = async () => {
    const jwt = await cookieStore.get("jwt");
    if (jwt) {
      const newNick = document.getElementById("newNick").value;
      try {
        const response = await fetch(`${apiUrl}/shop/buyItem`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt.value}`,
          },
          body: JSON.stringify({
            itemId: "changeNick",
            newNick: newNick,
          }),
        });

        if (response.ok) {
          alert("Nick zmieniony pomyślnie!");
          await cookieStore.delete("jwt");
          location.href = "/login";
        } else {
            const parse = await JSON.parse(await response.text());
            const message = parse.message;
          alert(`Błąd podczas zmiany nicku! ${message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Błąd podczas zmiany nicku!");
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow-lg border-0">
            <div
              className="card-header bg-gradient"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <div className="text-center text-white">
                <i className="bi bi-person-gear fs-1 mb-2"></i>
                <h2 className="card-title mb-0 fw-bold">Zmiana Nicku</h2>
              </div>
            </div>

            <div className="card-body p-4">
              <div className="alert alert-info border-0 mb-4" role="alert">
                <div className="d-flex align-items-center">
                  <i className="bi bi-star-fill text-warning fs-4 me-2"></i>
                  <div>
                    <strong>Koszt usługi:</strong>
                    <span className="badge bg-warning text-dark ms-2 fs-6">
                      200 ⭐️
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label htmlFor="newNick" className="form-label fw-semibold">
                    <i className="bi bi-person-badge me-2"></i>
                    Nowy nick
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-at text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="newNick"
                      placeholder="Wpisz swój nowy nick"
                      maxLength="20"
                      required
                    />
                  </div>
                  <div className="form-text">
                    <i className="bi bi-info-circle me-1"></i>
                    Nick może zawierać maksymalnie 20 znaków
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg fw-semibold"
                    onClick={buyItem}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Zmień Nick
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer bg-light text-center py-3">
              <small className="text-muted">
                <i className="bi bi-shield-check me-1"></i>
                Po zmianie nicku zostaniesz automatycznie wylogowany
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
