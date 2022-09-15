import Header from "./header";
import Footer from "./footer";

export default function layout({ children }) {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
      <Footer></Footer>
    </>
  );
}
