import { clsx, type ClassValue } from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Parses a string and converts:
 * - Markdown-style bold syntax (**text**) to bold React elements
 * - URLs (http://, https://, www.) to clickable links
 */
export function parseBoldText(text: string): React.ReactNode[] {
	if (!text) {
		return [text];
	}

	const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
	const boldRegex = /\*\*(.+?)\*\*/g;

	interface Match {
		index: number;
		endIndex: number;
		type: 'url' | 'bold';
		content: string;
		displayText?: string;
	}

	const matches: Match[] = [];
	let match;

	while ((match = urlRegex.exec(text)) !== null) {
		let url = match[0];
		if (url.startsWith('www.')) url = 'https://' + url;
		matches.push({
			index: match.index,
			endIndex: match.index + match[0].length,
			type: 'url',
			content: url,
			displayText: match[0],
		});
	}

	while ((match = boldRegex.exec(text)) !== null) {
		matches.push({
			index: match.index,
			endIndex: match.index + match[0].length,
			type: 'bold',
			content: match[1] ?? '',
		});
	}

	matches.sort((a, b) => a.index - b.index);

	const filteredMatches: Match[] = [];
	for (const current of matches) {
		let overlaps = false;
		for (const existing of filteredMatches) {
			if (
				(current.index >= existing.index && current.index < existing.endIndex) ||
				(current.endIndex > existing.index && current.endIndex <= existing.endIndex) ||
				(current.index <= existing.index && current.endIndex >= existing.endIndex)
			) {
				if (current.type === existing.type || current.type === 'url') {
					overlaps = true;
					break;
				}
			}
		}
		if (!overlaps) filteredMatches.push(current);
	}

	const parseUrls = (segment: string): React.ReactNode[] => {
		if (!segment) return [];
		const urlMatchList: Array<{ index: number; endIndex: number; url: string; displayText: string }> = [];
		let urlMatch;
		const urlRegexLocal = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
		while ((urlMatch = urlRegexLocal.exec(segment)) !== null) {
			let url = urlMatch[0];
			if (url.startsWith('www.')) url = 'https://' + url;
			urlMatchList.push({ index: urlMatch.index, endIndex: urlMatch.index + urlMatch[0].length, url, displayText: urlMatch[0] });
		}
		if (urlMatchList.length === 0) return [segment];
		const parts: React.ReactNode[] = [];
		let lastIndex = 0;
		let keyCounter = 0;
		for (const um of urlMatchList) {
			if (um.index > lastIndex) parts.push(segment.slice(lastIndex, um.index));
			parts.push(
				React.createElement(
					Link,
					{ key: `url-${keyCounter++}`, href: um.url, target: '_blank', rel: 'noopener noreferrer', className: 'text-primary hover:underline break-words' },
					um.displayText
				)
			);
			lastIndex = um.endIndex;
		}
		if (lastIndex < segment.length) parts.push(segment.slice(lastIndex));
		return parts;
	};

	const parts: React.ReactNode[] = [];
	let lastIndex = 0;
	let keyCounter = 0;

	for (const m of filteredMatches) {
		if (m.index > lastIndex) parts.push(...parseUrls(text.slice(lastIndex, m.index)));
		if (m.type === 'url') {
			parts.push(
				React.createElement(
					Link,
					{ key: `url-${keyCounter++}`, href: m.content, target: '_blank', rel: 'noopener noreferrer', className: 'text-primary hover:underline break-words' },
					m.displayText || m.content
				)
			);
		} else if (m.type === 'bold') {
			parts.push(React.createElement('strong', { key: `bold-${keyCounter++}`, className: 'font-bold' }, ...parseUrls(m.content)));
		}
		lastIndex = m.endIndex;
	}

	if (lastIndex < text.length) parts.push(...parseUrls(text.slice(lastIndex)));
	if (parts.length === 0) return [text];
	return parts;
}
