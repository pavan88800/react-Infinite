import { useEffect, useState } from "react";

const URL = "https://meme-api.com/gimme/20";
const Infinite = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let isFetching = false;
  async function getData() {
    setIsLoading(true);
    const response = await fetch(URL);
    const result = await response.json();
    setIsLoading(false);
    setData((memes) => [...memes, ...result.memes]);
  }

  function handleScroll() {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      if (!isFetching) {
        isFetching = true;
        setTimeout(() => {
          getData().finally(() => {
            isFetching = false;
          });
        }, 300);
      }
    }
  }

  useEffect(() => {
    getData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      {data.map((item, index) => {
        return (
          <div className="card" key={index}>
            <p>{item.title}</p>
          </div>
        );
      })}
      {isLoading ? <h2 className="isLoading">Loading....</h2> : null}
    </div>
  );
};

export default Infinite;
