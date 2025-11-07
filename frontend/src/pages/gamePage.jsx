import { useEffect, useState } from "react";
import checkAuth from "../misc/checkAuth.js";
import Navbar from "../components/navbar.jsx";

export default () => {
  const [user, setUser] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState("");
  const [betAmount, setBetAmount] = useState(10);

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

  const playSlotMachine = async () => {
    if (isSpinning) return;

    setMessage("");
    startSpinAnimation();

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    };

    const jwt = getCookie("jwt");
    const url = import.meta.env.VITE_API_URL || "http://localhost:3000";

    if (jwt) {
      try {
        const response = await fetch(`${url}/game/slot/spin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ betAmount: betAmount }),
        });

        if (response.ok) {
          const data = await response.json();
          setTimeout(() => {
            stopSpinAnimation(data.reels, data.winnings);
          }, 2000);
        } else {
          const error = await response.json();
          clearInterval(window.currentSpinInterval);
          setIsSpinning(false);
          setMessage(error.message || "Błąd podczas gry");
        }
      } catch (error) {
        clearInterval(window.currentSpinInterval);
        setIsSpinning(false);
        setMessage("Błąd połączenia z serwerem");
      }
    }
  };

  const startSpinAnimation = () => {
    setIsSpinning(true);

    const programmingSymbols = [
      "JAVASCRIPT",
      "PYTHON",
      "JAVA",
      "CPLUSPLUS",
      "PHP",
      "CSHARP",
      "TYPESCRIPT",
      "VBA",
      "SQL",
    ];

    const spinInterval = setInterval(() => {
      setReels([
        programmingSymbols[
          Math.floor(Math.random() * programmingSymbols.length)
        ],
        programmingSymbols[
          Math.floor(Math.random() * programmingSymbols.length)
        ],
        programmingSymbols[
          Math.floor(Math.random() * programmingSymbols.length)
        ],
      ]);
    }, 100);

    window.currentSpinInterval = spinInterval;
  };

  const stopSpinAnimation = (finalReels, winnings) => {
    clearInterval(window.currentSpinInterval);
    setIsSpinning(false);
    setReels(finalReels);

    if (winnings > 0) {
      setMessage("Wygrana!");
    } else {
      setMessage("Spróbuj ponownie!");
    }
  };

  const renderSymbol = (symbol) => {
    const imageExtensions = {
      JAVASCRIPT: "png",
      PYTHON: "png",
      JAVA: "png",
      CPLUSPLUS: "png",
      PHP: "png",
      CSHARP: "png",
      TYPESCRIPT: "png",
      VBA: "svg",
      SQL: "svg",
    };

    if (imageExtensions[symbol]) {
      return (
        <img
          src={`/slotIcons/${symbol}.${imageExtensions[symbol]}`}
          alt={symbol}
          style={{ width: "60px", height: "60px", objectFit: "contain" }}
        />
      );
    }

    return symbol === "❓" ? symbol : "❓";
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <div className="container py-5">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white text-center py-4">
            <h1 className="card-title mb-0 display-4">
              PROGRAMISTYCZNA MASZYNA
            </h1>
          </div>

          <div className="card-body p-5">
            <div className="text-center mb-5">
              <p className="h5 text-muted mb-4">
                Spróbuj szczęścia i wygraj gwiazdki grając na naszej
                programistycznej maszynie!
              </p>

              <div className="d-flex justify-content-center gap-3 mb-4">
                {reels.map((symbol, index) => (
                  <div
                    key={index}
                    className={`border border-dark rounded-3 p-3 bg-white d-flex align-items-center justify-content-center shadow-sm ${
                      isSpinning ? "spinning" : ""
                    }`}
                    style={{
                      width: "100px",
                      height: "100px",
                      fontSize: "40px",
                      transition: isSpinning ? "none" : "transform 0.3s ease",
                    }}
                  >
                    {renderSymbol(symbol)}
                  </div>
                ))}
              </div>

              <div className="row justify-content-center align-items-center mb-4">
                <div className="col-auto">
                  <label htmlFor="betAmount" className="form-label mb-0 h6">
                    Stawka:
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="number"
                    id="betAmount"
                    className="form-control border-2"
                    value={betAmount}
                    onChange={(e) =>
                      setBetAmount(Math.max(10, parseInt(e.target.value) || 10))
                    }
                    min="10"
                    disabled={isSpinning}
                    style={{ width: "120px" }}
                  />
                </div>
                <div className="col-auto">
                  <span className="text-muted">⭐️</span>
                </div>
              </div>

              {message && (
                <div
                  className={`alert ${
                    message.includes("Wygrana")
                      ? "alert-success"
                      : message.includes("Błąd")
                      ? "alert-danger"
                      : "alert-warning"
                  } text-center mb-5`}
                  role="alert"
                >
                  <h5 className="alert-heading mb-2">
                    {message.includes("Wygrana")
                      ? "🎉 Brawo!"
                      : message.includes("Błąd")
                      ? "❌ Błąd"
                      : "🎯 Spróbuj ponownie!"}
                  </h5>
                  <p className="mb-0">{message}</p>
                  <hr className="my-3" />
                </div>
              )}

              <button
                onClick={playSlotMachine}
                disabled={isSpinning}
                className={`btn ${
                  isSpinning ? "btn-secondary" : "btn-primary"
                } btn-lg px-5 py-3 border-2`}
              >
                {isSpinning ? (
                  <>
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    KRĘCI SIĘ...
                  </>
                ) : (
                  "🎰 ZAGRAJ!"
                )}
              </button>
            </div>

            <div className="card bg-light border-0">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">📋 Zasady gry</h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-3">
                  <li className="mb-2">🎯 Kliknij w przycisk aby wylosować</li>
                  <li className="mb-2">
                    🏆 Dopasuj 3 takie same języki programowania i wygraj
                    nagrodę x10
                  </li>
                  <li className="mb-2">
                    🥈 Dopasuj 2 takie same języki programowania i wygraj
                    nagrodę x3
                  </li>
                </ul>

                <div className="alert alert-danger border-2 mb-0">
                  <h6 className="alert-heading">⚠️ Ważne!</h6>
                  <p className="mb-0 small">
                    Ten projekt ma charakter czysto edukacyjny i nie wspiera
                    hazardu ani gier na pieniądze. Hazard może być szkodliwy i
                    prowadzić do uzależnienia. Gra odbywa się wyłącznie za
                    wirtualne punkty w formie rozrywki.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer bg-light text-center py-3">
            <small className="text-muted">
              🎰 Wybierz stawkę i spróbuj szczęścia w programistycznej maszynie!
            </small>
          </div>
        </div>

        <style jsx>{`
          .spinning {
            animation: spin 0.1s infinite linear;
          }

          @keyframes spin {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};
