import React, { useState } from "react";
import "./App.css";

function App() {

  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(
    localStorage.getItem("user") || ""
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [ratings, setRatings] = useState({});

  const foods = [
    { id: 1, name: "Pizza", price: 199, category: "Pizza", emoji: "🍕" },
    { id: 2, name: "Burger", price: 129, category: "Burger", emoji: "🍔" },
    { id: 3, name: "Biryani", price: 180, category: "Rice", emoji: "🍛" },
    { id: 4, name: "Pasta", price: 149, category: "Pasta", emoji: "🍝" },
    { id: 5, name: "Sandwich", price: 99, category: "Snacks", emoji: "🥪" },
    { id: 6, name: "French Fries", price: 89, category: "Snacks", emoji: "🍟" },
    { id: 7, name: "Dosa", price: 80, category: "Rice", emoji: "🥞" },
    { id: 8, name: "Ice Cream", price: 70, category: "Snacks", emoji: "🍨" }
  ];

  // Dark Mode
  function toggleTheme() {
    const newTheme = !dark;
    setDark(newTheme);

    localStorage.setItem(
      "theme",
      newTheme ? "dark" : "light"
    );
  }

  // Add to Cart
  function addToCart(food) {
    setCart([...cart, food]);
    alert(food.name + " added to cart!");
  }

  // Remove from Cart
  function removeItem(index) {
    setCart(cart.filter((_, i) => i !== index));
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price, 0
  );

  // Signup
  function signup(e) {
    e.preventDefault();

    localStorage.setItem("user", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registration Successful!");

    setUser(username);
    setPage("home");
  }

  // Login
  function login(e) {
    e.preventDefault();

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (email === savedEmail && password === savedPassword) {

      alert("Login Successfully!");

      setUser(localStorage.getItem("user"));
      setPage("home");

    } else {
      alert("Invalid Email or Password!");
    }
  }

  // Logout
  function logout() {
    localStorage.removeItem("user");
    setUser("");
    setPage("home");
  }

  // Rating
  function giveRating(id, value) {
    setRatings({
      ...ratings,
      [id]: value
    });
  }

  const filteredFoods = foods.filter((food) => {

    const matchSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || food.category === category;

    return matchSearch && matchCategory;
  });

  return (

    <div className={dark ? "app dark" : "app"}>

      {/* NAVBAR */}

      <nav className="navbar">

        <h2>🍔 Foodie</h2>

        <div className="nav-links">

          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("login")}>
            Login
          </button>

          <button onClick={() => setPage("signup")}>
            Sign Up
          </button>

          <button onClick={() => setPage("cart")}>
            🛒 Cart: {cart.length}
          </button>

          <button onClick={toggleTheme}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {user && (
            <>
              <span>Hi, {user}</span>

              <button onClick={logout}>
                Logout
              </button>
            </>
          )}

        </div>

      </nav>


      {/* HOME PAGE */}

      {page === "home" && (

        <section className="home">

          <h1>Delicious Food Delivered To Your Door</h1>

          <p>Order your favourite food online!</p>

          <input
            className="search"
            type="text"
            placeholder="Search your favourite food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* CATEGORY */}

          <div className="categories">

            {["All", "Pizza", "Burger", "Rice", "Pasta", "Snacks"].map(
              (item) => (

                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>

              )
            )}

          </div>


          {/* FOOD CARDS */}

          <div className="food-container">

            {filteredFoods.map((food) => (

              <div className="food-card" key={food.id}>

                <div className="food-image">
                  {food.emoji}
                </div>

                <h3>{food.name}</h3>

                <h4>₹{food.price}</h4>

                <div className="rating">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <span
                      key={star}
                      onClick={() => giveRating(food.id, star)}
                      style={{
                        color:
                          star <= (ratings[food.id] || 0)
                            ? "orange"
                            : "gray"
                      }}
                    >
                      ★
                    </span>

                  ))}

                </div>

                <p>
                  Your Rating: {ratings[food.id] || "Not rated"}
                </p>

                <button onClick={() => addToCart(food)}>
                  Add to Cart
                </button>

              </div>

            ))}

          </div>

          {filteredFoods.length === 0 && (
            <h3>No food found!</h3>
          )}

        </section>

      )}


      {/* LOGIN PAGE */}

      {page === "login" && (

        <div className="form-container">

          <form onSubmit={login}>

            <h2>Login</h2>

            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              Login
            </button>

            <p>
              Don't have an account?
              <span onClick={() => setPage("signup")}>
                Sign Up
              </span>
            </p>

          </form>

        </div>

      )}


      {/* SIGNUP PAGE */}

      {page === "signup" && (

        <div className="form-container">

          <form onSubmit={signup}>

            <h2>Create Account</h2>

            <input
              type="text"
              placeholder="Enter Name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Create Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              Sign Up
            </button>

            <p>
              Already have an account?
              <span onClick={() => setPage("login")}>
                Login
              </span>
            </p>

          </form>

        </div>

      )}


      {/* SHOPPING CART */}

      {page === "cart" && (

        <section className="cart-section">

          <h1>🛒 Shopping Cart</h1>

          {cart.length === 0 && (
            <p>Your cart is empty!</p>
          )}

          {cart.map((item, index) => (

            <div className="cart-item" key={index}>

              <h3>{item.emoji} {item.name}</h3>

              <p>₹{item.price}</p>

              <button onClick={() => removeItem(index)}>
                Remove
              </button>

            </div>

          ))}

          <h2>Total: ₹{total}</h2>

          {cart.length > 0 && (

            <button onClick={() => {
              alert("Order Placed Successfully!");
              setCart([]);
              setPage("home");
            }}>
              Place Order
            </button>

          )}

          <br />

          <button onClick={() => setPage("home")}>
            Continue Shopping
          </button>

        </section>

      )}


      {/* FOOTER */}

      <footer>

        <h3>🍔 Foodie</h3>

        <p>Delicious Food Delivered To Your Door</p>

        <p>© 2026 Foodie. All Rights Reserved.</p>

      </footer>

    </div>

  );
}

export default App;