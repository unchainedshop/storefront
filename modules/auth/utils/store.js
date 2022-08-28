const onChangeCallbacks = [];

let tokenStore = {
  async set({ userId, token, tokenExpires }) {
    window.localStorage['Meteor.userId'] = userId;
    window.localStorage['Meteor.loginToken'] = token;
    window.localStorage['Meteor.loginTokenExpires'] = tokenExpires.toString();
  },
  get() {
    return {
      userId: window.localStorage['Meteor.userId'],
      token: window.localStorage['Meteor.loginToken'],
      tokenExpires: window.localStorage['Meteor.loginTokenExpires'],
    };
  },
};

export const setTokenStore = function setTokenStore(newStore) {
  tokenStore = newStore;
};

const tokenDidChange = async function tokenDidChange() {
  const newData = tokenStore.get();
  onChangeCallbacks.forEach((callback) => callback(newData));
};

export const storeLoginToken = async function storeLoginToken(
  userId,
  token,
  tokenExpires,
) {
  await tokenStore.set({ userId, token, tokenExpires });
  await tokenDidChange();
};

export const getLoginToken = async function getLoginToken() {
  const { token } = tokenStore.get();
  return token;
};

export const getUserId = function getUserId() {
  const { userId } = tokenStore.get();
  return userId;
};

export const onTokenChange = function onTokenChange(callback) {
  if (typeof window !== 'undefined') {
    onChangeCallbacks.push(callback);
  }
};

export const resetStore = async function resetStore() {
  await storeLoginToken('', '', '');
};
