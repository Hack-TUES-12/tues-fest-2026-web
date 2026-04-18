import {
	Body,
	Column,
	Container,
	Font,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text,
} from '@react-email/components';

import { Duration } from 'effect';

import { TF_YEAR } from '@/constants/event';
import { TF_TITLE } from '@/constants/seo';
import { VOTE_VERIFICATION_CODE_EXPIRATION_DURATION } from '@/constants/voting';

interface VerificationEmailProps {
	verificationCode: string;
	verificationCodeExpiresAt: Date;
	email: string;
	name: string;
	verificationCodeExpiryMinutes: number;
}

const baseUrl =
	"https://tuesfest.bg"

export default function VerificationCodeEmail({
	verificationCode,
	email,
	name,
	verificationCodeExpiryMinutes,
}: VerificationEmailProps) {
	const digits = verificationCode.split('');

	return (
		<Html lang="bg">
			<Head>
				<Font
					fontFamily="PT Sans"
					fallbackFontFamily="sans-serif"
					webFont={{
						url: 'https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79P0WOxOGMMDQ.woff2',
						format: 'woff2',
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
				<Font
					fontFamily="PT Sans"
					fallbackFontFamily="sans-serif"
					webFont={{
						url: 'https://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh0O6tLR8a8zI.woff2',
						format: 'woff2',
					}}
					fontWeight={700}
					fontStyle="normal"
				/>
			</Head>

			<Preview>
				Вашият код: {verificationCode} — {TF_TITLE}
			</Preview>

			<Body style={body}>
				<Container style={wrapper}>
					{/* ── Header ────────────────────────────────────────── */}
					<Section style={header}>
						<Row>
							<Column align="center">
								<Img
									src={`${baseUrl}/logo/motto.png`}
									width={460}
									height={191}
									alt={`Логото на ${TF_TITLE}`}
									style={logo}
								/>
							</Column>
						</Row>
					</Section>

					{/* ── Card ──────────────────────────────────────────── */}
					<Container style={card}>
						{/* Pink accent stripe */}
						<Section style={stripe} />

						<Section style={cardBody}>
							{/* Section label */}
							<Text style={label}>ЛЮБИМЕЦ НА ПУБЛИКАТА — TUES FEST {TF_YEAR}</Text>

							{/* Greeting */}
							<Heading style={heading}>Здравейте, {name}!</Heading>

							<Text style={bodyText}>
								Започнахте процеса по гласуване за наградата „Избор на публиката" на {TF_TITLE}. За да
								потвърдите вашия глас, моля въведете следния код в уебсайта:
							</Text>

							{/* ── OTP box ───────────────────────────────── */}
							<Section style={codeBox}>
								<Text style={codeLabel}>КОД ЗА ПОТВЪРЖДЕНИЕ</Text>

								{/* All digits in one Text so they copy as a single string */}
								<Text style={digitsContainer}>
									{digits.map((digit, i) => (
										<span key={i} style={digitSpan}>{digit}</span>
									))}
								</Text>

								<Text style={validity}>
									Валиден {verificationCodeExpiryMinutes} минути
								</Text>
							</Section>

							<Text style={bodyText}>
								Ако не сте започнали процеса по гласуване, можете спокойно да игнорирате това
								съобщение.
							</Text>

							<Text style={signature}>
								Поздрави,
								<br />
								<span style={sigName}>Екипът на {TF_TITLE}</span>
							</Text>
						</Section>

						{/* ── Footer ────────────────────────────────────── */}
						<Hr style={divider} />
						<Section style={footerSection}>
							<Text style={footerText}>
								Този имейл е изпратен до {email}, защото някой въведе този адрес в процеса по
								гласуване в {TF_TITLE}. Ако не сте вие, можете спокойно да го игнорирате.
							</Text>
						</Section>
					</Container>

				</Container>
			</Body>
		</Html>
	);
}

VerificationCodeEmail.PreviewProps = {
	verificationCode: '596853',
	verificationCodeExpiresAt: new Date(Date.now() + Duration.toMillis(VOTE_VERIFICATION_CODE_EXPIRATION_DURATION)),
	email: 'test@test.com',
	name: 'Иван Иванов',
	verificationCodeExpiryMinutes: 10,
} satisfies VerificationEmailProps;

// ─── Styles ───────────────────────────────────────────────────────────────────

const sans =
	"'PT Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";
const mono = "'PT Mono', 'Courier New', Courier, monospace";

const body = {
	backgroundColor: '#000000',
	fontFamily: sans,
	padding: '32px 0 48px',
};

const wrapper = {
	maxWidth: '580px',
	margin: '0 auto',
};

// Header (logo area, outside the card)
const header = {
	marginBottom: '48px',
};

const logo = {
	display: 'block',
	maxWidth: '100%',
};


// Card
const card = {
	backgroundColor: '#0f0f0f',
	border: '1px solid #1c1c1c',
	borderRadius: '12px',
	overflow: 'hidden' as const,
};

const stripe = {
	height: '4px',
	backgroundColor: '#c93b70',
	background: 'linear-gradient(90deg, #c93b70 0%, #8d1c5c 100%)',
	margin: '0',
	padding: '0',
};

const cardBody = {
	padding: '32px 40px 28px',
};

const label = {
	fontFamily: sans,
	fontSize: '11px',
	fontWeight: '700',
	letterSpacing: '0.12em',
	color: '#c93b70',
	textTransform: 'uppercase' as const,
	margin: '0 0 12px',
};

const heading = {
	fontFamily: sans,
	fontSize: '26px',
	fontWeight: '700',
	color: '#ffffff',
	margin: '0 0 20px',
	lineHeight: '1.25',
};

const bodyText = {
	fontFamily: sans,
	fontSize: '15px',
	lineHeight: '1.65',
	color: '#8a8a8a',
	margin: '0 0 20px',
};

// OTP box
const codeBox = {
	backgroundColor: '#080808',
	border: '1px solid #1c1c1c',
	borderRadius: '10px',
	margin: '8px 0 24px',
	padding: '0 0 20px',
	overflow: 'hidden' as const,
};

const codeLabel = {
	fontFamily: sans,
	fontSize: '10px',
	fontWeight: '700',
	letterSpacing: '0.14em',
	color: '#444444',
	textAlign: 'center' as const,
	margin: '18px 0 14px',
	padding: '0',
	textTransform: 'uppercase' as const,
};

const digitsContainer = {
	textAlign: 'center' as const,
	margin: '0',
	padding: '4px 24px 0',
	lineHeight: '1',
};

const digitSpan = {
	fontFamily: mono,
	fontSize: '36px',
	fontWeight: '700',
	color: '#ffffff',
	backgroundColor: '#161616',
	border: '1px solid #2a2a2a',
	borderRadius: '8px',
	display: 'inline-block' as const,
	width: '44px',
	textAlign: 'center' as const,
	padding: '10px 0',
	margin: '0 3px',
	lineHeight: '1',
};

const validity = {
	fontFamily: sans,
	fontSize: '11px',
	color: '#3d3d3d',
	textAlign: 'center' as const,
	margin: '12px 0 0',
	padding: '0',
};

const signature = {
	fontFamily: sans,
	fontSize: '15px',
	lineHeight: '1.65',
	color: '#8a8a8a',
	margin: '8px 0 0',
};

const sigName = {
	color: '#d4d4d4',
	fontWeight: '700',
};

const divider = {
	borderColor: '#1c1c1c',
	margin: '0',
};

const footerSection = {
	padding: '16px 40px',
};

const footerText = {
	fontFamily: sans,
	fontSize: '11px',
	lineHeight: '1.55',
	color: '#3a3a3a',
	textAlign: 'center' as const,
	margin: '0',
};
