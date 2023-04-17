import { gql, useMutation } from '@apollo/client';

const CreateWebAuthnCredentialRequestOptionsMutation = gql`
  mutation CreateWebAuthnCredentialRequestOptions($username: String) {
    createWebAuthnCredentialRequestOptions(username: $username)
  }
`;

const useCreateWebAuthnCredentialRequestOptions = () => {
  const [createWebAuthnCredentialRequestOptionsMutation] = useMutation(
    CreateWebAuthnCredentialRequestOptionsMutation,
  );

  const createWebAuthnCredentialRequestOptions = async ({ username }) => {
    return createWebAuthnCredentialRequestOptionsMutation({
      variables: { username },
    });
  };
  return { createWebAuthnCredentialRequestOptions };
};

export default useCreateWebAuthnCredentialRequestOptions;
