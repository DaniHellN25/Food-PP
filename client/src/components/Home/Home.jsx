import React from "react";
import NavBar from "../NavBar/NavBar";
import Paging from "../Paging/Paging";
import SearchBar from "../SearchBar/SearchBar";
export default function Home() {
  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <div>  
        <SearchBar></SearchBar>
      </div>
      <div>
        <Paging></Paging>
      </div>
    </div>
  );
}
