import Layout from "../components/layout";
import Head from "next/head";
import "../styles/global.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<meta charSet="utf-8" />
				<title>orb: online radio broadcaster</title>
				<meta property="og:title" content="orb: online radio broadcaster" />
				<meta property="og:description" content="A handy tool that aggregates various online, non-terrestrial radio stations on a single site." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://orb-web.now.sh" />
				<meta property="og:image" content="/images/orb/logoblackog.png" />
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
				<link rel="canonical" href="https://orb-web.now.sh" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}