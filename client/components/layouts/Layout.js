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
					<button
						className={`${styles['back-btn']} mb-3 mt-3`}
						type='button'
						onClick={() => router.back()}
					>
						<span className='fas fa-chevron-left'></span> Back
					</button>
				)}
				{children}
			</div>
		</div>
	);
};

export default Layout;
