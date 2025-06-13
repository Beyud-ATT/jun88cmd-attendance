import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitAttendance } from "../services/api_service";
import { enqueueSnackbar } from "notistack";

export default function useSubmitAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitAttendance,
    onSuccess: (data) => {
      console.log("điểm danh thành công", data);
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
      enqueueSnackbar("Điểm danh thành công", { variant: "success" });
    },
    onError: (error) => {
      console.log("điểm danh thất bại", error);
      enqueueSnackbar(error?.response?.data?.message || "Điểm danh thất bại", {
        variant: "error",
      });
    },
  });
}
