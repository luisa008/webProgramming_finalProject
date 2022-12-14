import { UserOutlined } from "@ant-design/icons";
import { Input } from 'antd';

const LogIn = ({user, setUser, handleClick}) => {
    return (
        <Input.Search
            size="large"
            style={{ width: 300, margin: 50 }}
            prefix={<UserOutlined />}
            placeholder="Enter your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            enterButton="Sign In"
            // onSearch={(name) => onLogin(name)}
            onSearch={handleClick}
        />
    );}

export default LogIn;