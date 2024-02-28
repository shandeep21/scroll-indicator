import { useEffect, useState } from "react";
import "./styles.css";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function handleFetchData(getUrl) {
    try {
      setLoader(true);
      let response = await fetch(getUrl);
      let responseData = await response.json();
      console.log(
        ">>>",
        responseData,
        responseData &&
          responseData.products &&
          responseData.products.length > 0
      );
      if (
        responseData &&
        responseData.products &&
        responseData.products.length > 0
      ) {
        setData(responseData.products);
        setLoader(false);
      }
    } catch (e) {
      setErrorMessage(e.message);
      setLoader(false);
    }
  }

  function handleScrollPercentage() {
    let howMuchScrolled = document.documentElement.scrollTop;
    let totalScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrollPercentage((howMuchScrolled / totalScroll) * 100);
  }

  useEffect(() => {
    handleFetchData(url);
  }, [url]);

  console.log("ppp", scrollPercentage);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  return (
    <div className="full-screen">
      {console.log("***", data)}
      <h1>Scroll Indicator</h1>
      <div className="top-container">
        <div className="scroll-progress-status">
          <div
            className="current-scroll-progress"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>
      {data && data.length > 0
        ? data.map((dataItem) => <p key={dataItem.id}>{dataItem.title}</p>)
        : "No products found"}
    </div>
  );
}
