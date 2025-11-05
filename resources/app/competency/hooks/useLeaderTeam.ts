import { useQuery } from "@tanstack/react-query";

import type { LeaderTeamData } from "@src/types/competency";

// Import mock data
import leaderTeamMock from "../../../../mock-data/leader_team.json";

export const useLeaderTeam = () => {
  return useQuery<LeaderTeamData>({
    queryKey: ["leader-team"],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return leaderTeamMock as LeaderTeamData;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
