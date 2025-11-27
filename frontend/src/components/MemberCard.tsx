import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, X } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface MemberCardProps {
  member: Member;
  onRemove?: () => void;
  onClick: () => void;
}

export function MemberCard({ member, onRemove, onClick }: MemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="relative hover:shadow-md transition-shadow cursor-pointer group">
      {onRemove && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-4 w-4 text-primary" />
        </Button>
      )}

      <CardContent onClick={onClick}>
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">
              {member.name}
            </h4>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <Mail className="h-3 w-3" />
              <span className="truncate">{member.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
