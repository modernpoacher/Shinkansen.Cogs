import React, { Component as mockComponent } from 'react'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import classnames from 'classnames'

import Title from 'shinkansen-cogs/components/title/checkbox'
import Description from 'shinkansen-cogs/components/description/checkbox'
import ErrorMessage from 'shinkansen-cogs/components/error-message/checkbox'
import Field from 'shinkansen-cogs/components/field/checkbox'

import { CheckCog } from 'shinkansen-cogs/cogs'
import Cog from 'shinkansen-cogs/cogs/checkbox'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('classnames', () => jest.fn(() => 'MOCK CLASSNAME'))

jest.mock('shinkansen-cogs/cogs', () => {
  class MockCog extends mockComponent {
    getClassName () { }

    getId () { }

    shouldComponentUpdate () { }

    renderTitle () { }

    renderDescription () { }

    renderField () { }

    render () {
      const className = this.getClassName()

      return (
        <div className={className}>
          {this.renderField()}
          {this.renderTitle()}
          {this.renderDescription()}
          {this.renderErrorMessage()}
        </div>
      )
    }
  }

  return {
    __esModule: true,
    CheckCog: class CheckCog extends MockCog { },
    default: MockCog
  }
})

jest.mock('shinkansen-cogs/components/title/checkbox')
jest.mock('shinkansen-cogs/components/description/checkbox')
jest.mock('shinkansen-cogs/components/error-message/checkbox')
jest.mock('shinkansen-cogs/components/field/checkbox')

