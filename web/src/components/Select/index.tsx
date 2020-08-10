import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label: string;
    name: string;
    options: Array<{
        value: string,
        label: string
    }>
}

const Select: React.FC<SelectProps> = ({ label, name, options , ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name} > { label } </label>
            <select value="" id={ name } {...rest}>

                <option value="" disabled  hidden>
                    Selecione uma Opção
                </option>

                { options.map(option =>{
                    return (
                    <option key={ option.value } value= { option.value } > 
                      { option.label } 
                    </option>
                    )
                })}

            </select>
        </div>
    );
}

export default Select;
/*
    -<option> = É toda opção para o usuário selecionar dentro
    do select.

    --option.map(...) = passará por todos os valores de options
    e para cada um necessitamos retornar um valor 
    "<option></option>" do html dentro do select. Por isso
    que estamos usando uma arrow function.

    --"key={ option.value }" = é sempre necessário que informa-
    mos uma "key" para a teg option para podermos referênciar
    mais tarde, mais ou menos como funciona uma Primary Key, que
    nesse caso estamos usando o name (poderia ser o label mas
    talvez não seja a melhor ideia para certos casos).
    (coisa do react).

    -React.FC = React Functional Component.

    -SelectHTMLAttributes = Provém do react e possui todas 
    os atributos possíveis para um select de html. Assim, não 
    precisamos criar todos eles no componente

    -HTMLSelectElement = Variável global do html

    -"...rest" = Objeto que armazena todo o resto 
    que não é as que já foram listadas (label, name)

*/