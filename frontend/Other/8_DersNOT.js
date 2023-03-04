// once fetchledik verileri cektik useEffect ile
// package.json da proxy yazdik "proxy":"http://localhost:3000" gerisinde fetchde yazdik  fetch("/api/workouts/")
// sonra onu workouts statine gonderdik
// <WorkoutDetails key={workout._id} workout={workout}/>       propsladik


import { useEffect, useState } from "react";

// components
import WorkoutDetails from '../components/WorkoutDetails'

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout}/>)}
      </div>
    </div>
  );
};

export default Home;


// workoutdetails de  workout propsundan faydalanark bunlari workouts verilerini yazdirdik

import React from "react";

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps:</strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
