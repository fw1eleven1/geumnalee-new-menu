import { getAllNaturalWines } from '@/lib/api';
import WineList from '@/components/WineList';

export const revalidate = 86400; // 24시간마다 재검증

export default async function NaturalWinesPage() {
	const { red, orange, white } = await getAllNaturalWines();

	return (
		<div>
			{/* Red */}
			{red.length > 0 && (
				<div className='p-4'>
					<div className='my-4 text-lg font-bold'>RED</div>
					<WineList wines={red} />
				</div>
			)}

			{/* Orange */}
			{orange.length > 0 && (
				<div className='p-4'>
					<div className='my-4 text-lg font-bold'>ORANGE</div>
					<WineList wines={orange} />
				</div>
			)}

			{/* White */}
			{white.length > 0 && (
				<div className='p-4'>
					<div className='my-4 text-lg font-bold'>WHITE</div>
					<WineList wines={white} />
				</div>
			)}
		</div>
	);
}
