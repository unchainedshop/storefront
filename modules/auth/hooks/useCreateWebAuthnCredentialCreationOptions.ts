import { useMutation, gql } from '@apollo/client';

const CreateWebAuthnCredentialCreationOptionsMutation = gql`
  mutation CreateWebAuthnCredentialCreationOptions($username: String!) {
    createWebAuthnCredentialCreationOptions(username: $username)
  }
`;

const useCreateWebAuthnCredentialCreationOptions = () => {
  const [createWebAuthnCredentialCreationOptionsMutation] = useMutation(
    CreateWebAuthnCredentialCreationOptionsMutation,
  );

  const createWebAuthnCredentialCreationOptions = async ({ username }) => {
    return createWebAuthnCredentialCreationOptionsMutation({
      variables: { username },
    });
  };

  return { createWebAuthnCredentialCreationOptions };
};

export default useCreateWebAuthnCredentialCreationOptions;
