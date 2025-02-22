import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import PanelGroup from '../PanelGroup';
import Panel from '../../Panel';

describe('PanelGroup', () => {
  testStandardProps(<PanelGroup />);

  it('Should render a PanelGroup', () => {
    const title = 'Test';
    const instance = getDOMNode(<PanelGroup>{title}</PanelGroup>);
    const instanceDom = instance;

    assert.equal(instanceDom.tagName, 'DIV');
    assert.ok(instanceDom.className.match(/\bpanel-group\b/));
    assert.equal(instanceDom.textContent, title);
  });

  it('Should render 2 Panels', () => {
    const instance = getDOMNode(
      <PanelGroup>
        <Panel>111</Panel>
        <Panel>222</Panel>
      </PanelGroup>
    );
    assert.equal(instance.querySelectorAll('.rs-panel').length, 2);
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      try {
        assert.equal(eventKey, 2);
        done();
      } catch (err) {
        done(err);
      }
    };
    const instance = getDOMNode(
      <PanelGroup accordion onSelect={doneOp}>
        <Panel eventKey={1} header="Click me">
          111
        </Panel>
        <Panel eventKey={2} header="Click me">
          222
        </Panel>
      </PanelGroup>
    );
    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-panel-header')[1]);
  });

  it('Should call `onSelect` with undefined when click on Panel without eventKey', () => {
    const onSelectSpy = sinon.spy();
    const { getByText } = render(
      <PanelGroup accordion onSelect={onSelectSpy}>
        <Panel header="Click me">111</Panel>
      </PanelGroup>
    );

    userEvent.click(getByText('Click me'));
    expect(onSelectSpy).to.have.been.calledWith(undefined);
  });
});
