import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: { "@": path.resolve(__dirname, "./src") },
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// Separa o React e o React Router em um chunk próprio
					"react-vendor": ["react", "react-router"],
					// Separa bibliotecas de formulário e utilitários
					"utils-vendor": ["date-fns", "zod", "react-hook-form"],
				},
			},
		},
	},
});
