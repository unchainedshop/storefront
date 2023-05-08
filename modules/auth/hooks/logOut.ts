import { ApolloClient, gql } from '@apollo/client';

const logOut = async (apollo: ApolloClient<any>) => {
  await apollo.mutate({
    mutation: gql`
      mutation logout {
        logout {
          success
        }
      }
    `,
    awaitRefetchQueries: true,
  });
  await apollo.resetStore();
};

export default logOut;
