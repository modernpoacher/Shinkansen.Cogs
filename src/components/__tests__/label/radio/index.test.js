import React, { Component as mockComponent } from 'react'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import classnames from 'classnames'

import Super from 'shinkansen-cogs/components/label'
import Label from 'shinkansen-cogs/components/label/radio'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('classnames', () => jest.fn(() => 'MOCK CLASSNAME'))

jest.mock('shinkansen-cogs/components/label', () => ({
  __esModule: true,
  default: class MockLabel extends mockComponent {
    getClassName () { }

    render () {
      const { id, children } = this.props

      return (
        <label htmlFor={id} className={this.getClassName()}>
          {children}
        </label>
      )
    }
  }
}))

describe('shinkansen-cogs/components/label/radio', () => {
  describe('<Label />', () => {
    describe('With required props', () => {
      const component = (
        <Label id='MOCK ID' />
      )

      it('renders', () => {
        expect(renderer.create(component).toJSON())
          .toMatchSnapshot()
      })

      describe('`getClassName`', () => {
        it('is defined', () => {
          expect(Label.prototype.getClassName)
            .toBeDefined()
        })
      })
    })

    describe('With additional props', () => {
      it('renders', () => {
        const component = (
          <Label
            id='MOCK ID'
            label='MOCK LABEL'
            required
            disabled
            readOnly
            onChange={jest.fn()}
          />
        )

        expect(renderer.create(component).toJSON())
          .toMatchSnapshot()
      })
    })

    describe('`getClassName()`', () => {
      let returnValue

      beforeEach(() => {
        jest.spyOn(Super.prototype, 'getClassName').mockReturnValue('MOCK GETCLASSNAME')

        const component = (
          <Label id='MOCK ID' />
        )

        const instance = (
          shallow(component)
            .instance()
        )

        returnValue = instance.getClassName()
      })

      it('invokes `classnames`', () => {
        expect(classnames)
          .toBeCalledWith('MOCK GETCLASSNAME', 'radio')
      })

      it('returns the classname', () => {
        expect(returnValue)
          .toBe('MOCK CLASSNAME')
      })
    })
  })
})
