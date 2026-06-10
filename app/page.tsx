import Link from 'next/link';
import Image from 'next/image';
import { getMonthlyWines } from '@/lib/api';
import MonthlyWineList from '@/components/MonthlyWineList';

export const revalidate = 86400;

export default async function HomePage() {
	const monthlyWines = await getMonthlyWines().catch(() => []);

	return (
		<div className='px-4 h-full'>
			<div className='w-4/5 mx-auto my-10'>
				<div className='flex flex-col justify-center items-center gap-2'>
					<Image
						src='/images/logo_newmain.png'
						alt='금나리'
						width={160}
						height={160}
						className='mb-12'
						style={{ width: '80px', height: 'auto' }}
						priority={true}
					/>

					{/* MENU & WINELIST Buttons */}
					<div className='flex flex-col gap-5 w-full max-w-md mb-8'>
						<Link
							href='/tapas'
							className='group relative w-full py-5 px-8 border border-gray-400 bg-white text-gray-900 transition-all duration-300 hover:border-gray-400 hover:shadow-md hover:bg-gray-50 overflow-hidden'>
							<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
							<div className='relative flex items-center justify-between'>
								<span className='text-xl font-light tracking-[0.2em] uppercase'>MENU</span>
								<span className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>→</span>
							</div>
						</Link>
						<Link
							href='/wines/conventional'
							className='group relative w-full py-5 px-8 border border-gray-400 bg-white text-gray-900 transition-all duration-300 hover:border-gray-400 hover:shadow-md hover:bg-gray-50 overflow-hidden'>
							<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
							<div className='relative flex items-center justify-between'>
								<span className='text-xl font-light tracking-[0.2em] uppercase'>WINELIST</span>
								<span className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>→</span>
							</div>
						</Link>
					</div>

					<div className='border-t border-gray-300 w-full h-1 mb-6'></div>

					<Link
						href='/recommend'
						className='group relative w-full py-5 px-8 border border-gray-400 bg-white text-gray-900 transition-all duration-300 hover:border-gray-400 hover:shadow-md hover:bg-gray-50 overflow-hidden'>
						<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
						<div className='relative flex flex-col items-center justify-center gap-1'>
							<div className='flex items-center justify-center'>
								<span className='text-xl font-light tracking-[0.2em] uppercase'>AI 소믈리에 금나리</span>
							</div>
							<span className='text-xs text-gray-500 tracking-wider'>(by ChatGPT)</span>
						</div>
					</Link>
				</div>

				<div className='mt-5'>
					<div className='mt-4 mb-6 text-center'>
						<div className='flex flex-col xs:flex-row items-center justify-center gap-2'>
							<div className='w-full xs:w-[120px]'>
								<div className='flex justify-center xs:justify-start items-center'>
									<Image
										src='/images/logo_naver.jpeg'
										alt='네이버'
										width={16}
										height={16}
										className='mr-1'
										style={{ width: '16px', height: 'auto' }}
									/>
									<span className='tracking-tighter xs:tracking-normal'>네이버 영수증</span>
								</div>
								<div className='flex justify-center xs:justify-start items-center'>
									<Image
										src='/images/logo_catchtable.png'
										alt='캐치테이블'
										width={16}
										height={16}
										className='mr-1'
										style={{ width: '16px', height: 'auto' }}
									/>
									<span>캐치테이블</span>
								</div>
							</div>
							<p className='tracking-tighter sm:tracking-normal'>리뷰 작성 시, 5천원 할인!</p>
						</div>
					</div>

					{monthlyWines.length > 0 && (
						<div className='w-full'>
							<div className='border-t border-gray-300 w-full mb-6'></div>
							<div className='my-4 text-lg font-bold'>이 달의 와인</div>
							<MonthlyWineList items={monthlyWines} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
