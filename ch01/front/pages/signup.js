import { useCallback, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input } from 'antd';

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  });

  const [id, setId] = useState('');
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const [password, setPassword] = useState('');
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    // 내부적으로 e.preventDefault()가 자동으로 됨
  }, []);

  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input name="user-id" value={id} required onChange={onChangeId} />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호 체크</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default Signup;
