import { getTapas } from '@/lib/api';
import RecommendForm from '@/components/RecommendForm';
import type { TapasOption } from '@/components/RecommendForm';

export const revalidate = 86400; // 24시간마다 재검증

export default async function RecommendPage() {
	// 서버에서 타파스 데이터를 빌드 시 가져옴
	const tapasData = await getTapas();
	const tapasOptions: TapasOption[] = tapasData.map((t) => ({
		id: t.id,
		option: t.name,
		value: t.name,
	}));

	return (
		<div className='min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4'>
			<div className='max-w-2xl mx-auto'>
				{/* 헤더 섹션 */}
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold text-gray-800 mb-2'>AI 소믈리에 금나리</h1>
					<p className='text-xl text-gray-600'>와인 추천 서비스</p>
				</div>

				{/* 소개 카드 */}
				<div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
					<div className='text-center'>
						<p className='text-gray-700 text-lg mb-4'>
							AI 소믈리에 금나리가 취향에 맞게
							<br />
							와인을 추천해 드릴게요
						</p>
						<p className='text-gray-600 mb-4'>
							입력한 정보를 바탕으로
							<br />
							AI 소믈리에 금나리가 와인을 추천해 드려요
						</p>
						<p className='text-gray-500'>아래의 항목에서 정보를 입력해 주세요</p>
					</div>
				</div>

				{/* 클라이언트 컴포넌트 - 폼 및 상호작용 */}
				<RecommendForm initialTapasOptions={tapasOptions} />
			</div>
		</div>
	);
}
