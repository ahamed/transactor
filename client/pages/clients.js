import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import _ from 'lodash';
import DatePicker from 'react-datepicker';

import Head from 'next/head';
import Layout from '../components/layouts/Layout';
import Client from '../components/client/Client';

import styles from '../styles/Clients.module.scss';

import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_CLIENTS_QUERY } from '../queries/clients';

const Clients = () => {
	const [clientData, setClientData] = useState([]);
	const [filterDate, setDate] = useState(null);
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
		console.log(data);
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

	useEffect(() => {
		if (filterDate !== null) {
			console.log(filterDate.toISOString());
			fetchClients({
				variables: {
					limit: 500,
					page: 1,
					createdAt: filterDate.toISOString(),
				},
			});
		}
	}, [filterDate]);

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
							placeholder='Filter by Client Name'
							onChange={_.debounce(handleFilter, 300)}
						/>
					</div>
				</div>
				<div className='box'>
					<div className='input-group'>
						<div className='input-group-prepend'>
							<span className='input-group-text fas fa-calendar'></span>
						</div>
						<DatePicker
							className='form-control'
							placeholderText='Filter by Transaction Date'
							selected={filterDate}
							onChange={date => setDate(date)}
						/>
					</div>
				</div>
				{loading ? (
					<div>Loading...</div>
				) : clientData && clientData.length > 0 ? (
					clientData.map(client => (
						<Client client={client} key={client.id} />
					))
				) : (
					<div className={`${styles['no-client']}`}>
						<img src='/images/empty.png' alt='' />
						<div className={`${styles['text']}`}>
							{filter
								? `Opps! No client found with name "${filter}"!`
								: 'No client added yet!'}
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Clients;
