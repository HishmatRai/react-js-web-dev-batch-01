import React from "react";
import { Home, About, Contact, Login } from "./pages";
import { RouterNavigation } from "./config";
const App = () => {
  return <RouterNavigation />;
};
export default App;

// import React from "react";
// import { Home, About, Contact, Login ,PageNotFound} from "./pages";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about-us" element={<About />}/>
//         <Route path="/contact-us" element={<Contact />}/>
//         <Route path="/login" element={<Login />}/>
//         <Route path="/*" element={<PageNotFound />}/>
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export default App;
