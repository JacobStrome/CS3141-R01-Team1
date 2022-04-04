import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { readFileSync } from 'fs'
import path from 'path';
import { act } from 'react-dom/test-utils'
import SubjectTable from '../scheduler-table/subject-table';

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
                    <SubjectTable subject={course.subject} course={importedData} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
});

it('it displays the correct subject name', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <SubjectTable subject={course.subject} course={importedData} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    expect(div.textContent).toContain("EET")
});

it('does not show courses before dropdown press', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <SubjectTable subject={course.subject} course={importedData} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    expect(div.textContent).not.toContain("5311")
});

it('show courses after dropdown press', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <SubjectTable subject={course.subject} courses={Object.values(importedData)} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    const expandButton = document.getElementsByTagName('button')[0]
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(div.textContent).toContain("5311")
});

it('show courses after dropdown press', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <SubjectTable subject={course.subject} courses={Object.values(importedData)} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    const expandButton = document.getElementsByTagName('button')[0]
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(div.textContent).toContain("5311")
});

it('show header after dropdown press', () => {
    const course = Object.values(importedData)[0]
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <SubjectTable subject={course.subject} courses={Object.values(importedData)} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    const expandButton = document.getElementsByTagName('button')[0]
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(div.textContent).toContain("Course Number")
    expect(div.textContent).toContain("Course Title")
    expect(div.textContent).toContain("Credits")

});

it('show header after dropdown press', () => {
    const course = Object.values(importedData)
    const onChange = jest.fn()
    act(() => {

        const testObject = (
            <table>
                <tbody>
                    <SubjectTable subject={course.subject} courses={Object.values(importedData)} onChange={onChange} />
                </tbody>
            </table>
        )
        ReactDOM.render(testObject, div);
    })
    const expandButton = document.getElementsByTagName('button')[0]
    act(() => {
        expandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    const buttons = document.getElementsByTagName('button')
    var sectionExpandButton = {}
    Array.from(buttons).forEach((button) => {
        const label = button.getAttribute("aria-label")
        if (label === "expand section row") sectionExpandButton = button
    })
    act(() => {
        sectionExpandButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    const row = document.getElementById("section-" + course[1].sections[0].crn)
    act(() => {
        row.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalled()
});