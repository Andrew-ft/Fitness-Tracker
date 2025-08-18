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
import { MemberCard } from "./MemberCard.tsx";
import { UserPlus } from "lucide-react";
import type { Member } from "../type.ts";

interface AssignedMembersProps {
  availableMembers: Member[];
  assignedMembers: Member[];
  onAssignMember: (member: Member) => void;
  onRemoveMember: (memberId: string) => void;
  onMemberClick: (memberId: string) => void;
  isEditing?: boolean; // new prop
}

export function AssignedMembers({
  availableMembers,
  assignedMembers,
  onAssignMember,
  onRemoveMember,
  onMemberClick,
  isEditing = false,
}: AssignedMembersProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");

  const unassignedMembers = availableMembers.filter(
    (member) => !assignedMembers.some((assigned) => assigned.id === member.id)
  );

  const handleAssignMember = () => {
    const memberToAssign = availableMembers.find(
      (m) => m.id === selectedMemberId
    );
    if (memberToAssign && isEditing) {
      onAssignMember(memberToAssign);
      setSelectedMemberId("");
    }
  };

  return (
    <div className="bg-background mb-5">
      <div className="mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 md:text-xl text-lg font-bold text-foreground">
              <UserPlus className="h-5 w-5 text-primary" />
              Assigned Members ({assignedMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Member Assignment Section */}
            {isEditing && (
              <div className="flex gap-3 items-end flex-wrap">
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Add Member
                  </label>
                  <Select
                    value={selectedMemberId}
                    onValueChange={setSelectedMemberId}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a member to assign..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {unassignedMembers.map((member) => (
                        <SelectItem
                          key={member.id}
                          value={member.id}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{member.name}</span>
                            <span className="text-muted-foreground text-sm">
                              ({member.email})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAssignMember}
                  disabled={!selectedMemberId}
                  className="bg-primary text-white"
                >
                  Assign Member
                </Button>
              </div>
            )}

            {/* Assigned Members List */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Current Members
              </h3>
              {assignedMembers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <UserPlus className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No members assigned yet</p>
                  <p className="text-sm">
                    {isEditing
                      ? "Use the dropdown above to assign members to this trainer"
                      : "Members will appear here once assigned"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {assignedMembers.map((member) => (
                    <div key={member.id}>
                      <MemberCard
                        member={member}
                        onRemove={
                          isEditing
                            ? () => onRemoveMember(member.id)
                            : undefined
                        }
                        onClick={() => onMemberClick(member.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
