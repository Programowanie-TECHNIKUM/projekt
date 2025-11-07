import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/config.js";
import Logout from "./logout.jsx";
import decodeJWTtoken from "../misc/decodeJWTtoken.js";

const Navbar = () => {
  const [money, setMoney] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMoneySocket = async () => {
      const jwt = await decodeJWTtoken();
      const userId = jwt?.userId;
      if (userId) {
        const userRef = ref(database, `users/${userId}`);

        onValue(
          userRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data && data.money !== undefined) {
              setMoney(data.money);
              setUser(data);
            }
          },
          {
            onlyOnce: false,
          }
        );
      }
    };
    getMoneySocket();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href=".">
                Strona główna
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/game">
                Gra
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/leaderboard">
                Ranking
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shop">
                Sklep
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/quiz">
                Egzamin (zarób ⭐️)
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <span className="badge bg-danger fs-6 px-3 py-2 me-2">
              {money} ⭐️
            </span>
            <Logout />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
