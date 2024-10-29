import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { 
    handleCalculatorNameChange, 
    handleDescriptionChange, 
    handleNameChange, 
    handleValueChange, 
    handleAddSection, 
    handleRemoveSection,
    handleAddToCartChange,
    handleViewPriceChange
} from "../calculatorSlice";

import { string } from '../common/text';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AddNewCalculator() {
    const navigate = useNavigate();
    const uniqueId = Date.now();
    const addToCartValue = useSelector(state => state.calculator.settings.addToCart);
    const viewPriceValue = useSelector(state => state.calculator.settings.viewPrice);

    const addToCartValueString  = addToCartValue ? addToCartValue.toString() : 'false';
    const viewPriceValueString  = viewPriceValue ? viewPriceValue.toString() : 'false';


    let addToCart = JSON.parse(addToCartValueString.toLowerCase());
    let viewPrice = JSON.parse(viewPriceValueString.toLowerCase());


    const edit = useSelector(state => state.calculator.edit);
    const calculatorName = useSelector(state => state.calculator.calculator.calculatorName);
    const calculatorDescription = useSelector(state => state.calculator.calculator.description);
    const fields = useSelector(state => state.calculator.fields);
    const finalData = useSelector(state => state.calculator);
    const dispatch = useDispatch();

    const handleSave = (e) => {
        e.preventDefault();
        let data = {
            'action': edit.action,
            'calculatorInfo': [finalData],
            '_ajax_nonce': ascodeWooCalculatorDashboard.nonce,
        };

        jQuery.post(ajaxurl, data, (response) => {
            if (response.success) {
                Swal.fire(
                    'Good Job!',
                    response.data.message,
                    'success'
                )
                navigate('/');
            }
        });
    }

    return (
        <div className='bg-white p-6 rounded'>
            <div className='w-full'>
                <div className="min-w-0 flex-1 border p-5 mb-5 rounded">
                    <h5 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                        {edit.page}
                    </h5>
                </div>
                <form className='border p-5 rounded flex devide-x'>
                    <div className='w-[60%] p-4'>
                        <div className='mt-3'>
                            <div className="flex justify-between">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    {string.fromString.name}
                                </label>
                                <span className="text-sm leading-6 text-gray-500" id="name-optional">
                                    {string.fromString.requiredText}
                                </span>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-input block w-full rounded-md border-0 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={string.fromString.namePlaceHolder}
                                    aria-describedby=""
                                    value={calculatorName}
                                    onChange={(e) => dispatch(handleCalculatorNameChange(e.target.value))}
                                    required
                                />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className="flex justify-between">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    {string.fromString.calculatorDescription}
                                </label>
                                <span className="text-sm leading-6 text-gray-500" id="email-optional">
                                    {string.fromString.optionalText}
                                </span>
                            </div>
                            <div className="mt-2">
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={string.fromString.descriptionPlaceHolder}
                                    aria-describedby=""
                                    value={calculatorDescription}
                                    onChange={(e) => dispatch(handleDescriptionChange(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className="flex justify-between">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    {string.fromString.calculatorFields}
                                </label>
                            </div>
                            <div className="mt-2">
                                {fields.map((field, index) => (
                                    <div key={field.id} className='flex mt-4'>
                                        <div className="relative mr-2">
                                            <label
                                                htmlFor="name"
                                                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                            >
                                                Input {index + 1} name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="block w-full rounded-md border-0 py-1.5 h-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                // placeholder={`Input ${index + 1} Name`}
                                                value={field.name}
                                                onChange={(e) => dispatch(handleNameChange({ id: field.id, value: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="relative mr-2">
                                            <label
                                                htmlFor="value"
                                                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                            >
                                                Input {index + 1} value in watt
                                            </label>
                                            <input
                                                type="number"
                                                name="value"
                                                id="value"
                                                className="block w-full rounded-md border-0 py-1.5 h-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                // placeholder={`Input ${index + 1} Value`}
                                                value={field.value}
                                                onChange={(e) => dispatch(handleValueChange({ id: field.id, value: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                dispatch(handleRemoveSection(field.id))
                                            }}
                                            className="rounded-2xl bg-red-50 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        ><TrashIcon className="h-6 w-6 text-red-500" /></button>
                                    </div>
                                ))}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(handleAddSection(uniqueId))
                                    }}
                                    className="rounded-md bg-indigo-600 mt-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >{string.fromString.addFiledButton}</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-[40%] pl-4 border-l'>
                        <h5 className="text-2xl pb-2 border-b-2 font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                            Settings
                        </h5>
                        <div className='p-4'>
                            <div className='flex items-center border-b pb-2'>
                                <Switch
                                    checked={addToCart}
                                    onChange={() => dispatch(handleAddToCartChange(!addToCart))}
                                    className={classNames(
                                        addToCart ? 'bg-indigo-600' : 'bg-gray-200',
                                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                    )}
                                    >
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                        addToCart ? 'translate-x-5' : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                        )}
                                    />
                                </Switch>
                                <div className='ml-8'>
                                    <span className="text-base font-medium text-gray-900">Show Add to cart button</span>
                                    <p className='text-sm'>Show add to cart button in suggested product</p>
                                </div>
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center border-b pb-2'>
                                <Switch
                                    checked={viewPrice}
                                    onChange={() => dispatch(handleViewPriceChange(!viewPrice))}
                                    className={classNames(
                                        viewPrice ? 'bg-indigo-600' : 'bg-gray-200',
                                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                    )}
                                    >
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                        viewPrice ? 'translate-x-5' : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                        )}
                                    />
                                </Switch>
                                <div className='ml-8'>
                                    <span className="text-base font-medium text-gray-900">Show Price</span>
                                    <p className='text-sm'>Show price in suggested product.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='border mt-4'></div>
                <button
                    onClick={handleSave}
                    className="rounded-md mt-4 bg-green-600 mt-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >{edit.buttonText}</button>
            </div>
        </div>
    )
}