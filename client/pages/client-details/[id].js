import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useLazyQuery } from '@apollo/client';
import swal from 'sweetalert';

import Head from 'next/head';
import Layout from '../../components/layouts/Layout';

import { serverURI } from '../../utils';
import { GET_CLIENT_BY_ID_QUERY } from '../../queries/clients';
import styles from '../../styles/ClientDetails.module.scss';

const ClientDetails = () => {
	const router = useRouter();

	const [getClient, { loading, error, data }] = useLazyQuery(
		GET_CLIENT_BY_ID_QUERY
	);

	useEffect(() => {
		if (router.query.id) {
			getClient({ variables: { id: router.query.id } });
		}
	}, [router.query.id]);

	return (
		<Layout>
			<Head>
				<title>Client Details</title>
			</Head>
			<div className={`${styles['client-details']}`}>
				<div className='title'>
					<span className='title-icon primary fas fa-address-card'></span>
					<div>Client Details</div>
				</div>

				<div className='box'>
					{data && (
						<div className='details'>
							<div className='d-flex justify-content-between'>
								<h4>{data.client.name}</h4>
								<div className={`${styles['avatar']}`}>
									<img
										src={`${serverURI}/${data.client.avatar}`}
									/>
								</div>
							</div>
							<div className={`${styles['info']}`}>
								<span
									className={`${styles['info-icon']} fas fa-phone-alt`}
								></span>
								<span className='mobile'>
									{data.client.mobile}
								</span>
							</div>
							{data.client.address && (
								<div className={`${styles['info']}`}>
									<span
										className={`${styles['info-icon']} fas fa-map-marker-alt`}
									></span>
									<span className={`${styles['thin-text']}`}>
										{data.client.address}
									</span>
								</div>
							)}

							{data.client.note && (
								<div className={`${styles['info']}`}>
									<span
										className={`${styles['info-icon']} fas fa-book-open`}
									></span>
									<span className={`${styles['thin-text']}`}>
										{data.client.note}
									</span>
								</div>
							)}

							<button className='btn btn-primary btn-xs mt-3'>
								<span className='fas fa-user-edit'></span> Edit
							</button>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default ClientDetails;