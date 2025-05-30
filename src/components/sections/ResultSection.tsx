
"use client";

import type { GenerateSkillOutput } from "@/ai/flows/generate-skill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ExternalLink, RefreshCw, Sparkles, ShieldCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultSectionProps {
  skillData: GenerateSkillOutput;
  onRestart: () => void;
}

export function ResultSection({ skillData, onRestart }: ResultSectionProps) {
  const { skillName, skillDescription, habits } = skillData;

  return (
    <section aria-labelledby="result-title-outer" className="space-y-8 animate-fadeInUp">
      {/* Skill Card - Red Background */}
      <Card className="bg-primary text-primary-foreground border-red-700/80 shadow-xl overflow-hidden">
        <CardHeader className="p-6 text-center">
          <div className="flex justify-center mb-3">
            <Sparkles className="h-10 w-10 text-amber-300 animate-pulse" />
          </div>
          <CardTitle id="result-title-outer" className="text-3xl md:text-4xl font-bold uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
            {skillName}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2 text-center">
          <p className="text-lg md:text-xl text-primary-foreground/90">{skillDescription}</p>
        </CardContent>
      </Card>

      {/* Habits Card */}
      <Card className="text-card-foreground border-border shadow-lg">
        <CardHeader className="bg-card/50 p-6 rounded-t-lg">
          <CardTitle className="text-2xl font-semibold text-primary text-center uppercase">
            Entrenamiento Diario
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground mt-1">
            Completa estas misiones para dominar tu nueva habilidad:
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-4">
          {habits.map((habit, index) => (
            <Card key={index} className="bg-input shadow-md border-border hover:border-accent transition-all">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2 pb-2 pt-4 px-4">
                <div className="flex items-center space-x-2">
                  {habit.difficulty === 'Fácil' ? <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" /> : <TrendingUp className="h-5 w-5 text-amber-500 shrink-0" />}
                  <CardTitle className="text-lg font-medium text-accent leading-tight">
                    {habit.habitName}
                  </CardTitle>
                </div>
                <Badge
                  className={cn(
                    "px-3 py-1 text-xs font-bold uppercase self-start sm:self-center mt-2 sm:mt-0",
                    habit.difficulty === 'Fácil'
                      ? 'bg-green-600 hover:bg-green-700 text-white border-transparent'
                      : 'bg-amber-500 hover:bg-amber-600 text-black border-transparent'
                  )}
                >
                  {habit.difficulty}
                </Badge>
              </CardHeader>
              <CardContent className="pb-4 px-4 pt-1">
                <p className="text-muted-foreground text-sm">{habit.explanation}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Call to Action Card (LifeQuest RPG) */}
      <Card className="text-card-foreground border-border shadow-lg">
        <CardContent className="p-6 space-y-4 text-center">
          <h2 className="text-2xl font-bold uppercase text-primary">¡Esto es solo el Comienzo de tu Aventura!</h2>
          <p className="text-muted-foreground">
            Regístrate GRATIS en <strong className="text-accent">LifeQuest RPG</strong> para:
          </p>
          <ul className="space-y-1 text-left text-foreground list-inside list-disc marker:text-primary pl-4 sm:pl-0">
            <li>Desbloquear el Quiz Completo y recibir 5 Skills personalizadas.</li>
            <li>Rastrear tu progreso en estas y otras habilidades.</li>
            <li>Ganar XP, subir de nivel y personalizar tu Héroe.</li>
            <li>¡Convertir tu vida real en un RPG épico!</li>
          </ul>
          <Button
            asChild
            className="w-full md:w-auto mt-4 text-base py-5 px-6 font-semibold"
            size="lg"
          >
            <a href="https://firebase.google.com/products/app-hosting" target="_blank" rel="noopener noreferrer"> {/* Placeholder Link */}
              <span className="flex items-center justify-center">
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
            className="w-full md:w-auto text-base py-5 px-6"
            size="lg"
          >
           <span className="flex items-center">
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
