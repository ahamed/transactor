import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import swal from 'sweetalert';

import Transaction from '../../components/transaction/transaction';

import style from './transactionList.module.scss';

const TransactionList = ({ transactions }) => {
	return (
		<div className={`${style['transaction-list']}`}>
			<div className='box'>
				<h4 className={`${style['titles']}`}>Transactions</h4>
				{transactions.length > 0 ? (
					<div className='mt-4'>
						{transactions.length > 0 &&
							transactions.map(transaction => (
								<Transaction
									key={transaction.id}
									transaction={transaction}
								/>
							))}
					</div>
				) : (
					<div className={`${style['no-transaction']}`}>
						<img src='/images/empty.png' alt='' />
						<div className={`${style['text']}`}>
							No Transaction!
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TransactionList;
