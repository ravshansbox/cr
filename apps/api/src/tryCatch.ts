export const tryCatch = async <Output>(factory: () => Promise<Output>) => {
  try {
    const data = await factory();
    return { ok: true, output: data } as const;
  } catch (error) {
    return { ok: false, output: error } as const;
  }
};
