/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { debounce } from 'lodash';
import type { PeerInfo } from '@dlghq/dialog-types';
import { LocalizationContextType } from '@dlghq/react-l10n';
import type { SelectorState } from '../../entities';
import classNames from 'classnames';
import ContactSelectorChip from './ContactSelectorChip';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  autoFocus: boolean,
  selector: SelectorState<PeerInfo>,
  onChange: (selector: SelectorState<PeerInfo>) => mixed,
  updateRemotePeersInSelector?: (selector: SelectorState<PeerInfo>, query: string) => mixed,
  setQuery?: (query: string) => mixed,
  query?: string,
  isRemoteSearch?: boolean
};

class ContactSelectorInput extends PureComponent<Props> {
  input: ?HTMLInputElement;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: Props) {
    super(props);

    this.searchRemoteContacts = debounce(this.searchRemoteContacts, 300);
  }

  componentDidMount() {
    this.autoFocus();
  }

  handleBlur = (): void => {
    this.autoFocus();
  };

  handleChange = (event: $FlowIssue): void => {
    if (this.props.isRemoteSearch) {
      const query = event.target.value;
      this.props.setQuery(query);
      this.searchRemoteContacts(query);
    } else {
      this.props.onChange(this.props.selector.setQuery(event.target.value));
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<>): void => {
    let nextSelector = this.props.selector;
    if (this.props.isRemoteSearch) {
      nextSelector = this.props.selector.setQuery(this.props.query);
    }
    this.props.onChange(nextSelector.handleKeyboardEvent(event));
  };


  getPlaceholder(): string {
    return this.context.l10n.formatText('ContactSelector.search_placeholder');
  }

  setInput = (input: ?HTMLInputElement): void => {
    this.input = input;
  };

  searchRemoteContacts = (query: string): void => {
    this.props.updateRemotePeersInSelector(this.props.selector, query);
  };

  autoFocus(): void {
    if (this.props.autoFocus && this.input) {
      this.input.focus();
    }
  }

  renderChips() {
    const selected = this.props.selector.getSelected().toArray();

    return selected.map((contact) => {
      return <ContactSelectorChip key={contact.peer.id} contact={contact} />;
    });
  }

  render() {
    const className = classNames(styles.selector, this.props.className);
    const value = this.props.isRemoteSearch ? this.props.query : this.props.selector.getQuery();

    return (
      <div className={className}>
        {this.renderChips()}
        <input
          ref={this.setInput}
          className={styles.input}
          type="text"
          id="contact_selector_input"
          value={value}
          placeholder={this.getPlaceholder()}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default ContactSelectorInput;
