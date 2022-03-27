import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import SchedulerTable from '../scheduler-table/scheduler-table';
import {readFileSync} from 'fs'
import path from 'path';
import {act} from 'react-dom/test-utils'

var importedData = {}
var div = null;

beforeAll(() => {
    const data = readFileSync(path.join(__dirname, '/data.test.json'))
    importedData = JSON.parse(data)
})

beforeEach(() => {
    div = document.createElement('div')
    document.body.appendChild(div)
    jest.spyOn(console, 'error').mockImplementation(()=>{})
})
afterEach(() => {
    unmountComponentAtNode(div)
    div.remove()
    div = null
})

it('renders properly', ()=> {
    act(()=> {
        ReactDOM.render(<SchedulerTable courses={{}} searchTerm = {''}/>, div)
    })
})

it('renders subjects properly', ()=> {
    act(()=> {
        ReactDOM.render(<SchedulerTable courses={importedData} searchTerm = {''}/>, div)
    })
    expect(div.textContent).toContain("HU")
})

it('header displays properly', ()=> {
    act(()=> {
        ReactDOM.render(<SchedulerTable courses={importedData} searchTerm = {''}/>, div)
    })
    expect(div.textContent).toContain("Year")
    expect(div.textContent).toContain("Semester")

})

it('ensure button press calls event', ()=> {
    const addCourses = jest.fn()
    act(()=> {
        ReactDOM.render(<SchedulerTable courses={importedData} searchTerm = {''} addCourses={addCourses}/>, div)
    })
    const addButton = document.getElementsByTagName('button')[0]
    act(()=> {
        addButton.dispatchEvent(new MouseEvent("click", {bubbles: true}))
    })
    expect(addCourses).toHaveBeenCalled()
})

it('header displays properly', ()=> {
    act(()=> {
        ReactDOM.render(<SchedulerTable courses={importedData} searchTerm = {''}/>, div)
    })
    expect(div.textContent).toContain("Year")
    expect(div.textContent).toContain("Semester")
})

it('check that skeleton dislays if nothing is passed for courses', ()=> {
    act(()=> {
        ReactDOM.render(<SchedulerTable courses={{}} searchTerm = {''}/>, div)
    })
    expect(document.getElementById('table-skeleton')).toBeTruthy()

})