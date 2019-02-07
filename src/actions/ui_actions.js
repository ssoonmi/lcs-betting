export const BEGIN_LOADING = "BEGIN_LOADING";
export const FINISH_LOADING = "FINISH_LOADING";

export const beginLoading = () => {
  return {
    type: BEGIN_LOADING,
  }
};

export const finishLoading = () => {
  return {
    type: FINISH_LOADING,
  }
};