import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const menuItems = [
    {
      label: (
        <Link href="/">
          <a>NodeBird</a>
        </Link>
      ),
      key: 'home',
    },
    {
      label: (
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      ),
      key: 'profile',
    },
    {
      label: <SearchInput enterButton />,
      key: 'searchInput',
    },
    {
      label: (
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      ),
      key: 'signup',
    },
  ];

  return (
    <div>
      <Menu mode="horizontal" items={menuItems} />

      <Row gutter={8}>
        {/* 24개의 col으로 나뉨 */}
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm setIsLoggedIn={setIsloggedIn} />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/frenchkebab" target="_blank" rel="_noreferrer noopener">
            Made by frenchkebab
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
