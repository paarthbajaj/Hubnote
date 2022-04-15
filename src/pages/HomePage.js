import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import AddNote from "../components/AddNote";
import ShowNote from "../components/ShowNote";

const HomePage = () => {
  return (
    <div className="app-container pt-1">
      <Sidebar />
      <Searchbar />
      <AddNote />
      <ShowNote />
    </div>
  );
};
export default HomePage;
