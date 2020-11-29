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

export const UPDATE_CLIENT_QUERY = gql`
	mutation UpdateClient(
		$id: ID!
		$name: String!
		$mobile: String!
		$address: String
		$note: String
	) {
		updateClient(
			id: $id
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
	query GetClients(
		$page: Int
		$limit: Int
		$filter: String
		$createdAt: DateTime
	) {
		clients(
			page: $page
			limit: $limit
			filter: $filter
			createdAt: $createdAt
		) {
			id
			name
			mobile
			avatar
			address
			transactions {
				id
				amount
				type
			}
			balance
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
			transactions {
				id
				type
				amount
				clientId
				createdAt
			}
			balance
		}
	}
`;
