import React, { useState } from 'react';


const Form = ({ children }) => {




    const customProps = { ok: 'yes' };

    const renderChildrenWithProps = () => {
        const rendered = React.Children.map(children, (child) => {
            // console.log(child);
            // console.log(child.props);
            // console.log('fields', fields.name);
            return React.cloneElement(child, customProps);
        });
        return rendered;
    }


    return (
        <form>
            {renderChildrenWithProps()}
        </form>
    )

}


export default Form;