import React from 'react';
import Link from 'next/link';

import { serverURI } from '../../utils';

import style from './Client.module.scss';

const Client = ({ client }) => {
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
					{client.balance !== undefined && (
						<div className='d-flex align-items-center mt-2'>
							<span
								className={`${style['client-icon']} title-icon primary fas fa-wallet`}
							></span>
							{client.balance === 0 ? (
								<small className='fas fa-check-circle txt-success'></small>
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
