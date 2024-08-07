import "./App.css";
import React, { useState, useEffect } from "react";
import authService from "./backend/auth";
import { login, logout } from "./app/authSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header } from "./components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((blob) => blob.json())
      .then((res) => {
        if (res.success) {
          dispatch(login(res.data?.user));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen w-full flex flex-wrap content-between ">
      <div className="w-full block font-Cuprum h-full">
        <Header />
        <main className=" w-full overflow-hidden scroll-smooth bg-gradient-to-r from-[#5f78d4] to-[#3657cd]">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className=" size-full flex align-middle justify-center">Loading...</div>
  );
}

export default App;
