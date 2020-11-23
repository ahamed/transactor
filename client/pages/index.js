import Layout from '../components/layouts/Layout';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Home</title>
			</Head>
			<div>
				<h1>Hello from index</h1>
			</div>
		</Layout>
	);
}
