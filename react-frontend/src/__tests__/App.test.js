import axios from 'axios';
import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import {act} from 'react-dom/test-utils'
import {readFileSync} from 'fs'
import path from 'path';
import App from '../App';

var importedData = {}
var div = null;

beforeAll(() => {
    const data = readFileSync(path.join(__dirname, '../components/__tests__/data.test.json'))
    importedData = JSON.parse(data)

})

beforeEach(() => {
    div = document.createElement('div')
    document.body.appendChild(div)
})
afterEach(() => {
    unmountComponentAtNode(div)
    div.remove()
    div = null

    jest.restoreAllMocks()
})

it('app renders',() => {
    jest.spyOn(console, 'error').mockImplementation(()=>{})
    act(() => {
        ReactDOM.render(<App/>, div)
    })
})

it('api call correctly formatted', ()=> {
    jest.spyOn(console, 'error').mockImplementation(()=>{})

    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementation(() => Promise.resolve({data: importedData}))
    act(() => {
        ReactDOM.render(<App/>, div)
    })
    expect(spy).toHaveBeenCalledWith('http://141.219.232.222:8000/api/courses')
    
})

it('table is displayed after api call finishes',async () => {
    jest.spyOn(console, 'error').mockImplementation(()=>{})

    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementation(() => Promise.resolve({data: importedData}))
    act(() => {
        ReactDOM.render(<App/>, div)
    })
    await expect(spy).toHaveBeenCalledTimes(1)
    
    expect(div.textContent).toContain("Year")
})