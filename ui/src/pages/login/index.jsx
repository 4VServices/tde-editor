import { useCallback, useState } from 'react';
import { login } from 'apis/user';
import useUser from 'hooks/useUser';
import { Button, Typography, Form, Input } from 'antd';
import styled from 'styled-components';
import { FlexBox } from 'components/Box';
const { Text } = Typography;

const Root = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25vh;
  min-height: 100vh;
  background-color: #f2f2ee;
`;

const LoginPage = () => {
  const [error, setError] = useState();
  const { setUser } = useUser();

  const onFinish = useCallback(async (values) => {
    setError(false);
    try {
      const res = await login({ username: values.username, password: values.password });
      if (res.data) setUser(res.data);
    } catch (e) {
      setError(true);
      console.log('login error:', e);
    }
  }, [setUser]);

  const onFinishFailed = (errorInfo) => {};

  const handleChange = useCallback(() => {
    setError(false);
  }, []);

  return (
    <Root>
      <Form
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600, minWidth: 280 }}
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

        <Form.Item>
          <FlexBox justifyContent="center">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </FlexBox>
        </Form.Item>

        {error && (
          <Form.Item>
            <FlexBox justifyContent="center">
              <Text type="danger">Something went wrong</Text>
            </FlexBox>
          </Form.Item>
        )}
      </Form>
    </Root>
  );
};

export default LoginPage;
