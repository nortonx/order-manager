import {
  assetFormSchema,
  validateField,
  validateAssetForm,
  type AssetFormData,
} from "@/lib/validations/asset-form";

describe("Asset Form Validation", () => {
  describe("assetFormSchema", () => {
    const validData: AssetFormData = {
      symbol: "PETR4",
      assetType: "buy",
      quantity: 100,
      selectedAssetId: "123",
    };

    it("should validate correct data", () => {
      const result = assetFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    describe("symbol validation", () => {
      it("should reject empty symbol", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          symbol: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe(
            "Símbolo do instrumento é obrigatório"
          );
        }
      });

      it("should reject symbol longer than 10 characters", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          symbol: "VERYLONGSYMBOL",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe(
            "Símbolo não pode ter mais de 10 caracteres"
          );
        }
      });

      it("should reject symbol with invalid characters", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          symbol: "petr4@",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe(
            "Símbolo deve conter apenas letras maiúsculas e números"
          );
        }
      });

      it("should accept valid symbols", () => {
        const validSymbols = ["PETR4", "VALE3", "BBAS3", "ITUB4", "A1B2C3"];
        validSymbols.forEach((symbol) => {
          const result = assetFormSchema.safeParse({
            ...validData,
            symbol,
          });
          expect(result.success).toBe(true);
        });
      });
    });

    describe("assetType validation", () => {
      it("should accept 'buy'", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          assetType: "buy",
        });
        expect(result.success).toBe(true);
      });

      it("should accept 'sell'", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          assetType: "sell",
        });
        expect(result.success).toBe(true);
      });

      it("should reject invalid type", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          assetType: "hold" as any,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe(
            "Tipo deve ser 'Compra' ou 'Venda'"
          );
        }
      });
    });

    describe("quantity validation", () => {
      it("should accept valid quantities", () => {
        const validQuantities = [1, 100, 1000, 10000];
        validQuantities.forEach((quantity) => {
          const result = assetFormSchema.safeParse({
            ...validData,
            quantity,
          });
          expect(result.success).toBe(true);
        });
      });

      it("should reject quantity less than 1", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          quantity: 0,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe(
            "Quantidade deve ser pelo menos 1"
          );
        }
      });

      it("should reject quantity greater than 10000", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          quantity: 10001,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe(
            "Quantidade não pode exceder 10.000"
          );
        }
      });

      it("should reject non-integer quantity", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          quantity: 1.5,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe(
            "Quantidade deve ser um número inteiro"
          );
        }
      });

      it("should reject non-number quantity", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          quantity: "invalid" as any,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe(
            "Quantidade deve ser um número"
          );
        }
      });
    });

    describe("selectedAssetId validation", () => {
      it("should accept valid asset ID", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          selectedAssetId: "123",
        });
        expect(result.success).toBe(true);
      });

      it("should reject empty asset ID", () => {
        const result = assetFormSchema.safeParse({
          ...validData,
          selectedAssetId: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe(
            "Você deve selecionar um ativo da lista abaixo"
          );
        }
      });
    });
  });

  describe("validateField", () => {
    it("should validate individual field correctly", () => {
      const result = validateField("symbol", "PETR4");
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
    });

    it("should return error for invalid field", () => {
      const result = validateField("symbol", "");
      expect(result.success).toBe(false);
      expect(result.error).toBe("Símbolo do instrumento é obrigatório");
    });

    it("should handle validation errors gracefully", () => {
      const result = validateField("quantity", "invalid");
      expect(result.success).toBe(false);
      expect(result.error).toContain("número");
    });
  });

  describe("validateAssetForm", () => {
    const validData: AssetFormData = {
      symbol: "PETR4",
      assetType: "buy",
      quantity: 100,
      selectedAssetId: "123",
    };

    it("should validate complete form correctly", () => {
      const result = validateAssetForm(validData);
      expect(result.success).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it("should return multiple errors for invalid form", () => {
      const invalidData: Partial<AssetFormData> = {
        symbol: "",
        assetType: "invalid" as any,
        quantity: 0,
        selectedAssetId: "",
      };

      const result = validateAssetForm(invalidData);
      expect(result.success).toBe(false);
      expect(Object.keys(result.errors)).toHaveLength(4);
      expect(result.errors.symbol).toBe(
        "Símbolo deve conter apenas letras maiúsculas e números"
      );
      expect(result.errors.assetType).toBe("Tipo deve ser 'Compra' ou 'Venda'");
      expect(result.errors.quantity).toBe("Quantidade deve ser pelo menos 1");
      expect(result.errors.selectedAssetId).toBe(
        "Você deve selecionar um ativo da lista abaixo"
      );
    });

    it("should handle partial data validation", () => {
      const partialData: Partial<AssetFormData> = {
        symbol: "PETR4",
        quantity: 100,
      };

      const result = validateAssetForm(partialData);
      expect(result.success).toBe(false);
      expect(result.errors.assetType).toContain("Tipo");
      expect(result.errors.selectedAssetId).toContain("Required");
    });
  });
});
