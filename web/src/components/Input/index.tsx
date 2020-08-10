import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    name: string;
}

/*
    -React.FC = React Functional Component.

    -InputHTMLAttributes = Provém do react e possui todas 
os atributos possíveis para um input de html. Assim, não 
precisamos criar todos eles no componente

    -HTMLInputElement = Variável global do html

    -"...rest" = Objeto que armazena todo o resto 
    que não é as que já foram listadas (label, name)

*/
const Input: React.FC<InputProps> = ({ label, name , ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={name} > { label } </label>
            <input type="text" id={ name } {...rest} />
        </div>
    );
}

export default Input;