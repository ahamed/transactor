import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import swal from 'sweetalert';

import style from './transaction.module.scss';

const Transaction = ({ transaction }) => {
	return (
		<div className={`${style['transaction']}`}>
			<div className={`${style['row-header']}`}>
				<div>
					<strong
						className={`${style['price-amount']} ${
							style[
								transaction.type === 'incoming'
									? 'success'
									: 'danger'
							]
						}`}
					>
						{transaction.type === 'incoming' ? '+' : '-'} ৳
						{transaction.amount}
					</strong>{' '}
					{/* <span
						className={`${style['badge']} ${
							style[
								transaction.type === 'incoming'
									? 'is-success'
									: 'is-danger'
							]
						}`}
					>
						{transaction.type}
					</span> */}
				</div>
				<div className={`${style['control-panel']}`}>
					<button className={`${style['is-primary']}`}>
						<span className='fas fa-pen'></span>
					</button>
					<button className={`${style['is-danger']} ml-2`}>
						<span className='fas fa-times'></span>
					</button>
				</div>
			</div>
			<small className={`${style['created']}`}>
				On {new Date(transaction.createdAt * 1).toLocaleDateString()}{' '}
				{new Date(transaction.createdAt * 1).toLocaleTimeString()}
			</small>
		</div>
	);
};

export default Transaction;
