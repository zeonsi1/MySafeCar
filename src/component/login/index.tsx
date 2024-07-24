import { useState } from "react";
import { Link } from "react-router-dom";

interface loginProps {
    setShowModal: (show: boolean) => void;
}
type InputId = 'email' | 'password';
export default function Login({setShowModal}: loginProps){
    const handleClose= (e: React.MouseEvent<HTMLElement | SVGSVGElement>) => {
        if (e.currentTarget.className === "modal" || e.currentTarget instanceof SVGSVGElement) {
            setShowModal(false);
        }
    }
    const [values, setValues] = useState({
        email : '',
        password : '',
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false
    });

    const [errorMessage, setErrorMessage] = useState([]);

    const [showMessage, setShowMessage] = useState(false);

    const [formValid, setFormValid] = useState(false);

    const emailIsInvalid = didEdit.email && !values.email.includes('@');

    const passwordIsInvalid = didEdit.password && values.password.trim().length < 6;

   
    function validateForm() {
        const isEmailValid = values.email.trim() !== '' && values.email.includes('@');
        const isPasswordValid = values.password.trim().length >= 5;
        return isEmailValid && isPasswordValid;
    }

    function handleFormChange() {
        setFormValid(validateForm())
    }

    function handleInputChange(id: InputId, value: string) {
        setValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));

        setDidEdit((prevValues) => ({
            ...prevValues,
            [id]: false,
        }));

        setShowMessage(false);
        setFormValid(false);
    }

    function handleInputBlur (id: InputId) {
        setDidEdit((prevValues) => ({
            ...prevValues,
            [id]: true
        }));
    }

    return (
        <div onClick={handleClose} className="modal">
            <div onClick={(e) => e.stopPropagation()} className="modal-content">
                <h2 className="title-modal">Iniciar Sesión</h2>
                <svg onClick={handleClose} style={{cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back-up" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 14l-4 -4l4 -4" />
                    <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                </svg>
                <label htmlFor="email" className='lblIni'>Email</label>

                <form onChange={handleFormChange} action="">               
                    <div className="input-box">                
                        <input 
                            id='email'
                            type="email" 
                            name='email'
                            placeholder='Ingresa tu Email'                       
                            onBlur={() => handleInputBlur('email')}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            value={values.email}
                            required                       
                        />                        
                    </div>
                    <div className="control-error">
                        {emailIsInvalid && <p>Ingrese un Email valido</p>}
                    </div>
                    <label htmlFor="password" className='lblIni'>Ingresa tu Contraseña</label>
                    <div className="input-box">
                        <input
                            id='password'
                            type="password"
                            name='password'
                            placeholder='Ingrese su Contraseña'
                            onBlur={() => handleInputBlur('password')}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            value={values.password}
                            required
                        />
                    </div>
                    <div className="control-error">
                        {passwordIsInvalid && <p>La Contraseña es muy corta</p>}
                    </div>
                    <div className="control-error">
                        {showMessage && <p>{errorMessage}</p>}
                    </div>
                    <div style={{display:"flex", textAlign:"center", justifyContent:'center'}}>
                        <p>No Tienes Cuenta? <Link to={'/register'} style={{color: 'black', textDecorationLine: 'underline'}}>Haz Click Aquí</Link></p>
                    </div>
                    <br />
                    <div className="btn-submit">
                        <button disabled={!formValid} type='submit'>Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
}