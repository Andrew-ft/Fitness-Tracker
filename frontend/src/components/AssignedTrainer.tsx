import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import type { Member, Trainer } from "../type.ts";
import { Link } from "react-router-dom";

interface AssignedTrainerProps {
  availableTrainers: Trainer[];
  assignedTrainer?: Trainer | null;
  onAssignTrainer?: (trainer: Trainer) => void;
  onRemoveTrainer?: () => void;
  isEditing?: boolean;
}

const role = localStorage.getItem("role") || "admin";

export function AssignedTrainer({
  availableTrainers,
  assignedTrainer,
  onAssignTrainer,
  onRemoveTrainer,
  isEditing = false,
}: AssignedTrainerProps) {
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("");

  const handleAssignTrainer = () => {
    const trainerToAssign = availableTrainers.find(
      (t) => t.id === selectedTrainerId
    );
    if (trainerToAssign && isEditing) {
      onAssignTrainer?.(trainerToAssign);
      setSelectedTrainerId("");
    }
  };

  return (
    <div className="bg-background mb-5">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
              <UserPlus className="h-5 w-5 text-primary" />
              Assigned Trainer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEditing && (
              <div className="flex flex-wrap gap-3 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Select Trainer
                  </label>
                  <Select
                    value={selectedTrainerId}
                    onValueChange={setSelectedTrainerId}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a trainer..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {availableTrainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id}>
                          {trainer.name} ({trainer.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAssignTrainer}
                  disabled={!selectedTrainerId}
                  className="bg-primary text-white"
                >
                  Assign Trainer
                </Button>
              </div>
            )}

            {/* Current Assigned Trainer */}

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Current Trainer
              </h3>
              {assignedTrainer ? (
                <div className="flex flex-wrap items-center justify-between p-3 bg-card rounded-md shadow-sm">
                  <div className="mb-3">
                    <Link
                      to={`/${role}/trainers/${assignedTrainer.id}`} // adjust route as needed
                      className="hover:underline"
                    >
                      <p className="font-semibold">{assignedTrainer.name}</p>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {assignedTrainer.email}
                    </p>
                  </div>
                  {isEditing && (
                    <Button size="sm" onClick={onRemoveTrainer}>
                      Remove
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {isEditing
                    ? "No trainer assigned. Select a trainer above to assign."
                    : "No trainer assigned yet."}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
