import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './App.module.scss';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Slug from '../Slug/Slug';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EditUser from '../EditUser/EditUser';
import NewArticle from '../NewArticle/NewArticle';
import EditArticle from '../EditArticle/EditArticle';

const App = (props) => {
  const { loggedIn } = props;
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <Route path="/" exact component={Content} />
        <Route path="/articles" exact component={Content} />
        <Route path="/articles/:slugName" exact component={Slug} />
        <Route path="/articles/:slugName/edit" exact>
          {loggedIn ? <EditArticle /> : <Redirect to="/sign-in" />}
        </Route>
        <Route path="/profile" exact>
          {loggedIn ? <EditUser /> : <Redirect to="/sign-in" />}
        </Route>
        <Route path="/sign-in" exact>
          {loggedIn ? <Redirect to="/" /> : <SignIn />}
        </Route>
        <Route path="/sign-up" exact>
          {loggedIn ? <Redirect to="/" /> : <SignUp />}
        </Route>
        <Route path="/new-article" exact>
          {loggedIn ? <NewArticle /> : <Redirect to="/sign-in" />}
        </Route>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.user.user,
  };
};
App.propTypes = {
  loggedIn: PropTypes.bool,
};
export default connect(mapStateToProps)(App);
