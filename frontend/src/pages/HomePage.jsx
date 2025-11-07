import { useEffect } from "react";
import checkValidJWTtoken from "../misc/checkValidJWTtoken";
import decodeJWTtoken from "../misc/decodeJWTtoken";
import { useState } from "react";
import Navbar from "../components/navbar.jsx";

import checkAuth from "../misc/checkAuth.js";

export default () => {
  const [user, setUser] = useState(null);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      const authResult = await checkAuth();
      if (authResult) {
        setIsValid(authResult.isValid);
      }
    };

    authenticateUser();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const decode = await decodeJWTtoken();
      setUser(decode.username);
    };

    getUserInfo();
  }, []);


  return (
    <div>
      <Navbar />
      {isValid && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              <div className="card shadow-lg">
                <div className="card-body center">
                  <h1 className="card-title">Witaj! {user} 👋</h1>
                  <p>Zobacz co mozesz robic na naszej stronie!</p>
                </div>

                <hr />

                <div>
                  <div className="card-body">
                    <h3 className="card-title">Egzaminy</h3>
                    <p className="card-text">
                      Zarob dodatkowe gwiazdki poprzez robienie pytan z egzaminu
                      INF04!
                    </p>
                    <a href="/quiz" className="btn btn-primary">
                      Przejdz do quizu
                    </a>
                  </div>
                </div>

                <hr />

                <div>
                  <div className="card-body">
                    <h3 className="card-title">Sklep</h3>
                    <p className="card-text">
                      Wymieniaj swoje gwiazdki na nagrody w naszym sklepie!
                    </p>
                    <a href="/shop" className="btn btn-primary">
                      Przejdz do sklepu
                    </a>
                  </div>
                </div>

                <hr />

                <div>
                  <div className="card-body">
                    <h3 className="card-title">Ranking</h3>
                    <p className="card-text">
                      Zobacz jak wypadasz na tle innych graczy w naszym
                      rankingu!
                    </p>
                    <a href="/leaderboard" className="btn btn-primary">
                      Przejdz do rankingu
                    </a>
                  </div>
                </div>

                <hr />

                <div>
                  <div className="card-body">
                    <h3 className="card-title">Gra</h3>
                    <p className="card-text">
                      Zagraj na naszej programistycznej maszynie i wygraj
                      gwiazdki!
                    </p>
                    <p className = "text-muted">Projekt edukacyjny - nie wspiera hazardu, który jest szkodliwy dla młodzieży. Hazard prowadzi do uzależnienia. Gra wyłącznie za punkty jako forma bezpiecznej rozrywki.</p>

                    <a href="/game" className="btn btn-danger">
                      Przejdz do gry
                    </a>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
