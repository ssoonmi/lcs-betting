export const BEGIN_LOADING = "BEGIN_LOADING";
export const FINISH_LOADING = "FINISH_LOADING";
export const BEGIN_LOADING_TEAMS = "BEGIN_LOADING_TEAMS";
export const FINISH_LOADING_TEAMS = "FINISH_LOADING_TEAMS";

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

export const beginLoadingTeams = () => {
  return {
    type: BEGIN_LOADING_TEAMS,
  }
};

export const finishLoadingTeams = () => {
  return {
    type: FINISH_LOADING_TEAMS,
  }
};