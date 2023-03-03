import { useCallback, useState } from 'react';
import { login } from 'apis/user';
import useUser from 'hooks/useUser';
import { Button, Typography, Form, Input } from 'antd';
import styled from 'styled-components';
import { FlexBox } from 'components/Box';
import { H1, H3 } from 'components/common';
import logo from '../../logo.png';

const { Text } = Typography;

const Root = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25vh;
  min-height: 100vh;
  background-color: #fbfbfb;
`;

const Header = styled.div`
  position: absolute;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  margin: 2rem 0px;
  width: 100%;
  gap: 2rem;
  top: 0;
  display: flex;
`;

const Img = styled.img`
  height: 10vmin;
  pointer-events: none;
`;
const LoginPage = () => {
  const [error, setError] = useState();
  const { setUser } = useUser();

  const onFinish = useCallback(
    async (values) => {
      setError(false);
      try {
        const res = await login({ username: values.username, password: values.password });
        if (res.data) setUser(res.data);
      } catch (e) {
        setError(true);
        console.log('login error:', e);
      }
    },
    [setUser]
  );

  const onFinishFailed = (errorInfo) => {};

  const handleChange = useCallback(() => {
    setError(false);
  }, []);

  return (
    <Root>
      <Header>
        <FlexBox justifyContent="space-between" width="100%">
          <FlexBox gap="2rem">
            <Img src={logo} className="App-logo" alt="logo" />
            <H1>TDE Template Editor</H1>
          </FlexBox>
          <H3>
            Built by <a href="http://4VServices.com">4V Services</a>
          </H3>
        </FlexBox>
      </Header>

      <Form
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600, minWidth: 280 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={handleChange}
        autoComplete="on"
      >
        <Form.Item>
          <p>Log in with a user that has the 'tde-editor-standard-role'</p>
        </Form.Item>

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
