// eslint-disable-next-line import/prefer-default-export
export const getBranchFromRef = (ref) => {
  const parts = ref.split('/');
  if (parts.length === 3) {
    return parts[2];
  }
  throw new Error('Not a proper github ref to fetch branch from');
};

export const isBranchPartOfBranches = (branch, branches) => {
  const hits = branches.filter((option) => branch === option);
  if (hits.length > 0) {
    return true;
  }
  return false;
};
