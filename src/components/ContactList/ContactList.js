/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { SelectorState } from '../../entities';

import * as React from 'react';
import classNames from 'classnames';
import SelectList from '../SelectList/SelectList';
import ContactListItem from './ContactListItem';
import styles from './ContactList.css';

export type Props = {
  className?: string,
  selector: SelectorState<PeerInfo>,
  onChange: (selector: SelectorState<PeerInfo>) => mixed,
  isRemoteSearch?: boolean,
  setQuery?: (query: string) => mixed
};

function ContactList(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <div className={styles.list}>
      <SelectList
        className={className}
        width={500}
        itemHeight={56}
        itemVisibleCount={8.5}
        selector={props.selector}
        onChange={props.onChange}
        isRemoteSearch={props.isRemoteSearch}
        setQuery={props.setQuery}
        renderItem={ContactListItem.render}
      />
    </div>
  );
}

export default ContactList;
