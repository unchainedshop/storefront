import { useMutation, gql } from '@apollo/client';

import CurrentUserFragment from '../fragments/CurrentUserFragment';

const UpdateUserAvatarMutation = gql`
  mutation UpdateUserAvatar($avatar: Upload!, $userId: ID) {
    updateUserAvatar(avatar: $avatar, userId: $userId) {
      ...CurrentUserFragment
    }
  }
  ${CurrentUserFragment}
`;

const useUpdateUserAvatar = () => {
  const [updateUserAvatarMutation] = useMutation(UpdateUserAvatarMutation);

  const updateUserAvatar = async ({ avatar, userId = null } = {}) => {
    return updateUserAvatarMutation({
      variables: {
        avatar,
        userId,
      },
    });
  };

  return {
    updateUserAvatar,
  };
};

export default useUpdateUserAvatar;
