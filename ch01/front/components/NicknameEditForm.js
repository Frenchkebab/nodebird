import React, { useMemo } from 'react';
import { Form, Input } from 'antd';

// antd의 props 같은 것은 외우는 것이 아니라 공식문서를 보고 참조할 것!
const NicknameEditForm = () => {
  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '20px',
    }),
    []
  );

  return (
    <Form style={style}>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
};

export default NicknameEditForm;
