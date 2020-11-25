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
					<div className='col-6 col-md-4'>
						<Box>
							<QuickIcon
								icon='fas fa-user-plus'
								text='Client'
								href='/add-client'
							/>
						</Box>
					</div>
					<div className='col-6 col-md-4'>
						<Box>
							<QuickIcon
								icon='fas fa-users'
								text='Clients'
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
								text='Daily Credited'
								href='/'
							/>
						</Box>
					</div>
					<div className='col-6 col-md-4 mt-4 '>
						<Box>
							<QuickIcon
								icon='fas fa-money-check-alt'
								text='Daily Debited'
								href='/'
							/>
						</Box>
					</div>
				</div>

				<div className='row'>
					<div className='col-6 col-md-4 mt-4'>
						<Box>
							<QuickIcon
								icon='fas fa-chart-pie'
								text='Stats'
								href='/'
							/>
						</Box>
					</div>
				</div>
			</div>
		</Layout>
	);
}
