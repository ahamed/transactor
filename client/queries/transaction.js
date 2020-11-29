import { gql } from '@apollo/client';

export const ADD_TRANSACTION_MUTATION_QUERY = gql`
	mutation AddTransaction($amount: Int!, $type: String!, $clientId: ID!) {
		addTransaction(amount: $amount, type: $type, clientId: $clientId) {
			id
			amount
			type
			createdAt
		}
	}
`;

export const DELETE_TRANSACTION_MUTATION_QUERY = gql`
	mutation DeleteTransaction($id: ID!) {
		deleteTransaction(id: $id) {
			id
		}
	}
`;

export const UPDATE_TRANSACTION_MUTATION_QUERY = gql`
	mutation UpdateTransaction($id: ID!, $amount: Int!) {
		updateTransaction(id: $id, amount: $amount) {
			id
			amount
		}
	}
`;
