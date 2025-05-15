import ProductList from "../components/ProductList";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Home() {
  const { i18n, t } = useTranslation();
  const [skip, setSkip] = useState(0);
  const [allData, setAllData] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const limit = 5;

  const { data, error, isPending } = useFetch(
    `https://json-api.uz/api/project/fn37-exam/${i18n.language}?skip=${skip}&limit=${limit}`
  );

  useEffect(() => {
    if (data && data.data) {
      setAllData((prev) => [...prev, ...data.data]);
      setIsFetchingMore(false);
    }
  }, [data]);

  useEffect(() => {
    setAllData([]);
    setSkip(0);
  }, [i18n.language]);

  const handleLoadMore = () => {
    setIsFetchingMore(true);
    setSkip((prev) => prev + limit);
  };

  return (
    <section>
      <div className="container">
        {(isPending || isFetchingMore) && (
          <h2 className="loader">
            <span className="loader"></span>
          </h2>
        )}
        {error && <h2 className="error">{error}</h2>}
        {allData.length > 0 && <ProductList products={allData} />}
        {!isPending && !isFetchingMore && (
          <button className="load-button" onClick={handleLoadMore}>
            {t("Load More")}
          </button>
        )}
      </div>
    </section>
  );
}

export default Home;
