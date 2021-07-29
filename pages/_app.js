import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default MyApp;
