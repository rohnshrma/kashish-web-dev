// Every success response uses { status, message, data } (+ extras such as pagination)
export const sendSuccess = (res, code, message, data = null, extra = {}) =>
  res.status(code).json({ status: "success", message, data, ...extra });

export const round2 = (n) => Math.round(n * 100) / 100;

// Read ?page= and ?limit=, falling back to defaults on bad values
export const getPagination = (query, defaultLimit = 10, maxLimit = 50) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(parseInt(query.limit, 10) || defaultLimit, 1),
    maxLimit,
  );
  return { page, limit, skip: (page - 1) * limit };
};

export const paginationMeta = (page, limit, total) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});
