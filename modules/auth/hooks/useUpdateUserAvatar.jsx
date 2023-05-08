import { useMutation, gql } from '@apollo/client';

import CurrentUserFragment from '../fragments/CurrentUserFragment';

export const UPDATE_USER_AVATAR_MUTATION = gql`
  mutation UpdateUserAvatar($avatar: Upload!, $userId: ID) {
    updateUserAvatar(avatar: $avatar, userId: $userId) {
      ...CurrentUserFragment
    }
  }
  ${CurrentUserFragment}
`;

const useUpdateUserAvatar = () => {
  const [updateUserAvatarMutation] = useMutation(UPDATE_USER_AVATAR_MUTATION);

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
