import { getGlassWines } from '@/lib/api';
import WineList from '@/components/WineList';
import type { Wine } from '@/types';

export const revalidate = 86400; // 24시간마다 재검증

const SECTIONS: { type: Wine['type']; title: string }[] = [
	{ type: 'Champagne', title: 'CHAMPAGNE' },
	{ type: 'Sparkling', title: 'SPARKLING WINES' },
	{ type: 'Red', title: 'RED WINES' },
	{ type: 'White', title: 'WHITE WINES' },
	{ type: 'Orange', title: 'ORANGE WINES' },
];

export default async function GlassWinesPage() {
	const items = await getGlassWines();

	// 기존 WineList 를 그대로 쓰되, 가격 자리에는 잔 가격을 보여준다
	const wines: Wine[] = items.map(({ glassPrice, wine }) => ({ ...wine, price: glassPrice }));

	if (wines.length === 0) {
		return <div className='p-4 my-10 text-center text-sm text-gray-500'>현재 준비된 글라스 와인이 없습니다.</div>;
	}

	return (
		<div>
			{SECTIONS.map(({ type, title }) => {
				const list = wines.filter((w) => w.type === type);
				if (list.length === 0) return null;
				return (
					<div key={type} className='p-4'>
						<div className='my-4 text-lg font-bold'>{title}</div>
						<WineList wines={list} priceSuffix=' / Glass (120ml)' />
					</div>
				);
			})}
		</div>
	);
}
