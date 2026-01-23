import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
	return (
		<div className='w-full h-[70px] bg-gray-500 flex justify-center shadow-lg'>
			<Link href='/' className='w-24 self-center'>
				<Image
					src='/images/logo_header.png'
					alt='금나리'
					width={96}
					height={24}
					className='invert'
					style={{ width: '96px', height: 'auto' }}
				/>
			</Link>
		</div>
	);
}
