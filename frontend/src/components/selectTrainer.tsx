import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import API from "@/lib/axios";

interface SelectTrainerProps {
  value?: string;
  onValueChange?: (val: string) => void;
  disabled?: boolean;
  error?: string;
}

interface Trainer {
  trainerId: number;
  user: {
    userName: string;
  };
}

export function SelectTrainer({
  value,
  onValueChange,
  disabled,
  error,
}: SelectTrainerProps) {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/trainers");
      console.log("Fetched trainers:", res.data);
      setTrainers(Array.isArray(res.data.trainers) ? res.data.trainers : []);
    } catch (err) {
      console.error("Failed to fetch trainers", err);
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  fetchTrainers();
}, []);


  return (
    <div>
<Select
  disabled={disabled || loading}
  value={value || undefined}
  onValueChange={onValueChange}
>
  <SelectTrigger className="md:w-4/5 w-full">
    <SelectValue placeholder={loading ? "Loading..." : "Select Trainer"} />
  </SelectTrigger>

  <SelectContent>
    <SelectGroup>
      <SelectLabel>Select Trainer</SelectLabel>
      {trainers.length > 0 ? (
        trainers
          .filter((t) => t.trainerId !== undefined && t.trainerId !== null)
          .map((trainer) => (
            <SelectItem key={trainer.trainerId} value={trainer.trainerId.toString()}>
              {trainer.user.userName || "Unnamed Trainer"}
            </SelectItem>
          ))
      ) : (
        <SelectItem value="0" disabled>
          No trainers available
        </SelectItem>
      )}
    </SelectGroup>
  </SelectContent>
</Select>


      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
