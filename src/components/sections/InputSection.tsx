
"use client";

import type { ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InputSectionProps {
  improvementArea: string;
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export function InputSection({ improvementArea, onInputChange, onSubmit, isLoading }: InputSectionProps) {
  return (
    <section aria-labelledby="input-title" className="space-y-8 text-center animate-fadeIn">
      <Card className="shadow-xl text-center">
        <CardHeader className="bg-primary/10 rounded-t-lg">
          <CardTitle id="input-title" className="text-3xl md:text-4xl font-bold uppercase text-primary drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] py-2">
            Forja tu Destino
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-lg text-muted-foreground">
            ¿En qué quieres Mejorar Hoy?
          </p>
        </CardContent>
      </Card>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div>
              <Textarea
                value={improvementArea}
                onChange={onInputChange}
                placeholder="Ej: Ser más productivo, aprender a meditar, dejar de procrastinar..."
                rows={3}
                className="bg-input text-foreground placeholder:text-muted-foreground/80 border-2 border-border focus:border-primary focus:ring-primary p-4 text-lg min-h-[100px] shadow-inner rounded-md"
                disabled={isLoading}
                aria-label="Área de mejora"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Describe brevemente el hábito o área que deseas potenciar.
              </p>
            </div>
          </CardContent>
        </Card>
        <Button
          type="submit"
          className="w-full md:w-auto disabled:opacity-75 text-lg py-6 px-8 font-semibold"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Forjando...
            </span>
          ) : (
            "¡Revela mi Skill!"
          )}
        </Button>
      </form>
    </section>
  );
}
