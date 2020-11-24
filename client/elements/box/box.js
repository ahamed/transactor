import React from 'react';
import style from './box.module.scss';

const Box = ({ children }) => <div className={style.box}>{children}</div>;

export default Box;