describe('shinkansen-cogs/cogs/checkbox', () => {
  describe('<Cog />', () => {
    describe('With required props', () => {
      const component = (
        <Cog name='MOCK NAME' />
      )

      it('renders', () => {
        expect(renderer.create(component).toJSON())
          .toMatchSnapshot()
      })

      describe('`getClassName`', () => {
        it('is defined', () => {
          expect(Cog.prototype.getClassName)
            .toBeDefined()
        })
      })

      describe('`renderTitle`', () => {
        it('is defined', () => {
          expect(Cog.prototype.renderTitle)
            .toBeDefined()
        })
      })

      describe('`renderDescription`', () => {
        it('is defined', () => {
          expect(Cog.prototype.renderDescription)
            .toBeDefined()
        })
      })

      describe('`renderErrorMessage`', () => {
        it('is defined', () => {
          expect(Cog.prototype.renderErrorMessage)
            .toBeDefined()
        })
      })

      describe('`renderField`', () => {
        it('is defined', () => {
          expect(Cog.prototype.renderField)
            .toBeDefined()
        })
      })
    })

    describe('With additional props', () => {
      it('renders', () => {
        const component = (
          <Cog
            name='MOCK NAME'
            id='MOCK ID'
            title='MOCK TITLE'
            description='MOCK DESCRIPTION'
            errorMessage='MOCK ERROR MESSAGE'
            value='MOCK VALUE'
            tabIndex={1}
            accessKey='MOCK ACCESS KEY'
            required
            disabled
            readOnly
            placeholder='MOCK PLACEHOLDER'
            onChange={jest.fn()}
            onClick={jest.fn()}
          />
        )

        expect(renderer.create(component).toJSON())
          .toMatchSnapshot()
      })
    })

    describe('`getClassName()`', () => {
      let returnValue

      beforeEach(() => {
        jest.spyOn(CheckCog.prototype, 'getClassName').mockReturnValue('MOCK GETCLASSNAME')

        const component = (
          <Cog name='MOCK NAME' />
        )

        const instance = (
          shallow(component)
            .instance()
        )

        returnValue = instance.getClassName()
      })

      it('does not invoke `classnames`', () => {
        expect(classnames)
          .toBeCalledWith('MOCK GETCLASSNAME', 'checkbox')
      })

      it('returns the classname', () => {
        expect(returnValue)
          .toBe('MOCK CLASSNAME')
      })
    })

    describe('`renderTitle()`', () => {
      const component = (
        <Cog
          name='MOCK NAME'
          id='MOCK ID'
          title='MOCK TITLE'
          description='MOCK DESCRIPTION'
          errorMessage='MOCK ERROR MESSAGE'
          tabIndex={1}
          accessKey='MOCK ACCESS KEY'
          required
          disabled
          readOnly
          placeholder='MOCK PLACEHOLDER'
        />
      )

      let instance

      let getIdSpy

      beforeEach(() => {
        jest.clearAllMocks()

        instance = (
          mount(component)
            .instance()
        )

        getIdSpy = jest.spyOn(Cog.prototype, 'getId').mockReturnValue('MOCK ID')

        instance.renderTitle()
      })

      it('invokes `getId`', () => {
        expect(getIdSpy)
          .toBeCalled()
      })

      it('renders `<Title />`', () => {
        expect(Title)
          .toBeCalledWith({
            id: 'MOCK ID',
            title: 'MOCK TITLE',
            disabled: true,
            required: true,
            readOnly: true
          }, {})
      })
    })

    describe('`renderDescription()`', () => {
      const component = (
        <Cog
          name='MOCK NAME'
          id='MOCK ID'
          title='MOCK TITLE'
          description='MOCK DESCRIPTION'
          errorMessage='MOCK ERROR MESSAGE'
          tabIndex={1}
          accessKey='MOCK ACCESS KEY'
          required
          disabled
          readOnly
          placeholder='MOCK PLACEHOLDER'
        />
      )

      let instance

      beforeEach(() => {
        jest.clearAllMocks()

        instance = (
          mount(component)
            .instance()
        )

        instance.renderDescription()
      })

      it('renders `<Description />`', () => {
        expect(Description)
          .toBeCalledWith({
            description: 'MOCK DESCRIPTION'
          }, {})
      })
    })

    describe('`renderErrorMessage()`', () => {
      const component = (
        <Cog
          name='MOCK NAME'
          id='MOCK ID'
          title='MOCK TITLE'
          description='MOCK DESCRIPTION'
          errorMessage='MOCK ERROR MESSAGE'
          tabIndex={1}
          accessKey='MOCK ACCESS KEY'
          required
          disabled
          readOnly
          placeholder='MOCK PLACEHOLDER'
        />
      )

      let instance

      beforeEach(() => {
        jest.clearAllMocks()

        instance = (
          mount(component)
            .instance()
        )

        instance.renderErrorMessage()
      })

      it('renders `<ErrorMessage />`', () => {
        expect(ErrorMessage)
          .toBeCalledWith({
            errorMessage: 'MOCK ERROR MESSAGE'
          }, {})
      })
    })

    describe('`renderField()`', () => {
      const component = (
        <Cog
          name='MOCK NAME'
          id='MOCK ID'
          title='MOCK TITLE'
          description='MOCK DESCRIPTION'
          tabIndex={1}
          accessKey='MOCK ACCESS KEY'
          required
          disabled
          readOnly
          placeholder='MOCK PLACEHOLDER'
          onChange={jest.fn()}
          onClick={jest.fn()}
        />
      )

      let instance

      let getIdSpy

      beforeEach(() => {
        jest.clearAllMocks()

        instance = (
          mount(component)
            .instance()
        )

        getIdSpy = jest.spyOn(Cog.prototype, 'getId')

        instance.renderField()
      })

      it('invokes `getId`', () => {
        expect(getIdSpy)
          .toBeCalled()
      })

      it('renders `<Field />`', () => {
        expect(Field)
          .toBeCalledWith({
            name: 'MOCK NAME',
            id: 'MOCK ID',
            tabIndex: 1,
            accessKey: 'MOCK ACCESS KEY',
            required: true,
            disabled: true,
            readOnly: true,
            placeholder: 'MOCK PLACEHOLDER',
            onChange: expect.any(Function),
            onClick: expect.any(Function)
          }, {})
      })
    })
  })
})
