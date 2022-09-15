import Head from "next/head";
import Image from "next/image";
import Layout from "../pages/components/layout";
import Hero from "./components/home/hero";
import Animation from "./components/home/animation";
import wrapper from "../store/configureStore";

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>배나온</title>
        <meta name="description" content="배나온" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <Hero />
        </div>
      </section>
    </Layout>
  );
};



export default Home;
