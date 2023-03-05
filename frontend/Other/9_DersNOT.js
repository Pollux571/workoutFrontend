// ! kodun butun sekli repomda  workoutform.js ve Home js
// 1 Form component olusturduk veriler gondermek icin kullanici tarafindan.
// 2 veri gondermek icinde useStateden faydalaniyoruz
const [title, setTitle] = useState("");
const [load, setLoad] = useState("");
const [reps, setReps] = useState("");

// 3 sonra bu statleri form icinde kullandik ve submitlemek icin bir tande onsubmit metodu icinde handleSubmit adinda fonksiyon yazdik
const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);        // asil mesele asagida devam ediyor.

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

// 4 sonra bu verileri gondermek icin bize bir tane adress lazim o adreside biz fetch ile post metodu ile gonderiyoruz. handleSubmit fonksiyonunu bunun icin yazdik
const handleSubmit = async (e) => {
  e.preventDefault();

  const workout = { title, load, reps };
  const response = await fetch("/api/workouts", {
    // https://tr.javascript.info/fetch-api
    method: "POST",
    body: JSON.stringify(workout),
    headers: {
      // headers : response/request başlıklarını temsil ederek bunları sorgulamanıza ve sonuçlara bağlı olarak farklı eylemler gerçekleştirmenize olanak tanır.  // {"Content-type": "application/json; charset=UTF-8"}
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  if (!workout.ok) {
    setError(json.error);
  }
  if (response.ok) {
    setTitle(""); // her sey eklendikden sonra verilerin icini bosaltiyoruz
    setLoad("");
    setReps("");
    setError(null);
    console.log("new workout added", json);
  }
};

// bu verileri web sayfamizda gostermek icin home.js import ettik ve kullandik
<div className="home">
  <div className="workouts">
    {workouts &&
      workouts.map((workout) => (
        <WorkoutDetails key={workout._id} workout={workout} />
      ))}
  </div>
  <WorkoutForm />
</div>;
