import { gql, useMutation } from '@apollo/client';

export const CREATE_WEB_AUTHN_CREDENTIAL_REQUEST_OPTIONS_MUTATION = gql`
  mutation CreateWebAuthnCredentialRequestOptions($username: String) {
    createWebAuthnCredentialRequestOptions(username: $username)
  }
`;

const useCreateWebAuthnCredentialRequestOptions = () => {
  const [createWebAuthnCredentialRequestOptionsMutation] = useMutation(
    CREATE_WEB_AUTHN_CREDENTIAL_REQUEST_OPTIONS_MUTATION,
  );

  const createWebAuthnCredentialRequestOptions = async ({ username }) => {
    return createWebAuthnCredentialRequestOptionsMutation({
      variables: { username },
    });
  };
  return { createWebAuthnCredentialRequestOptions };
};

export default useCreateWebAuthnCredentialRequestOptions;
