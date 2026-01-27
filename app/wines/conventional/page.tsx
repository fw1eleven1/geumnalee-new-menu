import { getAllConventionalWines } from '@/lib/api';
import WineList from '@/components/WineList';

export const revalidate = 86400; // 24시간마다 재검증

export default async function ConventionalWinesPage() {
	const { champagne, sparkling, red, white } = await getAllConventionalWines();

	return (
		<div>
			{/* Champagne */}
			{champagne.length > 0 && (
				<div className='p-4'>
					<div className='my-4 text-lg font-bold'>CHAMPAGNE</div>
					<WineList wines={champagne} />
				</div>
			)}

			{/* Sparkling */}
			{sparkling.length > 0 && (
				<div className='p-4'>
					<div className='my-4 text-lg font-bold'>SPARKLING WINES</div>
					<WineList wines={sparkling} />
				</div>
			)}

			{/* Red */}
			{red.length > 0 && (
				<div className='p-4'>
					<div className='my-4 text-lg font-bold'>RED WINES</div>
					<WineList wines={red} />
				</div>
			)}

			{/* White */}
			{white.length > 0 && (
				<div className='p-4'>
					<div className='my-4 text-lg font-bold'>WHITE WINES</div>
					<WineList wines={white} />
				</div>
			)}
		</div>
	);
}
