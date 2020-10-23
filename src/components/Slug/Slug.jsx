import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/slugActions';
import Spinner from '../Spinner/Spinner';
import SlugPage from './SlugPage';
import { Result } from 'antd';

const Slug = (props) => {
  const { match, setSlug, slug, loading, error, user, deleteSlug } = props;
  const { slugName } = match.params;

  useEffect(() => {
    setSlug(slugName);
  }, [slugName]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <Result status="warning" title={error} />;
  }
  return <SlugPage article={slug} user={user} deleteSlug={deleteSlug} />;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    slug: state.slug.slug,
    loading: state.slug.loading,
    error: state.slug.error,
  };
};
export default connect(mapStateToProps, actions)(Slug);
