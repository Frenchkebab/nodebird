// 페이지에서 공통되는 것들
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'; // <head></head> 태그를 수정하고 싶은 경우
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

// Component에 pages 컴포넌트들의 return값이 들어감
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
