
"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { InputSection } from '@/components/sections/InputSection';
import { LoadingSection } from '@/components/sections/LoadingSection';
import { ResultSection } from '@/components/sections/ResultSection';
import { generateSkill, type GenerateSkillOutput } from '@/ai/flows/generate-skill';
import { useToast } from "@/hooks/use-toast";
// Removed Card and CardContent import as they are now encapsulated within sections

type AppSection = 'input' | 'loading' | 'result';

export default function PersonaSkillForgerPage() {
  const [currentSection, setCurrentSection] = useState<AppSection>('input');
  const [improvementArea, setImprovementArea] = useState('');
  const [generatedSkill, setGeneratedSkill] = useState<GenerateSkillOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setImprovementArea(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!improvementArea.trim()) {
      toast({
        title: "Campo Requerido",
        description: "Por favor, describe en qué quieres mejorar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCurrentSection('loading');
    setGeneratedSkill(null); // Clear previous results

    try {
      const result = await generateSkill({ improvementArea });
      setGeneratedSkill(result);
      setCurrentSection('result');
    } catch (error) {
      console.error("Error generating skill:", error);
      toast({
        title: "Error de Forja",
        description: "Hubo un problema al generar tu skill. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      setCurrentSection('input'); // Revert to input section on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setImprovementArea('');
    setGeneratedSkill(null);
    setCurrentSection('input');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-6 md:p-8 overflow-x-hidden">
      <main className="w-full max-w-xl mx-auto space-y-8">
        {currentSection === 'input' && (
          <InputSection
            improvementArea={improvementArea}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
        {currentSection === 'loading' && <LoadingSection />}
        {currentSection === 'result' && generatedSkill && (
          <ResultSection
            skillData={generatedSkill}
            onRestart={handleRestart}
          />
        )}
      </main>
      <footer className="mt-12 text-center text-xs text-muted-foreground/80">
        <p>&copy; {new Date().getFullYear()} Persona Skill Forger. Todos los derechos reservados.</p>
        <p>Inspirado por el universo Persona y LifeQuest RPG.</p>
      </footer>
    </div>
  );
}
