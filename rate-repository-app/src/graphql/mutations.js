import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation create_review($review: CreateReviewInput) {
    createReview(review: $review) {
      repository {
        id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation create_user($user: CreateUserInput) {
    createUser(user: $user) {
      username
      id
    }
  }
`;