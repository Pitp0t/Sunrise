import { Toaster } from "react-hot-toast";
import { LayoutPresentational } from "./components/Layout";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />

      <LayoutPresentational />
    </>
  );
}

export default App;
