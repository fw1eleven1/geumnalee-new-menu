import Image from 'next/image';
import Rating from './Rating';
import type { MonthlyWineItem } from '@/types';

interface MonthlyWineListProps {
	items: MonthlyWineItem[];
}

export default function MonthlyWineList({ items }: MonthlyWineListProps) {
	return (
		<div>
			{items.map(({ id, discountRate, discountedPrice, wine: v }) => (
				<div
					key={id}
					className='flex justify-between gap-x-1 xs:gap-x-2 first:mt-0 my-10'
					id={v.name.replace(/\s/g, '%20')}>
					<div className='basis-auto'>
						<div className='mt-4'>
							<div className='flex'>
								<p className='sm:pr-2 text-sm break-keep whitespace-pre-line'>{v.name}</p>
							</div>
							<div>
								<p className='sm:pr-2 text-sm break-keep'>{v.engName}</p>
							</div>
							<div className='flex leading-3 sm:leading-none sm:items-center'>
								{v.year && (
									<>
										<p className='pr-2 text-sm'>{v.year}</p>
										<div className='leading-none self-center'>|</div>
									</>
								)}
								{v.made && (
									<>
										<p className='px-2 text-sm'>{v.made}</p>
										<div className='leading-none self-center'>|</div>
									</>
								)}
							</div>
						</div>
						<div>
							<p className='text-xs'>{v.grape}</p>
						</div>
						<div className='flex items-baseline gap-2 mt-2'>
							<p className='text-xs font-bold'>{discountedPrice.toLocaleString('ko-KR')}</p>
							{discountRate > 0 && (
								<>
									<p className='text-xs text-gray-400 line-through'>{v.price.toLocaleString('ko-KR')}</p>
									<span className='text-xs font-bold text-red-500'>{discountRate}%</span>
								</>
							)}
						</div>
						<div className='my-2'>
							<p className='text-sm tracking-tighter break-keep w-[90%]'>{v.desc}</p>
							<p className='text-sm tracking-tighter'>{v.opinion}</p>
						</div>
						{v.rating && v.rating.length > 0 && <Rating rating={v.rating} maxRating={v.maxRating} />}
						{v.vivino && <p className='text-orange-600 mt-2 text-sm whitespace-pre-line'>{v.vivino}</p>}
					</div>
					<div className='basis-[70px] min-w-20 self-center'>
						{v.img && (
							<Image
								src={v.img}
								alt={v.name}
								width={70}
								height={200}
								className='w-full ml-auto object-contain'
								style={{ height: 'auto' }}
								unoptimized
							/>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
