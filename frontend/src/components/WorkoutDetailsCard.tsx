import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkoutCardProps {
  name: string;
  sets: number;
  reps: number;
  index: number;
  className?: string;
}

export function WorkoutDetailsCard({ name, sets, reps, index, className }: WorkoutCardProps) {
  return (
    <Card className={`bg-gradient-card shadow-card border-border/50 transition-all duration-300 overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="flex items-center">
          {/* Exercise Number */}
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Exercise Details */}
          <div className="flex-1 ">
            <div className="flex items-center mb-2">
              <h3 className="font-semibold text-foreground">
                {name}
              </h3>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <span className="text-sm text-muted-foreground">Sets:</span>
                <Badge variant="secondary" className="text-xs font-medium">
                  {sets}
                </Badge>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-muted-foreground">Reps:</span>
                <Badge variant="secondary" className="text-xs font-medium">
                  {reps}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex-shrink-0 p-4 text-right">
            <div className="text-xl font-bold text-primary">
              {sets}×{reps}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Total
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}