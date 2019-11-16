import AuthorizationsService from '../../services/AuthorizationsService';

export const userTypes = {
  affiliate: 'affiliate',
  doctor: 'doctor',
  pharmacist: 'pharmacist',
};

export const authenticationTypes = {
  userAndPass: 'usr_pass',
  twoFactor: 'two_factor',
};

export const authorizationTypes = {
  receive: 'receive',
  authorizeReceive: 'authorize_receive',
  issue: 'issue',
  authorizeIssue: 'authorize_issue',
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
  return AuthorizationsService.authorize(authorizationPayload);
};

const askForReceiveAuthorization = (authenticationData, data) => {
  const authorizationPayload = {
    action: authorizationTypes.receive,
    authentication: getAuthenticationData(authenticationData),
    prescription: data,
  };
  return AuthorizationsService.authorize(authorizationPayload);
};

const askForAuthorizeIssueAuthorization = (authenticationData, data) => {
  const authorizationPayload = {
    action: authorizationTypes.authorizeIssue,
    authentication: getAuthenticationData(authenticationData),
    prescription: data,
  };
  return AuthorizationsService.authorize(authorizationPayload);
};

const askForAuthorizeReceiveAuthorization = (authenticationData, data) => {
  const authorizationPayload = {
    action: authorizationTypes.authorizeReceive,
    authentication: getAuthenticationData(authenticationData),
    prescription: data,
  };
  return AuthorizationsService.authorize(authorizationPayload);
};

const getAuthorizationProvider = (authorizationType) => {
  const mapper = {
    [authorizationTypes.issue]: askForIssueAuthorization,
    [authorizationTypes.receive]: askForReceiveAuthorization,
    [authorizationTypes.authorizeIssue]: askForAuthorizeIssueAuthorization,
    [authorizationTypes.authorizeReceive]: askForAuthorizeReceiveAuthorization,
  };
  if (!mapper[authorizationType]) {
    throw new Error('No authorization provider for this type');
  }
  return mapper[authorizationType];
};

export const askForAuthorization = (authenticationData, authorizationType, data) => getAuthorizationProvider(authorizationType)(authenticationData, data);

export const isAuthorizationDataComplete = (authenticationData) => {
  const mapper = {
    [authenticationTypes.userAndPass]: data => !!(data.username && data.password),
    [authenticationTypes.twoFactor]: data => !!(data.code),
  };

  return mapper[authenticationData.type](getAuthenticationData(authenticationData));
};
