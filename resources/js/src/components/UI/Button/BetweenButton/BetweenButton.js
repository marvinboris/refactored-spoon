import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ children, color, icon, iconColor = 'reset', className = '', size, pill = false, block, onClick }) => <Button block={block} color={color} size={size} onClick={onClick} className={`d-inline-flex justify-content-center align-items-center ${pill ? ' rounded-pill ' : 'rounded-2'} ${className}`}>
    {children}
    <FontAwesomeIcon icon={icon} className={`ml-3 text-${iconColor}`} />
</Button>;