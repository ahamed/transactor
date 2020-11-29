import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import swal from 'sweetalert';

import Transaction from '../../components/transaction/transaction';

import style from './transactionList.module.scss';

const TransactionList = ({ transactions, balance }) => {
	return (
		<div className={`${style['transaction-list']}`}>
			<div className='box'>
				<div className='d-flex justify-content-between'>
					<h4 className={`${style['titles']}`}>Transactions</h4>
					{balance !== undefined && (
						<div>
							{balance === 0 ? (
								<span className='fas fa-check-circle txt-success'></span>
							) : (
								<span
									className={`${
										balance > 0
											? 'txt-success'
											: 'txt-danger'
									}`}
								>
									{balance > 0
										? `+ ৳${balance}`
										: `- ৳${balance * -1}`}
								</span>
							)}
						</div>
					)}
				</div>
				{transactions && transactions.length > 0 ? (
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
