import { ActionTypes } from "../actionTypes/action-types";

let bids = [];
let asks = [];
let bookChannelId;
let tickerChannelId;
let symbol;
let connected = false;
let connecting = false;
let ws;
const conf = {
  wshost: "wss://api.bitfinex.com/ws/2",
};

let msg = JSON.stringify({
  event: "subscribe",
  channel: "book",
  symbol: "tBTCUSD",
});

let msg1 = JSON.stringify({
  event: "subscribe",
  channel: "ticker",
  symbol: "tBTCUSD",
});

export const fetchOrderBook = (payload) => async (dispatch) => {
  if (!connecting && !connected) ws = new WebSocket(conf.wshost, "protocolOne");
  if (payload.connectionStatus) ws.close();
  connecting = true;
  ws.onopen = (event) => {
    connecting = false;
    connected = true;
    ws.send(msg);
    ws.send(msg1);
  };

  ws.onclose = () => {
    connecting = false;
    connected = false;
    console.log("ws closed");
  };

  ws.onmessage = (msg) => {
    let data = msg.data;
    let parsedData = JSON.parse(data);
    if (parsedData.event === "subscribed") {
      if (parsedData.channel === "book") {
        bookChannelId = parsedData.chanId;
      } else if (parsedData.channel === "ticker") {
        tickerChannelId = parsedData.chanId;
        symbol = parsedData.symbol;
      }
    }
    let rawData = parsedData[1];
    if (parsedData[0] === bookChannelId) {
      if (rawData && Array.isArray(rawData) && typeof rawData[0] === "number") {
        if (rawData[2] !== 0) {
          if (rawData[2] >= 0) {
            // SINGLE BID
            let bid = {
              count: rawData[1],
              amount: rawData[2],
              price: rawData[0],
            };
            bids.unshift(bid);
          } else {
            // SINGLE ASK
            let ask = {
              count: rawData[1],
              amount: Math.abs(rawData[2]),
              price: rawData[0],
            };
            asks.unshift(ask);
          }
          // DISPATCH
          if (bids.length > 25 && asks.length > 25) {
            bids.length = 25;
            dispatch({ type: ActionTypes.FETCH_BIDS, payload: bids });
            asks.length = 25;
            dispatch({ type: ActionTypes.FETCH_ASKS, payload: asks });
          }
        }
      }
    }
    // TICKER
    if (parsedData[0] === tickerChannelId) {
      if (rawData && Array.isArray(rawData)) {
        let ticker = {
          symbol: symbol,
          bid: rawData[0],
          bid_size: rawData[1],
          ask: rawData[2],
          ask_size: rawData[3],
          daily_change: rawData[4],
          daily_change_relative: rawData[5],
          last_price: rawData[6],
          volume: rawData[7],
          high: rawData[8],
          low: rawData[9],
        };
        dispatch({ type: ActionTypes.FETCH_TICKER, payload: ticker });
      }
    }
  };
};
