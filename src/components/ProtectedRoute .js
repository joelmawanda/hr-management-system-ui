// import React from "react";
// import { Navigate } from "react-router-dom";

// const isAuthenticated = () => {
//   const token = localStorage.getItem("token");

//   return !!token;
// };

// const ProtectedRoute = ({ element }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/" />;
//   }

//   return element;
// };

// export default ProtectedRoute;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const ProtectedRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = isAuthenticated();
      if (!auth) {
        navigate("/");
      } else {
        setLoading(false);  // Finished loading once the check is done
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading until the auth check is done
  }

  return element;
};

export default ProtectedRoute;

