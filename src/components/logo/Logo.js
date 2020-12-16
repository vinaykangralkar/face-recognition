import React from 'react';
import Tilt from 'react-tilt';
import LogoImage from './logo.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 " options={{ max : 50 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner pa3"> <img src={LogoImage} /> </div>
            </Tilt>
        </div>
    );
}

export default Logo;