import React from 'react';
import styles from './quickIcon.module.scss';
import Link from 'next/link';

const QuickIcon = ({ icon, text, clickHandler, href = '/' }) => {
	return (
		<Link href={href}>
			<div className={styles['quick-icon-wrapper']}>
				<button onClick={clickHandler}>
					<span className={`${styles['icon']} ${icon}`}></span>
					<span>{text}</span>
				</button>
			</div>
		</Link>
	);
};

export default QuickIcon;
