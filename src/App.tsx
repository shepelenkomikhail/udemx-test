import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProvider from "./context/myProvider";
import MainApp from "./Components/MainApp";
import PurchasePage from "./Components/PurchasePage";
import AdminPage from "./Components/AdminPage";
import EditCar from "./Components/EditCar";
import AddCar from "./Components/AddCar";

function App() {
  return (
    <ChakraProvider>
      <MyProvider>
        <Router basename="/udemx-test">
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/edit" element={<EditCar />} />
            <Route path="/add" element={<AddCar />} />
          </Routes>
        </Router>
      </MyProvider>
    </ChakraProvider>
  );
}

export default App;
