export default function TopicDashboardPage(){
   return (
     <div className="space-y-6">
       <div>
         <h1 className="text-3xl font-bold tracking-tight">Topics Management</h1>
         <p className="text-muted-foreground">
           Manage and organize your learning topics
         </p>
       </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         <div className="bg-card p-6 rounded-lg border">
           <h3 className="font-semibold mb-2">Vocabulary</h3>
           <p className="text-sm text-muted-foreground">Word learning and practice</p>
         </div>
         <div className="bg-card p-6 rounded-lg border">
           <h3 className="font-semibold mb-2">Grammar</h3>
           <p className="text-sm text-muted-foreground">Language structure and rules</p>
         </div>
         <div className="bg-card p-6 rounded-lg border">
           <h3 className="font-semibold mb-2">Reading</h3>
           <p className="text-sm text-muted-foreground">Comprehension and analysis</p>
         </div>
       </div>
     </div>
   )
}