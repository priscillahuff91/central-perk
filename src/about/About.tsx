import React from "react";
import "./about.scss";

const About = () => {
  return (
    <main>
      <h1>Welcome to Central Perk!</h1>
      <p>
        Central Perk is a long standing coffee shop made famous through our <i>friends</i>, Rachel, Ross, Chandler, Pheobe and Monica. We decided that Central Perk needed an internal management system to help manage some of the day-to-day tasks and to easily allow employees to make changes without having to call-in. Some of these tasks include:
        <ul>
          <li>Adding employees to our company list</li>
          <li>Adding beverages to our menu</li>
          <li>Updating the employee schedule</li>
          <li>Setting beverages of the day</li>
        </ul>
        Feel free to look around and make edits how you see fit. Thank you for visiting Central Perk and I hope you enjoy your stay!
      </p>
    </main>
  );
};

export default About;
