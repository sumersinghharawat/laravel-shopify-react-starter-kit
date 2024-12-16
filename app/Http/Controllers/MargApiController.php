<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class MargApiController extends Controller
{
    //
    public static function decrypt($data, $key) {

        // Decode the base64-encoded data
        $encryptedData = base64_decode($data);

        // Prepare the key and IV
        $keyBytes = substr($key, 0, 16); // Ensure the key is 16 bytes
        $iv = str_pad(substr($keyBytes, 0, 12), 16, "\0"); // Pad the IV to 16 bytes

        // Decrypt the data using AES-128-CBC
        $decryptedData = openssl_decrypt(
            $encryptedData,
            'AES-128-CBC',
            $keyBytes,
            OPENSSL_RAW_DATA,
            $iv
        );

        if ($decryptedData === false) {
            throw new Exception('Decryption failed.');
        }

        return $decryptedData;
    }

    public static function decompress($compressedString)
    {
        // Decode the base64-encoded compressed string
        $compressedData = base64_decode($compressedString);

        // Decompress the data
        $decompressedData = gzinflate($compressedData);

        if ($decompressedData === false) {
            throw new Exception('Decompression failed.');
        }

        $decompressedData = preg_replace('/^\xEF\xBB\xBF/', '', $decompressedData);

        return json_decode( $decompressedData);
    }
}
