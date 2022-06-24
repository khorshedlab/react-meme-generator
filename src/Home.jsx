import { useEffect, useState } from "react";
import axios from "axios";
import MemeCard from "./MemeCard";
import "./styles/Home.css";
import Pagination from "./Pagination";

function Home() {
  const [memes, setMemes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const pages = [];
  for (let i = 1; i <= Math.ceil(memes.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const limitedMemes = memes.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    getMemes();
  }, []);

  const getMemes = async () => {
    try {
      const { data } = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(data.data.memes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__header">
          <h1 className="home__title">Meme-Generator</h1>
          <a href="https://github.com/khorshedlab/react-meme-generator" className="home__link-top">
            Github
          </a>
        </div>
        <div className="home__main">
          <h2 className="home__main-title">✨Latest Memes🎉</h2>
          <div className="home__memes-container">
            {limitedMemes.length > 0 &&
              limitedMemes.map((i) => <MemeCard i={i} key={i.id} />)}
          </div>
          <Pagination
            func={{
              currentPage,
              setCurrentPage,
              pages,
            }}
          />
          <div className="home__footer">
            <p className="home__copyright">
              Made by
              <a
                className="home__link-bottom"
                href="https://www.facebook.com/khorshed.khuso/"
              >
                Khorshed
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
