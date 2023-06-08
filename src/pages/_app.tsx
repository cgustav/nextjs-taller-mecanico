import "../styles/globals.css";
import { FC } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
// import store from "../store";
import { useStore } from "react-redux";
import MainLayout from "../components/layouts/main-layout";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  // let persistor = persistStore(store);
  const store: any = useStore();
  // const { store, props } = wrapper.useWrappedStore(rest);
  // const { emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={store.__persistor}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);

// export default MyApp;
