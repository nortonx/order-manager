import { z } from "zod";

/**
 * Zod validation schema for asset form fields
 */
export const assetFormSchema = z.object({
  symbol: z
    .string()
    .min(1, "Símbolo do instrumento é obrigatório")
    .max(10, "Símbolo não pode ter mais de 10 caracteres")
    .regex(
      /^[A-Z0-9]+$/,
      "Símbolo deve conter apenas letras maiúsculas e números"
    ),

  assetType: z.enum(["buy", "sell"], {
    errorMap: () => ({ message: "Tipo deve ser 'Compra' ou 'Venda'" }),
  }),

  quantity: z
    .number({
      required_error: "Quantidade é obrigatória",
      invalid_type_error: "Quantidade deve ser um número",
    })
    .min(1, "Quantidade deve ser pelo menos 1")
    .max(10000, "Quantidade não pode exceder 10.000")
    .int("Quantidade deve ser um número inteiro"),

  selectedAssetId: z
    .string()
    .min(1, "Você deve selecionar um ativo da lista abaixo"),
});

/**
 * Type inference from the schema
 */
export type AssetFormData = z.infer<typeof assetFormSchema>;

/**
 * Schema for partial validation (during form input)
 */
export const assetFormPartialSchema = assetFormSchema.partial();

/**
 * Validation helper for individual fields
 */
export const validateField = (field: keyof AssetFormData, value: unknown) => {
  try {
    const fieldSchema = assetFormSchema.shape[field];
    fieldSchema.parse(value);
    return { success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Valor inválido",
      };
    }
    return { success: false, error: "Erro de validação" };
  }
};

/**
 * Validation helper for the complete form
 */
export const validateAssetForm = (data: Partial<AssetFormData>) => {
  try {
    assetFormSchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Erro de validação" } };
  }
};
