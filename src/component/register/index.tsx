import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type InputId = 'email' | 'password' | 'pnombre' | 'confirmPassword';

export default function Register () {
    const [values, setValues] = useState({
        email: '',
        pnombre: '',
        password: '',
        confirmPassword: '',
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        pnombre: false,
        password: false,
        confirmPassword: false,
    });


    const [showMessage, setShowMessage] = useState(false);
    const [show, setShow] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const [message, setMessage] = useState([]);

    const emailIsInvalid = didEdit.email && !values.email.includes('@');
    const pnombreIsInvalid = didEdit.pnombre && values.pnombre.trim().length < 1;
    const passwordIsInvalid = didEdit.password && values.password.trim().length < 6;
    const confirmPasswordIsInvalid = didEdit.confirmPassword && values.confirmPassword !== values.password;



    function handleInputChange(id:InputId, value: string) {
        setValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));

        setDidEdit((prevValues) => ({
            ...prevValues,
            [id]: false,
        }));

        setShowMessage(false);
        setShow(false);
        setFormValid(validateForm());
    }

    function handleInputBlur(id: InputId) {
        setDidEdit((prevValues) => ({
            ...prevValues,
            [id]: true,
        }));
    }

    const validateForm = useCallback(() => {
        const isEmailValid = values.email.trim() !== '' && values.email.includes('@');
        const isPnombreValid = values.pnombre.trim().length >= 1;
        const isPasswordValid = values.password.trim().length >= 5;
        const isConfirmPasswordValid = values.confirmPassword.trim() == values.password.trim();
        return isEmailValid && isPnombreValid && isPasswordValid && isConfirmPasswordValid;
    }, [values]);

    useEffect(() => {
        setFormValid(validateForm());
    }, [values, validateForm]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    pnombre: values.pnombre,
                    password: values.password,
                }),
            });
            const data = await response.json();
            if (data.error) {
                setErrorMessage(data.error);
                setShowMessage(true);
            } else {
                setMessage(data.message);
                setShow(true);
            }
        } catch (error) {
            console.log(error);
    }

    return(
        <>
            <div style={{marginTop: 40}} className="form">
                <form onSubmit={handleSubmit}>
                    <Link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back-up" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 14l-4 -4l4 -4" />
                        <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                        </svg>
                    </Link>
                    <h1 className='title'>Regi<span>strate</span></h1>
                    <label htmlFor="email" className="lblIni">Email</label>
                    <div className="input-box">
                        <input 
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Ingresa tu Email"
                            onBlur={() => handleInputBlur('email')}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            value = {values.email}
                            required
                        />
                    </div>
                    <div className="control-error">
                        {emailIsInvalid && <p>Ingrese un Email valido</p>}
                    </div>
                    <label htmlFor="pnombre" className="lblIni">Nombre</label>
                    <div className="input-box">
                        <input
                            id="pnombre" 
                            type="text"
                            name="pnombre"
                            placeholder="Ingresa tu nombre" 
                            onBlur={() => handleInputBlur('pnombre')}
                            onChange={(e) => handleInputChange('pnombre', e.target.value)}
                            required
                        />
                    </div>
                    <div className="control-error">
                        {pnombreIsInvalid && <p>El nombre es muy corto</p>}
                    </div>
                    <label htmlFor="password" className='lblIni'>Ingresa tu Contraseña</label>
                    <div className="input-box">
                        <input 
                            id="password" 
                            type="password"
                            name="password"
                            placeholder="Ingrese una Contraseña"
                            onBlur={() => handleInputBlur('password')}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                        />
                    </div>
                    <div className="control-error">
                        {passwordIsInvalid && <p>La Contraseña es muy corta</p>}
                    </div>
                    <label htmlFor="confirmPassword" className='lblIni'>Confirma tu Contraseña</label>
                    <div className="input-box">
                        <input 
                            id="confirmPassword" 
                            type="password"
                            name="confirmPassword"
                            placeholder="Ingrese una Contraseña"
                            onBlur={() => handleInputBlur('confirmPassword')}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            required
                        />
                    </div>
                    <div className="control-error">
                        {confirmPasswordIsInvalid && <p>Las contraseñas no son iguales</p>}
                    </div>
                    <div className="control-error">
                        {showMessage && <p>{errorMessage}</p>}
                    </div>
                    <div className="control-error">
                        {show && <p style={{color: "green"}}>{message}</p>}
                    </div>
                    <div className="btn-submit">
                        <button disabled={!formValid} type="submit">Registrate</button>
                    </div>
                </form>
            </div>
        </>
    );
}