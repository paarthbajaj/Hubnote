// import Sidebar from "../components/Sidebar";
// import Searchbar from "../components/Searchbar";
// import AddNote from "../components/AddNote";
// import ShowNote from "../components/ShowNote";
import { Sidebar, Searchbar, AddNote, ShowNote, TagsPopup } from "../index";

export const HomePage = () => {
  return (
    <div className="app-container home-page pt-1">
      <Sidebar />
      <Searchbar />
      <AddNote />
      <ShowNote />
      <TagsPopup />
    </div>
  );
};
