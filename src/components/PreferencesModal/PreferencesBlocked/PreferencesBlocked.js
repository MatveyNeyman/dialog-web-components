/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import { filterByQuery, type Field } from '@dlghq/dialog-utils';
import Fieldset from '../../Fieldset/Fieldset';
import SearchInput from './SearchInput';
import BlockedUser from './BlockedUser';
import Spinner from '../../Spinner/Spinner';
import preferencesStyles from '../PreferencesModal.css';
import styles from './Blocked.css';

export type Props = {
  blocked: Field<?Array<User>>,
  onBlockedLoad: () => mixed,
  onUnblockUser: (id: number) => mixed,
};

export type State = {
  query: string,
};

class PreferencesBlocked extends PureComponent<Props, State> {
  static contextTypes = {
    l10n: LocalizationContextType,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    this.props.onBlockedLoad();
  }

  handleQueryChange = (query: string): void => {
    this.setState({ query });
  };

  renderSearchInput() {
    const { blocked } = this.props;
    const { l10n } = this.context;

    if (!blocked.value || (blocked.value && !blocked.value.length)) {
      return null;
    }

    return (
      <SearchInput
        onChange={this.handleQueryChange}
        placeholder={l10n.formatText(
          'PreferencesModal.blocked.search_placeholder',
        )}
      />
    );
  }

  renderBlockedUsers(): Node {
    const { blocked } = this.props;
    const { query } = this.state;

    if (!blocked.value) {
      return null;
    }

    if (!blocked.value.length) {
      return [
        <Text
          key="empty"
          id="PreferencesModal.blocked.empty"
          className={styles.empty}
          tagName="div"
        />,
      ];
    }

    const filtered = filterByQuery(query, blocked.value, (user) => user.name);

    if (!filtered.length) {
      return [
        <Text
          key="not_found"
          id="PreferencesModal.blocked.not_found"
          className={styles.notFound}
          tagName="div"
        />,
      ];
    }

    return filtered.map((user) => {
      return (
        <BlockedUser
          key={user.id}
          user={user}
          onUnblockUser={this.props.onUnblockUser}
        />
      );
    });
  }

  render() {
    if (this.props.blocked.pending) {
      return (
        <div className={preferencesStyles.spinnerScreen}>
          <Spinner size="large" />
        </div>
      );
    }

    return (
      <div className={preferencesStyles.screen}>
        <Fieldset legend="PreferencesModal.blocked.legend">
          {this.renderSearchInput()}
          {this.renderBlockedUsers()}
        </Fieldset>
      </div>
    );
  }
}

export default PreferencesBlocked;
