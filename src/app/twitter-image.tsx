import { TF_TITLE } from '@/constants/seo';
import { createOpengraphMainImageResponse, ROOT_OG_MAIN_SIZE } from '@/lib/opengraph/root-og-main-image';

export const alt = TF_TITLE;
export const size = ROOT_OG_MAIN_SIZE;
export const contentType = 'image/png';

export default async function Image() {
	return createOpengraphMainImageResponse();
}
