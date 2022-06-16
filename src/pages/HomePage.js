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
