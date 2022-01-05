import logo from "./assets/loader.gif";
import "./App.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderBook } from "./redux/actions/orderBookActions";

import OrderBook from "./components/OrderBook";

function App() {
  const { loading } = useSelector((state) => state.orderBook);
  const dispatch = useDispatch();

  const [isPaused, setPause] = useState(false);

  const handleConnection = (pauseStatus) => {
    setPause(!pauseStatus);
    dispatch(fetchOrderBook({ connectionStatus: !pauseStatus }));
  };

  useEffect(() => {
    dispatch(fetchOrderBook({ connectionStatus: isPaused }));
  }, [dispatch, isPaused]);

  return (
    <div className="App" style={{ backgroungColor: "#0f222f" }}>
      {!loading ? (
        <div>
          <OrderBook />
          <br />

          <button
            className="px-4 py-2 border rounded"
            onClick={() => handleConnection(isPaused)}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <img src={logo} alt="Loader" className="w-20" />
        </div>
      )}
    </div>
  );
}

export default App;
