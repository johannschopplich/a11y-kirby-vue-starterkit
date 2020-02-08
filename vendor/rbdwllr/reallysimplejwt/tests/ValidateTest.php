<?php

namespace Tests;

use PHPUnit\Framework\TestCase;
use ReallySimpleJWT\Validate;
use ReallySimpleJWT\Encode;
use ReallySimpleJWT\Token;

class ValidateTest extends TestCase
{
    public function testValidate()
    {
        $validate = new Validate();

        $this->assertInstanceOf(Validate::class, $validate);
    }

    public function testValidateStructure()
    {
        $token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' .
        'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvZSBCbG9ncyIsImlhdCI6MTUxNjIzOTAyMn0.' .
        '-wvw8Qad0enQkwNhG2j-GCT-7PbrMN_gtUwOKZTu54M';

        $validate = new Validate();

        $this->assertTrue($validate->structure($token));
    }

    public function testValidateStructureWithRSJWT()
    {
        $token = Token::create(1, 'foo1234He$$llo56', time() + 300, '127.0.0.1');

        $validate = new Validate();

        $this->assertTrue($validate->structure($token));
    }

    public function testValidateStructureInvalid()
    {
        $validate = new Validate();

        $this->assertFalse($validate->structure('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'));
    }

    public function testValidateExpiration()
    {
        $validate = new Validate();

        $this->assertTrue($validate->expiration(time() + 10));
    }

    public function testValidateExpirationOld()
    {
        $validate = new Validate();

        $this->assertFalse($validate->expiration(time() - 10));
    }

    public function testValidateSignature()
    {
        $validate = new Validate();
        $encode = new Encode();

        $header = json_encode(json_decode('{"alg": "HS256", "typ": "JWT"}'));
        $payload = json_encode(json_decode('{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}'));

        $signature = $encode->signature(!$header ? '' : $header, !$payload ? '' : $payload, 'foo1234He$$llo56');

        $this->assertTrue($validate->signature($signature, 'tsVs-jHudH5hV3nNZxGDBe3YRPeH871_Cjs-h23jbTI'));
    }

    public function testValidateSignatureInvalid()
    {
        $validate = new Validate();
        $encode = new Encode();

        $header = json_encode(json_decode('{"alg": "HS256", "typ": "JWT"}'));
        $payload = json_encode(json_decode('{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}'));

        $signature = $encode->signature(!$header ? '' : $header, !$payload ? '' : $payload, 'foo1234He$$llo56');

        $this->assertFalse($validate->signature($signature, 'tsVs-jHudH5hVZxGDBe3YRPeH871_Cjs-h23jbTI'));
    }

    public function testValidateSignatureInvalidTwo()
    {
        $validate = new Validate();
        $encode = new Encode();

        $header = json_encode(json_decode('{"alg": "HS256", "typ": "JWT"}'));
        $payload = json_encode(json_decode('{"sub": "1234567890", "name": "Jane Doe", "iat": 1516239022}'));

        $signature = $encode->signature(!$header ? '' : $header, !$payload ? '' : $payload, 'foo1234He$$llo56');

        $this->assertFalse($validate->signature($signature, 'tsVs-jHudH5hV3nNZxGDBe3YRPeH871_Cjs-h23jbTI'));
    }

    public function testValidateSecret()
    {
        $validate = new Validate();

        $this->assertTrue($validate->secret('Hello123$$Abc!!4538'));
    }

    public function testValidateSecretAllSpecialCharacters()
    {
        $validate = new Validate();

        $this->assertTrue($validate->secret('Hello123*&!@%^#$4538'));
    }

    public function testValidateSecretOtherSpecialCharacters()
    {
        $validate = new Validate();

        $this->assertTrue($validate->secret('Hello123*&£~!@%^#$4538'));
    }

    public function testValidateSecretInvalidLength()
    {
        $validate = new Validate();

        $this->assertFalse($validate->secret('hello'));
    }

    public function testValidateSecretInvalidNumbers()
    {
        $validate = new Validate();

        $this->assertFalse($validate->secret('helloworldfoobar'));
    }

    public function testValidateSecretInvalidUppercase()
    {
        $validate = new Validate();

        $this->assertFalse($validate->secret('helloworldfoobar123'));
    }

    public function testValidateSecretInvalidLowercase()
    {
        $validate = new Validate();

        $this->assertFalse($validate->secret('HELLOWORLDFOOBAR123'));
    }

    public function testValidateSecretSpecialCharacters()
    {
        $validate = new Validate();

        $this->assertFalse($validate->secret('HELLOworldFOOBAR123'));
    }

    public function testValidateNotBefore()
    {
        $validate = new Validate();

        $this->assertTrue($validate->notBefore(time() - 10));
    }

    public function testValidateNotFalse()
    {
        $validate = new Validate();

        $this->assertFalse($validate->notBefore(time() + 10));
    }
}
