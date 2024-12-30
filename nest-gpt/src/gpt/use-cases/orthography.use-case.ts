import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        las palabras usadas deben existir en el diccionario de la RAE,
        debes de responder en formato JSON, tu tarea es corregirlos y retornar informacióm, 
        soluciones, también debes de dar un porcentaje de acierto al usuario,
        si no hay errores, debes de retornar un mensaje de felicitacioNES

        Ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ['error -> solucación']    
          message: string, //Usa emojis y texto para felicitar al usuario
        }
        `,
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.3,
    max_tokens: 150,
  });

  // return completion.choices[0];
  // return {
  //   prompt,
  //   apikey: process.env.OPENAI_API_KEY,
  // };
};
