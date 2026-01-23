import type { Metadata } from 'next';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
	title: 'GEUMNALEE - TAPAS BAR',
	description: 'GEUMNALEE MENU',
	openGraph: {
		title: 'GEUMNALEE - TAPAS BAR',
		description: 'GEUMNALEE MENU',
		images: ['/images/og_logo_main.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko'>
			<body className='antialiased'>
				<div className='container mx-auto min-h-screen sm:h-full md:w-[600px]'>
					<div className='flex flex-col h-full'>
						<Header />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
