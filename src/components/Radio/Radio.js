/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Context } from './RadioGroup';
import React, { PureComponent, type Element, type ChildrenArray } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Radio.css';

export type Props = {
  className?: string,
  children: ChildrenArray<Element<any>>,
  id?: string,
  value: string,
  tabIndex?: number,
  htmlAutoFocus?: boolean
};

class Radio extends PureComponent<Props> {
  context: Context;
  input: ?HTMLInputElement;

  static contextTypes = {
    radioGroup: PropTypes.object.isRequired
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    this.context.radioGroup.onChange(event.target.value, event);
  };

  setInput = (input: ?HTMLInputElement): void => {
    this.input = input;
  };

  focus(): void {
    if (this.input) {
      this.input.focus();
    }
  }

  blur(): void {
    if (this.input) {
      this.input.blur();
    }
  }

  renderChildren() {
    const { children } = this.props;
    if (!children) {
      return null;
    }

    return (
      <div className={styles.label}>
        {children}
      </div>
    );
  }

  render() {
    const { children, id, value, tabIndex, htmlAutoFocus } = this.props;
    const { radioGroup } = this.context;
    const className = classNames(styles.container, this.props.className, {
      [styles.labeled]: Boolean(children),
      [styles.disabled]: radioGroup.disabled
    });

    return (
      <label className={className} htmlFor={id}>
        <input
          className={styles.input}
          type="radio"
          id={id}
          name={radioGroup.name}
          tabIndex={tabIndex}
          value={value}
          autoFocus={htmlAutoFocus}
          checked={value === radioGroup.value}
          ref={this.setInput}
          onChange={this.handleChange}
          disabled={radioGroup.disabled}
        />
        <span className={styles.radio} />
        {this.renderChildren()}
      </label>
    );
  }
}

export default Radio;
