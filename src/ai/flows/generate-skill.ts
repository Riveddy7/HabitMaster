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

const GenerateSkillOutputSchema = z.object({
  skillName: z.string().describe('The name of the generated RPG skill.'),
  habits: z.array(z.string()).describe('The list of habits related to the skill.'),
});
export type GenerateSkillOutput = z.infer<typeof GenerateSkillOutputSchema>;

export async function generateSkill(input: GenerateSkillInput): Promise<GenerateSkillOutput> {
  return generateSkillFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSkillPrompt',
  input: {schema: GenerateSkillInputSchema},
  output: {schema: GenerateSkillOutputSchema},
  prompt: `You are an RPG game designer. A user wants to improve in the area of {{{improvementArea}}}. Generate a personalized RPG skill and a list of two habits that will help the user improve in that area. Return the skill name and list of habits in JSON format. Example: {skillName: "Skill Name", habits: ["Habit 1", "Habit 2"]}`,
});

const generateSkillFlow = ai.defineFlow(
  {
    name: 'generateSkillFlow',
    inputSchema: GenerateSkillInputSchema,
    outputSchema: GenerateSkillOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
