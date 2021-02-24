'use strict'
const { createStore } = Redux;
console.log('Starting banking app for multiple accounts');

const defaultState = {
	checking: 100,
	savings: 100
};

// const actionDeposit = 'deposit';
// const actionWithdrawal = 'withdrawal';

// Account functions
const actionDeposit = (account, amount) => {
	return {
		type: 'deposit',
		payload: {
			account,
			amount
		}
	};
}

const actionWithdrawal = (account, amount) => {
    return {
        type: 'withdrawal',
        payload: {
            account,
            amount
        }
    };
}

// REDUCER!!

function accounts(state=defaultState, action) {
	switch(action.type) {
	case 'deposit':
		return {
			...state,
			[action.payload.account]: state[action.payload.account] + action.payload.amount
		};
	case 'withdrawal':
		return {
			...state,
			[action.payload.account]: state[action.payload.account] - action.payload.amount
		};	}
	return state;
}

const store = createStore(accounts, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log('=== state has updated ===');
    const state = store.getState();
    console.log(state);
    const checking = document.querySelector('#checking');
    checking.innerHTML = state.checking;
    const savings = document.querySelector('#savings');
    savings.innerHTML = state.savings;
});

// VIEWS!!
const depositButton = document.querySelector('#deposit');
const withdrawButton = document.querySelector('#withdraw');
const amount = document.querySelector('#amount');

depositButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("amount to deposit is:", amount.value);
    const amountValue = parseInt(amount.value);
    store.dispatch(actionDeposit(amountValue));
});

withdrawButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("amount to withdraw is:", amount.value);
    const amountValue = parseInt(amount.value);
    store.dispatch(actionWithdrawal(amountValue));
});


// window.store = store;
// window.createDeposit = createDeposit;
// window.createWithdrawal = createWithdrawal;