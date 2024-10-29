import { createSlice } from '@reduxjs/toolkit';
import { __ } from '@wordpress/i18n';


let initialState = {
    calculator: {
        calculatorName: '',
        description: '',
        inputType: ''
    },
    fields: [
        {
            id: 1,
            name: '',
            value: ''
        }
    ],
    settings: {
        addToCart: false,
        viewPrice: false
    },
    edit: {
        calculatorId: '',
        buttonText: __('Save Calculator', 'ascode-woo-calculator'),
        page: __('Add New Calculator', 'ascode-woo-calculator'),
        action: 'ascode_save_calculator_info_action'
    }
};

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        handleCalculatorNameChange: (state, e) => {
            state.calculator.calculatorName = e.payload;
        },
        handleDescriptionChange: (state, e) => {
            state.calculator.description = e.payload;
        },
        handleTypeChange: (state, e) => {
            state.calculator.description = e.payload;
        },
        handleNameChange: (state, e) => {
            state.fields = state.fields.map(item => {
                if (item.id === e.payload.id) {
                    return {
                        ...item,
                        name: e.payload.value
                    }
                } else {
                    return item;
                }
            })
        },
        handleValueChange: (state, e) => {
            state.fields = state.fields.map(item => {
                if (item.id === e.payload.id) {
                    return {
                        ...item,
                        value: e.payload.value
                    }
                } else {
                    return item;
                }
            })
        },
        handleAddSection: (state, { payload }) => {
            state.fields.push({
                id: payload,
                name: '',
                value: ''
            });
        },
        handleRemoveSection: (state, index) => {
            if (state.fields.length === 1) {
                return; // Prevent removing the first field if it's the only one
            }
            state.fields = state.fields.filter(item => item.id !== index.payload);
        },
        handleAddToCartChange: (state, e) => {
            state.settings.addToCart = e.payload;
        },
        handleViewPriceChange: (state, e) => {
            state.settings.viewPrice = e.payload;
        },
        handleUpdateCalculator: (state, { payload }) => {
            state = Object.assign(state, payload[0]);
            state.edit.page = __('Edit Calculator', 'ascode-woo-calculator');
            state.edit.buttonText = __('Update Calculator','ascode-woo-calculator');
            state.edit.action = 'ascode_update_calculator_info_action';
            state.edit.calculatorId = payload[1];
        }
    }

})

export const { 
    handleCalculatorNameChange, 
    handleDescriptionChange, 
    handleTypeChange, 
    handleNameChange, 
    handleValueChange, 
    handleAddSection, 
    handleRemoveSection,
    handleAddToCartChange,
    handleViewPriceChange,
    handleUpdateCalculator 
} = calculatorSlice.actions;

export default calculatorSlice.reducer;