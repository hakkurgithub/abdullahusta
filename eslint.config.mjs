// eslint yapılandırması
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Next.js ve TypeScript için önerilen kuralları kullan
  ...compat.extends("next/core-web-vitals", "next/typescript"),
<<< HEAD
=======

  // 👇 Bu satırları ekle (lint kurallarını kapatıyoruz)
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
>>>>>>> 1f5b1163 (İlk yükleme)
];
