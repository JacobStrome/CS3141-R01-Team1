import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import CourseTable from '../scheduler-table/course-table'
import { readFileSync } from 'fs'
import path from 'path';
import { act } from 'react-dom/test-utils'

var importedData = {}
var div = null;

beforeAll(() => {
    const data = readFileSync(path.join(__dirname, '/data.test.json'))
    importedData = JSON.parse(data)
})

beforeEach(() => {
    div = document.createElement('div')
    document.body.appendChild(div)
    jest.spyOn(console, 'error').mockImplementation(() => { })

})
afterEach(() => {
    unmountComponentAtNode(div)
    div.remove()
    div = null
})

it('renders without crashing', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
});

it('correct course number is present', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    expect(div.textContent).toContain(course.crse)
});

it('correct subject is present', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    expect(div.textContent).toContain(course.subject)
});

it('correct title is present', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    expect(div.textContent).toContain(course.title)
});

it('section table not shown on initial render', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    expect(div.textContent).not.toContain("Name")
});

it('section table shown after button press', () => {
    const course = Object.values(importedData)[3]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    const expandButton = document.getElementsByTagName('button')[0]
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(div.textContent).toContain("Name")
});

it('correct section table header shown', () => {
    const course = Object.values(importedData)[3]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    const expandButton = document.getElementsByTagName('button')[0]
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(div.textContent).toContain("Name")
    expect(div.textContent).toContain("CRN")
    expect(div.textContent).toContain("Times")
    expect(div.textContent).toContain("Seats")
});

it('table displays the section data in rows under the course', () => {
    const course = Object.values(importedData)[3]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    const expandButton = document.getElementsByTagName('button')[0]
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    expect(div.textContent).toContain(course.sections[0].crn)
});

it('test the selection of a section', () => {
    const course = Object.values(importedData)[3]
    const onChange = jest.fn()

    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} onChange={onChange} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    const expandButton = document.getElementsByTagName('button')[0]
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    const row = document.getElementById("section-" + course.sections[0].crn)
    act(() => {
        row.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalled()
});

it('tests that the sections disapear when clicked twice', () => {
    const course = Object.values(importedData)[3]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <CourseTable course={course} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    const expandButton = document.getElementsByTagName('button')[0]
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(div.textContent).toContain("Name")
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(div.textContent).not.toContain("Name")

});