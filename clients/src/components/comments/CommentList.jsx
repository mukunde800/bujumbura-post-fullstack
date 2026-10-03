import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useState } from 'react';

export default function CommentList({ articleId, comments = [] }) {
  const [list, setList] = useState(comments);

  const handleNew = (c) => setList([c, ...list]);

  return (
    <section id="comments">
      <h2 className="text-2xl font-bold mb-6">Commentaires ({list.length})</h2>
      <CommentForm articleId={articleId} onSuccess={handleNew} />
      <div className="mt-8 space-y-4">
        {list.length === 0 && <p className="text-gray-500">Aucun commentaire pour le moment.</p>}
        {list.map((c) => <CommentItem key={c.id} comment={c} />)}
      </div>
    </section>
  );
}