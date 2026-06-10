export default function Loading() {
	return (
		<div className="fixed inset-0 flex items-center justify-center gap-4">
			<div className="h-13 w-13 animate-spin rounded-full border-8 border-gray-300 border-t-blue-600" />
			<div className="text-2xl">endless journey...</div>
		</div>
	);
}
