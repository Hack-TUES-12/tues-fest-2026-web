#!/usr/bin/env node
'use strict';

/** @type {import('xlsx')} */
const XLSX = require('xlsx');
const path = require('path');

const FILE = path.join(__dirname, 'bots.xlsx');

const COL_NAME = 1;   // "Име на Battle Bot"
const COL_COLOR = 16; // "Цвят"
const COL_TEXT = 17;  // "Цвят за текст"

const wb = XLSX.readFile(FILE);
const ws = wb.Sheets[/** @type {string} */ (wb.SheetNames[0])];
if (!ws) throw new Error('Worksheet not found');
const range = XLSX.utils.decode_range(/** @type {string} */ (ws['!ref']));

/** @type {Record<string, string>} */
const mergeValues = {};

for (const merge of ws['!merges'] ?? []) {
	const topLeft = XLSX.utils.encode_cell({ r: merge.s.r, c: merge.s.c });
	const cell = ws[topLeft];
	for (let r = merge.s.r; r <= merge.e.r; r++) {
		for (let c = merge.s.c; c <= merge.e.c; c++) {
			mergeValues[`${r},${c}`] = cell ? String(cell.v) : '';
		}
	}
}

/**
 * @param {number} r
 * @param {number} c
 * @returns {string}
 */
function get(r, c) {
	const key = `${r},${c}`;
	if (key in mergeValues) return /** @type {string} */ (mergeValues[key]);
	const cell = /** @type {import('xlsx').WorkSheet} */ (ws)[XLSX.utils.encode_cell({ r, c })];
	return cell?.v != null ? String(cell.v) : '';
}

/** @type {{ name: string; color: string; textColor: string }[]} */
const bots = [];

for (let r = 1; r <= range.e.r; r++) {
	const name = get(r, COL_NAME).trim();
	const color = get(r, COL_COLOR).trim();
	const textColor = get(r, COL_TEXT).trim();

	if (!name || !color || !textColor) continue;
	if (bots.some((b) => b.name === name)) continue;

	bots.push({ name, color, textColor });
}

/** @param {string} s */
const escape = (s) => s.replace(/'/g, "''");

const values = bots
	.map((b) => `  ('${escape(b.name)}', '${escape(b.color)}', '${escape(b.textColor)}', NULL, NULL, NULL)`)
	.join(',\n');

const sql = `INSERT INTO tf26_battle_bots (name, "primaryColor", "textColor", "quarterFinalResult", "semiFinalResult", "finalResult")
VALUES
${values}
ON CONFLICT (name) DO NOTHING;`;

const fs = require('fs');
const OUT = path.join(__dirname, 'insert.sql');
fs.writeFileSync(OUT, sql, 'utf8');
console.log(`Written to ${OUT}`);
