/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import type { Certificate } from '@dlghq/dialog-types';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Button from '../Button/Button';
import CertificatesList from './CertificatesList';
import styles from './SelectCertificateModal.css';

type Props = {
  certificates: Certificate[],
  onClose: () => void,
  onConfirm: (selected: Certificate) => void,
  className?: string
};

type State = {
  selected: Certificate
};

class SelectCertificateModal extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selected: this.props.certificates[0]
    };
  }

  handleChange = (selected: Certificate) => {
    this.setState({ selected });
  };

  handleConfirm = (event: ?SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }

    this.props.onConfirm(this.state.selected);
  };

  render() {
    const { certificates, onClose } = this.props;
    const className = classNames(styles.container, this.props.className);

    if (certificates.length) {
      return (
        <Modal
          shouldCloseOnOverlayClick={false}
          className={className}
          onClose={onClose}
        >
          <ModalHeader className={styles.header} withBorder>
            <Text id="SelectCertificateModal.title" />
            <ModalClose onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <CertificatesList
              certificates={certificates}
              selected={this.state.selected}
              onChange={this.handleChange}
            />
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button
              wide
              type="submit"
              theme="success"
              rounded={false}
              onClick={this.handleConfirm}
            >
              <Text id="SelectCertificateModal.confirm" />
            </Button>
          </ModalFooter>
        </Modal>
      );
    }

    return null;
  }
}

export default SelectCertificateModal;
