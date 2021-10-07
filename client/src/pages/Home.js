import React from "react";
import LoginForm from "../components/LoginForm";

const Home = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="flex-row justify-center">
          <p id="home-paragraph">
            Organization is the key to success! Create an account to keep track,
            organize, and sort all the employers you have applied to. Keeping
            your eye on the prize will allow you to easily see your progress.
            Good luck!{" "}
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
};

export default Home;
