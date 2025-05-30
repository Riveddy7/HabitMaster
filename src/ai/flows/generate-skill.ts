
'use server';
/**
 * @fileOverview Generates a personalized RPG skill and related habits based on user input.
 *
 * - generateSkill - A function that handles the skill generation process.
 * - GenerateSkillInput - The input type for the generateSkill function.
 * - GenerateSkillOutput - The return type for the generateSkill function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSkillInputSchema = z.object({
  improvementArea: z
    .string()
    .describe('The area in which the user wants to improve.'),
});
export type GenerateSkillInput = z.infer<typeof GenerateSkillInputSchema>;

const HabitSchema = z.object({
  habitName: z.string().describe('Un hábito práctico y directo, redactado en español latino. Ejemplo: "Leer 1 capítulo de un libro antes de dormir".'),
  difficulty: z.enum(['Fácil', 'Difícil']).describe('La dificultad del hábito, debe ser "Fácil" o "Difícil".'),
  explanation: z.string().describe('Una breve explicación (1-2 frases) de por qué este hábito específico ayudará al usuario a mejorar en su área de interés, en español latino.'),
});

const GenerateSkillOutputSchema = z.object({
  skillName: z.string().describe('El nombre de la habilidad, debe ser creativo, corto, épico y al estilo RPG, en español latino. Ejemplo: "Filo del Intelecto Perspicaz".'),
  skillDescription: z.string().describe('Una descripción breve (1-2 frases), aventurera y motivadora de la habilidad, en español latino. Ejemplo: "Domina el arte del conocimiento y la estrategia, desentrañando misterios con claridad mental."'),
  habits: z.array(HabitSchema)
    .length(2, { message: "Debe haber exactamente dos hábitos." })
    .describe('Una lista de exactamente dos hábitos concretos y accionables. El primero debe ser de dificultad "Fácil" y el segundo de dificultad "Difícil".'),
});
export type GenerateSkillOutput = z.infer<typeof GenerateSkillOutputSchema>;

export async function generateSkill(input: GenerateSkillInput): Promise<GenerateSkillOutput> {
  return generateSkillFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSkillPrompt',
  input: {schema: GenerateSkillInputSchema},
  output: {schema: GenerateSkillOutputSchema},
  prompt: `Eres un diseñador de juegos RPG y un coach de vida altamente pragmático. Un usuario quiere mejorar en el área de "{{{improvementArea}}}".
Tu misión es generar contenido exclusivamente en ESPAÑOL LATINOAMERICANO.

Debes devolver la respuesta en formato JSON, adhiriéndote estrictamente al esquema Zod que se te ha proporcionado. No incluyas ninguna explicación adicional fuera del JSON.

El JSON debe tener la siguiente estructura:
{
  "skillName": "string", // Nombre de la habilidad: creativo, corto, épico, estilo RPG.
  "skillDescription": "string", // Descripción de la habilidad: breve (1-2 frases), aventurera, motivadora.
  "habits": [ // Un array con EXACTAMENTE DOS hábitos.
    {
      "habitName": "string", // Hábito 1: práctico, directo, accionable.
      "difficulty": "Fácil", // Dificultad: DEBE SER "Fácil".
      "explanation": "string" // Explicación: breve (1-2 frases), por qué ayuda.
    },
    {
      "habitName": "string", // Hábito 2: práctico, directo, accionable.
      "difficulty": "Difícil", // Dificultad: DEBE SER "Difícil".
      "explanation": "string" // Explicación: breve (1-2 frases), por qué ayuda.
    }
  ]
}

Consideraciones CRÍTICAS para los hábitos ("habitName" y "explanation"):
- PRÁCTICOS Y DIRECTOS: Los hábitos deben ser acciones concretas y específicas que el usuario pueda realizar.
  - EJEMPLO BUENO (para "mejorar mi cuerpo"): "Hacer 20 sentadillas al despertar." (Fácil), "Ir al gimnasio 3 veces por semana y seguir una rutina de ejercicios." (Difícil). Explicación: "Las sentadillas fortalecen tus piernas y activan tu metabolismo.", "El ejercicio regular mejora tu condición física y salud general."
  - EJEMPLO MALO (evitar): "Conectar con tu templo interior.", "Visualizar tu cuerpo ideal.", "Meditar sobre la salud."
- EJEMPLO BUENO (para "conseguir novia"): "Sonreír y hacer contacto visual con una persona nueva al día." (Fácil), "Asistir a un evento social o unirte a un club de tus intereses este mes." (Difícil). Explicación: "Pequeñas interacciones positivas aumentan tu confianza y apertura.", "Ampliar tu círculo social aumenta las oportunidades de conocer gente compatible."
  - EJEMPLO MALO (evitar): "Repetir afirmaciones de amor propio.", "Meditar sobre la pareja ideal."
- Sin jerga RPG en los hábitos: Deben ser comprensibles para la vida real.
- La "explanation" debe justificar cómo el hábito contribuye DIRECTAMENTE al área de mejora "{{{improvementArea}}}".

Recuerda: TODO el texto en ESPAÑOL LATINOAMERICANO. Los nombres de skill y descripciones deben ser creativos y con tono de aventura. Los hábitos deben ser ultra-prácticos.

Área de mejora del usuario: {{{improvementArea}}}
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  },
});

const generateSkillFlow = ai.defineFlow(
  {
    name: 'generateSkillFlow',
    inputSchema: GenerateSkillInputSchema,
    outputSchema: GenerateSkillOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("La IA no pudo generar una respuesta válida.");
    }
    // Asegurarse de que siempre haya dos hábitos, incluso si la IA falla parcialmente.
    // Esta es una contingencia, el prompt está diseñado para evitar esto.
    if (output.habits.length !== 2) {
        // Intenta generar una respuesta por defecto o lanzar un error más específico.
        // Por ahora, lanzaremos un error para indicar el problema.
        console.error("La IA no generó la cantidad correcta de hábitos.", output.habits);
        throw new Error("Error en la estructura de hábitos generada por la IA.");
    }
    return output;
  }
);
