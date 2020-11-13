import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/store'
import App from './components/App'

import './styles/index.scss'

render(
    <BrowserRouter>
        <Provider store = { store }>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'))