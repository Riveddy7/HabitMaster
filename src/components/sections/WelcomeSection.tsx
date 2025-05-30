
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';

interface WelcomeSectionProps {
  onContinue: () => void;
}

export function WelcomeSection({ onContinue }: WelcomeSectionProps) {
  return (
    <section className="h-screen flex flex-col items-center justify-center p-4 animate-fadeIn text-center relative overflow-hidden">
       {/* Imagen de fondo del personaje (opcional, si se quiere superponer) */}
       {/* <Image
        src="https://placehold.co/400x700.png?text=Character_BG"
        alt="Personaje Guía de Fondo"
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-30"
        data-ai-hint="fantasy character background"
      /> */}

      <div className="relative z-10 w-full max-w-md space-y-6">
        <Card className="bg-card/80 backdrop-blur-sm text-card-foreground border-primary/60 shadow-2xl rounded-lg">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-center">
              {/* Placeholder para el Avatar del Coach */}
              <div 
                className="w-32 h-32 bg-muted/50 border-2 border-primary rounded-full mb-4 flex items-center justify-center overflow-hidden"
                data-ai-hint="guide avatar circular"
                >
                 <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/questifyv2-4d669.firebasestorage.app/o/avatarMujer.webp?alt=media&token=65e6abed-fb11-4568-b637-6bfece2ff4de" // Reemplazar con el avatar real
                    alt="Avatar del Guía"
                    width={128}
                    height={128}
                    className="object-cover"
                    data-ai-hint="guide avatar"
                 />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-primary uppercase">¡Bienvenido, Aspirante a Héroe!</h2>
            <p className="text-lg text-foreground">
              Has llegado al umbral de tu potencial. Un nuevo poder aguarda ser descubierto.
            </p>
            <p className="text-md text-muted-foreground">
              Prepárate para forjar una habilidad que cambiará tu destino.
            </p>
          </CardContent>
        </Card>
        <Button
          onClick={onContinue}
          className="w-full sm:w-auto text-lg py-3 px-10 font-bold tracking-wider rounded-md shadow-lg bg-primary hover:bg-primary/90 active:bg-primary/80 transform active:scale-[0.97] transition-all duration-150"
          size="lg"
        >
          COMENZAR MI FORJA
        </Button>
      </div>
       <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
