import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';

import Drawer from '../Drawer';

describe('Drawer', () => {
  it('Should render a drawer', () => {
    const instance = getDOMNode(
      <Drawer open>
        <p>message</p>
      </Drawer>
    );
    assert.isNotNull(instance.querySelectorAll('.rs-drawer.rs-drawer-right'));
  });

  it('Should be full', () => {
    const instance = getDOMNode(
      <Drawer full open>
        <p>message</p>
      </Drawer>
    );
    assert.isNotNull(instance.querySelectorAll('.rs-drawer.rs-drawer-full'));
  });

  it('Should have a `top` className for placement', () => {
    const instance = getDOMNode(
      <Drawer open placement="top">
        <p>message</p>
      </Drawer>
    );
    assert.isNotNull(instance.querySelectorAll('.rs-drawer-top'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Drawer className="custom" open />);
    assert.isNotNull(instance.querySelector('.rs-drawer.custom'));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Drawer style={{ fontSize }} open />);
    assert.equal(instance.querySelector('.rs-drawer').style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Drawer classPrefix="custom-prefix" open />);
    assert.isNotNull(instance.querySelector('.rs-custom-prefix'));
  });

  it('Should close the drawer when the backdrop is clicked', () => {
    const onCloseSpy = sinon.spy();
    const { getByTestId } = render(<Drawer data-testid="wrapper" open onClose={onCloseSpy} />);

    fireEvent.click(getByTestId('wrapper'));

    assert.isTrue(onCloseSpy.calledOnce);
  });

  it('Should not close the drawer when the "static" drawer is clicked', () => {
    const onCloseSpy = sinon.spy();
    const { getByTestId } = render(
      <Drawer data-testid="wrapper" open onClose={onCloseSpy} backdrop="static" />
    );

    fireEvent.click(getByTestId('wrapper'));

    assert.isFalse(onCloseSpy.calledOnce);
  });
});
