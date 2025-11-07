import { useState } from "react";
import checkValidJWTtoken from "../misc/checkValidJWTtoken.js";
import { useEffect } from "react";

export default () => {
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      const jwt = await cookieStore.get("jwt");

      if(!jwt) return;

      const authResult = await checkValidJWTtoken(jwt.value);
      console.log(authResult);
      if (authResult) {
        location.href = "/";
      }
    };

    authenticateUser();
  }, []);


  const loginHandler = async () => {

    if (!nick.trim() || !password.trim()) {
      alert("Proszę wypełnić wszystkie pola!");
      return;
    }

    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "/api";

    try {
      const res = await fetch(`${apiUrl}/users/loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nick, password }),
      });

      if (res.ok) {
        const responseData = await res.json();
        await cookieStore.set({
          name: "jwt",
          value: responseData.jwt,
        });

        location.href = "/";
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Wystąpił błąd podczas logowania!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Wystąpił błąd podczas logowania!");
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
              <h3>Logowanie</h3>
            </div>
            <div className="card-body">
              <form onClick={(e) => e.preventDefault()}>
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
                    placeholder="Wprowadź hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={loginHandler}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logowanie..." : "Zaloguj się"}
                  </button>
                </div>
              </form>

              <hr className="my-3" />

              <div className="text-center">
                <a href="/register" className="btn btn-link">
                  Nie masz konta? Zarejestruj się
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
