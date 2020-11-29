import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './Navbar.module.scss';

const Navbar = () => {
	const [expand, setExpand] = useState(false);
	const router = useRouter();

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link href='/'>
				<a className={`navbar-brand ${style['navbar-logo']}`} href='#'>
					<img src={'/images/logo.png'} alt='Logo' />
					Perl Store
				</a>
			</Link>
		</nav>
	);
};

export default Navbar;
