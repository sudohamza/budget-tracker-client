import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConfigProvider } from "antd";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const theme = {
  token: {
    // Seed Token
    // colorPrimary: "#001529",
    // borderRadius: 50,
    // // Alias Token
    // colorBgContainer: "#f6ffed",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);
