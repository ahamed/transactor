import React, { useState } from 'react';
import style from './input.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const Input = ({
	type,
	label,
	description,
	name,
	value,
	onChange,
	required = false,
	...otherProps
}) => {
	const [showHelp, toggleHelp] = useState(true);

	return (
		<div className={style['input-group']}>
			{label && (
				<label className='control-label'>
					{label} {!required && <small>(optional)</small>}
					{description && (
						<span
							className={`${style['help-icon']} fas fa-info-circle`}
							onClick={() => toggleHelp(!showHelp)}
						></span>
					)}
				</label>
			)}
			<input
				type={type}
				name={name}
				value={value}
				onChange={event => onChange(event)}
				className={`${style['input-field']} form-control`}
				required={required}
				{...otherProps}
			/>
			<AnimatePresence>
				{showHelp && (
					<motion.div
						initial='initial'
						animate='animate'
						exit='initial'
						variants={{
							initial: {
								y: 0,
								opacity: 0,
							},
							animate: {
								y: 2,
								opacity: 1,
							},
						}}
					>
						<small className={style['help-text']}>
							{description}
						</small>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Input;
