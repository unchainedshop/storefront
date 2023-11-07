const formatUsername = (user) => {
  if (!user) return null;
  if (user?.username) return user.username;
  if (user?.profile?.displayName) return user?.profile?.displayName;
  if (user?.profile?.address?.firstName || user?.profile?.address?.firstName)
    return `${user?.profile?.address?.lastName} ${user?.profile?.address?.lastName}`;
  if (user?.name) return user.name;

  return null;
};

export default formatUsername;
