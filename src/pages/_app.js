import Layout from "../components/layout";
import Head from "next/head";
import "../styles/global.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<meta charSet="utf-8" />
				<title>orb</title>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
				<link rel="canonical" href="https://graemestew.art/orb" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}