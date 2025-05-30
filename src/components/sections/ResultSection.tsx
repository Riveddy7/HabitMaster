
"use client";

import type { GenerateSkillOutput } from "@/ai/flows/generate-skill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ExternalLink, RefreshCw } from "lucide-react";

interface ResultSectionProps {
  skillData: GenerateSkillOutput;
  onRestart: () => void;
}

export function ResultSection({ skillData, onRestart }: ResultSectionProps) {
  return (
    <section aria-labelledby="result-title" className="space-y-8 animate-fadeInUp">
      <Card className="bg-card text-card-foreground border-primary border-2 shadow-xl rounded-none overflow-hidden">
        <CardHeader className="bg-primary/10 p-6">
          <CardTitle id="result-title" className="text-3xl font-bold uppercase text-primary text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            {skillData.skillName}
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground mt-1">
            ¡Tu nueva habilidad ha sido forjada!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3 uppercase">Primeros Pasos:</h3>
            <ul className="space-y-3">
              {skillData.habits.map((habit, index) => (
                <li key={index} className="flex items-start p-3 bg-input rounded-none shadow">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <span className="text-foreground">{habit}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-lg font-semibold text-accent">
            ¡Buen Comienzo, Héroe!
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card text-card-foreground border-border shadow-lg rounded-none">
        <CardContent className="p-6 space-y-4 text-center">
          <h2 className="text-2xl font-bold uppercase text-primary">¡Esto es solo el Comienzo de tu Aventura!</h2>
          <p className="text-muted-foreground">
            Regístrate GRATIS en <strong className="text-accent">LifeQuest RPG</strong> para:
          </p>
          <ul className="space-y-1 text-left text-foreground list-inside list-disc marker:text-primary">
            <li>Desbloquear el Quiz Completo y recibir 5 Skills personalizadas.</li>
            <li>Rastrear tu progreso en estas y otras habilidades.</li>
            <li>Ganar XP, subir de nivel y personalizar tu Héroe.</li>
            <li>¡Convertir tu vida real en un RPG épico!</li>
          </ul>
          <Button
            asChild
            className="p5r-button w-full md:w-auto mt-4"
          >
            <a href="https://firebase.google.com/products/app-hosting" target="_blank" rel="noopener noreferrer"> {/* Placeholder Link */}
              <span className="p5r-button-inner flex items-center">
                ¡Comenzar mi LifeQuest Ahora! <ExternalLink className="ml-2 h-4 w-4" />
              </span>
            </a>
          </Button>
           <p className="text-xs text-muted-foreground mt-4">
            <a href="https://firebase.google.com/docs/app-hosting" target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">
              ¿Quieres saber más sobre LifeQuest RPG?
            </a>
          </p>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
            onClick={onRestart}
            variant="outline"
            className="p5r-button-secondary w-full md:w-auto"
          >
           <span className="p5r-button-inner flex items-center">
             <RefreshCw className="mr-2 h-4 w-4" /> Forjar Otra Skill
            </span>
        </Button>
      </div>
       <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
