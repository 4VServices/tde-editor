import { useCallback, useState } from 'react';
import { login } from 'apis/user';
import useUser from 'hooks/useUser';
import { Button, Typography, Form, Input } from 'antd';
import styled from 'styled-components';
const { Text } = Typography;

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginPage = () => {
  const [error, setError] = useState();
  const { setUser } = useUser();

  const onFinish = async (values) => {
    console.log('Success:', values);
    setError(false);
    try {
      const res = await login({ username: values.username, password: values.password });
      if (res.status === 200) setUser({ isAuthenticated: true });
    } catch (e) {
      setError(true);
      console.log('login error:', e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = useCallback(() => {
    setError(false);
  }, []);

  return (
    <Root>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={handleChange}
        autoComplete="on"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        {error && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Text type="danger">Something went wrong</Text>
          </Form.Item>
        )}
      </Form>
    </Root>
  );
};

export default LoginPage;
