export const userTypes = {
  affiliate: 'affiliate',
  doctor: 'doctor',
  pharmacist: 'pharmacist',
};

export const authenticationTypes = {
  userAndPass: 'userAndPass',
  twoFactor: 'twoFactor',
};

export const authorizationTypes = {
  receive: 'receive',
  authorizeReceive: 'authorizeReceive',
  issue: 'issue',
  authorizeIssue: 'authorizeIssue',
};

const getAuthenticationData = (authenticationData) => {
  if (authenticationData.type === authenticationTypes.twoFactor) {
    return {
      type: authenticationData.type,
      code: authenticationData.code,
    };
  }
  if (authenticationData.type === authenticationTypes.userAndPass) {
    return {
      type: authenticationData.type,
      username: authenticationData.username,
      password: authenticationData.password,
    };
  }
  return {};
};

const askForIssueAuthorization = (authenticationData, data) => {
  const authorizationPayload = {
    action: authorizationTypes.issue,
    authentication: getAuthenticationData(authenticationData),
    prescription: data,
  };
  console.log(authorizationPayload);
};

const getAuthorizationProvider = (authorizationType) => {
  const mapper = {
    [authorizationTypes.issue]: askForIssueAuthorization,
  };
  if (!mapper[authorizationType]) {
    throw new Error('No authorization provider for this type');
  }
  return mapper[authorizationType];
};

export const askForAuthorization = (authenticationData, authorizationType, data) => {
  getAuthorizationProvider(authorizationType)(authenticationData, data);
};
