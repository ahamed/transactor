import { useState } from 'react';
import Layout from '../components/layouts/Layout';
import Head from 'next/head';
import styles from '../styles/Client.module.scss';
import Box from '../elements/box/box';
import QuickIcon from '../components/quickIcon/quickIcon';
import Input from '../elements/input/input';
import TextArea from '../elements/textarea/textarea';

const Client = () => {
	const [data, setData] = useState({ name: '', mobile: '' });
	const handleChange = event => {
		const [name, value] = event.target;
		setData({ [name]: value });
	};

	return (
		<Layout>
			<Head>
				<title>Add Client</title>
			</Head>
			<div className={styles['tnx-page-client']}>
				<div className='row'>
					<div className='col-12 col-md-6'>
						<form>
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
								className='btn btn-info btn-block'
							>
								<span className='fas fa-plus'></span> Add
							</button>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Client;
