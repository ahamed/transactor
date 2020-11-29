import Layout from '../components/layouts/Layout';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Box from '../elements/box/box';
import QuickIcon from '../components/quickIcon/quickIcon';

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Home</title>
			</Head>
			<div className={styles['tnx-page-home']}>
				<div className='row'>
					<div className='col-12'>
						<h4>Navigate</h4>
					</div>
				</div>
				<div className='row mt-5'>
					<div className='col-6 col-md-4'>
						<Box>
							<QuickIcon
								icon='fas fa-user-plus'
								text='Add Client'
								href='/add-client'
							/>
						</Box>
					</div>
					<div className='col-6 col-md-4'>
						<Box>
							<QuickIcon
								icon='fas fa-users'
								text='Client List'
								href='/clients'
							/>
						</Box>
					</div>
				</div>
				<div className='row'>
					<div className='col-6 col-md-4 mt-4 '>
						<Box>
							<QuickIcon
								icon='fas fa-credit-card'
								text='Incoming Today'
								href='/'
							/>
						</Box>
					</div>
					<div className='col-6 col-md-4 mt-4 '>
						<Box>
							<QuickIcon
								icon='fas fa-money-check-alt'
								text='Outgoing Today'
								href='/'
							/>
						</Box>
					</div>
				</div>
			</div>
		</Layout>
	);
}
