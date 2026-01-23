export default function WinesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div className='h-10 flex items-center gap-4 px-4 mt-8'>
				{/* <Link
          href="/wines/conventional"
          className="text-lg py-2 underline-offset-4 text-gray-700 hover:font-bold"
        >
          CONVENTIONAL
        </Link>
        <Link
          href="/wines/natural"
          className="text-lg py-2 underline-offset-4 text-gray-700 hover:font-bold"
        >
          NATURAL
        </Link> */}
			</div>
			{children}
		</div>
	);
}
