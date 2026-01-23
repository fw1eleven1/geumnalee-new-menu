import Image from 'next/image';
import { getAllTapas } from '@/lib/api';
import type { Tapas } from '@/types';

export const revalidate = 3600; // 1시간마다 재검증

function TapasItem({ item }: { item: Tapas }) {
  return (
    <div className="flex justify-between gap-x-4 first:mt-0 my-10">
      <div className="flex-auto">
        <div className="flex flex-wrap gap-x-3">
          <p className="xs:text-lg font-bold">{item.name}</p>
          <p className="text-sm self-center">
            {item.price.toLocaleString('ko-KR')}
          </p>
        </div>
        <div className="py-4">
          <p className="w-[90%] text-sm break-keep">{item.desc}</p>
        </div>
      </div>
      <div className="flex-1 min-w-[40%] self-center">
        {item.img ? (
          <Image
            src={item.img}
            alt={item.name}
            width={200}
            height={200}
            className="w-full aspect-square object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full aspect-square bg-gray-100" />
        )}
      </div>
    </div>
  );
}

export default async function TapasPage() {
  const { main, side } = await getAllTapas();

  return (
    <div className="h-full">
      <div className="p-4">
        <div className="my-4 text-lg font-bold">TAPAS</div>
        <div>
          {main.map((item) => (
            <TapasItem key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-20 mb-4 text-lg font-bold"></div>
        <div>
          {side.map((item) => (
            <TapasItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
