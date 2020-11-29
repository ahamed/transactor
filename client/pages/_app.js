import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import Head from 'next/head';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	// uri: 'http://localhost:4001/api/v1/terminal',
	uri: 'http://192.168.1.104:4001/api/v1/terminal',
	cache: new InMemoryCache(),
});

import { motion, AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
	return (
		<div style={{ position: 'relative' }}>
			<AnimatePresence>
				<motion.div
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
					}}
					key={router.route}
					initial='initial'
					animate='in'
					exit='out'
					variants={{
						initial: {
							x: '-100vw',
						},
						in: {
							x: '0',
						},
						out: {
							x: '100vw',
						},
					}}
					transition={{
						duration: 0.3,
						type: 'tween',
						ease: 'easeInOut',
					}}
				>
					<ApolloProvider client={client}>
						<Component {...pageProps} />
					</ApolloProvider>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

export default MyApp;
