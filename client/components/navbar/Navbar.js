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
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarSupportedContent'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>

			<div
				className='collapse navbar-collapse'
				id='navbarSupportedContent'
			>
				<ul className='navbar-nav mr-auto'>
					<li className='nav-item active'>
						<Link href='/'>
							<a className='nav-link' href='#'>
								Home <span className='sr-only'>(current)</span>
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
