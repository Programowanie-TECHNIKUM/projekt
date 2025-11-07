import { useEffect, useState } from "react";
import checkValidJWTtoken from "../misc/checkValidJWTtoken.js";
import decodeJWTtoken from "../misc/decodeJWTtoken.js";
import Navbar from "../components/navbar.jsx";

const apiUrl = import.meta.env.VITE_API_URL || "/api";

export default () => {
  const [isValid, setIsValid] = useState(null);
  const [question, setQuestion] = useState(null);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [money, setMoney] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  useEffect(() => {
    const checkJWT = async () => {
      const jwt = await cookieStore.get("jwt");
      if (jwt) {
        const isValid = await checkValidJWTtoken(jwt.value);
        setIsValid(isValid);
        if (!isValid) {
          location.href = "/login";
          return;
        }

        setUser(await decodeJWTtoken());
        await getRandomQuestion();
      } else {
        location.href = "/login";
      }
    };

    checkJWT();
  }, []);

  const getRandomQuestion = async () => {
    const jwt = await cookieStore.get("jwt");
    if (jwt) {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/quiz/getRandomQuestion`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt.value}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        let parsedQuestion = JSON.parse(data.question);
        parsedQuestion = JSON.parse(parsedQuestion);
        setQuestion(parsedQuestion);
      }
      setIsLoading(false);
    }
  };

  const checkAnswer = async (answer) => {
    const jwt = await cookieStore.get("jwt");
    if (jwt) {
      setIsAnswering(true);
      const response = await fetch(`${apiUrl}/quiz/checkAnswer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.value}`,
        },
        body: JSON.stringify({ answer }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.correct) {
          setAlert({
            type: "success",
            title: "🎉 Brawo!",
            message: `Poprawna odpowiedź! ${
              data.money ? `Zdobywasz ${data.money} ⭐️.` : ""
            }`,
          });

          setMoney(data.allMoney);
        } else {
          setAlert({
            type: "danger",
            title: "❌ Błędna odpowiedź",
            message: `Niestety, to nie jest prawidłowa odpowiedź. ${
              data.correctAnswer
                ? `Prawidłowa odpowiedź to: ${data.correctAnswer}`
                : ""
            }`,
          });
        }

        setTimeout(async () => {
          setAlert(null);
          await getRandomQuestion();
          setIsAnswering(false);
        }, 3000);
      } else {
        setIsAnswering(false);
      }
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <div className="container py-5">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white text-center py-4">
            <h1 className="card-title mb-0 display-4">QUIZ</h1>
          </div>

          <div className="card-body p-5">
            {alert && (
              <div
                className={`alert alert-${alert.type} text-center mb-4`}
                role="alert"
              >
                <h5 className="alert-heading mb-2">{alert.title}</h5>
                <p className="mb-0">{alert.message}</p>
                <hr className="my-3" />
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Ładowanie pytania...</p>
              </div>
            ) : question && !alert ? (
              <div>
                <div className="mb-4">
                  <h2 className="h3 text-dark mb-4">{question.title}</h2>
                </div>

                <div className="row g-3">
                  {(() => {
                    if (!question.answers) {
                      return (
                        <div className="col-12">
                          <div
                            className="alert alert-warning text-center"
                            role="alert"
                          >
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            Nie ma pytań (odśwież stronę)
                          </div>
                        </div>
                      );
                    }

                    return Object.entries(question.answers).map(
                      ([key, value], index) => {
                        const buttonColors = [
                          "btn-outline-primary",
                          "btn-outline-success",
                          "btn-outline-warning",
                          "btn-outline-danger",
                        ];
                        const buttonColor =
                          buttonColors[index % buttonColors.length];

                        return (
                          <div key={key} className="col-md-6">
                            <button
                              className={`btn ${buttonColor} w-100 py-3 text-start border-2 ${
                                isAnswering ? "disabled" : ""
                              }`}
                              onClick={() => checkAnswer(key)}
                              disabled={isAnswering}
                            >
                              <div className="d-flex align-items-center">
                                <span className="badge bg-secondary me-3 fs-6">
                                  {key}
                                </span>
                                <span className="flex-grow-1">{value}</span>
                                {isAnswering && (
                                  <div
                                    className="spinner-border spinner-border-sm ms-2"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                )}
                              </div>
                            </button>
                          </div>
                        );
                      }
                    );
                  })()}
                </div>
              </div>
            ) : (
              !alert && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Ładowanie pytania...</p>
                </div>
              )
            )}
          </div>

          <div className="card-footer bg-light text-center py-3">
            <small className="text-muted">
              💡 Wybierz odpowiedź, która Twoim zdaniem jest prawidłowa
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
