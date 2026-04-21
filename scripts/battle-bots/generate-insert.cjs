#!/usr/bin/env node
'use strict';

/** @type {import('xlsx')} */
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const FILE = path.join(__dirname, 'bots.xlsx');

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
	if (c < 0) return '';
	const key = `${r},${c}`;
	if (key in mergeValues) return /** @type {string} */ (mergeValues[key]);
	const cell = /** @type {import('xlsx').WorkSheet} */ (ws)[XLSX.utils.encode_cell({ r, c })];
	return cell?.v != null ? String(cell.v) : '';
}

/**
 * @param {string} header
 * @returns {number}
 */
function col(header) {
	return headers[header] ?? -1;
}

// Build header -> column index map from row 0
/** @type {Record<string, number>} */
const headers = {};
for (let c = 0; c <= range.e.c; c++) {
	const h = get(0, c).trim();
	if (h) headers[h] = c;
}

const REQUIRED_HEADERS = [
	'Име на Battle Bot',
	'Цвят',
	'Цвят за текст',
	'Име на отбор',
	'Описание на робот',
	'Слоган',
	'Оръжие',
	'Тегло (кг)',
	'Брой снимки',
	'Име на участник',
];

for (const h of REQUIRED_HEADERS) {
	if (!(h in headers)) throw new Error(`Missing header: "${h}"`);
}

/**
 * @typedef {{ name: string; teamName: string; description: string; slogan: string; weapon: string; weightKg: string; repoUrl: string | null; youtubeId: string | null; photoCount: number; color: string; textColor: string; participants: string[] }} Bot
 */

/** @type {Bot[]} */
const bots = [];

for (let r = 1; r <= range.e.r; r++) {
	const name = get(r, col('Име на Battle Bot')).trim();
	if (!name) continue;

	const participantRaw = get(r, col('Име на участник')).trim();

	const existing = bots.find((b) => b.name === name);
	if (existing) {
		if (participantRaw) existing.participants.push(participantRaw);
		continue;
	}

	const color = get(r, col('Цвят')).trim();
	const textColor = get(r, col('Цвят за текст')).trim();
	const teamName = get(r, col('Име на отбор')).trim();
	const description = get(r, col('Описание на робот')).trim();
	const slogan = get(r, col('Слоган')).trim();
	const weapon = get(r, col('Оръжие')).trim();
	const weightKg = get(r, col('Тегло (кг)')).trim();
	const repoRaw = get(r, col('Репо')).trim();
	const ytRaw = get(r, col('Youtube ID')).trim();
	const photoCountRaw = get(r, col('Брой снимки')).trim();

	bots.push({
		name,
		teamName,
		description,
		slogan,
		weapon,
		weightKg: weightKg || '0',
		repoUrl: repoRaw || null,
		youtubeId: ytRaw || null,
		photoCount: parseInt(photoCountRaw, 10) || 0,
		color,
		textColor,
		participants: participantRaw ? [participantRaw] : [],
	});
}

/** @param {string} s */
const escape = (s) => s.replace(/'/g, "''");

/** @param {string | null} s */
const sqlStr = (s) => (s === null ? 'NULL' : `'${escape(s)}'`);

const botValues = bots
	.map(
		(b) =>
			`  (${sqlStr(b.name)}, ${sqlStr(b.teamName)}, ${sqlStr(b.description)}, ${sqlStr(b.slogan)}, ${sqlStr(b.weapon)}, ${b.weightKg}, ${sqlStr(b.repoUrl)}, ${sqlStr(b.youtubeId)}, ${b.photoCount}, ${sqlStr(b.color)}, ${sqlStr(b.textColor)}, NULL, NULL, NULL)`
	)
	.join(',\n');

const participantValues = bots
	.flatMap((b) =>
		b.participants.map(
			(p) =>
				`  ((SELECT id FROM tf26_battle_bots WHERE name = ${sqlStr(b.name)}), ${sqlStr(p)})`
		)
	)
	.join(',\n');

const sql = `INSERT INTO tf26_battle_bots (name, "teamName", description, slogan, weapon, "weightKg", "repoUrl", "youtubeId", "photoCount", "primaryColor", "textColor", "quarterFinalResult", "semiFinalResult", "finalResult")
VALUES
${botValues}
ON CONFLICT (name) DO NOTHING;
${
	participantValues
		? `
INSERT INTO tf26_battle_bot_participants ("botId", "participantName")
VALUES
${participantValues}
ON CONFLICT DO NOTHING;`
		: ''
}`;

const OUT = path.join(__dirname, 'insert.sql');
fs.writeFileSync(OUT, sql, 'utf8');
console.log(`Written to ${OUT}`);
