import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { postBlogReducer } from "./reducers/adminReducer";
import { checkUsernameReducer, loginUserReducer, registerUserReducer } from "./reducers/authReducers";
import {
  deleteBlogReducer,
  fetchBlogDetailsReducer,
  fetchBlogReducer,
  fetchGenreReducer,
  likeBlogReducer,
  likesCountReducer,
  searchBlogReducer,
  unlikeBlogReducer
} from "./reducers/BlogReducers";
import { fetchCommentsReducer, postCommentsReducer } from "./reducers/commentReducers";
import { newsletterSubReducer } from "./reducers/userReducers";

const initialState = {
  // initial states in local or session storage
};

const reducer = combineReducers({
  newsletterSub: newsletterSubReducer,
  blogStore: fetchBlogReducer,
  searchBlog: searchBlogReducer,
  blogDetails: fetchBlogDetailsReducer,
  likeBlog: likeBlogReducer,
  unlikeBlog: unlikeBlogReducer,
  likesCount: likesCountReducer,
  deleteBlog: deleteBlogReducer,
  fetchComments: fetchCommentsReducer,
  postComment: postCommentsReducer,
  fetchGenre: fetchGenreReducer,
  loginUser: loginUserReducer,
  checkUsername: checkUsernameReducer,
  registerUser: registerUserReducer,
  postBlog: postBlogReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;