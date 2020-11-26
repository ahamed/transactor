import React, { useState } from 'react';
import style from './textarea.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const TextArea = ({
	type,
	label,
	description,
	name,
	value,
	onChange,
	required = false,
	...otherProps
}) => {
	const [showHelp, toggleHelp] = useState(false);

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
			<textarea
				type={type}
				name={name}
				value={value}
				onChange={event => onChange(event)}
				className={`${style['input-field']} form-control`}
				required={required}
				{...otherProps}
			></textarea>
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

export default TextArea;
