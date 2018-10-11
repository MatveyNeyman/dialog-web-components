```jsx
const initial = {
  isOpen: false,
  certificates: [
    {
      id: '0',
      name: 'Ivanov-AA',
      issuer: 'Trusted CA',
      fingerprint: '37A10135E4AA1001358A86276EE72382B21EF12C'
    },
    {
      id: '1',
      name: 'Petrov M. D.',
      issuer: 'Dialog CA',
      fingerprint: '37A10135E4AA1001358A86276EE72382B21EF12W'
    },
    {
      id: '2',
      name: 'Mr. Smith',
      issuer: 'Silicon Valley',
      fingerprint: '37A10135E4AA1001358A86276EE72382B21EF12E'
    },
    {
      id: '3',
      name: 'Ivanov-AA',
      issuer: 'Selfsigned',
      fingerprint: '37A10135E4AA1001358A86276EE72382B21EF12R'
    },
  ]
};
initialState = initial;

const handleClose = () => setState(initial);
const handleOpen = () => setState({ isOpen: true });
const handleConfirm = (selectedCert) => {
  console.debug(selectedCert);
  setState(initial);
};

<div>
  <Button theme="primary" onClick={handleOpen}>Select Certificate</Button>
  {
    state.isOpen ? (
      <SelectCertificateModal
        certificates={state.certificates}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    ) : null
  }
</div>
```
