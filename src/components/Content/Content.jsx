import React, { useEffect } from 'react';
import Pagin from '../Pagination/Pagination';
import Articles from '../Articles/Articles';
import style from './Content.module.scss';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import { Result } from 'antd';

import * as actions from '../../store/articlesActions';

const Content = (props) => {
  const { loading, setArticles, error, token } = props;

  useEffect(() => {
    setArticles(1, token);
  }, []);

  if (loading) return <Spinner />;

  if (error) {
    return <Result status="warning" title={error} />;
  }

  return (
    <div className={style.content}>
      <Articles />
      <Pagin />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.articles.loading,
    error: state.articles.error,
    token: state.user.user ? state.user.user.token : '',
  };
};

export default connect(mapStateToProps, actions)(Content);
