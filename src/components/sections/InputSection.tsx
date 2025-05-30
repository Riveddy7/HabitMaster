
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
    <section aria-labelledby="input-title" className="space-y-10 animate-fadeIn">
      <Card className="bg-card text-card-foreground rounded-xl shadow-2xl border-border/30 overflow-hidden">
        <div className="flex items-center p-6 space-x-4 md:space-x-6">
          <div className="flex-shrink-0">
            <Image
              src="https://placehold.co/80x80.png"
              alt="Avatar del Guía"
              width={80}
              height={80}
              className="rounded-lg border-2 border-primary/50 shadow-md object-cover"
              data-ai-hint="avatar guide"
            />
          </div>
          <div className="flex-1">
            <CardTitle id="input-title" className="text-2xl md:text-3xl font-bold uppercase text-primary mb-2">
              Forja tu Destino
            </CardTitle>
            <p className="text-md md:text-lg text-muted-foreground">
              ¿En qué quieres Mejorar Hoy?
            </p>
          </div>
        </div>
      </Card>

      <form onSubmit={onSubmit} className="space-y-8">
        <Card className="bg-card text-card-foreground rounded-xl shadow-lg border-border/20">
          <CardContent className="p-6">
            <div>
              <Textarea
                value={improvementArea}
                onChange={onInputChange}
                placeholder="Ej: Ser más productivo, aprender una nueva habilidad, mejorar mis relaciones..."
                rows={4}
                className="bg-background/70 text-foreground placeholder:text-muted-foreground/80 border-2 border-border focus:border-primary focus:ring-primary p-4 text-lg min-h-[120px] shadow-inner rounded-lg"
                disabled={isLoading}
                aria-label="Área de mejora"
              />
              <p className="mt-3 text-sm text-muted-foreground/90">
                Describe brevemente el hábito o área que deseas potenciar. ¡Sé específico!
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="text-center">
          <Button
            type="submit"
            className="w-full sm:w-auto disabled:opacity-75 text-lg py-6 px-10 font-semibold tracking-wide rounded-lg shadow-md hover:shadow-primary/40 focus:shadow-primary/40 transition-all duration-300"
            disabled={isLoading}
            size="lg"
            variant="default"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Forjando Skill...
              </span>
            ) : (
              "¡Revela mi Nueva Skill!"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
