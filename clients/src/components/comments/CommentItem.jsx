import { formatDateTime } from '../../utils/formatDate';

export default function CommentItem({ comment }) {
  const name = comment.user?.name || comment.guestName || 'Anonyme';
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-gray-500">{formatDateTime(comment.createdAt)}</p>
        </div>
      </div>
      <p className="mt-3 text-gray-700 whitespace-pre-line">{comment.content}</p>
    </div>
  );
}