
"use client";

import type { ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface InputSectionProps {
  improvementArea: string;
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export function InputSection({ improvementArea, onInputChange, onSubmit, isLoading }: InputSectionProps) {
  return (
    <section aria-labelledby="input-title" className="space-y-8 text-center animate-fadeIn">
      <div className="relative p-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent transform -skew-y-3 sm:skew-y-0 sm:-rotate-3 rounded-none opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-card p-6 md:p-8 rounded-none shadow-xl">
          <h1 id="input-title" className="text-3xl md:text-4xl font-bold uppercase text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Forja tu Destino
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            ¿En qué quieres Mejorar Hoy?
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <Textarea
            value={improvementArea}
            onChange={onInputChange}
            placeholder="Ej: Ser más productivo, aprender a meditar, dejar de procrastinar..."
            rows={3}
            className="bg-input text-foreground placeholder:text-muted-foreground/80 border-2 border-border focus:border-primary focus:ring-primary p-4 rounded-none text-lg min-h-[100px] shadow-inner"
            disabled={isLoading}
            aria-label="Área de mejora"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Describe brevemente el hábito o área que deseas potenciar.
          </p>
        </div>
        <Button
          type="submit"
          className="p5r-button w-full md:w-auto disabled:opacity-75"
          disabled={isLoading}
        >
          <span className="p5r-button-inner">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Forjando...
              </span>
            ) : (
              "¡Revela mi Skill!"
            )}
          </span>
        </Button>
      </form>
    </section>
  );
}
