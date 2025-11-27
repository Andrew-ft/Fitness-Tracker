// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Mail, Phone, Calendar } from "lucide-react";

// interface TrainerProfileProps {
//   trainer: {
//     id: string;
//     fullName: string;
//     email: string;
//     phone: string;
//     dob: string;
//     lastLogin: string;
//     gender: string;
//     bio: string;
//     certificate: string;
//     specialization: string;
//     experienceYears: number;
//     clientTypes: string;
//     clientsAssigned: number;
//     routinesCreated: number;
//     specialties: string[];
//     avatar?: string;
//   };
// }

// export function TrainerDetails({ trainer }: TrainerProfileProps) {
//   const initials = trainer.fullName.split(' ').map(n => n[0]).join('').toUpperCase();

//   return (
//     <Card className="w-full">
//       <CardHeader className="pb-4">
//         <CardTitle className="text-xl font-bold text-foreground">Trainer Profile</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="flex items-start space-x-4">
//           <Avatar className="h-20 w-20">
//             <AvatarImage src={trainer.avatar} alt={trainer.fullName} />
//             <AvatarFallback className="bg-fitness-primary text-white text-lg font-semibold">
//               {initials}
//             </AvatarFallback>
//           </Avatar>
//           <div className="flex-1 space-y-2">
//             <h2 className="text-xl font-bold text-foreground">{trainer.fullName}</h2>
//             <div className="flex items-center space-x-2 text-muted-foreground">
//               <Mail className="h-4 w-4" />
//               <span>{trainer.email}</span>
//             </div>
//             <div className="flex items-center space-x-2 text-muted-foreground">
//               <Phone className="h-4 w-4" />
//               <span>{trainer.phone}</span>
//             </div>
//             <div className="flex items-center space-x-2 text-muted-foreground">
//               <Calendar className="h-4 w-4" />
//               <span>{trainer.experienceYears}+ years experience</span>
//             </div>
//           </div>
//         </div>

//         {trainer.bio && (
//           <div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">Bio</h3>
//             <p className="text-muted-foreground">{trainer.bio}</p>
//           </div>
//         )}
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
//             <div className="space-y-2 text-sm">
//               <p><span className="font-medium">Gender:</span> <span className="capitalize text-muted-foreground">{trainer.gender}</span></p>
//               <p><span className="font-medium">Date of Birth:</span> <span className="text-muted-foreground">{trainer.dob}</span></p>
//               <p><span className="font-medium">Last Login:</span> <span className="text-muted-foreground">{trainer.lastLogin}</span></p>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">Professional Details</h3>
//             <div className="space-y-2 text-sm">
//               <p><span className="font-medium">Specialization:</span> <span className="text-muted-foreground">{trainer.specialization}</span></p>
//               <p><span className="font-medium">Client Types:</span> <span className="text-muted-foreground">{trainer.clientTypes}</span></p>
//               <p><span className="font-medium">Clients Assigned:</span> <span className="text-muted-foreground">{trainer.clientsAssigned}</span></p>
//               <p><span className="font-medium">Routines Created:</span> <span className="text-muted-foreground">{trainer.routinesCreated}</span></p>
//             </div>
//           </div>
//         </div>
        
//         <div>
//           <h3 className="text-lg font-semibold text-foreground mb-3">Areas of Expertise</h3>
//           <div className="flex flex-wrap gap-2">
//             {trainer.specialties.map((specialty, index) => (
//               <Badge key={index} variant="secondary" className="bg-fitness-secondary/20 text-fitness-secondary border-fitness-secondary/30">
//                 {specialty}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }