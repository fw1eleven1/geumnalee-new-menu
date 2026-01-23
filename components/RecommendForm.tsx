'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import Rating from '@/components/Rating';
import { getWines } from '@/lib/api';
import type { Wine } from '@/types';

export interface TapasOption {
	id: string;
	option: string;
	value: string;
}

interface MySelect {
	category: 'conventional' | 'natural';
	wine: string;
	body: string;
	taste: string;
	tapas?: string;
	tapas2?: string;
}

interface RecommendFormProps {
	initialTapasOptions: TapasOption[];
}

export default function RecommendForm({ initialTapasOptions }: RecommendFormProps) {
	const [myselect, setMyselect] = useState<MySelect>({
		category: 'conventional',
		wine: 'red',
		body: '풍부한 바디감',
		taste: '',
	});
	const [isError, setIsError] = useState({ status: false, msg: '' });
	const [aiResult, setAiResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [tapas, setTapas] = useState<TapasOption | null>(null);
	const [tapas2, setTapas2] = useState<TapasOption | null>(null);
	const [tapasOptions, setTapasOptions] = useState<TapasOption[]>(initialTapasOptions);
	const [tapas2Options, setTapas2Options] = useState<TapasOption[]>(initialTapasOptions);
	const [recommendWine, setRecommendWine] = useState<string[]>([]);
	const [wineList, setWineList] = useState<Wine[]>([]);
	const aiRef = useRef<HTMLDivElement>(null);

	const sendToAI = async () => {
		if (isLoading) return;

		setIsError({ status: false, msg: '' });

		if (!tapas) {
			setIsError({ status: true, msg: '곁들일 음식 한 가지를 선택해 주세요' });
			return;
		}

		const selected = {
			...myselect,
			tapas: tapas.value,
			tapas2: tapas2?.value,
		};

		const url = 'https://asia-northeast3-geumnalee.cloudfunctions.net/recommendAI/api/recommend';
		setIsLoading(true);

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(selected),
			});

			const json = await response.json();

			if (json.result === 'error') {
				alert('오류가 발생하였습니다. 다시 시도해 주세요.');
				setIsLoading(false);
				return;
			}

			const resultMessage = json.msg.replace(/[*_]{2}([^*_]+)[*_]{2}/g, '<b>$1</b>');
			setAiResult(resultMessage);

			const regex = /\*\*(.*?)\*\*/g;
			let match;
			const matches: string[] = [];
			while ((match = regex.exec(json.msg)) !== null) {
				matches.push(match[1]);
			}

			// Fetch wines from API
			const wines = await getWines(
				myselect.category,
				myselect.wine === 'red'
					? 'Red'
					: myselect.wine === 'white'
					? 'White'
					: myselect.wine === 'orange'
					? 'Orange'
					: 'Sparkling'
			);
			setWineList(wines);
			setRecommendWine(matches);
		} catch (err) {
			console.error(err);
			alert('오류가 발생하였습니다. 다시 시도해 주세요.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>, key: keyof MySelect) => {
		const value = e.target.value;
		setMyselect((prev) => {
			const updated = { ...prev, [key]: value };

			if (key === 'category') {
				if (prev.wine === 'orange' && value === 'conventional') {
					updated.wine = 'red';
				}
				if (prev.wine === 'sparkling' && value === 'natural') {
					updated.wine = 'red';
				}
			}

			return updated;
		});
	};

	const handleTapas = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = e.target.value;
		const selectTapas = tapasOptions.find((v) => v.id === selectedId);
		setTapas(selectTapas || null);
		setTapas2Options(initialTapasOptions.filter((v) => v.id !== selectedId));
	};

	const handleTapas2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = e.target.value;
		const selectTapas2 = tapas2Options.find((v) => v.id === selectedId);
		setTapas2(selectTapas2 || null);
		setTapasOptions(initialTapasOptions.filter((v) => v.id !== selectedId));
	};

	useEffect(() => {
		if (isLoading || aiResult) {
			aiRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [isLoading, aiResult]);

	const resetRecommend = () => {
		setAiResult('');
		setWineList([]);
		setRecommendWine([]);
	};

	return (
		<>
			{/* 폼 섹션 */}
			<div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
				<div className='space-y-6'>
					{/* 와인 카테고리 */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>와인 종류</label>
						<select
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors'
							onChange={(e) => handleSelect(e, 'category')}
							value={myselect.category}>
							<option value='conventional'>Conventional</option>
						</select>
					</div>

					{/* 와인 타입 */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>와인 타입</label>
						<select
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors'
							onChange={(e) => handleSelect(e, 'wine')}
							value={myselect.wine}>
							<option value='red'>레드 와인</option>
							<option value='white'>화이트 와인</option>
							{myselect.category === 'natural' && <option value='orange'>오렌지 와인</option>}
							{myselect.category === 'conventional' && <option value='sparkling'>스파클링 와인</option>}
						</select>
					</div>

					{/* 첫 번째 음식 선택 */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							곁들일 음식 <span className='text-red-500'>*</span>
						</label>
						<select
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors'
							onChange={handleTapas}
							defaultValue=''>
							<option value=''>음식을 선택해주세요</option>
							{tapasOptions.map((v) => (
								<option key={v.id} value={v.id}>
									{v.option}
								</option>
							))}
						</select>
					</div>

					{/* 두 번째 음식 선택 */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>추가 음식 (선택)</label>
						<select
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors'
							onChange={handleTapas2}
							defaultValue=''>
							<option value=''>음식을 선택해주세요</option>
							{tapas2Options.map((v) => (
								<option key={v.id} value={v.id}>
									{v.option}
								</option>
							))}
						</select>
					</div>

					{/* 바디감 */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>바디감</label>
						<select
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors'
							onChange={(e) => handleSelect(e, 'body')}
							value={myselect.body}>
							<option value='묵직한 바디감'>묵직한 바디감</option>
							<option value='적당한 바디감'>적당한 바디감</option>
							<option value='가벼운 바디감'>가벼운 바디감</option>
						</select>
					</div>

					{/* 취향 */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>취향 (선택)</label>
						<select
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors'
							onChange={(e) => handleSelect(e, 'taste')}
							value={myselect.taste}>
							<option value=''>취향을 선택해 주세요</option>
							<option value='acid'>산미가 있었으면 좋겠어요</option>
							<option value='tannin'>쌉쌀한 탄닌감이 높았으면 좋겠어요</option>
							<option value='sweet'>조금 달았으면 좋겠어요</option>
						</select>
					</div>

					{/* 에러 메시지 */}
					{isError.status && (
						<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
							<p className='text-red-600 text-sm'>{isError.msg}</p>
						</div>
					)}
				</div>
			</div>

			{/* AI 결과 섹션 */}
			{(isLoading || aiResult) && (
				<div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
					{isLoading && (
						<div className='text-center py-8'>
							<div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mb-4'></div>
							<p className='text-gray-600'>AI가 답변을 작성 중이에요...</p>
						</div>
					)}
					<div ref={aiRef}>
						{aiResult && (
							<div className='prose prose-amber max-w-none'>
								<div className='bg-amber-50 rounded-lg p-4 mb-6 whitespace-pre-line break-all'>{parse(aiResult)}</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* 추천 와인 목록 */}
			{recommendWine.length > 0 && (
				<div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
					<h3 className='text-xl font-bold text-gray-800 mb-6'>추천 와인</h3>
					<div className='space-y-8'>
						{recommendWine.map((v, i) => (
							<div key={i}>
								{wineList.map((x) => {
									if (x.engName === v.replace(/"/gi, '')) {
										return (
											<div key={x.id} className='flex gap-6 p-6 bg-gray-50 rounded-xl' id={x.name.replace(/\s/g, '%20')}>
												<div className='flex-1'>
													<div className='mb-4'>
														<h4 className='text-lg font-semibold text-gray-800 mb-1'>{x.name}</h4>
														<p className='text-gray-600 text-sm mb-2'>{x.engName}</p>
														<div className='flex items-center text-sm text-gray-500 space-x-2'>
															{x.year && <span>{x.year}</span>}
															{x.year && x.made && <span>|</span>}
															{x.made && <span>{x.made}</span>}
															{x.made && x.alc && <span>|</span>}
															{x.alc && <span>{x.alc}</span>}
														</div>
													</div>
													<div className='mb-3'>
														<p className='text-sm text-gray-600'>{x.grape}</p>
													</div>
													<div className='mb-4'>
														<p className='text-lg font-bold text-amber-600'>{x.price.toLocaleString('ko-KR')}원</p>
													</div>
													<div className='mb-4'>
														<p className='text-sm text-gray-700 leading-relaxed mb-2'>{x.desc}</p>
														<p className='text-sm text-gray-600'>{x.opinion}</p>
													</div>
													{x.rating && x.rating.length > 0 && <Rating rating={x.rating} maxRating={x.maxRating} />}
													{x.vivino && <p className='text-amber-600 mt-3 text-sm whitespace-pre-line'>{x.vivino}</p>}
												</div>
												<div className='flex-shrink-0'>
													{x.img && (
														<Image
															src={x.img}
															alt={x.name}
															width={96}
															height={200}
															className='rounded-lg object-contain'
															style={{ width: '96px', height: 'auto' }}
															unoptimized
														/>
													)}
												</div>
											</div>
										);
									}
									return null;
								})}
							</div>
						))}
					</div>
				</div>
			)}

			{/* 버튼 섹션 */}
			<div className='text-center'>
				{aiResult === '' && (
					<button
						className={`w-full max-w-md px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
							isLoading
								? 'bg-gray-300 cursor-not-allowed'
								: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
						}`}
						onClick={sendToAI}
						disabled={isLoading}>
						{isLoading ? '처리 중...' : '와인 추천 받기'}
					</button>
				)}
				{aiResult && (
					<button
						className='w-full max-w-md px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200'
						onClick={resetRecommend}>
						다시 추천받기
					</button>
				)}
			</div>
		</>
	);
}
