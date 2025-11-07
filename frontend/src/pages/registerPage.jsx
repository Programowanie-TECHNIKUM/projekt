import { useState } from "react";

export default () => {
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async () => {
    const existingJwt = await cookieStore.get("jwt");
    if (existingJwt) {
      location.href = "/";
      return;
    }

    if (!nick.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Proszę wypełnić wszystkie pola!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Hasła nie są identyczne!");
      return;
    }

    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "/api";

    try {
      const res = await fetch(`${apiUrl}/users/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nick, password, repeatPassword: confirmPassword }),
      });

      if (res.ok) {
        alert("Konto zostało utworzone pomyślnie! Możesz się teraz zalogować.");
        location.href = "/login";
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Wystąpił błąd podczas rejestracji!");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Wystąpił błąd podczas rejestracji!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>Rejestracja</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="nick" className="form-label">
                    Nick:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nick"
                    placeholder="Wprowadź nick"
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Hasło:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Wprowadź hasło (min. 6 znaków)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Potwierdź hasło:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Potwierdź hasło"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={registerHandler}
                    disabled={isLoading}
                  >
                    {isLoading ? "Rejestrowanie..." : "Zarejestruj się"}
                  </button>
                </div>
              </form>

              <hr className="my-3" />

              <div className="text-center">
                <a href="/login" className="btn btn-link">
                  Masz już konto? Zaloguj się
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
