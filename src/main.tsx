import "./index.css";

import App from "./App.tsx";
import { Button } from "./components/ui/button.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary
			FallbackComponent={({ error }: { error: Error }) => (
				<div className="w-dvw h-dvh overflow-hidden bg-red-500 text-destructive-foreground flex flex-col gap-10 items-center justify-center">
					<b className="text-3xl">Honza něco pokazil 🥺</b>
					<pre className="bg-slate-800 text-amber-100 p-3 rounded-lg max-w-[80dvw] max-h-96 overflow-y-auto break-all text-wrap">{error.message}</pre>
					<pre className="bg-slate-800 text-amber-100 p-3 rounded-lg max-w-[80dvw] max-h-96 overflow-y-auto break-all text-wrap">
						{error.stack
							?.split("\n")
							.slice(1)
							.map((s) => " > " + s.substring(7))
							.join("\n")}
					</pre>
					<Button onClick={() => window.location.reload()}>Druhá šance?</Button>
				</div>
			)}>
			<App />
		</ErrorBoundary>
	</StrictMode>
);
