import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Layout from '../../components/layouts/Layout';
import Input from '../../elements/input/input';
import TextArea from '../../elements/textarea/textarea';

import {
	GET_CLIENT_BY_ID_QUERY,
	UPDATE_CLIENT_QUERY,
} from '../../queries/clients';

import styles from '../../styles/AddClient.module.scss';

const AddClient = () => {
	const [
		getClient,
		{ loading: clientLoading, error: clientError, data: clientData },
	] = useLazyQuery(GET_CLIENT_BY_ID_QUERY);

	const [updateClient, { data: mutationData }] = useMutation(
		UPDATE_CLIENT_QUERY
	);

	const router = useRouter();
	const [data, setData] = useState({
		name: '',
		mobile: '',
		address: '',
		note: '',
	});

	useEffect(() => {
		if (router.query.id) {
			getClient({ variables: { id: router.query.id } });

			if (clientData) {
				const { name, mobile, address, note } = clientData.client;
				setData({
					...data,
					name,
					mobile,
					address,
					note,
				});
			}
		}
	}, [router.query.id, clientData]);

	const handleChange = event => {
		const { name, value } = event.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmission = async event => {
		event.preventDefault();

		try {
			await updateClient({
				variables: { id: router.query.id, ...data },
			});

			swal({
				title: 'Success',
				text: 'Client Updated Successfully!',
				icon: 'success',
				timer: 1000,
				buttons: false,
			}).then(() => {
				router.push(`/client-details/${router.query.id}`);
			});
		} catch (err) {
			swal('Attention', err.message, 'error');
		}
	};

	return (
		<Layout>
			<Head>
				<title>Edit Client</title>
			</Head>
			<div className={styles['tnx-page-client']}>
				<div className='row'>
					<div className='col-12'>
						<div className='title'>
							<span className='title-icon primary fas fa-user-edit'></span>
							<div>Edit Client</div>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-md-6'>
						<form onSubmit={handleSubmission}>
							<Input
								type='text'
								label='Name'
								description='Write down the name of the customer'
								hint=''
								name='name'
								value={data.name}
								onChange={handleChange}
								required
							/>

							<Input
								type='text'
								label='Mobile'
								description='Write down customer mobile number'
								hint=''
								name='mobile'
								value={data.mobile}
								onChange={handleChange}
								required
							/>

							<TextArea
								label='Address'
								description='Address of the customer.'
								hint=''
								name='address'
								value={data.address}
								onChange={handleChange}
							/>

							<TextArea
								label='Note'
								description='Keep any note? Write down here.'
								hint=''
								name='note'
								value={data.note}
								onChange={handleChange}
							/>

							<button
								type='submit'
								className='btn btn-primary btn-block mt-4 mb-3'
							>
								<span className='fas fa-save'></span> Update
							</button>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AddClient;
