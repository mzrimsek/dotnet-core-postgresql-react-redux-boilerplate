import React, { PropTypes } from 'react';
import Header from '../../components/Header';
import './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
    <div>
        <Header />
        <div className='core-layout__viewport'>
            { children }
        </div>
    </div>
);

CoreLayout.propTypes = {
    children: PropTypes.element.isRequired
};

export default CoreLayout;