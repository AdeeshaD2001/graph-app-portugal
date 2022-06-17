import React, {useState, useContext} from 'react';
import './styles.scss';
import Logo from "./logo.svg"
import { AuthContext } from '../../contexts/auth';


const LoginPage = () => {
    const {login, signupbut} = useContext(AuthContext); //carregando variaveis do contexto de autenticação
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(email,password);
    }

    const handleSignup = () => {
        signupbut();
    }

    return (<div id="login">
        <h1 className="title">Login Benchmarking</h1>
        <form className="form" onSubmit={handleSubmit}>
            <div className="logo">
                <img
                src={Logo}
                alt="Logo Deep Ambiente"
                width={260}
                height={170}
                />                
            </div>
            <div className="subT">
                <h3>Benchmarking</h3>
            </div>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"
                value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="field">
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" id="password" 
                value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className="actions">
                <button type="submit">Entrar</button>
            </div>
            <div className="signupbutton">
                <button onClick={handleSignup}>Cadastrar</button>
            </div>
        </form>               
    </div>    
    );
};
 
export default LoginPage;
 