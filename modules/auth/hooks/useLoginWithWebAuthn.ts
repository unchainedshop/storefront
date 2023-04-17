import { gql, useMutation } from '@apollo/client';

const LogWithWebAuthnMutation = gql`
  mutation LoginWithWebAuthn($webAuthnPublicKeyCredentials: JSON!) {
    loginWithWebAuthn(
      webAuthnPublicKeyCredentials: $webAuthnPublicKeyCredentials
    ) {
      id
      token
      tokenExpires
    }
  }
`;

const useLoginWithWebAuthn = () => {
  const [loginWithWebAuthnMutation, { client }] = useMutation(
    LogWithWebAuthnMutation,
  );

  const loginWithWebAuthn = async ({ webAuthnPublicKeyCredentials }) => {
    const result = await loginWithWebAuthnMutation({
      variables: { webAuthnPublicKeyCredentials },
    });
    await client.resetStore();
    return result;
  };
  return { loginWithWebAuthn };
};

export default useLoginWithWebAuthn;
