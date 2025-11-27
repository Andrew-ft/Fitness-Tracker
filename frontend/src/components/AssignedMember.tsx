import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberCard } from "./MemberCard";
import { UserPlus } from "lucide-react";
import type { Member } from "../type.ts";
import API from "@/lib/axios";

interface AssignedMembersProps {
  availableMembers: Member[];
  assignedMembers: Member[];
  onAssignMember: (member: Member) => void;
  onRemoveMember: (memberId: string) => void;
  onMemberClick: (memberId: string) => void;
  trainerId: string;
  isEditing?: boolean;
}

export function AssignedMembers({
  availableMembers,
  assignedMembers,
  onAssignMember,
  onRemoveMember,
  onMemberClick,
  trainerId,
  isEditing = false,
}: AssignedMembersProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [allMembers, setAllMembers] = useState<Member[]>(availableMembers);
  const [currentAssigned, setCurrentAssigned] = useState<Member[]>(assignedMembers);

  useEffect(() => {
    setCurrentAssigned(assignedMembers);
  }, [assignedMembers]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get("/admin/members");
        if (res.data.success) {
          const formattedMembers: Member[] = res.data.members.map((m: any) => ({
            id: m.memberId.toString(),
            name: m.user.userName || "",
            email: m.user.email || "",
          }));
          setAllMembers(formattedMembers);
        }
      } catch (err) {
        console.error("Failed to fetch members:", err);
      }
    };
    fetchMembers();
  }, []);

  const unassignedMembers = allMembers.filter(
    (member) => !currentAssigned.some((assigned) => assigned.id === member.id)
  );

  const handleAssignMember = async () => {
    if (!selectedMemberId || !trainerId) return;
    const memberToAssign = allMembers.find((m) => m.id === selectedMemberId);
    if (!memberToAssign) return;

    try {
      await API.put(`/admin/members/${selectedMemberId}/assign-trainer`, {
        trainerId: Number(trainerId),
      });
      setCurrentAssigned([...currentAssigned, memberToAssign]);
      onAssignMember(memberToAssign);
      setSelectedMemberId("");
    } catch (err) {
      console.error("Failed to assign member:", err);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await API.put(`/admin/members/${memberId}/assign-trainer`, { trainerId: null });
      setCurrentAssigned(currentAssigned.filter((m) => m.id !== memberId));
      onRemoveMember(memberId);
    } catch (err) {
      console.error("Failed to remove member:", err);
    }
  };

  return (
    <div className="bg-background mb-5">
      <div className="mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 md:text-xl text-lg font-bold text-foreground">
              <UserPlus className="h-5 w-5 text-primary" />
              Assigned Members ({currentAssigned.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEditing && (
              <div className="flex gap-3 items-end flex-wrap">
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Add Member
                  </label>
                  <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a member to assign..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border max-h-60 overflow-auto">
                      {unassignedMembers.length > 0 ? (
                        unassignedMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} ({member.email})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No members found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAssignMember}
                  disabled={!selectedMemberId || selectedMemberId === "none"}
                  className="bg-primary text-white"
                >
                  Assign Member
                </Button>
              </div>
            )}

            <div>
              {currentAssigned.length === 0 ? (
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
                  {currentAssigned.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      onRemove={isEditing ? () => handleRemoveMember(member.id) : undefined}
                      onClick={() => onMemberClick(member.id)}
                    />
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
