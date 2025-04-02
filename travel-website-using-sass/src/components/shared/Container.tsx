import React from 'react';
import { ContainerProps } from '../../types';

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    const classes = className ? `container ${className}` : 'container';

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Container;