import { useSelector } from "react-redux";

//ORDER BOOK & TICKER
const OrderBook = () => {
  //FETCH BID, ASK & TICKER DATA FROM STORE
  const { bids, asks, ticker } = useSelector((state) => state.orderBook);
  bids.length = 25;
  asks.length = 25;
  let totalBids = 0;
  let bidss = bids.map((bid, i) => {
    return { ...bid, total: (totalBids += bids[i].amount) };
  });
  let totalAsks = 0;
  let askss = asks.map((bid, i) => {
    return { ...bid, total: (totalAsks += asks[i].amount) };
  });
  return (
    <div className="md:flex">
      {/* TICKER */}
      <div className="mr-2">
        {ticker.last_price ? (
          <div
            className="flex items-center p-3"
            style={{ backgroundColor: "#172d3e" }}
          >
            <div className="px-2">
              <img
                className="w-10"
                src="https://static.bitfinex.com/images/icons/BTC-alt.svg"
              />
            </div>
            <div className="text-left px-2">
              <p>BTC/USD</p>
              <small>
                VOL{" "}
                <span>
                  {parseFloat(
                    (ticker.volume * ticker.last_price).toFixed(0)
                  ).toLocaleString("en")}{" "}
                </span>
                USD
              </small>
              <br />
              <small>
                LOW <span>{parseFloat(ticker.low).toLocaleString("en")} </span>
              </small>
            </div>
            <div className="text-left px-2">
              <p>{parseFloat(ticker.last_price).toLocaleString("en")}</p>
              <small
                className={
                  "flex " +
                  (ticker.daily_change >= 0 ? "text-green-500" : "text-red-500")
                }
              >
                {Math.abs(ticker.daily_change).toFixed(2)}
                {ticker.daily_change >= 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style={{ color: "green" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style={{ color: "red" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                ({Math.abs(ticker.daily_change_relative)}%)
              </small>
              <small>
                HIGH {parseFloat(ticker.high.toFixed(0)).toLocaleString("en")}
              </small>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* BID */}
      <div className="shadow-md" style={{ backgroundColor: "#172d3e" }}>
        <p className="text-left ml-4">
          Order Book <span>BTC/USD</span>
        </p>
        <table className="min-w-full">
          <thead className="border-b">
            <tr style={{ backgroundColor: "#172d3e" }}>
              <th className="text-xs font-medium text-gray-300 px-6 py-4 text-left">
                Count
              </th>
              <th className="text-xs font-medium text-gray-300 px-6 py-4 text-left">
                Amount
              </th>
              <th className="text-xs font-medium text-gray-300 px-6 py-4 text-left">
                Total
              </th>
              <th className="text-xs font-medium text-gray-300 px-6 py-4 text-left">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {bidss.map((bid) => {
              let percentage =
                (bid.total.toFixed(4) * 100) / bidss[bidss.length - 1].total;
              return (
                <tr
                  style={{
                    backgroundImage: `linear-gradient(to left, #12454c ${percentage}%, #172D3E 0%)`,
                  }}
                  key={bid.total}
                >
                  <td>{bid.count}</td>
                  <td>{bid.amount.toFixed(4)}</td>
                  <td>{bid.total.toFixed(4)}</td>
                  <td>{parseFloat(bid.price).toLocaleString("en")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* ASK */}
      <div style={{ backgroundColor: "#172d3e" }}>
        <p>
          {/* Order Book <span>BTC/USD</span> */}
          <br />
        </p>
        <table className="min-w-full">
          <thead className="border-b">
            <tr style={{ backgroundColor: "#172d3e" }}>
              <th className="text-xs font-medium text-gray-300 px-6 py-4 text-left">
                Count
              </th>
              <th className="text-xs font-medium text-gray-300 px-6 py-4 text-left">
                Amount
              </th>
              <th className="text-xs font-medium text-gray-300 px-6 py-4 text-left">
                Total
              </th>
              <th className="text-xs font-medium text-gray-300 px-6 py-4 text-left">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {askss.map((ask) => {
              let percentage =
                (ask.total.toFixed(4) * 100) / askss[askss.length - 1].total;
              return (
                <tr
                  style={{
                    backgroundImage: `linear-gradient(to right, #403340 ${percentage}%, #172D3E 0%)`,
                  }}
                  key={ask.total}
                >
                  <td>{ask.count}</td>
                  <td>{ask.amount.toFixed(4)}</td>
                  <td>{ask.total.toFixed(4)}</td>
                  <td>{parseFloat(ask.price).toLocaleString("en")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBook;
