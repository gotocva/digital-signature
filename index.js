/*
Copyright sivabharathy.in All Rights Reserved.
*/

var crypto = require('crypto');
var EC = require('elliptic').ec;

// Initialize elliptic curve using secp256k1 (commonly used in blockchain applications)
var ec = new EC('secp256k1');

/**
 * DigitalSignature class containing methods for generating wallets,
 * signing data, verifying signatures, and validating public keys.
 */
function DigitalSignature() {}

/**
 * Generate a new wallet consisting of a public and private key pair.
 * 
 * @returns {Object} - An object containing the publicKey and privateKey.
 */
DigitalSignature.prototype.generateWallet = function() {
  var privateKey = crypto.randomBytes(32).toString('hex'); // Generate a 32-byte private key
  var keyPair = ec.keyFromPrivate(privateKey); // Create key pair from private key
  var publicKey = keyPair.getPublic('hex'); // Get the corresponding public key in hexadecimal format

  return { publicKey: publicKey, privateKey: privateKey };
};

/**
 * Validate whether a given public key is valid.
 * 
 * @param {string} publicKey - The public key to validate in hexadecimal format.
 * @returns {Object} - An object containing the validity status and the public key.
 */
DigitalSignature.prototype.checkPublicKeyValid = function(publicKey) {
  try {
    var keyPair = ec.keyFromPublic(publicKey, 'hex'); // Attempt to create a key pair from the provided public key
    var isValid = keyPair.getPublic('hex') === publicKey; // Check if the public key matches the input

    return { valid: isValid, public_key: publicKey };
  } catch (error) {
    // If any error occurs, the public key is considered invalid
    return { valid: false, public_key: publicKey };
  }
};

/**
 * Sign a given piece of data using the provided private key.
 * 
 * @param {string} privateKey - The private key to sign the data with in hexadecimal format.
 * @param {string} data - The data to be signed.
 * @returns {Object} - An object containing the original data and the generated signature.
 */
DigitalSignature.prototype.signData = function(privateKey, data) {
  var keyPair = ec.keyFromPrivate(privateKey); // Create key pair from private key
  var msgHash = crypto.createHash('sha256').update(data).digest(); // Hash the data using SHA-256
  var signature = keyPair.sign(msgHash); // Sign the hashed data

  return {
    data: data,
    signature: {
      r: signature.r.toString('hex'), // Convert signature component r to hexadecimal
      s: signature.s.toString('hex')  // Convert signature component s to hexadecimal
    }
  };
};

/**
 * Verify the authenticity of a given signature using the public key and original data.
 * 
 * @param {string} publicKey - The public key to verify the signature in hexadecimal format.
 * @param {string} data - The original data that was signed.
 * @param {Object} signature - The signature object containing r and s components in hexadecimal format.
 * @returns {Object} - An object containing the data, signature, and verification status.
 */
DigitalSignature.prototype.verifySignature = function(publicKey, data, signature) {
  var keyPair = ec.keyFromPublic(publicKey, 'hex'); // Create key pair from public key
  var msgHash = crypto.createHash('sha256').update(data).digest(); // Hash the original data using SHA-256

  var isVerified = keyPair.verify(msgHash, {
    r: signature.r, // r component of the signature
    s: signature.s  // s component of the signature
  });

  return {
    data: data,
    signature: signature,
    is_verified: isVerified // Boolean indicating whether the signature is valid
  };
};

// Export the class as the default module
module.exports = DigitalSignature;
