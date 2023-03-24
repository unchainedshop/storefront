import { gql } from '@apollo/client';

const logOut = async (apollo) => {
  await apollo.mutate({
    mutation: gql`
      mutation logout {
        logout {
          success
        }
      }
    `,
    awaitRefetchQueries: false,
  });
  await apollo.resetCache();
};

export default logOut;
