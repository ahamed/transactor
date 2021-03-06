import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import swal from 'sweetalert';

import Layout from '../components/layouts/Layout';
import Input from '../elements/input/input';
import TextArea from '../elements/textarea/textarea';
import styles from '../styles/AddClient.module.scss';

import { useMutation } from '@apollo/client';
import { ADD_CLIENT_QUERY } from '../queries/clients';

const AddClient = () => {
	const [
		addClient,
		{ loading: mutationLoading, data: clientData },
	] = useMutation(ADD_CLIENT_QUERY);
	const router = useRouter();

	const [data, setData] = useState({
		name: '',
		mobile: '',
		address: '',
		note: '',
	});

	const handleChange = event => {
		const { name, value } = event.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmission = async event => {
		event.preventDefault();

		try {
			const response = await addClient({
				variables: data,
			});
			setData({ name: '', mobile: '', address: '', note: '' });

			if (response?.data?.addClient) {
				swal({
					title: 'Success',
					text: 'Client Added Successfully!',
					icon: 'success',
					timer: 1000,
					buttons: false,
				}).then(() => {
					router.push(
						`/client-details/${response.data.addClient.id}`
					);
				});
			}
		} catch (err) {
			swal('Attention', err.message, 'error');
		}
	};

	return (
		<Layout>
			<Head>
				<title>Add Client</title>
			</Head>
			<div className={styles['tnx-page-client']}>
				<div className='row'>
					<div className='col-12'>
						<div className='title'>
							<span className='title-icon primary fas fa-users-cog'></span>
							<div>Add Client</div>
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
								className='btn btn-primary btn-block mb-3 mt-4'
							>
								<span className='fas fa-user-check'></span> Add
							</button>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AddClient;
