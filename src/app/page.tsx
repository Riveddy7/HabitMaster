
"use client";

import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react';
import { InputSection } from '@/components/sections/InputSection';
import { LoadingSection } from '@/components/sections/LoadingSection';
import { ResultSection } from '@/components/sections/ResultSection';
import { WelcomeSection } from '@/components/sections/WelcomeSection';
import { generateSkill, type GenerateSkillOutput } from '@/ai/flows/generate-skill';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile"; 
import { Skeleton } from "@/components/ui/skeleton";

type AppSection = 'initialLoading' | 'welcome' | 'input' | 'loading' | 'result';

export default function SkillForgerPage() {
  const [currentSection, setCurrentSection] = useState<AppSection>('initialLoading');
  const [improvementArea, setImprovementArea] = useState('');
  const [generatedSkill, setGeneratedSkill] = useState<GenerateSkillOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile === undefined) return; // Espera a que se determine isMobile

    if (isMobile) {
      setCurrentSection('welcome');
    } else {
      setCurrentSection('input');
    }
  }, [isMobile]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setImprovementArea(e.target.value);
  };

  const handleWelcomeContinue = () => {
    setCurrentSection('input');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!improvementArea.trim()) {
      toast({
        title: "Campo Requerido",
        description: "Por favor, describe qué habilidad legendaria quieres desatar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCurrentSection('loading');
    setGeneratedSkill(null); 

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
      setCurrentSection(isMobile ? 'welcome' : 'input'); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setImprovementArea('');
    setGeneratedSkill(null);
    setCurrentSection(isMobile ? 'welcome' : 'input');
  };

  if (currentSection === 'initialLoading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <Skeleton className="w-full max-w-md h-96 rounded-lg" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 ${isMobile && currentSection === 'welcome' ? 'mobile-page-transparent-bg' : 'bg-background'}`}>
      <main className="w-full max-w-2xl mx-auto space-y-6 sm:space-y-10">
        {currentSection === 'welcome' && isMobile && (
          <WelcomeSection onContinue={handleWelcomeContinue} />
        )}
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
      <footer className="mt-12 sm:mt-16 text-center text-xs text-muted-foreground/80 px-4 pb-6">
        <p>&copy; {new Date().getFullYear()} LifeQuest RPG. Forjando héroes, un hábito a la vez.</p>
        <p>Este es un portal de descubrimiento. La aventura completa te espera en la app.</p>
      </footer>
    </div>
  );
}
