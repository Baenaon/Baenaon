import Head from "next/head";
import Image from "next/image";
import Layout from "../pages/components/layout";

import Hero from "./components/home/hero";
import Animation from "./components/home/animation";
import wrapper from "../store/configureStore";

const Homes = () => {
  return (
    <Layout>
      <Head>
        <title>배나온</title>
        <meta name="description" content="배나온" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full h-300">
        <div>
          <Hero />
        </div>
      </section>
    </Layout>
  );
};

export default Homes;
