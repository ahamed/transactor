import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Layout from '../../components/layouts/Layout';
import Client from '../../components/client/Client';

import styles from '../../styles/Clients.module.scss';

import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_CLIENTS_QUERY } from '../../queries/clients';

const Clients = () => {
	const router = useRouter();
	const [clientData, setClientData] = useState([]);
	const [type, setType] = useState('');

	const [fetchClients, { loading, error, data }] = useLazyQuery(
		GET_CLIENTS_QUERY
	);

	useEffect(() => {
		if (router.query.mode) {
			if (router.query.mode === 'incoming-today') {
				setType('incoming');
			} else if (router.query.mode === 'outgoing-today') {
				setType('outgoing');
			}

			const variables = {
				limit: 500,
				page: 1,
				createdAt: new Date().toISOString(),
			};

			if (router.query.mode !== '') {
				if (router.query.mode === 'incoming-today') {
					variables.type = 'incoming';
				} else if (router.query.mode === 'outgoing-today') {
					variables.type = 'outgoing';
				}
			}

			fetchClients({ variables });
		}
	}, [router.query.mode]);

	useEffect(() => {
		if (data?.clients) setClientData(data.clients);
		console.log(data);
	}, [data]);

	useEffect(() => {
		if (error) {
			swal('Attention', error.message, 'error');
		}
	}, [error]);

	return (
		<Layout>
			<Head>
				<title>{type} Clients By Today</title>
			</Head>
			<div className={styles['clients-list']}>
				<div className='title'>
					<span className='title-icon primary fas fa-users'></span>
					<div style={{ textTransform: 'capitalize' }}>
						{type} Today
					</div>
				</div>
				{loading ? (
					<div>Loading...</div>
				) : clientData && clientData.length > 0 ? (
					clientData.map(client => (
						<Client client={client} key={client.id} mode={type} />
					))
				) : (
					<div className={`${styles['no-client']}`}>
						<img src='/images/empty.png' alt='' />
						<div className={`${styles['text']}`}>
							{type && `No ${type} transaction today!`}
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Clients;
