/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import type { Certificate } from '@dlghq/dialog-types';
import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import styles from './SelectCertificateModal.css';

type Props = {
  certificates: Certificate[],
  selected: Certificate,
  onChange: (selected: Certificate) => void
};

class CertificatesList extends PureComponent<Props> {
  handleChange = (value: string) => {
    const { certificates, onChange } = this.props;

    const checked = certificates.find((cert) => cert.id === value);
    if (checked) {
      onChange(checked);
    }
  };

  render() {
    const { certificates, selected } = this.props;

    return (
      <RadioGroup
        name="select_certificate"
        value={selected.id}
        onChange={this.handleChange}
      >
        {
          certificates.map((cert, idx) => {
            return (
              <div key={cert.fingerprint}>
                <Radio
                  id={cert.id}
                  value={cert.id}
                  htmlAutoFocus={idx === 0}
                >
                  <div className={styles.label}>
                    <span>
                      {cert.name}
                    </span>
                    <span className={styles.issuer}>
                      {`(${cert.issuer})`}
                    </span>
                  </div>
                </Radio>
                <br />
              </div>
            );
          })
        }
      </RadioGroup>
    );
  }
}

export default CertificatesList;
