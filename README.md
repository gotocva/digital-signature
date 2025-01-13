# @gotocva/digital-signature

A lightweight and efficient library for generating and managing digital signatures using elliptic curve cryptography (secp256k1). Perfect for blockchain and cryptographic applications.

## Installation

To install the package, use npm:

```bash
npm install @gotocva/digital-signature
```

## Usage

### Importing the Library

```javascript
const DigitalSignature = require('@gotocva/digital-signature');

// Create an instance of the DigitalSignature class
const ds = new DigitalSignature();
```

### API Methods

#### 1. `generateWallet()`

Generates a new wallet with a public and private key pair.

```javascript
const wallet = ds.generateWallet();
console.log('Public Key:', wallet.publicKey);
console.log('Private Key:', wallet.privateKey);
```

#### 2. `checkPublicKeyValid(publicKey)`

Validates whether a given public key is valid.

```javascript
const publicKey = wallet.publicKey;
const result = ds.checkPublicKeyValid(publicKey);
console.log('Is Public Key Valid:', result.valid);
```

#### 3. `signData(privateKey, data)`

Signs a piece of data using the provided private key.

```javascript
const privateKey = wallet.privateKey;
const data = 'Hello, Digital Signature!';
const signedData = ds.signData(privateKey, data);
console.log('Signed Data:', signedData);
```

#### 4. `verifySignature(publicKey, data, signature)`

Verifies the authenticity of a signature using the public key and original data.

```javascript
const isValid = ds.verifySignature(
  wallet.publicKey,
  'Hello, Digital Signature!',
  signedData.signature
);

console.log('Is Signature Valid:', isValid.is_verified);
```

## Example Workflow

```javascript
const DigitalSignature = require('@gotocva/digital-signature');
const ds = new DigitalSignature();

// Step 1: Generate a new wallet
const wallet = ds.generateWallet();
console.log('Public Key:', wallet.publicKey);
console.log('Private Key:', wallet.privateKey);

// Step 2: Sign some data
const data = 'Blockchain is amazing!';
const signedData = ds.signData(wallet.privateKey, data);
console.log('Signed Data:', signedData);

// Step 3: Verify the signature
const isVerified = ds.verifySignature(wallet.publicKey, data, signedData.signature);
console.log('Is Signature Valid:', isVerified.is_verified);
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

