import React from 'react';

import './Logo.css';

import Image from '../../../../../../public/images/Briluce-logo-for-Dark-BG.png';
import Dark from '../../../../../../public/images/Briluce-logo-for-white-BG.png';

const logo = ({ big, dark }) => (
    <div className="Logo mb-0 text-white" >
        {dark ?
            <img src={Dark} style={big ? { height: 90 } : { height: 60 }} />
            :
            <img src={Image} style={big ? { height: 90 } : { height: 60 }} />
        }
    </div>
);

export default logo;