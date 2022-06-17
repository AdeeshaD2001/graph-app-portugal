import React, {useState, useContext} from 'react';
import './styles.scss';
import Logo from "./logo.svg"
import { AuthContext } from '../../contexts/auth';

const SignupPage = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const {signup} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, name, tel);
        console.log('submit', {email, password, name, tel});
    }

       
    return (<div id="login">
        <h1 className="title">Cadastro</h1>
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
                <label htmlFor="name">Nome Completo</label>
                <input type="text" name="name" id="name"
                value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="field">
                <label htmlFor="tel">Telefone</label>
                <input type="tel" name="tel" id="tel"
                pattern='[0-9]{2}-[0-9]{5}-[0-9]{4}'
                value={tel} onChange={(e)=>setTel(e.target.value)}/>
                <small>ddd-12345-6789</small>
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
                <button type="submit">Cadastrar</button>
            </div>
        </form>
    </div>    
    );
};
 
export default SignupPage;
 