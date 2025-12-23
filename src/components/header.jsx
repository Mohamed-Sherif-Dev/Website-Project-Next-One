


// "use client";

// import "../components/header/header.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBagShopping,
//   faCartShopping,
//   faRightToBracket,
//   faUserPlus,
// } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";
// import { useCart } from "context/CartContext";

// const Header = () => {
//   const { totalPrice, totalItems } = useCart();
  

//   return (
//     <header id="headerElement" className="flex">
//       <Link href="/" className="logo">
//         <FontAwesomeIcon
//           icon={faBagShopping}
//           style={{ width: "1.8rem", marginTop: "0.9rem" }}
//         />
//         <span style={{ fontWeight: "bold" }}>AWU</span>
//         <p>Shopping</p>
//       </Link>

//       <nav className="links">
//         <Link className="cart" href="/cart">
//           <FontAwesomeIcon
//             icon={faCartShopping}
//             style={{ width: "1.9rem" }}
//           />
//           ${totalPrice.toFixed(2)}

//           {totalItems > 0 && (
//             <span className="products-number">{totalItems}</span>
//           )}
//         </Link>

//         <Link className="sign-in" href="/signin">
//           <FontAwesomeIcon icon={faRightToBracket} />
//           Sign in
//         </Link>

//         <Link className="register" href="/register">
//           <FontAwesomeIcon icon={faUserPlus} />
//           Register
//         </Link>
//       </nav>
//     </header>
//   );
// };

// export default Header;


"use client";

import "../components/header/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCartShopping,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useCart } from "context/CartContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { totalPrice, totalItems } = useCart();
  const [user, setUser] = useState(null);

  // اقرأ اليوزر من localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header id="headerElement" className="flex">
      <Link href="/" className="logo">
        <FontAwesomeIcon
          icon={faBagShopping}
          style={{ width: "1.8rem", marginTop: "0.9rem" }}
        />
        <span style={{ fontWeight: "bold" }}>AWU</span>
        <p>Shopping</p>
      </Link>

      <nav className="links">
        <Link className="cart" href="/cart">
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ width: "1.9rem" }}
          />
          ${totalPrice.toFixed(2)}
          {totalItems > 0 && (
            <span className="products-number">{totalItems}</span>
          )}
        </Link>

        {/* لو مش عامل Login */}
        {!user && (
          <>
            <Link className="sign-in" href="/signin">
              <FontAwesomeIcon icon={faRightToBracket} />
              Sign in
            </Link>

            <Link className="register" href="/register">
              <FontAwesomeIcon icon={faUserPlus} />
              Register
            </Link>
          </>
        )}

        {/* لو عامل Login */}
        {user && (
          <button
            className="sign-in"
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Hi, {user.username || "User"} | Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;