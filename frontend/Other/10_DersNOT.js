// ! Context dersi onemli

// 1 ilk once context yazmak ve kullanmak icin import ediyoruz createcontexti yani context olusturmamiz icin
// 2 sonra createcontexti bir degiskeni atayim WorkoutsContext adinda degiskene create context olusturuyoruz.
// 3 sonra bu degiskene provadir bagliyoruz uygulamanin her yerinden ulasa bilelim diye.

import { createContext } from "react";
export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
  return <WorkoutsContext.Provider>{children}</WorkoutsContext.Provider>;  // children eshittir App.js , App.js eshittir butun componentler ve dosyalar kapasadi tabiki
};

// 4 ulasmamiz icinde bize App.js providerin icinde olamasi lazim cunku butun uygulamayi kapsayan app.js onun icinde index.js gidip bu componenti imort ediyoruz context componentini context yazdigimiz yukardaki
// 5 sonrada context yazdigimiz componente donup children olarak kullaniyoruz artik her yerden contexte ulasa biliyoruz.

import { WorkoutsContextProvider } from "./context/WorkoutContext";  // !

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WorkoutsContextProvider>
    <App />                           // ! app.js i  provadiren  icine aldik
  </WorkoutsContextProvider>
);


// 6 son hali 
import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
