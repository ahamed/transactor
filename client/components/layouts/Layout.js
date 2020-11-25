import Navbar from '../navbar/Navbar';
import styles from './layout.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Layout = ({ children }) => {
	const router = useRouter();

	return (
		<div className={`${styles['transactor-application']}`}>
			<Navbar />
			<div className={`container ${styles.preset}`}>
				{router.pathname !== '/' && (
					<Link href='/'>
						<div className={`${styles['dashboard']} row mt-3 mb-2`}>
							<div className='col-12'>
								<span className='fas fa-arrow-alt-circle-left fa-2x'></span>
							</div>
						</div>
					</Link>
				)}
				{children}
			</div>
		</div>
	);
};

export default Layout;
