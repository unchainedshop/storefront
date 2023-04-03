import { useMutation, useApolloClient, gql } from '@apollo/client';
import CurrentUserFragment from '../fragments/CurrentUserFragment';

const CreateUserMutation = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, plainPassword: $password) {
      id
      token
      tokenExpires
      user {
        ...CurrentUserFragment
      }
    }
  }
  ${CurrentUserFragment}
`;

const useCreateUser = () => {
  const client = useApolloClient();
  const [createUserMutation, { error, loading }] =
    useMutation(CreateUserMutation);

  const createUser = async ({ email, password, profile }) => {
    const result = await createUserMutation({
      variables: {
        email,
        password,
        profile,
      },
    });
    await client.resetStore();
    return result;
  };

  return {
    createUser,
    error,
    loading,
  };
};

export default useCreateUser;
