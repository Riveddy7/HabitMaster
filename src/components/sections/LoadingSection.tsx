
"use client";

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingSection() {
  return (
    <Card className="shadow-xl animate-fadeIn">
      <CardContent className="flex flex-col items-center justify-center space-y-6 text-center p-8 min-h-[300px]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <h2 className="text-2xl font-bold uppercase text-foreground">Analizando tu potencial...</h2>
        <p className="text-muted-foreground">
          Nuestra IA está forjando una habilidad única para ti.
        </p>
        <div className="w-full max-w-xs h-2 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse-fast-horizontal rounded-full"></div>
        </div>
        <style jsx>{`
          @keyframes pulse-fast-horizontal {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-pulse-fast-horizontal {
            animation: pulse-fast-horizontal 1.5s infinite ease-in-out;
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </CardContent>
    </Card>
  );
}
