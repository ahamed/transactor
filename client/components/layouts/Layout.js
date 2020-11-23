import Navbar from '../navbar/Navbar';
import styles from './layout.module.scss';

const Layout = ({ children }) => (
	<div className='bv-wrapper'>
		<Navbar />
		<div className={`container ${styles.preset}`}>{children}</div>
	</div>
);

export default Layout;
