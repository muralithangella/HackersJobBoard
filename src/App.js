import { useEffect, useState } from "react";
import "./styles.css";
import JobListing from "./Components/JobListing";

export default function App() {
  const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [itemDetails, setItemDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchCurrpage = async (currPage) => {
    setCurrentPage(currPage);
    setItemDetails(true);
    let itemsList = itemIds;
    if (itemsList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }
    const ItemsForPage = itemsList;
    const fetchList = await Promise.all(
      ItemsForPage.map((list) =>
        fetch(`${API_ENDPOINT}/item/${list}.json`).then((val) => val.json())
      )
    );
    setItems([...items, fetchList]);
    setItemDetails(false);
  };

  useEffect(() => {
    if (currentPage === 0) fetchCurrpage(currentPage);
  }, []);

  return (
    <div className="App">
      <h1 className="Page_title">Hackers New Job Board</h1>
      {items.length < 1 ? (
        <p className="loading" role="list">
          Loding...
        </p>
      ) : (
        <>
          <div className="jobsList">
            {items.map((item, index) => {
              return <JobListing key={item[index].id} {...item[index]} />;
            })}
          </div>
          <button type="button" className="loadMore">
            Load More Jobs
          </button>
        </>
      )}
    </div>
  );
}
