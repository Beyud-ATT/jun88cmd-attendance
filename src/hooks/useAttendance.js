import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import { getParticipationDate } from "../services/api_service";

export default function useAttendance() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: attendance,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["attendance"],
    queryFn: getParticipationDate,
  });

  if (isError) {
    enqueueSnackbar(error.message, { variant: "error" });
  }

  return { attendance, isLoading };
}
