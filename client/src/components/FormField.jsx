import React from 'react'

const FormField = ({ LabelName, type, name, placeholder, value, handleChange, isSupriseMe, handleSupriseMe }) => {
    return (
        <div>
            <div className='flex items-center gap-2 mb-2'>
                <label htmlFor={name} className='block tex-sm font-medium text-gray-900'>
                    {LabelName}
                </label>
                {isSupriseMe && (
                    <button type='button' onClick={handleSupriseMe} className='font-semibold text-xs bg-[#d8d8df] ml-2 py-2 px-4 rounded-[5px] text-black '>
                        Suprise Me!
                    </button>
                )}
            </div>
            <input className='mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none blocl w-full p-3 '
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
            />
        </div>
    )
}

export default FormField