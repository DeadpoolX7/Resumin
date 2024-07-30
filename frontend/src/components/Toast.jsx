
import React from 'react';

const Toast = ({ message, type, onClose }) => {
    return (
        <div className='toast toast-top toast-end'>
            {(type !== 'info') ? (
                <div className='alert alert-success'>
                    <span className='text-xl font-normal'>{message}</span>
                    <div>
                        <button onClick={onClose} className="btn btn-sm btn-ghost">✖</button>
                    </div>
                </div>
            ) : (<div className='alert alert-error'>
                <span className='text-xl '>{message}</span>
                <div>
                    <button onClick={onClose} className="btn btn-sm btn-ghost">✖</button>
                </div>
            </div>
            )
            }
        </div>
    );
};

export default Toast;
