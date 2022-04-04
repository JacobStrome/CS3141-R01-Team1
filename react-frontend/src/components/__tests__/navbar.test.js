import { act } from "react-dom/test-utils"
import Navbar from "../navbar"
import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'
var div = null
beforeEach(() => {
    div = document.createElement('div')
    document.body.appendChild(div)

})
afterEach(() => {
    unmountComponentAtNode(div)
    div.remove()
    div = null
})


it('component renders', () => {
    act(() => {
        ReactDOM.render(<Navbar />, div)
    })
})

it('title is displayed', () => {
    act(() => {
        ReactDOM.render(<Navbar />, div)
    })
    expect(div.textContent).toContain("Schedule Helper")
})

it('event fires on input change', () => {
    const onChange = jest.fn()
    act(() => {
        ReactDOM.render(<Navbar onChange={onChange} />, div)
    })
    const inputBox = document.getElementById("search-bar")
    act(() => {
        ReactTestUtils.Simulate.change(inputBox, { target: { value: "hello" } })
    })
    expect(onChange).toHaveBeenCalled()
})

it('check that logo displays', () => {
    const onChange = jest.fn()
    act(() => {
        ReactDOM.render(<Navbar onChange={onChange} />, div)
    })
    const logo = document.getElementById("site-logo")
    expect(logo).toBeTruthy()
})

it('check that search button displays', () => {
    const onChange = jest.fn()
    act(() => {
        ReactDOM.render(<Navbar onChange={onChange} />, div)
    })
    const logo = document.getElementById("search-icon")
    expect(logo).toBeTruthy()
})