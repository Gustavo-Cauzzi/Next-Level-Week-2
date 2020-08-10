import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string;
    name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name , ...rest }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name} > { label } </label>
            <textarea id={ name } {...rest} />
        </div>
    );
}

export default Textarea;
/*
    -React.FC = React Functional Component.

    -TextareaHTMLAttributes = Provém do react e possui todas 
os atributos possíveis para um input de html. Assim, não 
precisamos criar todos eles no componente

    -HTMLTextAreaElement = Variável global do html

    -"...rest" = Objeto que armazena todo o resto 
    que não é as que já foram listadas (label, name)

*/