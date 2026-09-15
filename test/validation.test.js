import test from 'node:test';
import assert from 'node:assert/strict';

import { validateParams } from '../api/_lib/validation.js';

test('accepts a supported wallpaper request', () => {
    const url = new URL('https://example.com/generate?country=tw&type=goal&width=1179&height=2556&goal=2027-01-01&goalName=My%20Goal');
    const result = validateParams(url);

    assert.equal(result.country, 'tw');
    assert.equal(result.type, 'goal');
    assert.equal(result.goalName, 'My Goal');
});

test('rejects dimensions above the supported device envelope', () => {
    const url = new URL('https://example.com/generate?width=8000&height=8000');

    assert.throws(() => validateParams(url), /too large/i);
});

test('rejects markup in colors and impossible dates', () => {
    assert.throws(
        () => validateParams(new URL('https://example.com/generate?bg=%3Cscript%3E')),
        /hex color/i
    );
    assert.throws(
        () => validateParams(new URL('https://example.com/generate?dob=2026-02-31')),
        /date does not exist/i
    );
});

test('rejects malformed country codes and XML control characters', () => {
    assert.throws(
        () => validateParams(new URL('https://example.com/generate?country=us%0D%0A&type=year')),
        /Invalid country code/
    );
    assert.throws(
        () => validateParams(new URL('https://example.com/generate?country=us&type=goal&goalName=Build%01Now')),
        /unsupported control characters/
    );
});

test('rejects a goal start after the target date', () => {
    const url = new URL('https://example.com/generate?type=goal&goalStart=2027-02-01&goal=2027-01-01');

    assert.throws(() => validateParams(url), /on or before/i);
});
