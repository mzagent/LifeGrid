import test from 'node:test';
import assert from 'node:assert/strict';

import { generateGoalCountdown } from '../api/_lib/generators/goal.js';
import { generateLifeCalendar } from '../api/_lib/generators/life.js';
import { generateYearCalendar } from '../api/_lib/generators/year.js';

const base = {
    width: 1179,
    height: 2556,
    bgColor: '000000',
    accentColor: 'FFFFFF',
    timezone: 'Asia/Taipei',
    clockHeight: 0.18
};

test('all generators return bounded SVG documents', () => {
    const outputs = [
        generateYearCalendar(base),
        generateLifeCalendar({ ...base, dob: '1990-01-01', lifespan: 80 }),
        generateGoalCountdown({
            ...base,
            goalStart: '2026-01-01',
            goalDate: '2027-01-01',
            goalName: 'Launch & Learn'
        })
    ];

    for (const svg of outputs) {
        assert.match(svg, /^<\?xml version="1\.0"/);
        assert.match(svg, /<svg[^>]+width="1179"[^>]+height="2556"/);
        assert.ok(svg.length < 1_000_000);
        assert.doesNotMatch(svg, /<script/i);
    }

    assert.match(outputs[1], /\d+\.\d{2}% lived/);
});

test('goal names are XML escaped', () => {
    const svg = generateGoalCountdown({
        ...base,
        goalDate: '2027-01-01',
        goalName: '<script>alert(1)</script>'
    });

    assert.doesNotMatch(svg, /<script>/i);
    assert.match(svg, /&lt;script&gt;/i);
});

test('goal progress renders a visible arc when tracking starts today', () => {
    const today = new Date();
    const target = new Date(today);
    target.setDate(target.getDate() + 30);
    const formatDate = date => [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0')
    ].join('-');

    const svg = generateGoalCountdown({
        ...base,
        goalStart: formatDate(today),
        goalDate: formatDate(target),
        goalName: 'Thirty days'
    });

    assert.match(svg, /<path d="M /);
});
