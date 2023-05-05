export const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
export const UPDATE_ID = 'UPDATE_ID';
export const UPDATE_BLOCKED_LINKS = 'UPDATE_BLOCKED_LINKS';
export const UPDATE_BLOCKED_KEYWORDS = 'UPDATE_BLOCKED_KEYWORDS';
export const ADD_BLOCKED_KEYWORD = 'ADD_BLOCKED_KEYWORD';
export const ADD_BLOCKED_LINK = 'ADD_BLOCKED_LINK';
export const REMOVE_KEYWORD_FROM_BLOCKED_KEYWORDS = 'REMOVE_KEYWORD_FROM_BLOCKED_KEYWORDS';
export const REMOVE_LINK_FROM_BLOCKED_LINKS = 'REMOVE_LINK_FROM_BLOCKED_LINKS';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_STATE = 'GET_STATE';


export const getState = () => ({
    type: GET_STATE
  });


export const removeLINKFromBlockedLinks = (link) => ({
  type: REMOVE_LINK_FROM_BLOCKED_LINKS,
  payload: link,
});

export const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user,
  });

export const removeKeywordFromBlockedKeywords = (keyword) => ({
  type: REMOVE_KEYWORD_FROM_BLOCKED_KEYWORDS,
  payload: keyword,
});

export const updateUserName = (userName) => ({
  type: UPDATE_USER_NAME,
  payload: userName,
});

export const updateId = (id) => ({
    type: UPDATE_ID,
    payload: id,
  });

export const updateBlockedLinks = (blockedLinks) => ({
  type: UPDATE_BLOCKED_LINKS,
  payload: blockedLinks,
});

export const updateBlockedKeywords = (blockedKeyWords) => ({
    type: UPDATE_BLOCKED_KEYWORDS,
    payload: blockedKeyWords,
  });

export const addBlockedKeyword = (keyword) => ({
  type: ADD_BLOCKED_KEYWORD,
  payload: keyword,
});

export const addBlockedLink = (link) => ({
    type: ADD_BLOCKED_LINK,
    payload: link,
  });