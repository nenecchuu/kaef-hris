import { apiClient } from "@src/helpers/api-client";

export function getAuthenticatedUser() {
  return apiClient.get("/user").then(({ data }) => data);
}

export function getUserEntryRelatedData() {
  return apiClient.get("/users/entry-related-data").then(({ data }) => data);
}

export function getDivisionOptions({ queryKey }) {
  return apiClient.get("/options/divisions").then(({ data }) =>
    data.map((division) => ({
      label: division.name,
      value: division.id.toString(),
    })),
  );
}

export function getJobPositionOptions({ queryKey }) {
  return apiClient.get("/options/job-positions").then(({ data }) =>
    data.map((division) => ({
      label: division.name,
      value: division.id.toString(),
    })),
  );
}

export function getUserOptions({ queryKey }) {
  return apiClient.get("/options/users").then(({ data }) =>
    data.map((user) => ({
      label: user.name,
      value: user.id.toString(),
    })),
  );
}
