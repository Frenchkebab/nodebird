import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/index';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();

  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    // e.preventDefault(); antd에서 이미 적용되어 있음
    console.log(id, password);
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">Id</label>
        <br />
        <Input name="_user-id_" value={id} onChange={onChangeId} required />
      </div>

      <div>
        <label htmlFor="user-password">Password</label>
        <br />
        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
      </div>

      <ButtonWrapper style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit" loading={false}>
          Signin
        </Button>
        <Link href="/signup">
          <a href="">
            <Button>Signup</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
