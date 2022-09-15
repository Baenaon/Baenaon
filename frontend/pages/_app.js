import "../styles/globals.css";
import wrapper from "../store/configureStore";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1b938e42e92a3fdd1cc9f706ac5c6bfd&libraries=services,clusterer&autoload=false"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
