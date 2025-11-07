import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import checkAuth from "../misc/checkAuth.js";

const apiUrl = import.meta.env.VITE_API_URL || "/api";
export default () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isValid, setIsValid] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      const authResult = await checkAuth();
      if (authResult) {
        setIsValid(authResult.isValid);
        setUser(authResult.user);
      }
    };

    authenticateUser();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = await cookieStore.get("jwt");

      await fetch(`${apiUrl}/lb/getLeaderBoard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLeaderboard(data.leaderboard);
        });
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <div className="container py-5">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white text-center py-4">
            <h1 className="card-title mb-0 display-4">RANKING</h1>
          </div>

          <div className="card-body p-5">
            <div className="text-center mb-4">
              <h2 className="h3 text-dark mb-3">Ranking Graczy</h2>
              <p className="text-muted fs-5">
                Sprawdź najlepszych graczy i ich osiągnięcia!
              </p>
            </div>

            {leaderboard.length === 0 ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Ładowanie rankingu...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" className="text-center">
                        <i className="fas fa-medal me-1"></i>
                        Pozycja
                      </th>
                      <th scope="col">
                        <i className="fas fa-user me-1"></i>
                        Nick
                      </th>
                      <th scope="col" className="text-end">
                        <i className="fas fa-coins me-1"></i>
                        ⭐️
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user, index) => (
                      <tr
                        key={user.rank}
                        className={
                          index < 3
                            ? `table-${
                                index === 0
                                  ? "warning"
                                  : index === 1
                                  ? "light"
                                  : "secondary"
                              }`
                            : ""
                        }
                      >
                        <td className="text-center fw-bold">
                          {index === 0 && (
                            <i className="fas fa-crown text-warning me-1"></i>
                          )}
                          {index === 1 && (
                            <i className="fas fa-medal text-secondary me-1"></i>
                          )}
                          {index === 2 && (
                            <i className="fas fa-medal text-warning me-1"></i>
                          )}
                          {user.rank}
                        </td>
                        <td className="fw-semibold">{user.nick}</td>
                        <td className="text-end fw-bold text-success">
                          {user.money} ⭐️
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="card-footer bg-light text-center py-3">
            <small className="text-muted">
              💡 Zdobywaj gwiazdki w quizie, aby awansować w rankingu
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
