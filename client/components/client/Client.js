import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

import { serverURI } from '../../utils';

import style from './Client.module.scss';

const Client = ({ client, mode }) => {
	const [lastTransaction, setTransaction] = useState(null);

	useEffect(() => {
		if (mode) {
			const tnxs = client.transactions;
			for (let i = 0, l = tnxs.length; i < l; i++) {
				if (tnxs[i].type === mode) {
					setTransaction(tnxs[i]);
					break;
				}
			}
		} else {
			if (
				client?.transactions !== undefined &&
				client.transactions.length > 0
			) {
				setTransaction(client.transactions[0]);
			}
		}
	}, [mode, client]);

	return (
		<Link href={`/client-details/${client.id}`}>
			<div className={`${style['client-wrapper']} p-5 mb-3`}>
				<div className={`${style['client-avatar']}`}></div>
				<div className={`${style['client-info']}`}>
					<div className='d-flex justify-content-between'>
						<div className={`${style['title']}`}>{client.name}</div>
						<div className={`${style['avatar']}`}>
							<img
								src={`${serverURI}/${client.avatar}`}
								alt='Image'
							/>
						</div>
					</div>
					<div className='mb-1'>
						<span
							className={`${style['client-icon']} fas fa-phone-alt`}
						></span>
						<small>{client.mobile}</small>
					</div>
					{client.address && (
						<div className=''>
							<span
								className={`${style['client-icon']} title-icon primary fas fa-map-marker-alt`}
							></span>
							<small>{client.address}</small>
						</div>
					)}
					{lastTransaction && (
						<div className='d-flex align-items-center mt-2'>
							<span
								className={`${style['client-icon']} title-icon primary fas fa-stream`}
							></span>

							<small
								className={`${
									style[
										lastTransaction.type === 'incoming'
											? 'client-text-success'
											: 'client-text-danger'
									]
								}`}
							>
								{lastTransaction.type === 'incoming'
									? '+'
									: '-'}
								৳{lastTransaction.amount}
							</small>
							<small className='ml-2'>
								(
								{format(
									new Date(lastTransaction.createdAt),
									'yyyy-MM-dd h:ii:ss a'
								)}
								)
							</small>
						</div>
					)}
					{client.balance !== undefined && (
						<div className='d-flex align-items-center mt-2'>
							<span
								className={`${style['client-icon']} title-icon primary fas fa-wallet`}
							></span>
							{client.balance === 0 ? (
								<div className='d-flex justify-content-center align-items-center text-success'>
									<span className='fas fa-check-circle txt-success'></span>
									<span className='ml-1'>Settled</span>
								</div>
							) : (
								<small
									className={`${
										style[
											client.balance > 0
												? 'client-text-success'
												: 'client-text-danger'
										]
									}`}
								>
									{client.balance > 0
										? `+ ৳${client.balance}`
										: `- ৳${client.balance * -1}`}
								</small>
							)}
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};

export default Client;
