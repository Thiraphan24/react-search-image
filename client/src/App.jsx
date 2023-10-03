import { useState } from "react";
import "./App.css";
import Picture from "./component/Picture";

function App() {
  const [word, setWord] = useState("");
  const [photos, setPhotos] = useState([]);
  const key = "whIGJ7E0UHo907gt-PvQwsPi1XOTXWFwGkHCMNkQl6g";

  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("กรุณาป้อนชื่อรูปภาพ");
    } else {
      fetchImageFromAPI();
    }
  }

  async function fetchImageFromAPI() {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${word}&client_id=${key}&per_page=15`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data.results;
    if (result.length == 0) {
      alert("ไม่มีข้อมูลรูปภาพ");
      setWord("");
    } else {
      setPhotos(result);
    }
  }
  return (
    <>
      <h1>ระบบค้นหารูปภาพด้วย API</h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="ป้อนชื่อรูปภาพที่ต้องการค้นหา"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">ค้นหา</button>
      </form>
      <div className="search-result">
        {photos.map((data, index) => {
          return <Picture {...data} key={index} />;
        })}
      </div>
    </>
  );
}

export default App;
