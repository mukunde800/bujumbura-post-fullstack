export function paginate(query) {
  const page = Math.max(1, +query.page || 1);
  const limit = Math.min(50, Math.max(1, +query.limit || 10));
  return { page, limit, offset: (page - 1) * limit };
}

export function buildMeta(total, page, limit) {
  return {
    total,
    page,
    pages: Math.ceil(total / limit) || 1,
    limit,
  };
}