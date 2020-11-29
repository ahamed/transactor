import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import swal from 'sweetalert';
import { useMutation } from '@apollo/client';

import { ADD_TRANSACTION_MUTATION_QUERY } from '../../queries/transaction';
import { GET_CLIENT_BY_ID_QUERY } from '../../queries/clients';

import style from './addTransaction.module.scss';

const AddTransaction = ({ clientId }) => {
	const [amount, setAmount] = useState('');

	const [
		addTnx,
		{ loading: tnxLoading, error: tnxError, data: tnxData },
	] = useMutation(ADD_TRANSACTION_MUTATION_QUERY);

	const handleAmountChange = event => {
		event.preventDefault();
		setAmount(event.target.value);
	};

	const handleOutgoing = event => {
		event.preventDefault();

		swal({
			title: 'Pay Attention',
			text: `You are going to provide ৳${amount} to the client!`,
			icon: 'warning',
			buttons: ['Check Again', 'Provide'],
		}).then(async res => {
			if (res) {
				const resp = addTnx({
					variables: {
						amount: amount * 1,
						type: 'outgoing',
						clientId,
					},
					refetchQueries: [
						{
							query: GET_CLIENT_BY_ID_QUERY,
							variables: { id: clientId },
						},
					],
				});

				if (resp) {
					setAmount('');
				}
			}
		});
	};

	const handleIncoming = event => {
		event.preventDefault();

		swal({
			title: 'Pay Attention',
			text: `You are taking ৳${amount} from the client!`,
			icon: 'warning',
			buttons: ['Check Again', 'Take'],
		}).then(res => {
			if (res) {
				const resp = addTnx({
					variables: {
						amount: amount * 1,
						type: 'incoming',
						clientId,
					},
					refetchQueries: [
						{
							query: GET_CLIENT_BY_ID_QUERY,
							variables: { id: clientId },
						},
					],
				});

				if (resp) {
					setAmount('');
				}
			}
		});
	};

	return (
		<div className={`${style['transaction']}`}>
			<div className='box'>
				<h4 className={`${style['titles']}`}>Add Transaction</h4>

				<div className='input-group mt-4'>
					<div className='input-group-prepend'>
						<span className='input-group-text fas fa-dollar-sign'></span>
					</div>
					<input
						type='number'
						name='amount'
						onChange={handleAmountChange}
						value={amount}
						className='form-control'
						placeholder='Write down the amount. e.g. 5000'
					/>
				</div>

				<div className={`${style['btn-wrapper']} mt-3`}>
					<button
						className='btn btn-danger mr-2'
						onClick={handleOutgoing}
						disabled={!amount}
					>
						<span className='fas fa-minus-circle'></span> Outgoing
					</button>
					<button
						className='btn btn-primary'
						onClick={handleIncoming}
						disabled={!amount}
					>
						<span className='fas fa-plus-circle'></span> Incoming
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTransaction;
