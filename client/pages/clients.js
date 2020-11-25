import { useState, useEffect } from 'react';
import swal from 'sweetalert';

import Head from 'next/head';
import Layout from '../components/layouts/Layout';
import Client from '../components/client/Client';

import styles from '../styles/Clients.module.scss';

import { useQuery } from '@apollo/client';
import { GET_CLIENTS_QUERY } from '../queries/clients';

const Clients = () => {
	const { loading, error, data } = useQuery(GET_CLIENTS_QUERY);
	useEffect(() => {
		if (error) {
			swal('Attention', error.message, 'error');
		}
	}, [error]);
	return (
		<Layout>
			<Head>
				<title>Clients</title>
			</Head>
			<div className={styles['clients-list']}>
				<div className='title'>
					<span className='title-icon primary fas fa-users'></span>
					<div>Clients</div>
				</div>
				{loading ? (
					<p>Loading...</p>
				) : (
					data.clients &&
					data.clients.map(client => (
						<Client client={client} key={client.id} />
					))
				)}
			</div>
		</Layout>
	);
};

export default Clients;
