/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { SelectorState } from '../../entities';

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ContactList from '../ContactList/ContactList';
import ContactSelectorInput from './ContactSelectorInput';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  autoFocus: boolean,
  selector: SelectorState<PeerInfo>,
  onChange: (selector: SelectorState<PeerInfo>) => mixed,
  updateRemotePeersInSelector?: (selector: SelectorState<PeerInfo>, query: string) => mixed,
  setQuery?: (query: string)=> mixed,
  query?: string,
  isRemoteSearch?: boolean
};

class ContactSelector extends PureComponent<Props> {
  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <ContactSelectorInput
          selector={this.props.selector}
          autoFocus={this.props.autoFocus}
          onChange={this.props.onChange}
          updateRemotePeersInSelector={this.props.updateRemotePeersInSelector}
          setQuery={this.props.setQuery}
          query={this.props.query}
          isRemoteSearch={this.props.isRemoteSearch}
        />
        <ContactList
          selector={this.props.selector}
          onChange={this.props.onChange}
          setQuery={this.props.setQuery}
          isRemoteSearch={this.props.isRemoteSearch}
        />
      </div>
    );
  }
}

export default ContactSelector;
