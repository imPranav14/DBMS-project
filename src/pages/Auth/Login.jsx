import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { adminLogin, doctorLogin, nurseLogin } from '../../redux/auth/actions';

const { Option } = Select;

const Login = () => {
  const [userType, setUserType] = useState('admin');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let loginAction;
      switch (userType) {
        case 'admin':
          loginAction = adminLogin;
          break;
        case 'doctor':
          loginAction = doctorLogin;
          break;
        case 'nurse':
          loginAction = nurseLogin;
          break;
        default:
          return;
      }
      
      await dispatch(loginAction(values));
      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card title="Hospital Management System - Login" style={{ width: 400 }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="User Type">
            <Select value={userType} onChange={setUserType}>
              <Option value="admin">Admin</Option>
              <Option value="doctor">Doctor</Option>
              <Option value="nurse">Nurse</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="userId"
            rules={[{ required: true, message: 'Please input your User ID!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="User ID" />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;