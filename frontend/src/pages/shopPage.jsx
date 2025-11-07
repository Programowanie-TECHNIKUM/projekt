import Navbar from "../components/navbar";
import Rename from "../components/shopOfferts/rename";
import { useState, useEffect } from "react";

import checkAuth from "../misc/checkAuth.js";

export default () => {
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

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <div className="container py-5">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white text-center py-4">
            <h1 className="card-title mb-0 display-4">SKLEP</h1>
          </div>

          <div className="card-body p-5">
            <div className="text-center mb-4">
              <h2 className="h3 text-dark mb-3">Sklep z ulepszeniami</h2>
              <p className="text-muted fs-5">
                Wykorzystaj swoje gwiazdki tutaj!
              </p>
            </div>

            <Rename />
          </div>

          <div className="card-footer bg-light text-center py-3">
            <small className="text-muted">
              💡 Kup przedmioty, aby ulepszyć swoje doświadczenie
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
