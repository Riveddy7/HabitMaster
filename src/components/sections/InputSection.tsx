
"use client";

import type { ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface InputSectionProps {
  improvementArea: string;
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export function InputSection({ improvementArea, onInputChange, onSubmit, isLoading }: InputSectionProps) {
  return (
    <section aria-labelledby="input-title-main" className="w-full max-w-md mx-auto space-y-6 sm:space-y-8 py-8 px-4">
      {/* Sección del Avatar y Bienvenida */}
      <Card className="bg-card text-card-foreground border-primary/50 shadow-xl rounded-md overflow-hidden">
        <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
          {/* Placeholder para el Avatar del Coach P5R */}
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 bg-muted/30 border-2 border-primary rounded-md mb-4 flex items-center justify-center overflow-hidden"
            data-ai-hint="coach avatar"
          >
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/questifyv2-4d669.firebasestorage.app/o/avatarMujer.webp?alt=media&token=65e6abed-fb11-4568-b637-6bfece2ff4de"
              alt="Avatar del Coach"
              width={112} // Corresponds to w-28
              height={112} // Corresponds to h-28
              className="object-cover w-full h-full"
              data-ai-hint="female guide avatar"
            />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-primary">¡Alto ahí, Héroe!</p>
          <p className="text-base sm:text-lg text-foreground">Tu potencial te trajo aquí. Dime...</p>
        </CardContent>
      </Card>

      {/* Título Principal */}
      <h1 id="input-title-main" className="text-3xl sm:text-4xl font-extrabold text-primary text-center uppercase tracking-tight">
        Forja tu Próxima Skill
      </h1>

      {/* Sección de Entrada del Usuario */}
      <Card className="bg-card text-card-foreground border-border/30 shadow-lg rounded-md">
        <CardHeader className="pb-2 pt-5 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl font-semibold text-foreground text-center">
            ¿Qué habilidad legendaria quieres desatar?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-2">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Textarea
                value={improvementArea}
                onChange={onInputChange}
                placeholder="Ej: 'Dominar la procrastinación', 'Forjar una rutina de ejercicios épica'..."
                rows={4}
                className="bg-input text-foreground placeholder:text-muted-foreground/70 border-2 border-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring p-3 text-base min-h-[100px] shadow-inner rounded-md"
                disabled={isLoading}
                aria-label="Describe tu objetivo de habilidad"
              />
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground text-center px-2">
                Describe tu objetivo. Cuanto más específico sea tu conjuro, ¡más poderosa será la Skill revelada!
              </p>
            </div>
            <Button
              type="submit"
              className="w-full disabled:opacity-75 text-base sm:text-lg py-3 px-6 font-bold tracking-wide rounded-md shadow-md bg-primary hover:bg-primary/90 active:bg-primary/80 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-150 transform active:scale-[0.98]"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  FORJANDO...
                </span>
              ) : (
                "¡REVELAR MI SKILL AHORA!"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
