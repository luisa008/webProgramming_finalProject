import LogIn from "../components/LogIn";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { MeetProvider, useMeet } from './hooks/useMeet';
import "./SignIn.css";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
    margin: 0;
    font-size: 5em;
}`;

const SignIn = () => {
    const {user, setUser} = useMeet();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Homepage')
    }
    return (
        <div className='Container'>
            <div className="Title"><Wrapper><h1>Let's Meet!</h1></Wrapper></div>
            <div className="SignContent"><LogIn user={user} setUser={setUser} handleClick={handleClick} /></div>
            <div className="Bottom"></div>
            {/* <Wrapper><h1>Chat Room</h1></Wrapper>
            <LogIn me={"lisa"} handleClick={handleClick} /> */}
        </div>
    );
}

export default SignIn;