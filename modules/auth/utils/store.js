import cookie from 'cookie';

const onChangeCallbacks = [];

let tokenStore = {
  async set({ token, tokenExpires }) {
    if (token && tokenExpires) {
      // Client-side cookie setting, else it's from the server
      const maxAge =
        ((new Date().getTime() - new Date(tokenExpires).getTime()) * -1) / 1000;

      const newCookie = cookie.serialize('token', token, {
        path: '/',
        secure: window.location.protocol === 'https',
        sameSite: true,
      });
        console.debug('token added to cookies, expiring: ', maxAge); // eslint-disable-line
      document.cookie = newCookie;
    } else if (!tokenExpires) {
      // Logout
      document.cookie = cookie.serialize('token', null, {
        maxAge: -1, // Expire the cookie immediately
      });
      document.cookie = cookie.serialize('token', null, {
        maxAge: -1, // Expire the cookie immediately
        path: '/',
        secure: window.location.protocol === 'https',
        sameSite: true,
      });
      console.debug('token removed from cookies'); // eslint-disable-line
    }
  },
  get() {
    if (process.browser) {
      if (document.cookie) {
        const parsedCookie = cookie.parse(document.cookie);
        return parsedCookie;
      }
    }
    return {};
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

export const getLoginToken = function getLoginToken() {
  const { token } = tokenStore.get();
  return token;
};

export const onTokenChange = function onTokenChange(callback) {
  if (typeof window !== 'undefined') {
    onChangeCallbacks.push(callback);
  }
};

export const resetStore = async function resetStore() {
  await storeLoginToken();
};
