/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ListRowProps } from './types';
import type { SelectorState } from '../../entities';

import React, { PureComponent, type Node } from 'react';
import { List } from 'react-virtualized';
import SelectRow from './SelectRow';

export type ItemProps<T> = {
  item: T,
  hovered: boolean,
  selected: boolean,
  isScrolling: boolean
};

export type Props<T> = {
  className?: string,
  width: number,
  itemHeight: number,
  itemVisibleCount: number,
  selector: SelectorState<T>,
  onChange: (selector: SelectorState<T>) => mixed,
  renderItem: (props: ItemProps<T>) => Node,
  renderEmpty?: () => Node,
  isRemoteSearch?: boolean,
  setQuery?: (query: string) => mixed
};

class SelectList<T> extends PureComponent<Props<T>, void> {
  handleHover = (index: number): void => {
    this.props.onChange(
      this.props.selector.setHoverIndex(index)
    );
  };

  handleSelect = (index: number): void => {
    this.props.onChange(
      this.props.selector.toggleSelected(
        this.props.selector.getItem(index)
      )
    );
    if (this.props.isRemoteSearch) {
      this.props.setQuery('');
    }
  };

  renderRow = ({ index, isScrolling, key, style }: ListRowProps) => {
    const item: T = this.props.selector.getItem(index);
    const hovered = this.props.selector.getHoverIndex() === index;
    const selected = this.props.selector.isSelected(item);

    return (
      <SelectRow
        key={key}
        item={item}
        index={index}
        style={style}
        onHover={this.handleHover}
        onSelect={this.handleSelect}
      >
        {this.props.renderItem({
          item,
          hovered,
          selected,
          isScrolling
        })}
      </SelectRow>
    );
  };

  render() {
    if (!this.props.selector.getShow()) {
      return null;
    }

    return (
      <List
        className={this.props.className}
        width={this.props.width}
        height={this.props.itemVisibleCount * this.props.itemHeight}
        rowCount={this.props.selector.getItems().size}
        rowHeight={this.props.itemHeight}
        rowRenderer={this.renderRow}
        noRowsRenderer={this.props.renderEmpty}
        scrollToIndex={this.props.selector.getHoverIndex()}
        // hack shouldComponentUpdate
        _selector={this.props.selector}
      />
    );
  }
}

export default SelectList;
