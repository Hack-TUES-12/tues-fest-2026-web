import { PROJECTS } from "@/app/projects/adapter";

export const TF_YEAR = 2026;

export const TF_LOCATION = 'София Тех Парк, форум "Джон Атанасов"';

export const LOCATION_EMBED_URL =
	'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.760293463949!2d23.372600275430944!3d42.66643481569168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8679286c7ed7%3A0x4a9d96383bfc10e5!2z0KTQvtGA0YPQvCAi0JTQttC-0L0g0JDRgtCw0L3QsNGB0L7QsiIgLSDQodC-0YTQuNGPINCi0LXRhSDQn9Cw0YDQug!5e0!3m2!1sbg!2sbg!4v1772905233096!5m2!1sbg!2sbg';

export const LOCATION_MAP_URL = 'https://maps.app.goo.gl/QL2866Bsw3iK9L5x8'

export const LOCATION_STREET_VIEW_URL =
	'https://www.google.com/maps/place/%D0%A4%D0%BE%D1%80%D1%83%D0%BC+%22%D0%94%D0%B6%D0%BE%D0%BD+%D0%90%D1%82%D0%B0%D0%BD%D0%B0%D1%81%D0%BE%D0%B2%22+-+%D0%A1%D0%BE%D1%84%D0%B8%D1%8F+%D0%A2%D0%B5%D1%85+%D0%9F%D0%B0%D1%80%D0%BA/@42.6664264,23.3751789,3a,75y,53.75h,80.57t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDCsYrS-wE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAFfmt2ZX4bFCAwn7rLnUa30Q3VWkQmbQgD4Febc_EH2LzhuatbdoRYGJ7JoopYPyOhQRtDzis4zIHIw3x6SHtjmKBym9s7wXAMOXq09okgf9WoCkAVgKQOe3qIAE2p8Dh6BxXuKxqNgasQ%3Dw900-h600-k-no-pi9.427445000921452-ya78.06006115792263-ro0-fo100!7i8192!8i4096!4m14!1m7!3m6!1s0x40aa8679286c7ed7:0x4a9d96383bfc10e5!2z0KTQvtGA0YPQvCAi0JTQttC-0L0g0JDRgtCw0L3QsNGB0L7QsiIgLSDQodC-0YTQuNGPINCi0LXRhSDQn9Cw0YDQug!8m2!3d42.6664309!4d23.3751752!16s%2Fg%2F11f_0t2tg9!3m5!1s0x40aa8679286c7ed7:0x4a9d96383bfc10e5!8m2!3d42.6664309!4d23.3751752!16s%2Fg%2F11f_0t2tg9?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D'

export const TF_SLOGAN = 'Where steps tell stories'

export const TF_DATE = new Date(TF_YEAR, 3, 26, 9, 0);

export const TF_YEAR_SHORT = TF_YEAR % 100;

export const TF_DATE_STRING = TF_DATE.toLocaleDateString('bg-BG', {
	day: '2-digit',
	month: 'long',
	year: 'numeric',
});

export const TF_DATE_STRING_SHORT = TF_DATE.toLocaleDateString('bg-BG', {
	day: '2-digit',
	month: 'long',
});

export const TF_TIME_STRING = TF_DATE.toLocaleTimeString('bg-BG', {
	hour: '2-digit',
	minute: '2-digit',
});

export const TF_PROJECT_COUNT = PROJECTS.length
export const TF_ROUNDED_PROJECT_COUNT = TF_PROJECT_COUNT - (TF_PROJECT_COUNT % 10)

export const TUES_FOUNDED_YEAR = 1988;
export const TUES_AGE = new Date().getFullYear() - TUES_FOUNDED_YEAR;
