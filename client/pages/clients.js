import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import _ from 'lodash';

import Head from 'next/head';
import Layout from '../components/layouts/Layout';
import Client from '../components/client/Client';

import styles from '../styles/Clients.module.scss';

import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_CLIENTS_QUERY } from '../queries/clients';

const Clients = () => {
	const [clientData, setClientData] = useState([]);
	const [filter, setFilter] = useState(null);

	const [fetchClients, { loading, error, data }] = useLazyQuery(
		GET_CLIENTS_QUERY
	);

	useEffect(() => {
		fetchClients({
			variables: { limit: 500, page: 1 },
		});
	}, []);

	useEffect(() => {
		if (data?.clients) setClientData(data.clients);
	}, [data]);

	useEffect(() => {
		if (error) {
			swal('Attention', error.message, 'error');
		}
	}, [error]);

	useEffect(() => {
		if (filter !== null) {
			fetchClients({
				variables: {
					limit: 500,
					page: 1,
					filter,
				},
			});
		}
	}, [filter]);

	const handleFilter = event => {
		event.preventDefault();

		const { value } = event.target;
		setFilter(value);
	};

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
				<div className='box'>
					<div className='input-group'>
						<div className='input-group-prepend'>
							<span className='input-group-text fas fa-filter'></span>
						</div>
						<input
							type='text'
							className='form-control'
							placeholder='Filter by client name'
							onChange={_.debounce(handleFilter, 300)}
						/>
					</div>
				</div>
				{loading ? (
					<div>Loading...</div>
				) : (
					clientData &&
					clientData.map(client => (
						<Client client={client} key={client.id} />
					))
				)}
			</div>
		</Layout>
	);
};

export default Clients;
