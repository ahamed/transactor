import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import swal from 'sweetalert';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';

import {
	DELETE_TRANSACTION_MUTATION_QUERY,
	UPDATE_TRANSACTION_MUTATION_QUERY,
} from '../../queries/transaction';
import { GET_CLIENT_BY_ID_QUERY } from '../../queries/clients';

import style from './transaction.module.scss';

const Transaction = ({ transaction }) => {
	const [edit, setEdit] = useState(false);
	const [amount, setAmount] = useState(transaction.amount);
	const [deleteTnx, {}] = useMutation(DELETE_TRANSACTION_MUTATION_QUERY);
	const [updateTnx, {}] = useMutation(UPDATE_TRANSACTION_MUTATION_QUERY);

	const handleUpdatingTnx = async event => {
		event.preventDefault();

		swal({
			title: 'Pay Attention',
			text: `Are you sure to update the transaction?`,
			icon: 'warning',
			buttons: ['Nope', 'Confirm'],
		}).then(async res => {
			if (res) {
				const back = await updateTnx({
					variables: { id: transaction.id, amount: amount * 1 },
					refetchQueries: [
						{
							query: GET_CLIENT_BY_ID_QUERY,
							variables: { id: transaction.clientId },
						},
					],
				});

				if (back) setEdit(false);
			}
		});
	};

	const handleRemovingTnx = async event => {
		event.preventDefault();

		swal({
			title: 'Pay Attention',
			text: `Are you sure to delete the transaction?`,
			icon: 'warning',
			buttons: ['Nope', 'Confirm'],
		}).then(res => {
			if (res) {
				deleteTnx({
					variables: { id: transaction.id },
					refetchQueries: [
						{
							query: GET_CLIENT_BY_ID_QUERY,
							variables: { id: transaction.clientId },
						},
					],
				});
			}
		});
	};

	return (
		<div className={`${style['transaction']}`}>
			<div className={`${style['row-header']}`}>
				{edit ? (
					<div>
						<input
							type='number'
							className='form-control'
							value={amount}
							onChange={event => setAmount(event.target.value)}
						/>
					</div>
				) : (
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
						</strong>
					</div>
				)}
				<div className={`${style['control-panel']}`}>
					{edit ? (
						<div>
							<button
								className={`${style['is-success']}`}
								onClick={handleUpdatingTnx}
							>
								<span className='fas fa-check'></span>
							</button>
						</div>
					) : (
						<div>
							<button
								className={`${style['is-primary']}`}
								onClick={() => setEdit(true)}
							>
								<span className='fas fa-pen'></span>
							</button>
							<button
								className={`${style['is-danger']} ml-2`}
								onClick={handleRemovingTnx}
							>
								<span className='fas fa-times'></span>
							</button>
						</div>
					)}
				</div>
			</div>
			<small className={`${style['created']}`}>
				On{' '}
				{format(
					new Date(transaction.createdAt),
					'yyyy-MM-dd h:ii:ss a'
				)}
			</small>
		</div>
	);
};

export default Transaction;
