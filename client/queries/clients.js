import { gql } from '@apollo/client';

export const ADD_CLIENT_QUERY = gql`
	mutation addClient(
		$name: String!
		$mobile: String!
		$address: String
		$note: String
	) {
		addClient(
			name: $name
			mobile: $mobile
			address: $address
			note: $note
		) {
			id
			name
			mobile
			address
			note
		}
	}
`;

export const GET_CLIENTS_QUERY = gql`
	query GetClients {
		clients {
			id
			name
			mobile
			avatar
			address
		}
	}
`;

export const GET_CLIENT_BY_ID_QUERY = gql`
	query GetClient($id: ID!) {
		client(id: $id) {
			id
			name
			mobile
			avatar
			address
			note
			createdAt
		}
	}
`;