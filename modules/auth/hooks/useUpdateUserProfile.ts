import { useMutation, gql } from '@apollo/client';
import AddressFragment from '../../common/fragments/AddressFragment';

const UpdateUserProfileMutation = gql`
  mutation UpdateUserProfile($profile: UserProfileInput!, $userId: ID!) {
    updateUserProfile(profile: $profile, userId: $userId) {
      _id
      profile {
        phoneMobile
        address {
          ...AddressFragment
        }
      }
    }
  }
  ${AddressFragment}
`;

const useUpdateUserProfile = () => {
  const [updateUserProfileMutation, { error }] = useMutation(
    UpdateUserProfileMutation,
  );

  const updateUserProfile = async ({ profile, userId }) => {
    return updateUserProfileMutation({
      variables: { userId, profile },
    });
  };

  return {
    updateUserProfile,
    error,
  };
};

export default useUpdateUserProfile;
