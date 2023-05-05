import {
    UPDATE_USER_NAME,
    UPDATE_ID,
    UPDATE_BLOCKED_KEYWORDS,
    UPDATE_BLOCKED_LINKS,
    ADD_BLOCKED_KEYWORD,
    ADD_BLOCKED_LINK,
    REMOVE_KEYWORD_FROM_BLOCKED_KEYWORDS,
    REMOVE_LINK_FROM_BLOCKED_LINKS,
    UPDATE_USER,
    GET_STATE

  } from './action';
  
  const initialState = {
    id: null,
    userName: 'gsfg',
    email: '',
    removeAdultTweets: false,
    removeAdultImages: false,
    enforceSafeSearch: false,
    blockedKeyWords: ['djhd' , 'djhdj'],
    blockedLinks: []
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_USER:
        return {
            ...action.payload
        };
      case UPDATE_USER_NAME:
        return {
          ...state,
          userName: action.payload
        };
      case UPDATE_ID:
        return {
          ...state,
          id: action.payload
        };
      case UPDATE_BLOCKED_LINKS:
        return {
          ...state,
          blockedLinks: action.payload
        };
      case UPDATE_BLOCKED_KEYWORDS:
        return {
          ...state,
          blockedKeyWords: action.payload
        };
      case ADD_BLOCKED_KEYWORD:
        return {
          ...state,
          blockedKeyWords: [...state.blockedKeyWords, action.payload]
        };
      case ADD_BLOCKED_LINK:
        return {
          ...state,
          blockedLinks: [...state.blockedLinks, action.payload]
        };
      case REMOVE_KEYWORD_FROM_BLOCKED_KEYWORDS:
        return {
          ...state,
          blockedKeyWords: state.blockedKeyWords.filter(keyword => keyword !== action.payload)
        };
      case REMOVE_LINK_FROM_BLOCKED_LINKS:
        return {
          ...state,
          blockedLinks: state.blockedLinks.filter(link => link !== action.payload)
        };
        case GET_STATE:
            return state;
      default:
        return state;
    }
  };

  export default reducer ;